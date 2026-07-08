<script lang="ts">
	import './layout.css'
	import { invalidate } from '$app/navigation'
	import { onMount } from 'svelte'

	let { children, data } = $props()

	onMount(() => {
		const { subscription } = data.supabase.auth.onAuthStateChange((_, newSession) => {
			if (newSession?.expires_at !== data.session?.expires_at) {
				invalidate('supabase:auth')
			}
		})
		return () => subscription.unsubscribe()
	})
</script>

{@render children()}
