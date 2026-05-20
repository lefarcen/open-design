---
name: pitch-deck-bootstrap
description: |
  Single-shot 6-slide HTML pitch deck from a one-line brief.
  Drops the canonical 1920×1080 deck framework, then fills:
  Cover → Problem → Solution → Traction → Why-now / market → Ask.
  Single file, scale-to-fit, keyboard nav, print-to-PDF baked in.
triggers:
  - "pitch deck"
  - "investor deck"
  - "seed deck"
  - "fundraising"
  - "bootstrap a deck"
od:
  mode: deck
  scenario: marketing
  preview:
    type: html
    entry: examples/sample-deck.html
  design_system:
    requires: false
  speaker_notes: false
  animations: false
---

# Pitch Deck Bootstrap

A focused, single-shot scenario: turn a one-paragraph company description
into a 6-slide pitch deck in a single HTML file. No multi-stage pipeline,
no follow-up direction picking — one agent turn, one artifact.

## Resource map

```
pitch-deck-bootstrap/
├── SKILL.md                ← you're reading this
├── open-design.json        ← OD marketplace + apply manifest
└── examples/
    └── sample-deck.html    ← reference output (preview card + design contract)
```

## Workflow

### Step 1 — Read the brief

You will receive these inputs (templated into the run query):

- `topic` — the company / product / idea in one line
- `audience` — who the deck is for (default: "seed-stage investors")
- `slideCount` — 6 by default; honor user override up to 12
- `tone` — `confident-modern` | `editorial-restrained` | `tech-utility` (default: `confident-modern`)

If `topic` is missing or vague (one or two words), ask one focused
clarification before building. Otherwise, build.

### Step 2 — Copy the canonical deck framework verbatim

The OD designer system prompt ships a fixed 1920×1080 deck skeleton
("Slide deck — fixed framework"). Copy it **verbatim** into the project
root as `index.html`. Do NOT re-derive scale-to-fit, keyboard handling,
slide visibility, counter, or print stylesheet — every freeform attempt
re-introduces the same iframe positioning bugs.

Touch only:

- `<title>` — set to "<Company> — Pitch Deck".
- `:root` tokens — bind to the chosen tone's palette (see Step 3).
- The second `<style>` block — per-deck classes (`.cover`, `.big-stat`,
  `.three-col`, `.ask`).
- `<section class="slide">` blocks — fill the 6 slots below.

### Step 3 — Bind palette + fonts by tone

**`confident-modern` (default):**

```css
:root {
  --bg:      oklch(99% 0.002 240);
  --surface: oklch(100% 0 0);
  --fg:      oklch(18% 0.012 250);
  --muted:   oklch(54% 0.012 250);
  --border:  oklch(92% 0.005 250);
  --accent:  oklch(58% 0.18 255);
  --shell:   oklch(8% 0.02 250);
  --font-display: -apple-system, BlinkMacSystemFont, 'SF Pro Display', system-ui, sans-serif;
  --font-body:    -apple-system, BlinkMacSystemFont, 'SF Pro Text', system-ui, sans-serif;
}
```

**`editorial-restrained`:**

```css
:root {
  --bg:      oklch(98% 0.004 95);
  --surface: oklch(100% 0.002 95);
  --fg:      oklch(20% 0.018 70);
  --muted:   oklch(48% 0.012 70);
  --border:  oklch(90% 0.006 95);
  --accent:  oklch(52% 0.10 28);
  --shell:   oklch(15% 0.01 70);
  --font-display: 'Iowan Old Style', Charter, Georgia, serif;
  --font-body:    -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
}
```

**`tech-utility`:**

```css
:root {
  --bg:      oklch(98% 0.005 250);
  --surface: oklch(100% 0 0);
  --fg:      oklch(22% 0.02 240);
  --muted:   oklch(50% 0.018 240);
  --border:  oklch(90% 0.008 240);
  --accent:  oklch(58% 0.16 145);
  --shell:   oklch(10% 0.02 240);
  --font-display: 'Inter', system-ui, sans-serif;
  --font-body:    'Inter', system-ui, sans-serif;
  --font-mono:    'JetBrains Mono', ui-monospace, Menlo, monospace;
}
```

### Step 4 — Slide arc (6 slides)

| # | data-screen-label | Layout              | Job                                                |
|---|-------------------|---------------------|----------------------------------------------------|
| 1 | `01 Cover`        | cover               | Company name, one-line pitch, single accent moment |
| 2 | `02 Problem`      | body                | The pain — concrete, named, lived                  |
| 3 | `03 Solution`     | body + visual block | The product as the answer                          |
| 4 | `04 Traction`     | big-stat            | 1 hero number + 2 supporting metrics               |
| 5 | `05 Why now`      | three-col           | Three trends or wedges                             |
| 6 | `06 Ask`          | closing             | $X.XM ask, use of funds, contact                   |

For decks > 6 slides, insert (in order): `Team`, `Market`, `GTM`,
`Roadmap`, `Competition`, `Quote` — each as a single body slide.

### Step 5 — Fill with real copy, no filler

Hard rules:

- No invented metrics. If you don't have a number, write a labelled
  placeholder ("—" or "[traction TK]") and call it out at the end of
  the turn so the user can fill it in.
- No emoji icon rows. No gradient backgrounds on every slide. No
  rounded card with a left coloured border.
- One accent color per slide, used at most twice.
- Display headline on the cover: ≤ 140px, ≤ 8 words, ≤ 3 lines.
- Body slides: ≤ 3 paragraphs, ≤ 56ch lead text width.
- Footer safe-zone: flow content stops 80px above any absolute footer.

### Step 6 — Self-check before emitting

For every `<section class="slide">`, mentally render at 1920×1080:

- [ ] Content fits inside the canvas; no overflow.
- [ ] Cover headline ≤ 140px and ≤ 8 words.
- [ ] Each slide carries ≤ 1 big idea.
- [ ] Theme rhythm: no 3+ visually identical slides in a row.
- [ ] `data-screen-label` present on every `<section class="slide">`.
- [ ] First slide is `class="slide active"`, rest are `class="slide"`.

### Step 7 — Emit

```
<artifact identifier="<topic-slug>-pitch-deck" type="text/html" title="<Company> — Pitch Deck">
<!doctype html>
<html>...</html>
</artifact>
```

One short prose line above the artifact (e.g. "Six-slide deck for
\<Company\>, confident-modern palette."). Stop after `</artifact>`.

## Hard rules

- **Copy the deck framework verbatim.** Do not re-derive nav/scale/print.
- **One slide, one idea.** Two ideas = two slides.
- **No filler copy.** Real copy from the brief or honest placeholders.
- **Single file output.** Inline all CSS/JS into `index.html`.
- **No `scrollIntoView()`.** Breaks the embedded preview.
