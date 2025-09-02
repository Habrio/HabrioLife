import { createClient } from '@supabase/supabase-js';
import { env, assertEnv } from './env';

assertEnv();

// Allow server-side fetches to go through an HTTP(S) proxy if configured.
if (typeof window === 'undefined') {
  const proxy = process.env.HTTPS_PROXY || process.env.HTTP_PROXY;
  if (proxy) {
    // Dynamically import to avoid bundling `undici` in client builds
    const { ProxyAgent, setGlobalDispatcher } = eval('require')('undici');
    setGlobalDispatcher(new ProxyAgent(proxy));
  }
}

export const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_ANON);

/** Build public URL for a Storage object path like 'assets/blogs/slug/cover.jpg' */
export const publicImageUrl = (p?: string) =>
  p ? `${env.SUPABASE_URL}/storage/v1/object/public/${p}` : '';

/**
 * Helper: suggested path for a blog cover stored in the public `assets` bucket
 * Usage when inserting rows: set blog.cover_image_path = blogCoverPath(slug,'cover.jpg')
 */
export const blogCoverPath = (blogSlug: string, fileName: string) =>
  `assets/blogs/${blogSlug}/${fileName}`;

