import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qphrgqkvzxsrjynpkasm.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFwaHJncWt2enhzcmp5bnBrYXNtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU2NDc0NzEsImV4cCI6MjA2MTIyMzQ3MX0.6KxWI17z7l4DMJ43CDDK_UMJ-w1IDjderBq24EQhrSM'

export const supabase = createClient(supabaseUrl, supabaseKey)