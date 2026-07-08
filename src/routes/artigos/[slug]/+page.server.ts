import { error } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ params, locals: { supabase } }) => {
	const { data: artigo } = await supabase
		.from('publicacoes')
		.select('*')
		.eq('slug', params.slug)
		.eq('publicado', true)
		.eq('tipo', 'artigo')
		.single()

	if (!artigo) throw error(404, 'Artigo não encontrado')

	return { artigo }
}
