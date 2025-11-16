<script lang="ts">
  import FlowingMenu from '$lib/components/ui/text/FlowingMenu.svelte';
  import BiodenKRImage from './_images/bioden.png?w=200&format=webp&image';
  import OmotenashiImage from './_images/omotenashi.png?w=200&format=webp&image';

  const flowingMenuItems = [
    {link: 'https://biodenkr.com', text: 'BiodenKR', image: BiodenKRImage},
    {link: 'https://omotenashi.work', text: 'Omotenashi HR', image: OmotenashiImage}
  ];
</script>

<section class="work-page">
    <div class="hero">
        <p class="eyebrow">Selected Work</p>
        <div class="hero-copy">
            <h1>My works</h1>
            <p>
                A curated selection of projects that showcase my expertise in building scalable web applications and
                delivering impactful user experiences.
            </p>
        </div>
    </div>
    <div class="menu-copy">
        <p class="eyebrow eyebrow-inline">Quick jump</p>
    </div>
    <section class="flowing-menu">
        <FlowingMenu items={flowingMenuItems}/>
    </section>
</section>

<style>
    .work-page {
        --page-padding: clamp(2rem, 5vw, 4rem);
        min-height: 100dvh;
        padding: var(--page-padding);
        background: radial-gradient(circle at top, rgba(10, 7, 20, 0.9), #020106 65%);
        color: #f4f4f5;
        display: flex;
        flex-direction: column;
        gap: clamp(2rem, 3vw, 3.5rem);
    }

    .hero {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        max-width: 860px;
    }

    .hero-copy h1 {
        font-size: clamp(2.25rem, 6vw, 3.6rem);
        margin-bottom: 0.25rem;
    }

    .hero-copy p {
        font-size: 1.05rem;
        color: rgba(244, 244, 245, 0.85);
        line-height: 1.65;
    }

    .flowing-menu {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        margin-inline: calc(var(--page-padding) * -1);
        width: calc(100% + var(--page-padding) * 2);
        background-color: rgba(244, 244, 245, 0.1);
    }

    .eyebrow {
        font-size: 0.85rem;
        text-transform: uppercase;
        letter-spacing: 0.15em;
        color: rgba(244, 244, 245, 0.65);
        margin: 0;
    }

    .eyebrow-inline {
        letter-spacing: 0.2em;
    }

</style>
