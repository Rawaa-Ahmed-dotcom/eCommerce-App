import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lmhafxwprrkcpbodzynw.supabase.co';
const supabaseAnonKey = 'sb_publishable_QUJxb-fLMdC2ShZI2H_wUQ_hhjlWyrx';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);