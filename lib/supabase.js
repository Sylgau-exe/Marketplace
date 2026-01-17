import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// User management functions
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

  if (error && error.code !== 'PGRST116') throw error // PGRST116 = no rows found
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

export async function getUserStats() {
  const { data: users, error } = await supabase
    .from('users')
    .select('plan')

  if (error) throw error

  const stats = {
    total: users.length,
    free: users.filter(u => u.plan === 'free').length,
    starter: users.filter(u => u.plan === 'starter').length,
    professional: users.filter(u => u.plan === 'professional').length,
    unlimited: users.filter(u => u.plan === 'unlimited').length,
    enterprise: users.filter(u => u.plan === 'enterprise').length,
  }

  stats.paid = stats.starter + stats.professional + stats.unlimited + stats.enterprise
  stats.mrr = (stats.starter * 9) + (stats.professional * 19) + (stats.unlimited * 49)

  return stats
}
