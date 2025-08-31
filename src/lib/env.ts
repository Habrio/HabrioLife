export const env = {
  SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
  SUPABASE_ANON: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '',
};

export function assertEnv() {
  if (!env.SUPABASE_URL || !env.SUPABASE_ANON) {
    throw new Error(
      'Missing Supabase env. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local',
    );
  }
}

