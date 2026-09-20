# TA Site — Desktop OS

A personal exercise-session site that looks and behaves like a small desktop
OS running in the browser: draggable windows, pixel-art file icons on a
wallpaper, a taskbar, and a terminal easter egg. Falls back to a plain,
accessible single-page "website mode" automatically on mobile, or on demand
via the toggle in the taskbar/header.

Built with Vite + React + TypeScript, plain CSS, zero backend. Ships as a
static site.

## Run locally

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

## Fill in your details

Everything personal — name, course, email, links, session time, bio, and the
weekly slides list — lives in one file: **`src/content.ts`**. Open it and
replace the placeholder values (each one is marked `EDIT ME`). Nothing else
in the app needs to change.

## Adding a new week

Every week, add one object to the `weeks` array in `src/content.ts`:

```diff
   weeks: [
     {
       week: 1,
       topic: 'Introduction',
       date: '',
       slidesUrl: '#',
     },
+    {
+      week: 2,
+      topic: 'Sorting Algorithms',
+      date: 'Oct 6',
+      slidesUrl: '/slides/week02-slides.pdf',
+    },
   ] as Week[],
```

For an in-site deck, point `slidesUrl` at `#/slides/<week>` once the deck is
registered in `src/slides/index.ts`. For a PDF, drop the file into
`public/slides/` (e.g. `public/slides/week02-slides.pdf`) and point
`slidesUrl` at `/slides/<filename>.pdf`. Until either exists, leave the URL
as `'#'` — the row shows a greyed-out `soon`.

## Slides

Each exercise session is a deck that lives in the site itself, at
`#/slides/<week>` — open that URL and you get fullscreen presentation mode,
no boot screen, no windows.

**Presenting**

| key | does |
| --- | --- |
| `→` `space` click | next (also steps through revealed bullets) |
| `←` | back |
| `Home` `End` | first / last slide |
| `f` | fullscreen |
| `n` | toggle speaker notes — unlocked devices only, see below |
| `p` | lay out every slide, then open the print dialog → *Save as PDF* |
| `Esc` | back to the site |

**Writing a new week**

1. Copy `src/slides/week01.ts` to `src/slides/week02.ts` and edit the
   content. You only ever write data — a list of slide objects. The
   available slide kinds and the text markup (`$LaTeX$`, `**bold**`,
   `` `code` ``) are documented at the top of `src/slides/types.ts`.
2. Register it in `src/slides/index.ts`:

   ```diff
   + import { week02 } from './week02';
   - export const decks: Deck[] = [week01];
   + export const decks: Deck[] = [week01, week02];
   ```

3. Add the week to `content.ts` with `slidesUrl: '#/slides/2'`.

Layout, colours and typography live in `src/styles/slides.css` and are
shared by every deck — weekly files never touch styling.

**Speaker notes are locked to your own devices**

The notes are written for whoever is running the session — timings, what to
say out loud, which part to cut when the clock beats you. `n` does nothing
until a device has been unlocked once, so a student at the lectern keyboard
cannot put them on the projector.

To unlock a device, open the site once with the phrase attached:

```
https://<your-site>/?admin=<phrase>#/slides/1
```

The phrase is checked, then wiped from the address bar, and the unlock is
written to `localStorage`. That binds it to **that browser profile on that
machine**: it survives reloads, new wifi, and being offline, and it does not
travel to a phone, a lecture-hall PC, or a colleague's laptop. Repeat the URL
once per device you actually present from. To undo it, open
`?admin=lock` on that device.

Rotate the phrase whenever you like — only its SHA-256 lives in the repo:

```
node scripts/admin-hash.mjs 'my new phrase'   # paste into PHRASE_HASH
```

> This is a lock on the `n` key, not encryption. The decks compile into the
> public JS bundle, notes and all, so someone who opens DevTools and digs
> can still read them. It stops accidents and curiosity, not a determined
> reader. If you ever need the stronger version, the notes have to be either
> encrypted at build time or stripped from the deployed bundle entirely.

## Kahoot

Questions live in `kahoot/weekNN.csv` — that is the file you edit. Kahoot's
importer only accepts `.xlsx`, so regenerate the spreadsheets with:

```bash
node scripts/kahoot-xlsx.mjs          # all weeks
node scripts/kahoot-xlsx.mjs 05       # just week 5
```

Then upload `kahoot/weekNN.xlsx` in Kahoot's *import questions from
spreadsheet*. The script refuses to write a file that breaks their rules:
question ≤ 120 characters, each answer ≤ 75, time limit one of
5/10/20/30/60/90/120/240, correct answer 1–4 pointing at a non-empty
answer. Columns F and G are written as numbers, everything else as text.

**If an import is rejected**, download Kahoot's own spreadsheet template
and save it as `kahoot/template.xlsx`. The script then writes the question
rows into that workbook from row 9 down and leaves the rest of their file
untouched, so the header cannot be the problem. Without it the header is a
reconstruction.

## Project structure

```
src/
  content.ts          # all personal/course content — edit this weekly
  slides/             # one file per week + the deck renderer
  App.tsx             # boot screen -> desktop or website mode
  os/                 # window manager: Desktop, Window, Taskbar, Icon,
                       # drag/snap layout, boot screen, app registry
  apps/                # the actual window content: about-me, slides,
                        # resources, office-hours, terminal, trash
  website/            # plain accessible fallback view (website mode)
  icons/              # inline pixel-art SVG icons
  styles/             # theme.css (tokens), os.css, apps.css, website.css
public/
  slides/             # drop real slide/exercise PDFs here
```

## Terminal easter egg

Double-click `terminal.app` on the desktop. Supported commands: `help`,
`whoami`, `ls`, `open <file>`, `contact`, `joke`, `clear`.

## Website mode / mobile

The taskbar (desktop) and header (website mode) both have a mode toggle.
The choice lives in React state only, resets each page load — no
`localStorage`. Screens narrower than 700px default to website mode
automatically, since the window-dragging desktop metaphor doesn't work well
on touch.

## Deploying

### GitHub Pages

This repo includes `.github/workflows/deploy.yml`, which builds and deploys
`dist/` on every push to `main` using GitHub's official Pages actions.

1. Push this repo to GitHub.
2. In the repo's **Settings → Pages**, set **Source** to **GitHub Actions**.
3. Push to `main` (or run the workflow manually from the Actions tab).

`vite.config.ts` already sets `base: './'`, so the build works whether it's
served at `https://<user>.github.io/<repo>/` (a project page) or a custom
domain — no per-repo config needed.

### Cloudflare Pages

- Build command: `npm run build`
- Output directory: `dist`

That's it — Cloudflare Pages auto-detects the Vite project on subsequent
pushes if you connect the repo.

### Manual / any static host

```bash
npm run build
```

Upload the contents of `dist/` anywhere that serves static files.

## Notes

- No backend, database, or analytics — the whole site is static.
- Reduced-motion is respected: the boot screen and window transitions are
  skipped/shortened when the OS-level "reduce motion" preference is set.
