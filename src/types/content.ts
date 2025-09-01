export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  ord: number | null;
  is_active: boolean;
};

export type Subcategory = {
  id: string;
  category_id: string;
  name: string;
  slug: string;
  description: string | null;
  ord: number | null;
  is_active: boolean;
};

export type Blog = {
  id: string;
  category_id: string;
  subcategory_id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  cover_image_path: string | null;
  /** Raw MDX string compiled at request time */
  content_mdx: string | null;
  status: 'draft' | 'published' | 'archived';
  published_at: string | null;
};

