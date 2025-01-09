<script>

	let { children } = $props();
</script>


<div class="wave__under__text">
	{@render children()}
</div>

<style>

	.wave__under__text {
		position: relative;
	}

	.wave__under__text::before {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 2px;
		background: linear-gradient(90deg, #8f8fff, #57aaff, #ff6c6c);
		animation: wave 2s infinite;
	}
</style>