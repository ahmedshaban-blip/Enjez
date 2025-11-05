import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://pfsvoyhmakmrnlqylcsc.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBmc3ZveWhtYWttcm5scXlsY3NjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIyNzQxMjIsImV4cCI6MjA3Nzg1MDEyMn0.TDZCOKx5pFxDvnmCQhY93r2HgPzY72pB2Lk170r2g20'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
