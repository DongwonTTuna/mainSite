<script lang="ts">
	import { Image } from '@unpic/svelte';

	type ComponentProps = {
		isMobile: boolean;
	}

	let { isMobile } = $props();

	const imageWidth = isMobile ? 300 : 500;
	const imageHeight = isMobile ? 300 : 500;
</script>

<Image
	src="https://res.cloudinary.com/dfd9pdmuf/image/upload/v1735070084/dongwontuna/ap59sakylhpoklaxsfkn.png"
	loading="eager"
	width={imageWidth}
	height={imageHeight}
	alt="DongwonTTuna"
	layout="fixed"
/>