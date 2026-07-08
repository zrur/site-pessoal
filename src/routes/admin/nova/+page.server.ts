import { fail, redirect } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'
import { SUPABASE_SERVICE_ROLE_KEY } from '$env/static/private'
import { PUBLIC_SUPABASE_URL } from '$env/static/public'
import { createClient } from '@supabase/supabase-js'

export const load: PageServerLoad = async () => ({ })

function slugify(text: string): string {
	return text
		.toLowerCase()
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '')
}

export const actions: Actions = {
	default: async ({ request, locals: { supabase } }) => {
		const form = await request.formData()
		const tipo = form.get('tipo') as string
		const titulo = form.get('titulo') as string
		const resumo = form.get('resumo') as string
		const data = form.get('data') as string
		const conteudo = form.get('conteudo') as string
		const href_externo = form.get('href_externo') as string
		const arquivo = form.get('arquivo') as File | null
		const publicado = form.get('publicado') === 'on'

		if (!titulo || !tipo || !data) {
			return fail(400, { error: 'Título, tipo e data são obrigatórios.' })
		}

		const slug = slugify(titulo)

		let arquivo_path: string | null = null

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

		const { error } = await supabase.from('publicacoes').insert({
			tipo,
			titulo,
			resumo,
			data,
			conteudo: tipo === 'artigo' ? conteudo : null,
			href_externo: href_externo || null,
			arquivo_path,
			slug,
			publicado
		})

		if (error) return fail(500, { error: error.message })

		throw redirect(303, '/admin')
	}
}
