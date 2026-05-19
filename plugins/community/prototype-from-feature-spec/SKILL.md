---
name: prototype-from-feature-spec
description: |
  Expand a one-line feature brief (or short feature spec) into a multi-screen
  interactive web prototype. Produces an `index.html` launcher plus one HTML
  file per screen, with real navigation, real form / list / detail / empty /
  loading / error states, and a single decisive flourish. Use when the user
  has a feature idea and wants a clickable, demo-ready prototype rather than
  a static mockup.
triggers:
  - "prototype"
  - "feature spec"
  - "from spec"
  - "clickable prototype"
  - "interactive mockup"
  - "demo this feature"
od:
  mode: prototype
  platform: responsive
  scenario: design
  preview:
    type: html
    entry: index.html
  design_system:
    requires: false
    sections: [color, typography, layout, components]
---

# Prototype From Feature Spec

Turn a one-line brief or short feature spec into a **clickable, multi-screen
prototype** in HTML/CSS/JS. The goal is something the user can navigate end
to end in a browser — not a pretty static mockup.

## When to use

The user describes a feature, a flow, or a screen verb ("let users …",
"a place to …", "redesign the …") and wants to see it working, not just
sketched. If the brief is one slide or one screenshot, prefer a single-file
prototype skill instead.

## Workflow

### 1. Read the brief, identify the screens

Re-read what the user actually wrote. Extract:

- **The job** the user has on this product (one sentence).
- **The screens** (3–6 distinct surfaces, never fewer than 3, never more
  than 6 in the first pass): typically onboarding/empty → main work surface
  → detail/result → settings/success. Name them in the order a user would
  reach them.
- **The action verbs** that must work (submit, generate, filter, copy,
  validate, play, pay, invite, share…). Each action verb maps to a real
  control with real JS behavior — not a static screenshot.

State the screen list in one sentence before writing any file, so the user
can redirect cheaply.

### 2. Plan with `TodoWrite`

The standard plan template:

1. Pick visual direction (from active DESIGN.md, brand spec, or the OD
   direction library — whichever applies). Bind tokens to `:root`.
2. Create `index.html` as the **launcher / gallery** linking to each
   screen.
3. Create one HTML file per screen (`01-onboarding.html`,
   `02-home.html`, …). Each file is self-contained, links to a shared
   `styles.css`, and includes the in-app navigation back to the launcher.
4. For each screen, build the **real interactive controls**: forms with
   client-side validation, lists with filter/sort, detail with edit
   states, success/error toasts, keyboard navigation. Persist transient
   state to `localStorage`.
5. Self-check against the P0 list below.
6. 5-dimensional critique (philosophy / hierarchy / execution /
   specificity / restraint). Fix anything < 3/5.
7. Emit single `<artifact>` referencing `index.html` if a new canonical
   HTML file was written; otherwise summarize edits.

### 3. File layout

```
project/
├── index.html              ← gallery: links to each screen with a
│                              short caption. Not the product.
├── styles.css              ← shared design tokens + components
├── screens/
│   ├── 01-onboarding.html  ← real product screen
│   ├── 02-home.html
│   ├── 03-detail.html
│   └── 04-settings.html
└── assets/                 ← optional images, icons, sample data
```

Each `screens/*.html` is a real product surface. Do **not** put designer
metadata, viewport selectors, "demo controls", or platform toggles into
the product files — those live in the launcher only, if at all.

### 4. Per-screen contract

For every screen file:

- A real product header / nav, not a `<h1>Screen 1</h1>`.
- One primary action above the fold.
- Real states for every interactive element: empty, loading, success,
  error, disabled. Toggle them with real JS, not by swapping screenshots.
- 44px minimum hit targets on touch surfaces; tabular numerics; focus
  rings; keyboard support for the obvious shortcuts (`Enter` submits,
  `Esc` closes overlays).
- Link to at least one other screen via a real product affordance ("View
  details" → detail screen), so the prototype is genuinely clickable.

### 5. Anti-AI-slop guardrails

- ❌ Purple/violet gradient backgrounds; warm beige / peach / pink page
  washes without a brand reason.
- ❌ Generic emoji icons (✨ 🚀 🎯 …) as a feature row.
- ❌ Filler copy ("Feature One / Feature Two", lorem ipsum, invented
  metrics like "10× faster" without a source).
- ❌ Static screenshot-style mockups when the brief has action verbs —
  build the real interactive control.
- ❌ Demo / designer chrome inside the product (viewport pickers,
  platform toggles, "this is screen 2 of 4" badges).
- ❌ Single-page scroll instead of separate screen files (unless the
  user explicitly asks for a one-pager).

### 6. P0 / P1 / P2 checklist (run before emitting)

**P0 — must pass:**

- [ ] `index.html` is the launcher, not the product.
- [ ] At least 3 separate screen files exist under `screens/`.
- [ ] Every action verb in the brief has a real working control.
- [ ] Navigation works in both directions (forward and back to launcher).
- [ ] No filler text, no invented stats, no demo-chrome inside product files.
- [ ] First load works with zero console errors.

**P1 — should pass:**

- [ ] Visual direction is explicitly bound: tokens declared in `:root`,
      no hex literals scattered through component CSS.
- [ ] Each screen has at least one realistic empty/loading/error state.
- [ ] Keyboard works for the obvious cases (`Tab` order, `Enter` submits).
- [ ] Mobile reflow holds at 390px without horizontal scroll.

**P2 — bonus:**

- [ ] A single decisive flourish per prototype (one orchestrated
      micro-interaction, one striking image, one piece of real data viz).
- [ ] Restored cursor / scroll / form state on reload.

### 7. Output contract

If a new canonical HTML file was written this turn, end with:

```
<artifact identifier="prototype-from-feature-spec" type="text/html" title="<Feature> prototype">
<!doctype html>
<html>...index.html…</html>
</artifact>
```

One sentence before the artifact. Nothing after `</artifact>`.

If this turn only edited an existing file, **skip the artifact tag** —
summarize: which file changed, what changed, what's next.

## Hard rules

- **Screen-file-first** — one HTML file per distinct user-facing
  surface unless the user asks for single-file.
- **Real interactions** — every action verb gets a working control with
  states.
- **Specificity over filler** — every word, number, image is specific to
  *this* brief; an honest placeholder beats a fake stat.
- **One decisive flourish** — restraint over ornament.

## What this skill does not do

- Pixel-perfect cloning of someone else's distinctive UI.
- Backend / API wiring beyond mocked-in-JS state.
- Multi-platform native shells (iOS frame, Android frame). For those,
  use the bundled `mobile-app` or `web-prototype` skill instead and
  drop in the shared `/frames/` mounts.
