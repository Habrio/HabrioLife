export type Item = {
  id: string;
  title: string;
  slug: string;
  brand: string | null;
  model: string | null;
  price_inr: number | null;
  rating: number | null;
  image_path: string | null;
  affiliate_url: string | null;
  attributes: Record<string, any> | null;
  is_active: boolean;
};

export type Block = {
  id: string;
  name: string;
  slug: string | null;
  description: string | null;
  kind: string | null;
};

export type BlockItem = {
  block_id: string;
  item_id: string;
  label: string | null; // 'budget' | 'mid-range' | 'premium' (free text allowed)
  ord: number | null;
};

