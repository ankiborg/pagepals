# PagePals — Claude Code instructions

## After making changes, always:
1. Run `npx tsc --noEmit` to check for TypeScript errors
2. Fix any errors before committing
3. Only push when the type check passes

## Stack
- Next.js 16 App Router
- TypeScript (strict)
- Tailwind CSS v4

## Conventions
- Activity components go in `components/activities/`
- New activities must be registered in `data/activities.ts`
- Activity pages are wired up in `app/activities/[id]/page.tsx`
- Use `"use client"` for any component with hooks or event handlers