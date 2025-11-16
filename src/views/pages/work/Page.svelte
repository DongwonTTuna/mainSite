<script lang="ts">
  import FlowingMenu from "$lib/components/ui/text/FlowingMenu.svelte";
  import BiodenKRImage from './_images/bioden.png?w=400&format=webp;avif;png&image';

  const demoItems = [
    { link: '#', text: 'BiodenKR', image: BiodenKRImage },
    { link: '#', text: 'Omotenashi HR', image: 'https://picsum.photos/600/400?random=2' },
  ];

</script>

<div class="dark">
    <FlowingMenu items={demoItems} />
</div>

<style>
    .dark {
        background-color: black;
    }
</style>