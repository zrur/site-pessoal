<script lang="ts">
	import { enhance } from '$app/forms'
	import Editor from '$lib/components/Editor.svelte'

	let { form } = $props()

	let tipo = $state('artigo')
	let conteudo = $state('')
</script>

<svelte:head><title>Nova publicação — Admin</title></svelte:head>

<div class="page-header">
	<h1>Nova publicação</h1>
	<a href="/admin" class="btn-voltar">← Voltar</a>
</div>

{#if form?.error}
	<p class="erro">{form.error}</p>
{/if}

<form method="POST" enctype="multipart/form-data" use:enhance>
	<input type="hidden" name="conteudo" value={conteudo} />

	<div class="campo">
		<label for="tipo">Tipo</label>
		<select id="tipo" name="tipo" bind:value={tipo}>
			<option value="artigo">Artigo</option>
			<option value="paper">Paper (link externo)</option>
			<option value="pdf">PDF</option>
		</select>
	</div>

	<div class="campo">
		<label for="titulo">Título *</label>
		<input id="titulo" type="text" name="titulo" required />
	</div>

	<div class="linha-2">
		<div class="campo">
			<label for="data">Data *</label>
			<input id="data" type="date" name="data" required value={new Date().toISOString().slice(0,10)} />
		</div>
		<div class="campo checkbox-campo">
			<label>
				<input type="checkbox" name="publicado" />
				Publicar imediatamente
			</label>
		</div>
	</div>

	<div class="campo">
		<label for="resumo">Resumo</label>
		<textarea id="resumo" name="resumo" rows="3" placeholder="Breve descrição para aparecer na lista..."></textarea>
	</div>

	{#if tipo === 'artigo'}
		<div class="campo">
			<label>Conteúdo</label>
			<Editor bind:value={conteudo} placeholder="Escreva o artigo aqui..." />
		</div>
	{:else if tipo === 'paper'}
		<div class="campo">
			<label for="href_externo">URL externa *</label>
			<input id="href_externo" type="url" name="href_externo" placeholder="https://..." />
		</div>
	{:else if tipo === 'pdf'}
		<div class="campo">
			<label for="arquivo">Arquivo PDF *</label>
			<input id="arquivo" type="file" name="arquivo" accept=".pdf" />
		</div>
	{/if}

	<div class="acoes">
		<button type="submit" class="btn-salvar">Salvar</button>
		<a href="/admin" class="btn-cancelar">Cancelar</a>
	</div>
</form>

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

	.btn-voltar {
		font-family: 'Space Mono', monospace;
		font-size: .78rem;
		color: var(--grafite);
		text-decoration: none;
		opacity: .7;
	}
	.btn-voltar:hover { opacity: 1; color: var(--azulejo); }

	form { display: flex; flex-direction: column; gap: 1.5rem; }

	.campo { display: flex; flex-direction: column; gap: .4rem; }

	label {
		font-family: 'Space Mono', monospace;
		font-size: .78rem;
		letter-spacing: .04em;
	}

	input[type="text"],
	input[type="date"],
	input[type="url"],
	select,
	textarea {
		font-family: 'Zilla Slab', serif;
		font-size: 1rem;
		padding: .65rem .75rem;
		border: 2px solid var(--grafite);
		background: var(--cal);
		color: var(--grafite);
		outline: none;
		width: 100%;
	}
	input:focus, select:focus, textarea:focus { border-color: var(--azulejo); }

	textarea { resize: vertical; }

	input[type="file"] {
		font-family: 'Space Mono', monospace;
		font-size: .8rem;
		padding: .5rem;
		border: 2px dashed var(--grafite);
		background: var(--cal);
		cursor: pointer;
	}

	.linha-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }

	.checkbox-campo label {
		display: flex;
		align-items: center;
		gap: .5rem;
		font-size: .85rem;
		margin-top: 1.5rem;
		cursor: pointer;
	}
	.checkbox-campo input[type="checkbox"] {
		width: 18px;
		height: 18px;
		padding: 0;
		cursor: pointer;
	}

	.acoes { display: flex; gap: 1rem; align-items: center; padding-top: 1rem; }

	.btn-salvar {
		font-family: 'Space Mono', monospace;
		font-size: .85rem;
		padding: .75rem 2rem;
		border: 2px solid var(--grafite);
		background: var(--grafite);
		color: var(--cal);
		cursor: pointer;
		transition: background .15s;
	}
	.btn-salvar:hover { background: var(--azulejo); border-color: var(--azulejo); }

	.btn-cancelar {
		font-family: 'Space Mono', monospace;
		font-size: .78rem;
		color: var(--grafite);
		text-decoration: none;
		opacity: .6;
	}
	.btn-cancelar:hover { opacity: 1; }

	.erro {
		font-family: 'Space Mono', monospace;
		font-size: .8rem;
		color: #c0392b;
		border: 2px solid #c0392b;
		padding: .75rem 1rem;
	}

	@media (max-width: 640px) {
		.linha-2 { grid-template-columns: 1fr; }
	}
</style>
