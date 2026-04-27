import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://oiswxsahbbutpdkvwhhx.supabase.co'
const supabaseKey = 'sb_publishable_cNaGKSRXMUkFwGGhFYB6hA_Dmk3Nxgk'

export const supabase = createClient(supabaseUrl, supabaseKey)