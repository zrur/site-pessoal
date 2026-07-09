<script lang="ts">
	import { onMount } from 'svelte'

	let { data } = $props()

	let filtro = $state('todos')
	let visiveis = $derived(
		filtro === 'todos' ? data.publicacoes : data.publicacoes.filter((p: any) => p.tipo === filtro)
	)

	const ROTULO: Record<string, string> = { artigo: 'Artigo', paper: 'Paper', pdf: 'PDF' }

	function href(p: any): string {
		if (p.href_externo) return p.href_externo
		if (p.tipo === 'pdf') return `/pdfs/${p.slug}`
		return `/artigos/${p.slug}`
	}

	function externo(p: any): boolean {
		return !!p.href_externo
	}

	let cobogo: HTMLElement | null = $state(null)

	onMount(() => {
		if (cobogo) {
			const frag = document.createDocumentFragment()
			for (let i = 0; i < 42; i++) frag.appendChild(document.createElement('span'))
			cobogo.appendChild(frag)
		}
	})
</script>

<svelte:head>
	<title>Arthur Ramos dos Santos — pesquisa & escrita</title>
	<meta name="description" content="Arquivo público de Arthur Ramos dos Santos: artigos, papers e documentos sobre proteção de menores, aprendizado federado, política digital e futebol." />
	<link rel="canonical" href="https://arthuramosantos.com.br/" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://arthuramosantos.com.br/" />
	<meta property="og:title" content="Arthur Ramos dos Santos — pesquisa & escrita" />
	<meta property="og:description" content="Arquivo público de Arthur Ramos dos Santos: artigos, papers e documentos sobre proteção de menores, aprendizado federado, política digital e futebol." />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content="Arthur Ramos dos Santos — pesquisa & escrita" />
	<meta name="twitter:description" content="Arquivo público de Arthur Ramos dos Santos: artigos, papers e documentos sobre proteção de menores, aprendizado federado, política digital e futebol." />
</svelte:head>

<header class="topo wrap">
	<div class="topo-linha">
		<span>JANDIRA · SP · BRASIL</span>
		<nav>
			<a href="#publicacoes">Publicações</a>
			<a href="#sobre">Sobre</a>
			<a href="#contato">Contato</a>
		</nav>
	</div>
</header>

<main class="wrap">
	<div class="hero">
		<h1>Arthur Ramos<br>dos <span class="fino">Santos</span></h1>
		<p class="lede">Pesquisador independente. Escrevo sobre proteção de menores no ambiente digital, aprendizado federado, política pública e, de vez em quando, futebol — sempre com a mesma pergunta: como se desenha um sistema que funcione sem depender da boa vontade de quem o opera.</p>
		<p class="assina">arquivo público de artigos, papers e documentos · desde 2026</p>
		<div class="cobogo" aria-hidden="true" bind:this={cobogo}></div>
	</div>

	<section id="publicacoes">
		<div class="secao-titulo">
			<h2>Publicações</h2>
			<span class="conta">{visiveis.length}{visiveis.length === 1 ? ' item' : ' itens'}</span>
		</div>

		<div class="filtros" role="group" aria-label="Filtrar publicações">
			{#each ['todos', 'artigo', 'paper', 'pdf'] as f}
				<button
					data-filtro={f}
					aria-pressed={filtro === f}
					onclick={() => filtro = f}
				>
					{f === 'todos' ? 'Todos' : f === 'artigo' ? 'Artigos' : f === 'paper' ? 'Papers' : 'PDFs'}
				</button>
			{/each}
		</div>

		{#if visiveis.length === 0}
			<p class="vazio">Nada publicado nesta categoria ainda — em breve.</p>
		{:else}
			<ul class="pubs">
				{#each visiveis as p (p.id)}
					<li class="pub-item">
						<a
							class="pub"
							href={href(p)}
							target={externo(p) ? '_blank' : undefined}
							rel={externo(p) ? 'noopener' : undefined}
						>
							<div class="pub-meta">
								<span class="etiqueta {p.tipo}">{ROTULO[p.tipo]}</span>
								<span>{p.data?.slice(0, 7)}</span>
							</div>
							<h3>{p.titulo}</h3>
							<p>{p.resumo}</p>
						</a>
					</li>
				{/each}
			</ul>
		{/if}
	</section>

	<section id="sobre">
		<div class="secao-titulo"><h2>Sobre</h2></div>
		<div class="sobre-grid">
			<div>
				<p>Nasci e cresci em Jandira, na periferia da Grande São Paulo. Formado em Análise e Desenvolvimento de Sistemas pela FIAP (ProUni), com pós-graduação em Cloud &amp; AI DevOps pela Impacta.</p>
				<p style="margin-top:.9rem">Minha pesquisa principal é o SENTINELA-TREVO, um framework de aprendizado federado para detecção comportamental de exposição precoce de menores a conteúdo adulto — publicado como preprint no SSRN. O interesse comum a tudo que escrevo é desenho institucional: sistemas, incentivos e o que acontece quando eles falham.</p>
			</div>
			<div class="temas">
				<strong>TEMAS</strong>
				proteção de menores<br>
				aprendizado federado<br>
				privacidade &amp; equidade<br>
				política digital<br>
				formação no futebol
			</div>
		</div>
	</section>

	<section id="contato">
		<div class="secao-titulo"><h2>Contato</h2></div>
		<p>Leituras, críticas e propostas de colaboração são bem-vindas.</p>
		<div class="contato-links">
			<a href="https://github.com/zrur" rel="me">GitHub</a>
			<a href="https://papers.ssrn.com/sol3/cf_dev/AbsByAuth.cfm" rel="me">SSRN</a>
			<a href="mailto:arthuramossan@gmail.com">E-mail</a>
		</div>
	</section>
</main>

<footer class="wrap">
	<span>© 2026 Arthur Ramos dos Santos</span>
	<span>vigília sem vigilância</span>
</footer>

<style>
	.wrap { max-width: 960px; margin: 0 auto; padding: 0 1.25rem; }

	header.topo { padding: 2rem 0 0; }
	.topo-linha {
		display: flex; justify-content: space-between; align-items: baseline;
		font-family: 'Space Mono', monospace; font-size: .8rem; letter-spacing: .06em;
		border-bottom: 2px solid var(--grafite); padding-bottom: .6rem;
	}
	.topo-linha nav a { color: var(--grafite); text-decoration: none; margin-left: 1.25rem; }
	.topo-linha nav a:hover { color: var(--azulejo); text-decoration: underline; }

	.hero { padding: 3.5rem 0 0; }
	.hero h1 {
		font-family: 'Bricolage Grotesque', sans-serif; font-weight: 800;
		font-size: clamp(2rem, 8vw, 5.4rem); line-height: .95;
		letter-spacing: -.02em; text-transform: uppercase;
	}
	.hero h1 :global(.fino) { color: var(--azulejo); }
	.hero p.lede { max-width: 34em; margin: 1.5rem 0 0; font-size: 1.15rem; }
	.hero .assina {
		font-family: 'Space Mono', monospace; font-size: .8rem; margin-top: 1rem;
		color: var(--grafite); opacity: .75;
	}

	:global(.cobogo) {
		margin-top: 3rem;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(64px, 1fr));
		border: 2px solid var(--grafite);
		background: var(--grafite);
		gap: 2px;
	}
	:global(.cobogo span) {
		aspect-ratio: 1;
		background: radial-gradient(circle at 50% 50%, var(--grafite) 0 34%, var(--cal) 35%);
		transition: background .35s ease;
	}
	:global(.cobogo span:nth-child(4n)) {
		background: radial-gradient(circle at 50% 50%, var(--grafite) 0 34%, var(--azulejo) 35%);
	}
	:global(.cobogo span:hover) {
		background: radial-gradient(circle at 50% 50%, var(--azulejo) 0 34%, var(--cal) 35%);
	}

	section { padding: 4rem 0 0; }
	.secao-titulo {
		display: flex; align-items: baseline; gap: 1rem; margin-bottom: 1.75rem;
		border-bottom: 2px solid var(--grafite); padding-bottom: .5rem;
	}
	.secao-titulo h2 {
		font-family: 'Bricolage Grotesque', sans-serif; font-weight: 800;
		text-transform: uppercase; font-size: 1.5rem; letter-spacing: .01em;
	}
	.conta { font-family: 'Space Mono', monospace; font-size: .8rem; opacity: .7; }

	.filtros { display: flex; flex-wrap: wrap; gap: .5rem; margin-bottom: 1.5rem; }
	.filtros button {
		font-family: 'Space Mono', monospace; font-size: .78rem; letter-spacing: .05em;
		padding: .45rem .9rem; border: 2px solid var(--grafite);
		background: transparent; color: var(--grafite); cursor: pointer;
	}
	.filtros button[aria-pressed="true"] { background: var(--grafite); color: var(--cal); }
	.filtros button:hover { border-color: var(--azulejo); color: var(--azulejo); }
	.filtros button[aria-pressed="true"]:hover { background: var(--azulejo); border-color: var(--azulejo); color: var(--cal); }

	ul.pubs { list-style: none; padding: 0; }
	.pub-item {
		background: var(--cal);
		border: 2px solid var(--grafite);
		margin-bottom: .9rem;
		box-shadow: 5px 5px 0 var(--sombra);
		transition: transform .15s ease, box-shadow .15s ease;
	}
	.pub-item:hover {
		transform: translate(-2px, -2px);
		box-shadow: 7px 7px 0 var(--sombra);
	}
	.pub-item a.pub {
		display: block; text-decoration: none; color: var(--grafite);
		padding: 1.1rem 1.25rem;
	}
	.pub-item a.pub:hover h3 { color: var(--azulejo); text-decoration: underline; text-decoration-thickness: 2px; }

	.pub-meta {
		display: flex; gap: .9rem; align-items: center; flex-wrap: wrap;
		font-family: 'Space Mono', monospace; font-size: .74rem; letter-spacing: .05em;
		margin-bottom: .4rem;
	}
	.etiqueta {
		padding: .1rem .5rem; border: 1.5px solid var(--grafite);
		text-transform: uppercase;
	}
	.etiqueta.artigo { background: var(--azulejo); border-color: var(--azulejo); color: var(--cal); }
	.etiqueta.paper { background: var(--grafite); color: var(--cal); }
	.etiqueta.pdf { background: transparent; }

	.pub-item h3 {
		font-family: 'Bricolage Grotesque', sans-serif; font-weight: 800;
		font-size: 1.25rem; line-height: 1.25;
	}
	.pub-item p { margin-top: .35rem; font-size: .98rem; max-width: 52em; }

	.vazio {
		font-family: 'Space Mono', monospace; font-size: .85rem;
		padding: 1.5rem; border: 2px dashed var(--grafite); text-align: center;
	}

	.sobre-grid { display: grid; grid-template-columns: 2fr 1fr; gap: 2rem; }
	.temas { font-family: 'Space Mono', monospace; font-size: .8rem; line-height: 2; }
	.temas strong { display: block; letter-spacing: .06em; margin-bottom: .25rem; }
	@media (max-width: 640px) { .sobre-grid { grid-template-columns: 1fr; } }

	.contato-links { display: flex; flex-wrap: wrap; gap: .75rem; margin-top: .5rem; }
	.contato-links a {
		font-family: 'Space Mono', monospace; font-size: .85rem;
		border: 2px solid var(--grafite); color: var(--grafite);
		padding: .55rem 1rem; text-decoration: none; background: var(--cal);
		box-shadow: 4px 4px 0 var(--sombra);
		transition: border-color .15s, color .15s;
	}
	.contato-links a:hover { border-color: var(--azulejo); color: var(--azulejo); }

	footer {
		margin-top: 4.5rem; border-top: 2px solid var(--grafite);
		padding: 1.25rem 0 2.5rem;
		font-family: 'Space Mono', monospace; font-size: .75rem;
		display: flex; justify-content: space-between; flex-wrap: wrap; gap: .5rem;
	}
</style>
