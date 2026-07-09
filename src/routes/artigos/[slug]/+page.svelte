<script lang="ts">
	import DOMPurify from 'dompurify'
	let { data } = $props()
	const a = data.artigo
	const conteudoSeguro = DOMPurify.sanitize(a.conteudo ?? '')
</script>

<svelte:head>
	<title>{a.titulo} — Arthur Ramos dos Santos</title>
	<meta name="description" content={a.resumo} />
</svelte:head>

<div class="wrap">
	<nav class="breadcrumb">
		<a href="/">← Início</a>
		<span>/</span>
		<span>Artigos</span>
	</nav>

	<article>
		<header class="art-header">
			<div class="pub-meta">
				<span class="etiqueta artigo">Artigo</span>
				<time datetime={a.data}>{a.data?.slice(0, 7)}</time>
			</div>
			<h1>{a.titulo}</h1>
			{#if a.resumo}
				<p class="resumo">{a.resumo}</p>
			{/if}
			<hr />
		</header>

		<div class="prose">
			{@html conteudoSeguro}
		</div>
	</article>

	<footer class="art-footer">
		<a href="/">← Voltar para o início</a>
	</footer>
</div>

<style>
	.wrap {
		max-width: 720px;
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

	.art-header { margin-bottom: 2.5rem; }

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
	.etiqueta.artigo {
		background: var(--azulejo);
		border-color: var(--azulejo);
		color: var(--cal);
	}

	h1 {
		font-family: 'Bricolage Grotesque', sans-serif;
		font-weight: 800;
		font-size: clamp(1.8rem, 5vw, 2.75rem);
		line-height: 1.1;
		letter-spacing: -.01em;
		margin-bottom: 1rem;
	}

	.resumo {
		font-size: 1.1rem;
		color: var(--grafite);
		opacity: .7;
		max-width: 48em;
		margin-bottom: 1.5rem;
	}

	hr {
		border: none;
		border-top: 2px solid var(--grafite);
		margin: 1.5rem 0 2.5rem;
	}

	.art-footer {
		margin-top: 3rem;
		padding-top: 1.5rem;
		border-top: 2px solid var(--grafite);
		font-family: 'Space Mono', monospace;
		font-size: .8rem;
	}
	.art-footer a {
		color: var(--grafite);
		text-decoration: none;
	}
	.art-footer a:hover { color: var(--azulejo); }
</style>
