<script lang="ts">
	let { children } = $props()
</script>

<div class="admin-shell">
	<header class="admin-header">
		<div class="admin-header-inner">
			<a href="/admin" class="logo">ADMIN</a>
			<nav>
				<a href="/admin">Publicações</a>
				<a href="/admin/nova">Nova publicação</a>
				<a href="/" target="_blank">Ver site</a>
				<form method="POST" action="/admin/logout">
					<button type="submit">Sair</button>
				</form>
			</nav>
		</div>
	</header>

	<main class="admin-main">
		{@render children()}
	</main>
</div>

<style>
	.admin-shell {
		min-height: 100vh;
		background: var(--concreto);
	}

	.admin-header {
		background: var(--grafite);
		color: var(--cal);
		border-bottom: 2px solid var(--grafite);
		position: sticky;
		top: 0;
		z-index: 100;
	}

	.admin-header-inner {
		max-width: 1100px;
		margin: 0 auto;
		padding: 0 1.25rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 54px;
	}

	.logo {
		font-family: 'Bricolage Grotesque', sans-serif;
		font-weight: 800;
		font-size: 1.1rem;
		color: var(--cal);
		text-decoration: none;
		letter-spacing: .05em;
	}

	nav {
		display: flex;
		align-items: center;
		gap: 1.25rem;
		font-family: 'Space Mono', monospace;
		font-size: .78rem;
	}

	nav a {
		color: var(--cal);
		text-decoration: none;
		opacity: .75;
		transition: opacity .15s;
	}
	nav a:hover { opacity: 1; }

	nav form { margin: 0; }
	nav button {
		font-family: 'Space Mono', monospace;
		font-size: .78rem;
		background: none;
		border: 1px solid rgba(255,255,255,.3);
		color: var(--cal);
		padding: .3rem .7rem;
		cursor: pointer;
		opacity: .75;
		transition: opacity .15s, border-color .15s;
	}
	nav button:hover { opacity: 1; border-color: var(--cal); }

	.admin-main {
		max-width: 1100px;
		margin: 0 auto;
		padding: 2rem 1.25rem 4rem;
	}
</style>
