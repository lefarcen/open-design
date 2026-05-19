# Example feature spec — Clipboard Sharing

> One-line brief:
> *"Let teammates share their clipboard history with each other across
> devices, so designers and engineers can swap snippets without Slack."*

## Audience

Remote product teams (4–20 people) who already pair on code and design.

## Screens the prototype should cover

1. **Onboarding** — single-screen, "install the helper app on your
   other device → name this device → done". Real device-name input with
   validation; success state continues to Home.
2. **Home (timeline)** — chronological list of clipboard items, each
   row showing source device, kind (text / image / file), preview, age,
   and a one-click **Copy** button. Filter chips (mine / shared with
   me / starred). Empty state for first-time users. Loading skeleton.
3. **Detail** — full-fidelity preview of a single item, with a
   **Share with…** modal, an edit-name field, a star toggle, and a
   delete action that asks for confirmation.
4. **Settings** — list of paired devices with rename/remove, a privacy
   toggle ("auto-share text under 200 chars"), and a logout action.

## Action verbs the prototype must make real

- **Copy** — clicking copies to system clipboard, toast confirms.
- **Star / unstar** — toggles state, persists to `localStorage`.
- **Share with…** — opens a modal with the paired-device list,
  multi-select, confirm action.
- **Filter** — chips toggle list contents without re-rendering layout.
- **Rename device** — input with validation and a save / cancel pair.

## Single decisive flourish

A subtle live "device dot" next to each row indicating whether the
source device is currently online; it blinks once when a new item
arrives from that device.

## What the prototype must NOT include

- Marketing copy ("Boost your productivity 10×").
- Generic emoji feature rows.
- A platform / viewport picker inside the product.
- A single-page scroll containing all four screens.
