import { MDXRemote } from 'next-mdx-remote/rsc';
import { fetchCategories } from '@/src/lib/queries';

export const dynamic = 'force-dynamic';

export default async function SupabaseDebugPage() {
  const categories = await fetchCategories();

  return (
    <main className="max-w-3xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Supabase Debug</h1>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3">Active Categories</h2>
        <ul className="list-disc pl-6 space-y-1">
          {categories.map((c) => (
            <li key={c.id}>
              <span className="font-medium">{c.name}</span>{' '}
              <span className="text-slate-500">({c.slug})</span>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <p className="text-slate-600">
          MDX rendering from DB will be demonstrated once we switch a real blog page in Sprint 2.
        </p>
        {/* Example (uncomment when you have a known blog): */}
        {/**
        const blogs = await fetchBlogsBySlugs('appliances','air-conditioners')
        const first = blogs[0]
        {first?.content_mdx && (
          <article className="prose prose-slate dark:prose-invert mt-6">
            <MDXRemote source={first.content_mdx} />
          </article>
        )}
        */}
      </section>
    </main>
  );
}

