<script lang="ts">
	import { enhance } from '$app/forms'
	let { data } = $props()

	const ROTULO: Record<string, string> = { artigo: 'Artigo', paper: 'Paper', pdf: 'PDF' }
</script>

<svelte:head><title>Admin — Publicações</title></svelte:head>

<div class="page-header">
	<h1>Publicações</h1>
	<a href="/admin/nova" class="btn-novo">+ Nova publicação</a>
</div>

{#if data.publicacoes.length === 0}
	<p class="vazio">Nenhuma publicação ainda. <a href="/admin/nova">Criar a primeira</a>.</p>
{:else}
	<table>
		<thead>
			<tr>
				<th>Tipo</th>
				<th>Data</th>
				<th>Título</th>
				<th>Status</th>
				<th>Ações</th>
			</tr>
		</thead>
		<tbody>
			{#each data.publicacoes as p (p.id)}
				<tr class={p.publicado ? '' : 'rascunho'}>
					<td><span class="etiqueta {p.tipo}">{ROTULO[p.tipo]}</span></td>
					<td class="mono">{p.data?.slice(0, 7)}</td>
					<td class="titulo-col">
						{#if p.tipo === 'artigo'}
							<a href="/artigos/{p.slug}" target="_blank">{p.titulo}</a>
						{:else if p.tipo === 'pdf'}
							<a href="/pdfs/{p.slug}" target="_blank">{p.titulo}</a>
						{:else}
							{p.titulo}
						{/if}
					</td>
					<td class="mono">
						{#if p.publicado}
							<span class="badge pub">Publicado</span>
						{:else}
							<span class="badge rasc">Rascunho</span>
						{/if}
					</td>
					<td class="acoes">
						<a href="/admin/editar/{p.id}" class="btn-acao">Editar</a>

						<form method="POST" action="?/togglePublicado" use:enhance style="display:inline">
							<input type="hidden" name="id" value={p.id} />
							<input type="hidden" name="publicado" value={p.publicado} />
							<button type="submit" class="btn-acao">
								{p.publicado ? 'Despublicar' : 'Publicar'}
							</button>
						</form>

						<form method="POST" action="?/deletar" use:enhance
							onsubmit={(e) => { if (!confirm('Deletar permanentemente?')) e.preventDefault() }}
							style="display:inline">
							<input type="hidden" name="id" value={p.id} />
							<button type="submit" class="btn-acao danger">Deletar</button>
						</form>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
{/if}

<style>
	.page-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 2rem;
		border-bottom: 2px solid var(--grafite);
		padding-bottom: .75rem;
	}

	h1 {
		font-family: 'Bricolage Grotesque', sans-serif;
		font-weight: 800;
		font-size: 1.75rem;
		text-transform: uppercase;
	}

	.btn-novo {
		font-family: 'Space Mono', monospace;
		font-size: .8rem;
		background: var(--grafite);
		color: var(--cal);
		border: 2px solid var(--grafite);
		padding: .5rem 1rem;
		text-decoration: none;
		transition: background .15s;
	}
	.btn-novo:hover { background: var(--azulejo); border-color: var(--azulejo); }

	table {
		width: 100%;
		border-collapse: collapse;
		border: 2px solid var(--grafite);
		background: var(--cal);
	}

	th {
		font-family: 'Space Mono', monospace;
		font-size: .75rem;
		letter-spacing: .05em;
		text-align: left;
		padding: .65rem 1rem;
		border-bottom: 2px solid var(--grafite);
		background: var(--grafite);
		color: var(--cal);
	}

	td {
		padding: .75rem 1rem;
		border-bottom: 1px solid var(--sombra);
		vertical-align: middle;
	}

	tr:last-child td { border-bottom: none; }
	tr.rascunho { opacity: .6; }

	.mono { font-family: 'Space Mono', monospace; font-size: .78rem; }

	.titulo-col { max-width: 360px; }
	.titulo-col a { color: var(--grafite); }
	.titulo-col a:hover { color: var(--azulejo); }

	.etiqueta {
		font-family: 'Space Mono', monospace;
		font-size: .7rem;
		padding: .1rem .45rem;
		border: 1.5px solid var(--grafite);
		text-transform: uppercase;
	}
	.etiqueta.artigo { background: var(--azulejo); border-color: var(--azulejo); color: var(--cal); }
	.etiqueta.paper { background: var(--grafite); color: var(--cal); }
	.etiqueta.pdf { background: transparent; }

	.badge {
		font-family: 'Space Mono', monospace;
		font-size: .7rem;
		padding: .1rem .45rem;
		text-transform: uppercase;
	}
	.badge.pub { background: #d4edda; color: #155724; border: 1.5px solid #155724; }
	.badge.rasc { background: #fff3cd; color: #856404; border: 1.5px solid #856404; }

	.acoes { display: flex; gap: .4rem; align-items: center; }

	.btn-acao {
		font-family: 'Space Mono', monospace;
		font-size: .72rem;
		padding: .25rem .6rem;
		border: 1.5px solid var(--grafite);
		background: transparent;
		color: var(--grafite);
		cursor: pointer;
		text-decoration: none;
		transition: background .15s, color .15s;
		white-space: nowrap;
	}
	.btn-acao:hover { background: var(--grafite); color: var(--cal); }
	.btn-acao.danger { border-color: #c0392b; color: #c0392b; }
	.btn-acao.danger:hover { background: #c0392b; color: white; }

	.vazio {
		font-family: 'Space Mono', monospace;
		font-size: .85rem;
		padding: 2rem;
		border: 2px dashed var(--grafite);
		text-align: center;
	}
</style>
