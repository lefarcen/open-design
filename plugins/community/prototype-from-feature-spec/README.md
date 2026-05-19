# prototype-from-feature-spec

Expand a one-line feature brief (or short feature spec) into a clickable,
multi-screen web prototype: `index.html` launcher + one HTML file per
screen, with real interactive controls and real states. Built for Open
Design but also valid as a portable agent skill.

## How it runs

1. The agent reads `SKILL.md`, identifies the screens implied by the
   brief, and states the screen list aloud before writing anything.
2. It plans with `TodoWrite`, then writes a launcher `index.html`, a
   shared `styles.css`, and one HTML file per screen under `screens/`.
3. Each screen has the brief's action verbs wired to real controls
   (forms with validation, lists with filter, detail with edit, success
   / error / loading states) — not static screenshots.
4. Before emitting, the agent runs the P0 checklist in `SKILL.md` and a
   5-dimensional critique. Anything < 3/5 is fixed.

## Inputs

| name | required | example |
| --- | --- | --- |
| `featureBrief` | yes | "Let teammates share their clipboard history across devices." |
| `audience` | no | "remote engineering teams" |
| `screens` | no | "onboarding, home, detail, settings" |
| `fidelity` | no | `wireframe` \| `high-fidelity` |
| `designSystem` | no | "Linear-clone" or an active project DESIGN.md |

## Install + run locally

```sh
od plugin validate ./generated-plugin
od plugin pack     ./generated-plugin --out ./dist
od plugin install  --source ./generated-plugin
od plugin apply    prototype-from-feature-spec --inputs '{"featureBrief":"..."}'
```

## Publish

```sh
od plugin login                      # wraps `gh auth login`
od plugin whoami --json
od plugin publish ./generated-plugin --to open-design \
  --repo https://github.com/<vendor>/prototype-from-feature-spec
```

The publish step opens the registry review flow on GitHub. Set
`plugin.repo` in `open-design.json` to the real source location before
publishing.

## License

MIT.
