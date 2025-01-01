<script lang="ts">
	import { i18n } from '$lib/i18n/i18n';
	import { ParaglideJS } from '@inlang/paraglide-sveltekit';

	// Props
	let {children} = $props();
</script>

<ParaglideJS {i18n}>
	{@render children()}
</ParaglideJS>
