<script lang="ts">
  import type { Component } from 'svelte';
  import Github from '$lib/assets/icon/Github.svelte';
  import Linkedin from '$lib/assets/icon/Linkedin.svelte';
  import BriefcaseIcon from '$lib/assets/icon/line/BriefcaseIcon.svelte';
  import FolderIcon from '$lib/assets/icon/line/FolderIcon.svelte';
  import LanguagesIcon from '$lib/assets/icon/line/LanguagesIcon.svelte';
  import LayersIcon from '$lib/assets/icon/line/LayersIcon.svelte';
  import MailIcon from '$lib/assets/icon/line/MailIcon.svelte';
  import MapPinIcon from '$lib/assets/icon/line/MapPinIcon.svelte';
  import UserIcon from '$lib/assets/icon/line/UserIcon.svelte';
  import WrenchIcon from '$lib/assets/icon/line/WrenchIcon.svelte';
  import { m } from '$lib/paraglide/messages';

  type IconComponent = Component<{ size?: string }>;

  type SectionLink = {
    target: string;
    label: string;
  };

  type Fact = {
    icon: IconComponent;
    label: string;
    value: string;
  };

  type Experience = {
    company: string;
    role: string;
    period: string;
    summary: string;
    bullets: string[];
  };

  type Project = {
    name: string;
    context: string;
    summary: string;
    outcome: string;
  };

  type SkillGroup = {
    label: string;
    value: string;
  };

  type SocialLink = {
    icon: IconComponent;
    label: string;
    href: string;
  };

  const sectionLinks = $derived.by(
    (): SectionLink[] => [
      { target: 'experience', label: m.nav_resume() },
      { target: 'projects', label: m.nav_work() },
      { target: 'skills', label: m.nav_tech() }
    ]
  );

  const facts = $derived.by(
    (): Fact[] => [
      {
        icon: BriefcaseIcon,
        label: m.resume_highlight_current_role_label(),
        value: m.resume_highlight_current_role_value()
      },
      {
        icon: MapPinIcon,
        label: m.resume_contact_base_label(),
        value: m.resume_contact_base_value()
      },
      {
        icon: LanguagesIcon,
        label: m.resume_contact_languages_label(),
        value: m.resume_contact_languages_value()
      },
      {
        icon: LayersIcon,
        label: m.resume_highlight_toolbox_label(),
        value: m.resume_highlight_toolbox_value()
      }
    ]
  );

  const experiences = $derived.by(
    (): Experience[] => [
      {
        company: m.resume_experience_1_company(),
        role: m.resume_experience_1_title(),
        period: m.resume_experience_1_period(),
        summary: m.resume_experience_1_summary(),
        bullets: [
          m.resume_experience_1_achievement_2(),
          m.resume_experience_1_achievement_3(),
          m.resume_experience_1_achievement_4()
        ]
      },
      {
        company: m.resume_experience_2_company(),
        role: m.resume_experience_2_title(),
        period: m.resume_experience_2_period(),
        summary: m.resume_experience_2_summary(),
        bullets: [
          m.resume_experience_2_achievement_1(),
          m.resume_experience_2_achievement_2(),
          m.resume_experience_2_achievement_3()
        ]
      }
    ]
  );

  const projects = $derived.by(
    (): Project[] => [
      {
        name: m.resume_project_1_name(),
        context: m.resume_project_1_role(),
        summary: m.resume_project_1_description(),
        outcome: m.resume_project_1_impact()
      },
      {
        name: m.resume_project_2_name(),
        context: m.resume_project_2_role(),
        summary: m.resume_project_2_description(),
        outcome: m.resume_project_2_impact()
      },
      {
        name: m.resume_project_3_name(),
        context: m.resume_project_3_role(),
        summary: m.resume_project_3_description(),
        outcome: m.resume_project_3_impact()
      },
      {
        name: m.resume_project_4_name(),
        context: m.resume_project_4_role(),
        summary: m.resume_project_4_description(),
        outcome: m.resume_project_4_impact()
      }
    ]
  );

  const skillGroups = $derived.by(
    (): SkillGroup[] => [
      {
        label: m.resume_skill_group_1_label(),
        value: ['Typescript', 'SvelteKit', 'Nest.js', 'Node.js', m.top_stack_svelte()].join(', ')
      },
      {
        label: m.resume_skill_group_2_label(),
        value: ['AWS Lambda', 'AWS SAM', m.resume_experience_stack_iac(), 'CI/CD'].join(', ')
      },
      {
        label: m.resume_skill_group_3_label(),
        value: [
          m.resume_project_stack_ssr(),
          m.resume_project_stack_performance(),
          m.resume_experience_stack_i18n()
        ].join(', ')
      },
      {
        label: m.resume_skill_group_4_label(),
        value: [
          m.resume_skill_4_item_1(),
          m.resume_skill_4_item_2(),
          m.resume_skill_4_item_3()
        ].join(', ')
      }
    ]
  );

  const socialLinks = $derived.by(
    (): SocialLink[] => [
      {
        icon: Linkedin,
        label: m.social_linkedin(),
        href: 'https://www.linkedin.com/in/dongwonttuna'
      },
      {
        icon: Github,
        label: m.social_github(),
        href: 'https://github.com/dongwonttuna'
      }
    ]
  );
</script>

<section class="home-page">
  <div class="shell">
    <header class="masthead">
      <div class="masthead-copy">
        <p class="section-label">{m.hero_eyebrow()}</p>
        <h1>{m.resume_hero_title()}</h1>
        <p class="role">{m.resume_highlight_current_role_value()}</p>
        <p class="summary">{m.resume_hero_summary()}</p>
      </div>

      <nav class="section-nav" aria-label={m.nav_eyebrow()}>
        {#each sectionLinks as link (link.target)}
          <button type="button" onclick={() => document.getElementById(link.target)?.scrollIntoView()}>
            {link.label}
          </button>
        {/each}
      </nav>
    </header>

    <main class="document">
      <section class="panel" id="intro">
        <div class="section-header">
          <div class="section-heading">
            <span class="section-icon">
              <UserIcon size="0.95rem" />
            </span>
            <div>
              <p class="section-label">{m.hero_eyebrow()}</p>
              <h2>{m.resume_hero_title()}</h2>
            </div>
          </div>
        </div>

        <div class="section-content intro-grid">
          <dl class="facts">
            {#each facts as fact (fact.label)}
              {@const FactIcon = fact.icon}
              <div class="fact-row">
                <dt>
                  <span class="fact-label">
                    <FactIcon size="0.82rem" />
                    <span>{fact.label}</span>
                  </span>
                </dt>
                <dd>{fact.value}</dd>
              </div>
            {/each}
          </dl>

          <div class="links-block">
            <p>{m.contact_note_global()}</p>
            <div class="link-row">
              {#each socialLinks as link (link.href)}
                {@const SocialIcon = link.icon}
                <!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
                <a href={link.href} target="_blank" rel="noreferrer noopener">
                  <SocialIcon size="0.9rem" />
                  <span>{link.label}</span>
                </a>
              {/each}
            </div>
          </div>
        </div>
      </section>

      <section class="panel" id="experience">
        <div class="section-header">
          <div class="section-heading">
            <span class="section-icon">
              <BriefcaseIcon size="0.95rem" />
            </span>
            <div>
              <p class="section-label">{m.resume_experience_eyebrow()}</p>
              <h2>{m.resume_experience_title()}</h2>
            </div>
          </div>
        </div>

        <div class="section-content entry-list">
          {#each experiences as experience (experience.company + experience.role)}
            <article class="entry">
              <div class="entry-header">
                <div>
                  <h3>{experience.role}</h3>
                  <p class="entry-meta">{experience.company}</p>
                </div>
                <p class="entry-period">{experience.period}</p>
              </div>

              <p class="entry-summary">{experience.summary}</p>

              <ul>
                {#each experience.bullets as bullet (bullet)}
                  <li>{bullet}</li>
                {/each}
              </ul>
            </article>
          {/each}
        </div>
      </section>

      <section class="panel" id="projects">
        <div class="section-header">
          <div class="section-heading">
            <span class="section-icon">
              <FolderIcon size="0.95rem" />
            </span>
            <div>
              <p class="section-label">{m.resume_projects_eyebrow()}</p>
              <h2>{m.resume_projects_title()}</h2>
            </div>
          </div>
        </div>

        <div class="section-content entry-list">
          {#each projects as project (project.name)}
            <article class="entry">
              <div class="entry-header">
                <div>
                  <h3>{project.name}</h3>
                  <p class="entry-meta">{project.context}</p>
                </div>
              </div>

              <p class="entry-summary">{project.summary}</p>
              <p class="entry-outcome">{project.outcome}</p>
            </article>
          {/each}
        </div>
      </section>

      <section class="panel" id="skills">
        <div class="section-header">
          <div class="section-heading">
            <span class="section-icon">
              <WrenchIcon size="0.95rem" />
            </span>
            <div>
              <p class="section-label">{m.resume_skills_eyebrow()}</p>
              <h2>{m.resume_skills_title()}</h2>
            </div>
          </div>
        </div>

        <div class="section-content skill-list">
          {#each skillGroups as group (group.label)}
            <div class="skill-row">
              <p>{group.label}</p>
              <p>{group.value}</p>
            </div>
          {/each}
        </div>
      </section>

      <section class="panel" id="contact">
        <div class="section-header">
          <div class="section-heading">
            <span class="section-icon">
              <MailIcon size="0.95rem" />
            </span>
            <div>
              <p class="section-label">{m.resume_certifications_eyebrow()}</p>
              <h2>{m.resume_certifications_title()}</h2>
            </div>
          </div>
        </div>

        <div class="section-content contact-block">
          <p>{m.contact_note_talk()}</p>
          <div class="link-row">
            {#each socialLinks as link (link.href)}
              {@const SocialIcon = link.icon}
              <!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
              <a href={link.href} target="_blank" rel="noreferrer noopener">
                <SocialIcon size="0.9rem" />
                <span>{link.label}</span>
              </a>
            {/each}
          </div>
        </div>
      </section>
    </main>
  </div>
</section>

<style>
  .home-page {
    min-height: 100dvh;
    padding: clamp(1.5rem, 4vw, 3rem);
    background: #0b0d10;
    color: #e5e7eb;
    font-family:
      'SFMono-Regular',
      'Menlo',
      'Monaco',
      'Consolas',
      'Liberation Mono',
      monospace;
  }

  .shell {
    width: min(920px, 100%);
    margin: 0 auto;
    border: 1px solid #262b31;
    background: #101318;
  }

  .masthead {
    display: grid;
    gap: 1rem;
    padding: 1.25rem;
    border-bottom: 1px solid #262b31;
  }

  .masthead-copy {
    display: grid;
    gap: 0.55rem;
  }

  h1,
  h2,
  h3,
  p {
    margin: 0;
  }

  h1 {
    font-size: clamp(2rem, 5vw, 3rem);
    line-height: 1.1;
    color: #f9fafb;
  }

  h2 {
    font-size: 1.15rem;
    line-height: 1.4;
    color: #f9fafb;
  }

  h3 {
    font-size: 1rem;
    line-height: 1.5;
    color: #f3f4f6;
  }

  .role,
  .entry-meta,
  .entry-period,
  .skill-row p:first-child,
  .fact-row dt {
    color: #8b949e;
  }

  .summary,
  .entry-summary,
  .entry-outcome,
  .links-block p,
  .contact-block p,
  .fact-row dd,
  li,
  .skill-row p:last-child {
    color: #d1d5db;
  }

  .summary,
  .entry-summary,
  .entry-outcome,
  .links-block p,
  .contact-block p,
  li,
  .fact-row dd,
  .skill-row p:last-child {
    line-height: 1.7;
  }

  .section-label {
    font-size: 0.76rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #8b949e;
  }

  .section-nav {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem 1rem;
    padding-top: 0.25rem;
  }

  .section-nav button,
  .link-row a {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    color: #f3f4f6;
    border-bottom: 1px solid #39414a;
    background: transparent;
    border-inline: none;
    border-top: none;
    padding-bottom: 0.1rem;
    padding-inline: 0;
    font: inherit;
    cursor: pointer;
    text-decoration: none;
  }

  .section-nav button:hover,
  .section-nav button:focus-visible,
  .link-row a:hover,
  .link-row a:focus-visible {
    color: #ffffff;
    border-color: #9ca3af;
    outline: none;
  }

  .document {
    display: flex;
    flex-direction: column;
  }

  .panel {
    padding: 1.25rem;
    border-top: 1px solid #262b31;
  }

  .panel:first-child {
    border-top: none;
  }

  .section-header {
    margin-bottom: 1rem;
  }

  .section-heading {
    display: grid;
    grid-template-columns: 0.95rem minmax(0, 1fr);
    align-items: start;
    column-gap: 0.6rem;
  }

  .section-icon {
    display: inline-flex;
    color: #b7c0cc;
    padding-top: 0.1rem;
    flex-shrink: 0;
  }

  .section-content {
    padding-left: calc(0.95rem + 0.6rem);
  }

  .intro-grid {
    display: grid;
    grid-template-columns: minmax(0, 1.2fr) minmax(240px, 0.8fr);
    gap: 1.25rem;
  }

  .facts {
    display: grid;
    gap: 0.75rem;
  }

  .fact-row {
    display: grid;
    gap: 0.2rem;
  }

  .fact-label {
    display: grid;
    grid-template-columns: 0.82rem minmax(0, auto);
    align-items: center;
    column-gap: 0.45rem;
  }

  .fact-label :global(svg) {
    color: #a5b0bd;
    flex-shrink: 0;
  }

  .fact-row dd {
    padding-left: calc(0.82rem + 0.45rem);
  }

  .links-block,
  .contact-block {
    display: grid;
    gap: 1rem;
    align-content: start;
  }

  .link-row {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem 1rem;
  }

  .link-row a :global(svg) {
    color: #8b949e;
    transition: color 160ms ease;
  }

  .link-row a:hover :global(svg),
  .link-row a:focus-visible :global(svg) {
    color: #d1d5db;
  }

  .entry-list {
    display: grid;
  }

  .entry {
    display: grid;
    gap: 0.8rem;
    position: relative;
    padding: 1rem 0 1rem 1rem;
    border-top: 1px solid #262b31;
  }

  .entry::before {
    content: '-';
    position: absolute;
    top: 1rem;
    left: 0;
    color: #cfd8e3;
    font-weight: 700;
    font-size: 1rem;
    line-height: 1;
  }

  .entry:first-child {
    padding-top: 0;
    border-top: none;
  }

  .entry:first-child::before {
    top: 0;
  }

  .entry:last-child {
    padding-bottom: 0;
  }

  .entry-header {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    align-items: baseline;
  }

  ul {
    margin: 0;
    padding-left: 0;
    list-style: none;
    display: grid;
    gap: 0.45rem;
  }

  li {
    position: relative;
    padding-left: 1rem;
  }

  li::before {
    content: '-';
    position: absolute;
    top: 0;
    left: 0;
    color: #cfd8e3;
    font-weight: 700;
    font-size: 1rem;
    line-height: 1;
  }

  .skill-list {
    display: grid;
    gap: 0.9rem;
  }

  .skill-row {
    display: grid;
    gap: 0.25rem;
    position: relative;
    padding-top: 0.9rem;
    padding-left: 1rem;
    border-top: 1px solid #262b31;
  }

  .skill-row::before {
    content: '-';
    position: absolute;
    top: 0.9rem;
    left: 0;
    color: #cfd8e3;
    font-weight: 700;
    font-size: 1rem;
    line-height: 1;
  }

  .skill-row:first-child {
    padding-top: 0;
    border-top: none;
  }

  .skill-row:first-child::before {
    top: 0;
  }

  @media (max-width: 720px) {
    .home-page {
      padding: 1rem;
    }

    .masthead,
    .panel {
      padding: 1rem;
    }

    .intro-grid {
      grid-template-columns: 1fr;
    }

    .section-content {
      padding-left: 0;
    }

    .entry-header {
      flex-direction: column;
      align-items: flex-start;
    }
  }
</style>
