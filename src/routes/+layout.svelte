<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.png';
	import {m} from '$lib/paraglide/messages'

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>{m.title()}</title>
</svelte:head>

{@render children()}
