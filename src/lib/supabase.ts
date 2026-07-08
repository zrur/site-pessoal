import { createBrowserClient, createServerClient, isBrowser } from '@supabase/ssr'
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public'
import type { CookieSerializeOptions } from 'cookie'

export function createSupabaseBrowserClient() {
	return createBrowserClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY)
}

export function createSupabaseServerClient(cookies: {
	getAll: () => { name: string; value: string }[]
	setAll: (cookiesToSet: { name: string; value: string; options: CookieSerializeOptions }[]) => void
}) {
	return createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, { cookies })
}
