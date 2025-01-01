<script lang="ts">
	import Circle from '../lib/Circle.svelte';
</script>

<main class="main__container">
	<Circle />
	<div class="main__content ">
		<slot />
	</div>
</main>


<style>
    .main__container {
        height: 100dvh;
    }

    .main__content {
        width: 1024px;
        margin: 0 auto;
        height: 100%;
    }
</style>