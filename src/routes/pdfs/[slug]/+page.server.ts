import { error } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ params, locals: { supabase } }) => {
	const { data: pub } = await supabase
		.from('publicacoes')
		.select('*')
		.eq('slug', params.slug)
		.eq('publicado', true)
		.eq('tipo', 'pdf')
		.single()

	if (!pub) throw error(404, 'PDF não encontrado')

	const { data: signedUrl } = await supabase.storage
		.from('pdfs')
		.createSignedUrl(pub.arquivo_path, 3600)

	return { pub, pdfUrl: signedUrl?.signedUrl ?? null }
}
