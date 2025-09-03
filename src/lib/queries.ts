import { supabase } from './supabase';
import type { Category, Subcategory, Blog } from '@/types/content';

export async function fetchCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('is_active', true)
    .order('ord', { ascending: true })
    .order('name', { ascending: true });
  if (error) {
    console.error('fetchCategories error:', error);
    return [];
  }
  return (data ?? []) as Category[];
}

export async function fetchSubcategoriesByCategorySlug(
  categorySlug: string,
): Promise<Subcategory[]> {
  const { data: cats, error: catErr } = await supabase
    .from('categories')
    .select('id, slug')
    .eq('slug', categorySlug)
    .limit(1);
  if (catErr || !cats?.[0]) return [];
  const categoryId = cats[0].id as string;

  const { data, error } = await supabase
    .from('subcategories')
    .select('*')
    .eq('category_id', categoryId)
    .eq('is_active', true)
    .order('ord', { ascending: true })
    .order('name', { ascending: true });
  if (error) {
    console.error('fetchSubcategoriesByCategorySlug error:', error);
    return [];
  }
  return (data ?? []) as Subcategory[];
}

export async function fetchBlogsBySlugs(
  categorySlug: string,
  subcategorySlug: string,
): Promise<Blog[]> {
  const { data: cat } = await supabase
    .from('categories')
    .select('id, slug')
    .eq('slug', categorySlug)
    .limit(1);
  if (!cat?.[0]) return [];

  const { data: sub } = await supabase
    .from('subcategories')
    .select('id, slug, category_id')
    .eq('slug', subcategorySlug)
    .eq('category_id', cat[0].id)
    .limit(1);
  if (!sub?.[0]) return [];

  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('category_id', cat[0].id)
    .eq('subcategory_id', sub[0].id)
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .order('title', { ascending: true });

  if (error) {
    console.error('fetchBlogsBySlugs error:', error);
    return [];
  }
  return (data ?? []) as Blog[];
}

export async function fetchOneBlog(
  categorySlug: string,
  subcategorySlug: string,
  blogSlug: string,
): Promise<Blog | null> {
  const { data: cat } = await supabase
    .from('categories')
    .select('id')
    .eq('slug', categorySlug)
    .limit(1);
  if (!cat?.[0]) return null;

  const { data: sub } = await supabase
    .from('subcategories')
    .select('id')
    .eq('slug', subcategorySlug)
    .eq('category_id', cat[0].id)
    .limit(1);
  if (!sub?.[0]) return null;

  const { data, error } = await supabase
    .from('blogs')
    .select(
      'id,category_id,subcategory_id,title,slug,excerpt,cover_image_path,content_mdx,status,published_at',
    )
    .eq('subcategory_id', sub[0].id)
    .eq('slug', blogSlug)
    .eq('status', 'published')
    .limit(1);

  if (error) {
    console.error('fetchOneBlog error:', error);
    return null;
  }
  return (data as Blog[] | null)?.[0] ?? null;
}

// Sprint 2 additions
export async function fetchCategoryBySlug(slug: string): Promise<Category | null> {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .limit(1);
  if (error) {
    console.error('fetchCategoryBySlug:', error);
    return null;
  }
  return (data ?? [])[0] ?? null;
}

export async function fetchSubcategoryBySlugs(
  categorySlug: string,
  subcategorySlug: string,
): Promise<Subcategory | null> {
  const cat = await fetchCategoryBySlug(categorySlug);
  if (!cat) return null;
  const { data, error } = await supabase
    .from('subcategories')
    .select('*')
    .eq('category_id', cat.id)
    .eq('slug', subcategorySlug)
    .eq('is_active', true)
    .limit(1);
  if (error) {
    console.error('fetchSubcategoryBySlugs:', error);
    return null;
  }
  return (data ?? [])[0] ?? null;
}

export async function fetchGuidesInCategory(categorySlug: string): Promise<Blog[]> {
  const cat = await fetchCategoryBySlug(categorySlug);
  if (!cat) return [];
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('category_id', cat.id)
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .order('title', { ascending: true });
  if (error) {
    console.error('fetchGuidesInCategory:', error);
    return [];
  }
  return (data ?? []) as Blog[];
}

export async function fetchGuidesInSubcategory(
  categorySlug: string,
  subcategorySlug: string,
): Promise<Blog[]> {
  const sub = await fetchSubcategoryBySlugs(categorySlug, subcategorySlug);
  if (!sub) return [];
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('subcategory_id', sub.id)
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .order('title', { ascending: true });
  if (error) {
    console.error('fetchGuidesInSubcategory:', error);
    return [];
  }
  return (data ?? []) as Blog[];
}

// Helper for current route pattern: /categories/[category]/[post]
export async function fetchOneBlogByCategoryAndPost(
  categorySlug: string,
  postSlug: string,
): Promise<Blog | null> {
  const cat = await fetchCategoryBySlug(categorySlug);
  if (!cat) return null;
  const { data, error } = await supabase
    .from('blogs')
    .select(
      'id,category_id,subcategory_id,title,slug,excerpt,cover_image_path,content_mdx,status,published_at',
    )
    .eq('category_id', cat.id)
    .eq('slug', postSlug)
    .eq('status', 'published')
    .limit(1);
  if (error) {
    console.error('fetchOneBlogByCategoryAndPost:', error);
    return null;
  }
  return (data ?? [])[0] ?? null;
}

// ---------- Sprint 3: Search + Pagination helpers ----------
export type Paged<T> = { rows: T[]; total: number; page: number; pageSize: number };

export async function fetchAllCategoriesMap(): Promise<Map<string, Category>> {
  const { data } = await supabase.from('categories').select('*').eq('is_active', true);
  const map = new Map<string, Category>();
  for (const c of (data ?? []) as Category[]) map.set(c.id, c);
  return map;
}

export async function fetchAllSubcategoriesMap(): Promise<Map<string, Subcategory>> {
  const { data } = await supabase.from('subcategories').select('*').eq('is_active', true);
  const map = new Map<string, Subcategory>();
  for (const s of (data ?? []) as Subcategory[]) map.set(s.id, s);
  return map;
}

/**
 * Search blogs with optional q/category/sub filters + pagination.
 */
export async function searchBlogs({
  q,
  categorySlug,
  subcategorySlug,
  page = 1,
  pageSize = 12,
}: {
  q?: string;
  categorySlug?: string;
  subcategorySlug?: string;
  page?: number;
  pageSize?: number;
}): Promise<Paged<Blog>> {
  let categoryId: string | undefined;
  if (categorySlug) {
    const { data: cat } = await supabase
      .from('categories')
      .select('id')
      .eq('slug', categorySlug)
      .eq('is_active', true)
      .limit(1);
    categoryId = cat?.[0]?.id as string | undefined;
    if (!categoryId) return { rows: [], total: 0, page, pageSize };
  }

  let subcategoryId: string | undefined;
  if (subcategorySlug && categoryId) {
    const { data: sub } = await supabase
      .from('subcategories')
      .select('id')
      .eq('slug', subcategorySlug)
      .eq('category_id', categoryId)
      .eq('is_active', true)
      .limit(1);
    subcategoryId = sub?.[0]?.id as string | undefined;
    if (!subcategoryId) return { rows: [], total: 0, page, pageSize };
  }

  let query = supabase
    .from('blogs')
    .select('id,title,slug,excerpt,category_id,subcategory_id,cover_image_path,published_at', { count: 'exact' })
    .eq('status', 'published');

  if (categoryId) query = query.eq('category_id', categoryId);
  if (subcategoryId) query = query.eq('subcategory_id', subcategoryId);
  if (q && q.trim().length > 0) {
    const term = `%${q.trim()}%`;
    query = query.or(`title.ilike.${term},excerpt.ilike.${term}`);
  }

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;
  query = query
    .order('published_at', { ascending: false })
    .order('title', { ascending: true })
    .range(from, to);

  const { data, error, count } = await query;
  if (error) {
    console.error('searchBlogs error:', error);
    return { rows: [], total: 0, page, pageSize };
  }
  return { rows: (data ?? []) as Blog[], total: count ?? 0, page, pageSize };
}

export async function fetchLatestBlogs(limit = 6): Promise<Blog[]> {
  const { data, error } = await supabase
    .from('blogs')
    .select('id,title,slug,excerpt,category_id,subcategory_id,cover_image_path,published_at')
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .order('title', { ascending: true })
    .limit(limit);
  if (error) {
    console.error('fetchLatestBlogs error:', error);
    return [];
  }
  return (data ?? []) as Blog[];
}

// Utility: pairs for static params or validation
export async function fetchAllBlogCategorySlugPairs(): Promise<
  { category: string; post: string }[]
> {
  // Fetch categories -> slug map
  const { data: cats } = await supabase.from('categories').select('id, slug').eq('is_active', true);
  const catMap = new Map<string, string>((cats ?? []).map((c: any) => [c.id as string, c.slug as string]));

  // Fetch published blogs with category_id
  const { data: blogs } = await supabase
    .from('blogs')
    .select('slug, category_id')
    .eq('status', 'published');

  const out: { category: string; post: string }[] = [];
  for (const b of blogs ?? []) {
    const cslug = catMap.get((b as any).category_id);
    if (cslug) out.push({ category: cslug, post: (b as any).slug });
  }
  return out;
}
