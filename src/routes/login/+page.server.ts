import { redirect } from '@sveltejs/kit'
import type { PageServerLoad, Actions } from './$types'

export const load: PageServerLoad = async ({ locals: { session } }) => {
	if (session) throw redirect(303, '/admin')
}

export const actions: Actions = {
	default: async ({ request, locals: { supabase } }) => {
		const form = await request.formData()
		const email = form.get('email') as string
		const password = form.get('password') as string

		const { error } = await supabase.auth.signInWithPassword({ email, password })

		if (error) return { error: 'Email ou senha incorretos.' }

		throw redirect(303, '/admin')
	}
}
