import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://wfoyzgnowlpgpexygajs.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indmb3l6Z25vd2xwZ3BleHlnYWpzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg2Nzg5MTMsImV4cCI6MjA4NDI1NDkxM30.O0sy54yuacL_fEKPs1FjtyUjNJq-9XfaizpJxftDRyk'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// ============================================
// GOOGLE OAUTH FUNCTIONS
// ============================================

// Sign in with Google
export async function signInWithGoogle(redirectTo = '/signup?oauth=callback') {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}${redirectTo}`,
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
    },
  })
  
  if (error) throw error
  return data
}

// Get current auth session
export async function getSession() {
  const { data: { session }, error } = await supabase.auth.getSession()
  if (error) throw error
  return session
}

// Get current user from auth
export async function getAuthUser() {
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error) throw error
  return user
}

// Sign out
export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
  // Clear local storage
  localStorage.removeItem('pmt_user')
  localStorage.removeItem('charterpro_user')
}

// Listen for auth changes
export function onAuthStateChange(callback) {
  return supabase.auth.onAuthStateChange((event, session) => {
    callback(event, session)
  })
}

// ============================================
// DATABASE FUNCTIONS
// ============================================

export async function createUser(userData) {
  const { data, error } = await supabase
    .from('users')
    .insert([{
      email: userData.email,
      name: userData.name,
      company: userData.company || null,
      plan: userData.plan || 'free',
      selected_tools: userData.selected_tools || userData.selectedTools || [],
      is_tester: false,
      auth_provider: userData.auth_provider || 'email'
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

export async function updateUser(email, updates) {
  const { data, error } = await supabase
    .from('users')
    .update({ 
      ...updates,
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

// Create or get user after OAuth login
export async function getOrCreateOAuthUser(authUser) {
  // Check if user exists
  let user = await getUserByEmail(authUser.email)
  
  if (!user) {
    // Create new user with OAuth data
    user = await createUser({
      email: authUser.email,
      name: authUser.user_metadata?.full_name || authUser.email.split('@')[0],
      company: null,
      plan: 'free',
      selected_tools: [],
      auth_provider: 'google'
    })
  }
  
  return user
}
