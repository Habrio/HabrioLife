import { supabase } from './supabase';
import type { Item, Block } from '@/src/types/catalog';

/** Supabase sometimes returns PostgREST errors when a table doesn't exist. Trap & return []/null. */
function silent<T>(p: Promise<{ data: any; error: any }>, fallback: T): Promise<T> {
  return p
    .then(({ data, error }) => {
      if (error) {
        // console.warn('Catalog query error (ignored):', error?.message)
        return fallback;
      }
      return (data ?? fallback) as T;
    })
    .catch(() => fallback);
}

/** Blocks attached to a blog (curated). */
export async function fetchBlocksForBlog(blogId: string): Promise<Block[]> {
  const q = supabase
    .from('block_blogs')
    .select('blocks:blocks(*)')
    .eq('blog_id', blogId)
    .order('ord', { ascending: true });
  const rows = await silent(q as any, [] as { blocks: Block }[]);
  return rows.map((r) => r.blocks).filter(Boolean);
}

/** Items inside a block, grouped by label (lowercased). */
export async function fetchBlockItemsGrouped(blockId: string): Promise<Record<string, Item[]>> {
  const q = supabase
    .from('block_items')
    .select('label, ord, items:items(*)')
    .eq('block_id', blockId)
    .order('label', { ascending: true })
    .order('ord', { ascending: true });
  const rows = await silent(q as any, [] as { label: string | null; ord: number | null; items: Item }[]);
  const out: Record<string, Item[]> = {};
  for (const r of rows) {
    const key = (r.label ?? '').toLowerCase();
    if (!out[key]) out[key] = [];
    if (r.items) out[key].push(r.items);
  }
  return out;
}

/** Dynamic fallback: pick items mapped to the blog's subcategory by price/rating. */
export async function fetchDynamicTierItemsForSubcategory(
  subcategoryId: string,
): Promise<{ budget: Item[]; mid: Item[]; premium: Item[] }> {
  const budgetQ = supabase
    .from('item_subcategories')
    .select('items:items(*)')
    .eq('subcategory_id', subcategoryId)
    .not('items.price_inr', 'is', null)
    .lte('items.price_inr', 25000)
    .order('items.rating', { ascending: false, nullsFirst: false })
    .limit(12);

  const midQ = supabase
    .from('item_subcategories')
    .select('items:items(*)')
    .eq('subcategory_id', subcategoryId)
    .gte('items.price_inr', 25001)
    .lte('items.price_inr', 60000)
    .order('items.rating', { ascending: false, nullsFirst: false })
    .limit(12);

  const premiumQ = supabase
    .from('item_subcategories')
    .select('items:items(*)')
    .eq('subcategory_id', subcategoryId)
    .gt('items.price_inr', 60000)
    .order('items.rating', { ascending: false, nullsFirst: false })
    .limit(12);

  const [budgetRows, midRows, premiumRows] = await Promise.all([
    silent(budgetQ as any, [] as { items: Item }[]),
    silent(midQ as any, [] as { items: Item }[]),
    silent(premiumQ as any, [] as { items: Item }[]),
  ]);

  const map = (rows: { items: Item }[]) => rows.map((r) => r.items).filter(Boolean);
  return { budget: map(budgetRows), mid: map(midRows), premium: map(premiumRows) };
}
