<script lang="ts" module>
  import ContainerBox from '$lib/components/common/layout/ContainerBox.svelte';
  import PrismaticBurst from '$lib/components/common/effect/PrismaticBurst.svelte';
  import {NavCard, NavPanel, NavPanels} from '$lib/components/ui/navigation';
  import {Tag} from '$lib/components/ui/tag';
  import LinkedinIcon from '$lib/assets/icon/Linkedin.svelte';
  import GithubIcon from '$lib/assets/icon/Github.svelte';
  import {m} from '$lib/paraglide/messages';
  import type {RouteId} from "$app/types";

  type NavigationItem = {
    title: string;
    href: RouteId;
  };

  const navigationItems = $derived.by(() => [
    {
      title: m.nav_work(),
      href: '/work' as RouteId
    },
    {
      title: m.nav_resume(),
      href: '/resume' as RouteId
    },
    {
      title: m.nav_tech(),
      href: '/tech' as RouteId
    }
  ]);

  const workItems = $derived.by(() => [
    {
      title: m.achievement_serverless_sam()
    },
    {
      title: m.achievement_multilingual()
    },
    {
      title: m.achievement_core_web_vitals()
    },
  ]);

  const stackTags = ['Typescript', 'Nest.js', 'AWS', m.top_stack_svelte()];

  const socialLinks = $derived.by(() => [
    {
      title: m.social_linkedin(),
      href: 'http://www.linkedin.com/in/dongwonttuna',
      icon: LinkedinIcon
    },
    {
      title: m.social_github(),
      href: 'https://github.com/dongwonttuna',
      icon: GithubIcon
    }
  ]);
</script>

<script lang="ts"></script>

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
                    <p class="eyebrow eyebrow-inline">{m.nav_eyebrow()}</p>
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
                        <NavPanel heading={m.core_stack()}>
                            <div class="tag-row" id="stack">
                                {#each stackTags as tag (tag)}
                                    <Tag>{tag}</Tag>
                                {/each}
                            </div>
                        </NavPanel>

                        <NavPanel
                                heading={m.work_experience_heading()}
                                id="work-experience"
                        >
                            <span class="worked-years">{m.work_experience_years()}</span>
                            <p>{m.work_experience_detail()}</p>
                        </NavPanel>
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
                    <p class="eyebrow">{m.hero_eyebrow()}</p>
                    <h1>{m.hero_title()}</h1>

                    <div class="social-links" aria-label="Social links">
                        {#each socialLinks as link (link.href)}
                            {@const IconComponent = link.icon}
                            <a
                                    class="social-link"
                                    href={link.href}
                                    target="_blank"
                                    rel="noreferrer noopener"
                                    aria-label={`Open ${link.title} profile in a new tab`}
                            >
                                <IconComponent size="3rem"/>
                            </a>
                        {/each}
                    </div>

                    <div class="work-highlight">
                        <p class="eyebrow eyebrow-inline">{m.achievements_eyebrow()}</p>
                        <div class="pill-row">
                            {#each workItems as item (item.title)}
                                <span class="pill">{item.title}</span>
                            {/each}
                        </div>
                    </div>

                    <p class="contact-note">
                        {m.contact_note_global()}
                        <br/>
                        {m.contact_note_talk()}
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

    .worked-years {
        font-size: 24px;
        font-weight: 600;
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

    .social-links {
        display: flex;
        width: 100%;
        justify-content: center;
        gap: 0.75rem;
        align-items: center;
    }

    .social-link {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        color: #ffffff;
        transition: transform 150ms ease, opacity 150ms ease;
    }

    .social-link:focus-visible,
    .social-link:hover {
        transform: translateY(-1px) scale(1.05);
        opacity: 0.85;
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
