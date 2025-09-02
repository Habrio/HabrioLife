import { supabase } from '@/lib/supabase';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';

export default async function sitemap() {
  const urls: { url: string; lastModified?: string }[] = [];

  urls.push({ url: SITE_URL + '/' });
  urls.push({ url: SITE_URL + '/posts' });
  urls.push({ url: SITE_URL + '/search' });

  const { data: categories } = await supabase
    .from('categories')
    .select('slug, updated_at')
    .eq('is_active', true);
  for (const c of categories ?? []) {
    urls.push({ url: `${SITE_URL}/categories/${(c as any).slug}`, lastModified: (c as any).updated_at });
  }

  const { data: subs } = await supabase
    .from('subcategories')
    .select('id, slug, updated_at, category_id')
    .eq('is_active', true);

  const { data: cats } = await supabase
    .from('categories')
    .select('id, slug')
    .eq('is_active', true);
  const catMap = new Map((cats ?? []).map((x: any) => [x.id, x.slug]));

  for (const s of subs ?? []) {
    const cslug = catMap.get((s as any).category_id);
    if (cslug) urls.push({ url: `${SITE_URL}/categories/${cslug}/${(s as any).slug}`, lastModified: (s as any).updated_at });
  }

  const { data: blogs } = await supabase
    .from('blogs')
    .select('slug, updated_at, category_id, subcategory_id')
    .eq('status', 'published');

  const subMap = new Map((subs ?? []).map((x: any) => [x.id, x.slug]));
  for (const b of blogs ?? []) {
    const cslug = catMap.get((b as any).category_id);
    const sslug = subMap.get((b as any).subcategory_id);
    if (cslug && sslug) {
      urls.push({ url: `${SITE_URL}/categories/${cslug}/${sslug}/${(b as any).slug}`, lastModified: (b as any).updated_at });
    }
  }

  return urls;
}
