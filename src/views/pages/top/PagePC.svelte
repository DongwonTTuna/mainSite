<script lang="ts">

	import MainTitlePC from './_component/MainTitlePC.svelte';
	import DongwonTTunaImage from './_component/DongwonTTunaImage.svelte';
	import TopCategory from '$views/pages/top/_component/TopCategory.svelte';
</script>

<div class="dongwonttuna__detail">
	<MainTitlePC />
	<div class="dongwonttuna__img__container">
		<DongwonTTunaImage isMobile={false} />
	</div>
</div>
<TopCategory />


<style>
    .dongwonttuna__detail {
        position: relative;
        top: 45%;
        transform: translateY(-50%);
        animation: dongwon-tuna 20s infinite;
    }

    .dongwonttuna__img__container {
        width: fit-content;
        display: block;
        position: absolute;
        top: 55%;
        right: 0;
        transform: translate(-20%, -50%);
        z-index: 0;
		}

    @keyframes dongwon-tuna {
        0% {
            filter: drop-shadow(200px 150px 100px #8f8fff) drop-shadow(-250px -120px 80px #57aaff) drop-shadow(200px -120px 80px #ff6c6c);
        }
        33% {
            filter: drop-shadow(200px -120px 100px #8f8fff) drop-shadow(200px 150px 80px #57aaff) drop-shadow(-250px -120px 80px #ff6c6c);
        }
        66% {
            filter: drop-shadow(-250px -120px 100px #8f8fff) drop-shadow(200px -120px 80px #57aaff) drop-shadow(200px 120px 80px #ff6c6c);
        }
        100% {
            filter: drop-shadow(200px 150px 100px #8f8fff) drop-shadow(-250px -120px 80px #57aaff) drop-shadow(200px -120px 80px #ff6c6c);
        }
    }
</style>