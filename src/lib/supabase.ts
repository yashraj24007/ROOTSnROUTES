import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://xkkysjratwopqtqcgaef.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhra3lzanJhdHdvcHF0cWNnYWVmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzEwMTgxNjYsImV4cCI6MjA0NjU5NDE2Nn0.FGqL8k6vZKCXGqBjDZ8r_bT7mW3xQVPz4p5Y9uVKQ8c'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)