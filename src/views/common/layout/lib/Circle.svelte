<script lang="ts">
	import { onDestroy, onMount } from 'svelte';

	let circleElement: HTMLDivElement | null = null;

	const handleMouseMove = (e: MouseEvent) => {
		if (!circleElement) return;
		setTimeout(() => {
			circleElement!.style.left = `${e.clientX}px`;
			circleElement!.style.top = `${e.clientY}px`;
		}, 100);
	};

	onMount(() => {
		if (!circleElement || !document) return;
		document.addEventListener('mousemove', handleMouseMove);
	});

	onDestroy(() => {
		if (!circleElement || !document) return;
		document.removeEventListener('mousemove', handleMouseMove);
	});
</script>
<div class="circle" bind:this={circleElement}></div>


<style>
    .circle {
        position: absolute;
        width: 20px;
        height: 20px;
        background-color: transparent;
        border-radius: 50%;
        pointer-events: none;
        border: 2px solid #5e5e5e;
        mix-blend-mode: difference;
        z-index: 100;
        transform: translate(-50%, -50%);
    }
</style>