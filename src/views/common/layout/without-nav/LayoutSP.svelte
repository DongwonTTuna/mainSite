<main class="main__container">
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