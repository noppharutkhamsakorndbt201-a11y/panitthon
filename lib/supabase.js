import { createClient } from '@supabase/supabase-js';

// Support custom spelling from the .env file and standard Supabase environment variable names.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPERBASE_URI || process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPERBASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
