# PagePals — Claude Code instructions

## Before committing
Run `npm run build` and fix ALL errors. Do not commit or push if the build fails.
Push directly to master.

## Stack
- Next.js App Router (TypeScript strict, Tailwind CSS v4)

## Conventions
- Activity components go in `components/activities/`
- New activities must be registered in `data/activities.ts`
- Activity pages live at `app/activities/[type]/page.tsx`
- Use `"use client"` for any component with hooks or event handlers