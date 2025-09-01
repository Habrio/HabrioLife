## Supabase

Set in `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

Local test route: `/debug/supabase` renders active categories and will host MDX demos in Sprint 2.

### MDX content

Blog posts store **raw MDX** in the `content_mdx` column. At request time the app
compiles this string with `next-mdx-remote`, avoiding React version mismatches.

### Proxy support

If your environment requires a proxy to reach Supabase, set `HTTPS_PROXY` or
`HTTP_PROXY` before running the dev server. The Supabase client will route all
server-side fetches through that proxy.

## Search & Posts

- `/search` supports `q`, `category`, `sub`, `page` (page size 12).
- `/posts` supports `category`, `sub`, `page` (page size 12).
- Posts are served at `/categories/:category/:subcategory/:post` (legacy `/categories/:category/:post` route removed).
