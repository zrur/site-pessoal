import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
	const { data: publicacoes } = await supabase
		.from('publicacoes')
		.select('id, tipo, data, titulo, resumo, slug, href_externo, publicado')
		.eq('publicado', true)
		.order('data', { ascending: false })

	return { publicacoes: publicacoes ?? [] }
}
