import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://wfoyzgnowlpgpexygajs.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indmb3l6Z25vd2xwZ3BleHlnYWpzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg2Nzg5MTMsImV4cCI6MjA4NDI1NDkxM30.O0sy54yuacL_fEKPs1FjtyUjNJq-9XfaizpJxftDRyk'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function createUser(userData) {
  const { data, error } = await supabase
    .from('users')
    .insert([{
      email: userData.email,
      name: userData.name,
      company: userData.company || null,
      plan: userData.plan || 'free',
      selected_tools: userData.selectedTools || []
    }])
    .select()
    .single()

  if (error) throw error
  return data
}

export async function getUserByEmail(email) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single()

  if (error && error.code !== 'PGRST116') throw error
  return data
}

export async function updateUserPlan(email, plan, selectedTools = []) {
  const { data, error } = await supabase
    .from('users')
    .update({ 
      plan, 
      selected_tools: selectedTools,
      updated_at: new Date().toISOString()
    })
    .eq('email', email)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function getAllUsers() {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}
