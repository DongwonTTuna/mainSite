<script lang="ts">
  import ContainerBox from '$lib/components/common/layout/ContainerBox.svelte';
  import PrismaticBurst from '$lib/components/common/effect/PrismaticBurst.svelte';
  import {NavCard, NavPanel, NavPanels} from '$lib/components/ui/navigation';
  import {Tag} from '$lib/components/ui/tag';
  import type {RouteId} from "$app/types";

  type NavigationItem = {
    title: string;
    href: RouteId;
  };

  const navigationItems: NavigationItem[] = [
    {
      title: 'Work',
      href: '/work' as RouteId
    },
    {
      title: 'Resume',
      href: '/resume' as RouteId
    },
    {
      title: 'Tech Stack',
      href: '/stack' as RouteId
    }
  ];

  const workItems = [
    {
      title: 'Authentication architecture overhaul'
    },
    {
      title: 'AWS SAM migration'
    },
    {
      title: 'Core Web Vitals uplift'
    },
    {
      title: 'Multilingual site delivery'
    }
  ];

  const stackTags = ['Typescript', 'Nest.js', 'AWS', 'Svelte + SvelteKit'];
</script>

<section class="top-page">
    <PrismaticBurst
            intensity={2}
            speed={0.6}
            style="position: absolute; inset: 0; width: 100dvw; height: 100dwh; pointer-events: none;"
            animationType="rotate3d"
            distort={8}
            hoverDampness={0.4}
            mixBlendMode="screen"
    />

    <div class="top-stack">
        <div class="top-nav">
            <ContainerBox
                    as="nav"
                    ariaLabel="Primary navigation"
            >
                <div class="nav-header">
                    <p class="eyebrow eyebrow-inline">Navigation</p>
                </div>

                <div class="top-nav-content">
                    <div class="nav-grid">
                        {#each navigationItems as item (item.href)}
                            <NavCard
                                    href={item.href}
                                    label={item.title}
                            />
                        {/each}
                    </div>

                    <NavPanels>
                        <NavPanel heading="Core stack">
                            <div class="tag-row" id="stack">
                                {#each stackTags as tag (tag)}
                                    <Tag>{tag}</Tag>
                                {/each}
                            </div>
                        </NavPanel>

                        <NavPanel
                                heading="Work Experience"
                                description="2 Years at Nextbeat Inc., building scalable web applications and backend services."
                                id="work-experience"
                        />
                    </NavPanels>
                </div>
            </ContainerBox>
        </div>

        <div class="hero-box">
            <ContainerBox
                    align="center"
                    maxWidth="720px"
                    padding="2rem clamp(1.5rem, 4vw, 3rem)"
            >
                <div class="hero-copy">
                    <p class="eyebrow">Full-Stack Engineer · Tokyo · Nextbeat</p>
                    <h1>I build, deploy, and scale modern web applications. From scratch.</h1>

                    <p class="subtitle" id="work">
                        I'm a Full-Stack Engineer based in Tokyo, currently driving innovation at Nextbeat. I specialize in
                        building high-performance solutions with Typescript, Nest.js, and Sveltekit.
                    </p>
                    <div class="work-highlight">
                        <p class="eyebrow eyebrow-inline">Recent results</p>
                        <div class="pill-row">
                            {#each workItems as item (item.title)}
                                <span class="pill">{item.title}</span>
                            {/each}
                            {#each stackTags as tag (tag)}
                                <Tag>{tag}</Tag>
                            {/each}
                        </div>
                    </div>

                    <p class="contact-note">
                        Open to collaborating with global teams. Let’s talk about building dependable, high-performance
                        products end
                        to end.
                    </p>
                </div>
            </ContainerBox>
        </div>
    </div>
</section>

<style>
    .top-page {
        position: relative;
        min-height: 100dvh;
        width: 100dvw;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: clamp(2rem, 5vw, 4rem);
        color: #ffffff;
        overflow: hidden;
        background: radial-gradient(circle at top, rgba(11, 5, 24, 0.9), #020111 60%);
    }

    .top-stack {
        position: relative;
        z-index: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1.25rem;
    }

    .top-nav {
        position: relative;
        z-index: 3;
        width: min(920px, 100%);
    }

    .hero-box {
        width: 100%;
    }


    .nav-header {
        display: flex;
        gap: 0.65rem;
        align-items: center;
    }

    .top-nav-content {
        width: 100%;
        padding: 0.25rem;
        background: transparent;
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
    }

    .nav-grid {
        list-style: none;
        padding: 0;
        margin: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
        gap: 0.5rem;
    }

    .tag-row {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
    }

    .hero-copy {
        position: relative;
        gap: 2rem;
        display: flex;
        flex-direction: column;
        word-break: break-word;
    }

    .hero-copy h1 {
        font-size: clamp(2.25rem, 3.5vw, 3.5rem);
        line-height: 1.15;
        margin: 0;
    }

    .hero-copy p {
        margin: 0;
        color: rgba(255, 255, 255, 0.8);
        line-height: 1.6;
    }

    .subtitle {
        font-size: 1.05rem;
    }

    .eyebrow {
        font-size: 0.875rem;
        letter-spacing: 0.3em;
        text-transform: uppercase;
        color: rgba(255, 255, 255, 0.7);
    }

    .eyebrow-inline {
        display: inline-flex;
        letter-spacing: 0.18em;
        font-size: 0.8rem;
    }

    .work-highlight {
        display: flex;
        flex-direction: column;
        gap: 0.65rem;
    }

    .pill-row {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
    }

    .pill {
        padding: 0.4rem 0.75rem;
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.08);
        border: 1px solid rgba(255, 255, 255, 0.12);
        color: rgba(255, 255, 255, 0.9);
        font-size: 0.9rem;
    }

    .contact-note {
        color: rgba(255, 255, 255, 0.7);
    }

    @media (max-width: 640px) {
        .nav-header {
            flex-direction: column;
            align-items: flex-start;
        }

        .hero-copy h1 {
            font-size: clamp(2rem, 8vw, 3rem);
        }

        .pill {
            width: 100%;
        }
    }
</style>
