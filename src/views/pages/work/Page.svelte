<script lang="ts">
  import FlowingMenu from "$lib/components/ui/text/FlowingMenu.svelte";
  import BiodenKRImage from './_images/bioden.png?w=200&format=webp&image';
  import OmotenashiImage from './_images/omotenashi.png?w=200&format=webp&image'

  const demoItems = [
    { link: '#', text: 'BiodenKR', image: BiodenKRImage },
    { link: '#', text: 'Omotenashi HR', image: OmotenashiImage },
  ];

  console.log(BiodenKRImage)
</script>

<div class="dark">
    <FlowingMenu items={demoItems} />
</div>

<style>
    .dark {
        background-color: black;
    }
</style>