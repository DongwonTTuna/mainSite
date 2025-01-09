<script lang="ts">
	import HeaderSP from './_components/HeaderSP.svelte';
</script>


<main class="main__container">
	<HeaderSP />
	<div class="main__content">
		<slot />
	</div>
</main>


<style>
    .main__container {
        height: 100dvh;
        overflow: hidden;
    }

    .main__content {
        width: 360px;
        margin: 0 auto;
        height: 100%;
    }
</style>