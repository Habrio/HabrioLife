import { fetchCategories } from '@/src/lib/queries';
import HomeCategories from '@/components/HomeCategories';

export const dynamic = 'force-dynamic';

export default async function HomeCategoriesServer() {
  const categories = await fetchCategories();
  // Reuse client UI; it can still manage hover/click state.
  return <HomeCategories categoriesOverride={categories.map((c) => ({ slug: c.slug, name: c.name }))} />;
}

