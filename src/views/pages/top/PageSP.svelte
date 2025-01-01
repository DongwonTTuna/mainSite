<script>
	import MainTitleSP from './_component/MainTitleSP.svelte';
	import DongwonTTunaImage from './_component/DongwonTTunaImage.svelte';
</script>

<div class="dongwonttuna__detail">
	<MainTitleSP />
	<div class="dongwonttuna__img__container">
		<DongwonTTunaImage isMobile={true} />
	</div>
</div>


<style>
    .dongwonttuna__detail {
        height: 100dvh;
        display: flex;
        flex-direction: column;
        position: relative;
        top: 50%;
        transform: translateY(-50%);
        animation: dongwon-tuna 20s infinite;
    }

    @keyframes dongwon-tuna {
        0% {
            filter: drop-shadow(150px 113px 75px #8f8fff) drop-shadow(-188px -90px 60px #57aaff) drop-shadow(150px -90px 60px #ff6c6c);
        }
        33% {
            filter: drop-shadow(150px -90px 75px #8f8fff) drop-shadow(150px 113px 60px #57aaff) drop-shadow(-188px -90px 60px #ff6c6c);
        }
        66% {
            filter: drop-shadow(-188px -90px 75px #8f8fff) drop-shadow(150px -90px 60px #57aaff) drop-shadow(150px 90px 60px #ff6c6c);
        }
        100% {
            filter: drop-shadow(150px 113px 75px #8f8fff) drop-shadow(-188px -90px 60px #57aaff) drop-shadow(150px -90px 60px #ff6c6c);
        }
    }
</style>