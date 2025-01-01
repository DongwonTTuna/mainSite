<script lang="ts">
	import type { PageData } from './$types';
	import PageSP from '../views/pages/top/PageSP.svelte';
	import LayoutSP from '../views/common/layout/with-nav/LayoutSP.svelte';
	import LayoutPC from '../views/common/layout/with-nav/LayoutPC.svelte';
	import PagePC from '../views/pages/top/PagePC.svelte';

	const props = $props();
	const data = props.data as PageData;

</script>

{#if data.isMobile}
	<LayoutSP>
		<PageSP />
	</LayoutSP>
{:else}
	<LayoutPC>
		<PagePC />
	</LayoutPC>
{/if}