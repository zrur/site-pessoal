<script lang="ts">
	let { data } = $props()
	const { pub, pdfUrl } = data
</script>

<svelte:head>
	<title>{pub.titulo} — Arthur Ramos dos Santos</title>
	<meta name="description" content={pub.resumo} />
</svelte:head>

<div class="wrap">
	<nav class="breadcrumb">
		<a href="/">← Início</a>
		<span>/</span>
		<span>PDFs</span>
	</nav>

	<header class="pdf-header">
		<div class="pub-meta">
			<span class="etiqueta pdf">PDF</span>
			<time datetime={pub.data}>{pub.data?.slice(0, 7)}</time>
		</div>
		<h1>{pub.titulo}</h1>
		{#if pub.resumo}
			<p class="resumo">{pub.resumo}</p>
		{/if}
		{#if pdfUrl}
			<a class="btn-download" href={pdfUrl} download>
				↓ Baixar PDF
			</a>
		{/if}
	</header>

	{#if pdfUrl}
		<div class="pdf-viewer">
			<iframe
				src={pdfUrl}
				title={pub.titulo}
				width="100%"
				height="800"
				style="border: 2px solid var(--grafite);"
			></iframe>
		</div>
	{:else}
		<p class="erro">Arquivo não disponível no momento.</p>
	{/if}

	<footer class="pdf-footer">
		<a href="/">← Voltar para o início</a>
	</footer>
</div>

<style>
	.wrap {
		max-width: 960px;
		margin: 0 auto;
		padding: 2rem 1.25rem 4rem;
	}

	.breadcrumb {
		font-family: 'Space Mono', monospace;
		font-size: .78rem;
		display: flex;
		gap: .5rem;
		align-items: center;
		margin-bottom: 2.5rem;
		opacity: .7;
	}
	.breadcrumb a { color: var(--grafite); text-decoration: none; }
	.breadcrumb a:hover { color: var(--azulejo); }

	.pdf-header { margin-bottom: 2rem; }

	.pub-meta {
		display: flex;
		gap: .75rem;
		align-items: center;
		font-family: 'Space Mono', monospace;
		font-size: .74rem;
		letter-spacing: .05em;
		margin-bottom: 1rem;
	}

	.etiqueta {
		padding: .1rem .5rem;
		border: 1.5px solid var(--grafite);
		text-transform: uppercase;
	}
	.etiqueta.pdf { background: transparent; }

	h1 {
		font-family: 'Bricolage Grotesque', sans-serif;
		font-weight: 800;
		font-size: clamp(1.6rem, 4vw, 2.4rem);
		line-height: 1.15;
		margin-bottom: .75rem;
	}

	.resumo {
		font-size: 1rem;
		color: #444;
		margin-bottom: 1.25rem;
	}

	.btn-download {
		display: inline-block;
		font-family: 'Space Mono', monospace;
		font-size: .85rem;
		border: 2px solid var(--grafite);
		color: var(--grafite);
		padding: .55rem 1.1rem;
		text-decoration: none;
		background: var(--cal);
		box-shadow: 4px 4px 0 var(--sombra);
		transition: border-color .15s, color .15s;
		margin-bottom: 1.5rem;
	}
	.btn-download:hover { border-color: var(--azulejo); color: var(--azulejo); }

	.pdf-viewer { margin-bottom: 2rem; }

	.erro {
		font-family: 'Space Mono', monospace;
		font-size: .85rem;
		padding: 1.5rem;
		border: 2px dashed var(--grafite);
		text-align: center;
	}

	.pdf-footer {
		margin-top: 2rem;
		padding-top: 1.5rem;
		border-top: 2px solid var(--grafite);
		font-family: 'Space Mono', monospace;
		font-size: .8rem;
	}
	.pdf-footer a { color: var(--grafite); text-decoration: none; }
	.pdf-footer a:hover { color: var(--azulejo); }
</style>
