import { fail } from '@sveltejs/kit'
import type { PageServerLoad, Actions } from './$types'

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
	const { data: publicacoes } = await supabase
		.from('publicacoes')
		.select('id, tipo, data, titulo, slug, publicado')
		.order('data', { ascending: false })

	return { publicacoes: publicacoes ?? [] }
}

export const actions: Actions = {
	togglePublicado: async ({ request, locals: { supabase } }) => {
		const form = await request.formData()
		const id = form.get('id') as string
		const publicado = form.get('publicado') === 'true'

		const { error } = await supabase
			.from('publicacoes')
			.update({ publicado: !publicado })
			.eq('id', id)

		if (error) return fail(500, { error: error.message })
	},

	deletar: async ({ request, locals: { supabase } }) => {
		const form = await request.formData()
		const id = form.get('id') as string

		const { data: pub } = await supabase
			.from('publicacoes')
			.select('arquivo_path')
			.eq('id', id)
			.single()

		if (pub?.arquivo_path) {
			await supabase.storage.from('pdfs').remove([pub.arquivo_path])
		}

		const { error } = await supabase.from('publicacoes').delete().eq('id', id)
		if (error) return fail(500, { error: error.message })
	}
}
