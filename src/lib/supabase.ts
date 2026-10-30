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
  const url = import.meta.env.SUPABASE_URL
  const key = import.meta.env.SUPABASE_ANON_KEY
  if (!url || !key) {
    if (import.meta.env.PROD) throw new Error('SUPABASE_URL and SUPABASE_ANON_KEY must be set')
    return null
  }
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

export interface MagazineStory {
  title: string
  detail: string
}

export interface Magazine {
  id: number
  issue_number: number
  title: string
  published_on: string | null
  description: string
  summary: string
  stories: MagazineStory[]
  pdf_url: string | null
  cover_url: string | null
  external_url: string | null
}

export async function getMagazines(): Promise<Magazine[]> {
  const supabase = getClient()
  if (!supabase) return []
  const { data, error } = await supabase
    .from('magazines')
    .select('id, issue_number, title, published_on, description, summary, stories, pdf_url, cover_url, external_url')
    .eq('club_code', CLUB_CODE)
    .eq('published', true)
    .order('issue_number', { ascending: false })
  if (error) {
    console.error('Failed to load magazines:', error.message)
    return []
  }
  return (data ?? []) as Magazine[]
}

export function toRoman(value: number) {
  const numerals: [number, string][] = [
    [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'], [100, 'C'], [90, 'XC'],
    [50, 'L'], [40, 'XL'], [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I'],
  ]
  let rest = value
  let result = ''
  for (const [amount, numeral] of numerals) {
    while (rest >= amount) {
      result += numeral
      rest -= amount
    }
  }
  return result
}

function publishedDate(magazine: Magazine) {
  return magazine.published_on ? new Date(`${magazine.published_on}T00:00:00`) : null
}

export function issueLabel(magazine: Magazine) {
  const date = publishedDate(magazine)
  return [`Sayı ${toRoman(magazine.issue_number)}`, magazine.title.trim(), date ? toRoman(date.getFullYear()) : '']
    .filter(Boolean)
    .join(' · ')
}

export function shortIssueLabel(magazine: Magazine) {
  return [`Sayı ${toRoman(magazine.issue_number)}`, magazine.title.trim()].filter(Boolean).join(' · ')
}

export function publishedMonth(magazine: Magazine) {
  const date = publishedDate(magazine)
  return date ? date.toLocaleDateString('tr-TR', { month: 'long', year: 'numeric' }) : null
}

export function issueHref(magazine: Magazine) {
  return magazine.pdf_url ?? magazine.external_url
}
