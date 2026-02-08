import { createBrowserClient } from '@supabase/auth-helpers-nextjs';

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'https://placeholder.supabase.co';
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? 'placeholder';

  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}
