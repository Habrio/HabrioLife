import { createClient } from '@supabase/supabase-js';
import { env, assertEnv } from './env';

assertEnv();

export const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_ANON);

/** Build public URL for a Storage object path like 'images/cover.jpg' */
export const publicImageUrl = (p?: string) =>
  p ? `${env.SUPABASE_URL}/storage/v1/object/public/${p}` : '';

