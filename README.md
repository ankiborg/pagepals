# PagePals

Free printable activity sheets for kids. Word searches, mazes, bingo, math sheets, and more — filterable by age, type, and theme.

## Tech stack

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Vercel** (hosting)

## Project structure

```
pagepals/
├── app/
│   ├── page.tsx                  # Home page with filter + grid
│   └── activities/[id]/page.tsx  # Individual activity page
├── components/
│   ├── ActivityCard.tsx          # Card in the browse grid
│   ├── ActivityGrid.tsx          # Grid + filter logic (client component)
│   ├── FilterBar.tsx             # Type / theme / age dropdowns
│   └── activities/
│       ├── WordSearch.tsx        # Generated word search
│       └── (add more generators here)
├── data/
│   └── activities.ts             # Activity registry + filter helpers
└── types/
    └── activity.ts               # TypeScript types
```

## Adding a new activity

1. Add an entry to `data/activities.ts`
2. If `generated: true`, add or reuse a component in `components/activities/`
3. Wire it up in `app/activities/[id]/page.tsx`

## Running locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploying

Push to GitHub and connect the repo on [vercel.com](https://vercel.com). Auto-deploys on every push to `main`.

---

## GitHub issue template (for Claude Code)

Issues should follow this format for best results:

**Title:** `Implement: <short description>`

**Body:**
```
## What to build
<clear description of the feature or component>

## Acceptance criteria
- [ ] criterion 1
- [ ] criterion 2

## File(s) to create or edit
- `components/activities/Maze.tsx`
- `app/activities/[id]/page.tsx` (wire up new component)

## Notes
<design decisions, edge cases, or reference links>
```
