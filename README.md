## Supabase

Set in `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

Local test route: `/debug/supabase` renders active categories and will host MDX demos in Sprint 2.

## Search & Posts

- `/search` supports `q`, `category`, `sub`, `page` (page size 12).
- `/posts` supports `category`, `sub`, `page` (page size 12).
- Posts are served at `/categories/:category/:subcategory/:post` (legacy `/categories/:category/:post` route removed).
