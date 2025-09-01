import { redirect, notFound } from 'next/navigation';
import { fetchOneBlogByCategoryAndPost } from '@/src/lib/queries';
import { supabase } from '@/src/lib/supabase';

interface Params {
  category: string;
  post: string;
}

export default async function LegacyRecommendationsRedirect({ params }: { params: Params }) {
  const { category, post } = params;
  const blog = await fetchOneBlogByCategoryAndPost(category, post);
  if (!blog) notFound();

  if ((blog as any).subcategory_id) {
    const { data: sub } = await supabase
      .from('subcategories')
      .select('slug')
      .eq('id', (blog as any).subcategory_id)
      .limit(1);
    const subSlug = (sub?.[0] as any)?.slug as string | undefined;
    if (subSlug) {
      redirect(`/categories/${category}/${subSlug}/${post}/recommendations`);
    }
  }

  notFound();
}

export async function generateStaticParams() {
  const { fetchAllBlogCategorySlugPairs } = await import('@/src/lib/queries');
  return fetchAllBlogCategorySlugPairs();
}

