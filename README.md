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
       exerciseUrl: '#',
     },
+    {
+      week: 2,
+      topic: 'Sorting Algorithms',
+      date: 'Oct 6',
+      slidesUrl: '/slides/week02-slides.pdf',
+      exerciseUrl: '/slides/week02-exercise.pdf',
+    },
   ] as Week[],
```

Drop the actual PDF files into `public/slides/` (e.g.
`public/slides/week02-slides.pdf`) and point `slidesUrl`/`exerciseUrl` at
`/slides/<filename>.pdf`. Until you have a real file, leave the URL as `'#'`
— the link will render but not go anywhere.

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
| `n` | toggle speaker notes for the current slide |
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

Kahoot questions for each session are in `kahoot/weekNN.csv`, in the column
order Kahoot's import template expects.

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
