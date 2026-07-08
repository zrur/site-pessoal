import { error, fail, redirect } from '@sveltejs/kit'
import type { PageServerLoad, Actions } from './$types'
import { SUPABASE_SERVICE_ROLE_KEY } from '$env/static/private'
import { PUBLIC_SUPABASE_URL } from '$env/static/public'
import { createClient } from '@supabase/supabase-js'

export const load: PageServerLoad = async ({ params, locals: { supabase } }) => {
	const { data: pub } = await supabase
		.from('publicacoes')
		.select('*')
		.eq('id', params.id)
		.single()

	if (!pub) throw error(404, 'Publicação não encontrada')
	return { pub }
}

function slugify(text: string): string {
	return text
		.toLowerCase()
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '')
}

export const actions: Actions = {
	default: async ({ request, params, locals: { supabase } }) => {
		const form = await request.formData()
		const titulo = form.get('titulo') as string
		const resumo = form.get('resumo') as string
		const data = form.get('data') as string
		const conteudo = form.get('conteudo') as string
		const href_externo = form.get('href_externo') as string
		const arquivo = form.get('arquivo') as File | null
		const publicado = form.get('publicado') === 'on'
		const tipo = form.get('tipo') as string

		if (!titulo || !data) return fail(400, { error: 'Título e data são obrigatórios.' })

		const slug = slugify(titulo)

		let arquivo_path: string | undefined = undefined

		if (tipo === 'pdf' && arquivo && arquivo.size > 0) {
			const adminClient = createClient(PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
			const ext = arquivo.name.split('.').pop()
			const path = `${slug}-${Date.now()}.${ext}`
			const bytes = await arquivo.arrayBuffer()

			const { error: uploadError } = await adminClient.storage
				.from('pdfs')
				.upload(path, bytes, { contentType: arquivo.type, upsert: false })

			if (uploadError) return fail(500, { error: uploadError.message })
			arquivo_path = path
		}

		const update: Record<string, unknown> = {
			titulo,
			resumo,
			data,
			conteudo: tipo === 'artigo' ? conteudo : null,
			href_externo: href_externo || null,
			slug,
			publicado
		}
		if (arquivo_path) update.arquivo_path = arquivo_path

		const { error: updateError } = await supabase
			.from('publicacoes')
			.update(update)
			.eq('id', params.id)

		if (updateError) return fail(500, { error: updateError.message })

		throw redirect(303, '/admin')
	}
}
