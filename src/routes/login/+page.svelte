<script lang="ts">
	import { enhance } from '$app/forms'
	let { form } = $props()
</script>

<svelte:head>
	<title>Login — Arthur Ramos dos Santos</title>
</svelte:head>

<div class="login-wrap">
	<div class="login-box">
		<h1>Admin</h1>
		<p class="sub">Área restrita</p>

		<form method="POST" use:enhance>
			{#if form?.error}
				<p class="erro">{form.error}</p>
			{/if}

			<label>
				<span>Email</span>
				<input type="email" name="email" required autocomplete="email" />
			</label>

			<label>
				<span>Senha</span>
				<input type="password" name="password" required autocomplete="current-password" />
			</label>

			<button type="submit">Entrar</button>
		</form>

		<div class="volta"><a href="/">← Voltar ao site</a></div>
	</div>
</div>

<style>
	.login-wrap {
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 2rem 1.25rem;
	}

	.login-box {
		width: 100%;
		max-width: 400px;
		background: var(--cal);
		border: 2px solid var(--grafite);
		box-shadow: 8px 8px 0 var(--sombra);
		padding: 2.5rem 2rem;
	}

	h1 {
		font-family: 'Bricolage Grotesque', sans-serif;
		font-weight: 800;
		font-size: 2rem;
		text-transform: uppercase;
		letter-spacing: -.01em;
		margin-bottom: .25rem;
	}

	.sub {
		font-family: 'Space Mono', monospace;
		font-size: .78rem;
		opacity: .6;
		margin-bottom: 2rem;
	}

	form { display: flex; flex-direction: column; gap: 1.25rem; }

	label {
		display: flex;
		flex-direction: column;
		gap: .4rem;
		font-family: 'Space Mono', monospace;
		font-size: .8rem;
		letter-spacing: .04em;
	}

	input {
		font-family: 'Zilla Slab', serif;
		font-size: 1rem;
		padding: .65rem .75rem;
		border: 2px solid var(--grafite);
		background: white;
		color: var(--grafite);
		outline: none;
	}
	input:focus { border-color: var(--azulejo); }

	button {
		font-family: 'Space Mono', monospace;
		font-size: .85rem;
		letter-spacing: .05em;
		padding: .75rem 1rem;
		border: 2px solid var(--grafite);
		background: var(--grafite);
		color: var(--cal);
		cursor: pointer;
		margin-top: .5rem;
		transition: background .15s, border-color .15s;
	}
	button:hover { background: var(--azulejo); border-color: var(--azulejo); }

	.erro {
		font-family: 'Space Mono', monospace;
		font-size: .8rem;
		color: #c0392b;
		border: 2px solid #c0392b;
		padding: .5rem .75rem;
	}

	.volta {
		margin-top: 1.5rem;
		font-family: 'Space Mono', monospace;
		font-size: .78rem;
		text-align: center;
	}
	.volta a { color: var(--grafite); opacity: .6; }
	.volta a:hover { opacity: 1; color: var(--azulejo); }
</style>
