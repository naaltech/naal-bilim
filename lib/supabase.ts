import { createClient, type SupabaseClient } from '@supabase/supabase-js'

export const CLUB_CODE = 'bilim'

export interface Club {
  id: number
  code: string | null
  title: string | null
  description: string | null
  instagram: string | null
  owners: string | null
  logo: string | null
  urls: string | null
}

let client: SupabaseClient | null = null

function getClient() {
  if (client) return client
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) return null
  client = createClient(url, key, { auth: { persistSession: false } })
  return client
}

export function splitList(value: string | null): string[] {
  if (!value) return []
  return value.split(',').map((item) => item.trim()).filter(Boolean)
}

export function instagramHandle(value: string) {
  return value.replace(/^https?:\/\/(www\.)?instagram\.com\//, '').replace(/^@/, '').replace(/\/$/, '')
}

export async function getClub(): Promise<Club | null> {
  const supabase = getClient()
  if (!supabase) return null
  const { data, error } = await supabase
    .from('clubs')
    .select('id, code, title, description, instagram, owners, logo, urls')
    .eq('code', CLUB_CODE)
    .maybeSingle()
  if (error) {
    console.error('Failed to load club:', error.message)
    return null
  }
  return data as Club | null
}
