<script lang="ts">
  import ContainerBox from '$lib/components/common/layout/ContainerBox.svelte';
  import PrismaticBurst from '$lib/components/common/effect/PrismaticBurst.svelte';
  import {resolve} from "$app/paths";
  import type {RouteId} from "$app/types";

  type NavigationItem = {
    title: string;
    href: RouteId;
    description: string;
  };

  const navigationItems: NavigationItem[] = [
    {
      title: 'Work',
      href: '/work' as RouteId,
      description: 'Selected projects with measurable outcomes and end-to-end ownership.'
    },
    {
      title: 'Resume',
      href: '/resume' as RouteId,
      description: 'Experience, responsibilities, and the teams I support today.'
    },
    {
      title: 'Tech Stack',
      href: '/stack' as RouteId,
      description: 'Typescript, Nest.js, SvelteKit, and AWS for reliable delivery.'
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
        <nav class="top-nav" aria-label="Primary navigation">
            <div class="nav-header">
                <p class="eyebrow eyebrow-inline">Navigation</p>
            </div>

            <div class="top-nav-content">
                <div class="nav-grid">
                    {#each navigationItems as item (item.href)}
                        <a class="nav-card" href={resolve(item.href)}>
                            <span class="nav-card-title">{item.title}</span>
                            <p class="nav-card-description">{item.description}</p>
                        </a>
                    {/each}
                </div>

                <div class="nav-panels">
                    <div class="stack-panel">
                        <p class="nav-card-title">Core stack</p>
                        <div class="tag-row" id="stack">
                            {#each stackTags as tag (tag)}
                                <span class="tag">{tag}</span>
                            {/each}
                        </div>
                    </div>

                    <div class="contact-panel" id="contact">
                        <p class="nav-card-title">My History</p>
                        <p class="content-description">
                            I build reliable, high-performance products end to end. Let’s talk about your roadmap.
                        </p>
                    </div>
                </div>
            </div>
        </nav>

        <ContainerBox
                align="center"
                maxWidth="720px"
                padding="2rem clamp(1.5rem, 4vw, 3rem)"
                radius="32px"
                shadow="0 25px 80px rgba(0, 0, 0, 0.65)"
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
                            <span class="tag">{tag}</span>
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
        padding: 1rem 1.25rem;
        border-radius: 18px;
        background: rgba(5, 4, 12, 0.7);
        border: 1px solid rgba(255, 255, 255, 0.08);
        box-shadow: 0 18px 60px rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(10px);
        width: min(920px, 100%);
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
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

    .nav-card {
        display: flex;
        flex-direction: column;
        gap: 0.35rem;
        padding: 0.95rem 1rem;
        text-decoration: none;
        color: #ffffff;
        background: rgba(7, 5, 18, 0.9);
        border: 1px solid rgba(255, 255, 255, 0.12);
        border-radius: 12px;
        transition: border-color 120ms ease, transform 120ms ease;
    }

    .nav-card:hover,
    .nav-card:focus-visible {
        border-color: rgba(255, 255, 255, 0.25);
        transform: translateY(-2px);
    }

    .nav-card-title {
        font-weight: 700;
        font-size: 1rem;
    }

    .nav-card-description {
        margin: 0;
        color: rgba(255, 255, 255, 0.78);
        font-size: 0.9rem;
        line-height: 1.5;
    }

    .content-description {
        margin: 0;
        color: rgba(255, 255, 255, 0.78);
        font-size: 0.9rem;
        line-height: 1.5;
    }

    .nav-panels {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
        gap: 0.75rem;
    }

    .stack-panel,
    .contact-panel {
        padding: 1rem 1.1rem;
        background: rgba(7, 5, 18, 0.92);
        border: 1px solid rgba(255, 255, 255, 0.12);
        border-radius: 12px;
        display: flex;
        flex-direction: column;
        gap: 0.65rem;
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

    .tag {
        padding: 0.35rem 0.75rem;
        background: rgba(255, 255, 255, 0.06);
        border-radius: 12px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        font-size: 0.9rem;
        color: rgba(255, 255, 255, 0.85);
    }

    .contact-note {
        color: rgba(255, 255, 255, 0.7);
    }

    @media (max-width: 640px) {
        .top-nav {
            width: 100%;
        }

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
