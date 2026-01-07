<script lang="ts" module>
  import ContainerBox from '$lib/components/common/layout/ContainerBox.svelte';
  import BackLink from '$lib/components/navigation/BackLink.svelte';
  import { Tag } from '$lib/components/ui/tag';
  import { m } from '$lib/paraglide/messages';

  type HeroHighlight = {
    label: string;
    value: string;
    detail: string;
  };

  type ContactDetail = {
    label: string;
    value: string;
    href?: string;
  };

  type Experience = {
    company: string;
    title: string;
    period: string;
    location: string;
    summary: string;
    achievements: string[];
    stack: string[];
  };

  type Project = {
    name: string;
    role: string;
    description: string;
    impact: string;
    stack: string[];
  };

  type EducationEntry = {
    institution: string;
    program: string;
    period: string;
    note?: string;
  };

  type Certification = {
    title: string;
    issuer: string;
    issued: string;
  };

  type SkillGroup = {
    label: string;
    items: string[];
  };

  const heroHighlights = $derived.by(() => [
    {
      label: m.resume_highlight_current_role_label(),
      value: m.resume_highlight_current_role_value(),
      detail: m.resume_highlight_current_role_detail()
    },
    {
      label: m.resume_highlight_impact_areas_label(),
      value: m.resume_highlight_impact_areas_value(),
      detail: m.resume_highlight_impact_areas_detail()
    },
    {
      label: m.resume_highlight_toolbox_label(),
      value: m.resume_highlight_toolbox_value(),
      detail: m.resume_highlight_toolbox_detail()
    }
  ]);

  const contactDetails = $derived.by(() => [
    {
      label: m.resume_contact_base_label(),
      value: m.resume_contact_base_value(),
      href: 'https://www.google.com/maps/place/Ebisu,+Shibuya+City,+Tokyo+150-0013'
    },
    {
      label: m.resume_contact_nationality_label(),
      value: m.resume_contact_nationality_value()
    },
    {
      label: m.resume_contact_languages_label(),
      value: m.resume_contact_languages_value()
    }
  ]);

  const experiences = $derived.by(() => [
    {
      company: m.resume_experience_1_company(),
      title: m.resume_experience_1_title(),
      period: m.resume_experience_1_period(),
      location: m.resume_experience_1_location(),
      summary: m.resume_experience_1_summary(),
      achievements: [
        m.resume_experience_1_achievement_1(),
        m.resume_experience_1_achievement_2(),
        m.resume_experience_1_achievement_3(),
        m.resume_experience_1_achievement_4()
      ],
      stack: ['Nest.js', 'Typescript', 'AWS SAM', 'AWS Lambda', 'SvelteKit', 'Node.js']
    },
    {
      company: m.resume_experience_2_company(),
      title: m.resume_experience_2_title(),
      period: m.resume_experience_2_period(),
      location: m.resume_experience_2_location(),
      summary: m.resume_experience_2_summary(),
      achievements: [
        m.resume_experience_2_achievement_1(),
        m.resume_experience_2_achievement_2(),
        m.resume_experience_2_achievement_3()
      ],
      stack: ['SvelteKit', 'Typescript', 'Cloudflare Pages', m.resume_experience_stack_i18n()]
    }
  ]);

  const selectedProjects = $derived.by(() => [
    {
      name: m.resume_project_1_name(),
      role: m.resume_project_1_role(),
      description: m.resume_project_1_description(),
      impact: m.resume_project_1_impact(),
      stack: ['AWS SAM', 'AWS Lambda', m.resume_experience_stack_iac()]
    },
    {
      name: m.resume_project_2_name(),
      role: m.resume_project_2_role(),
      description: m.resume_project_2_description(),
      impact: m.resume_project_2_impact(),
      stack: ['SvelteKit', m.resume_project_stack_ssr(), m.resume_project_stack_performance()]
    },
    {
      name: m.resume_project_3_name(),
      role: m.resume_project_3_role(),
      description: m.resume_project_3_description(),
      impact: m.resume_project_3_impact(),
      stack: ['SvelteKit', 'Cloudflare Pages', m.resume_experience_stack_i18n()]
    }
  ]);

  const educationHistory = $derived.by(() => [
    {
      institution: m.resume_education_1_institution(),
      program: m.resume_education_1_program(),
      period: m.resume_education_1_period()
    },
    {
      institution: m.resume_education_2_institution(),
      program: m.resume_education_2_program(),
      period: m.resume_education_2_period()
    }
  ]);

  const certifications = $derived.by(() => [
    {
      title: m.resume_certification_1_title(),
      issuer: m.resume_certification_1_issuer(),
      issued: m.resume_certification_1_issued()
    },
    {
      title: m.resume_certification_2_title(),
      issuer: m.resume_certification_2_issuer(),
      issued: m.resume_certification_2_issued()
    }
  ]);

  const skillGroups = $derived.by(() => [
    {
      label: m.resume_skill_group_1_label(),
      items: ['Typescript', 'Nest.js', 'SvelteKit', 'Node.js']
    },
    {
      label: m.resume_skill_group_2_label(),
      items: ['AWS Lambda', 'AWS SAM', 'Cloudflare Pages', m.resume_experience_stack_iac()]
    },
    {
      label: m.resume_skill_group_3_label(),
      items: [m.resume_skill_3_item_1(), m.resume_skill_3_item_2(), m.resume_skill_3_item_3()]
    },
    {
      label: m.resume_skill_group_4_label(),
      items: [m.resume_skill_4_item_1(), m.resume_skill_4_item_2(), m.resume_skill_4_item_3()]
    }
  ]);
</script>

<script lang="ts"></script>

<section class="resume-page">
  <div class="resume-page__back-link">
    <BackLink/>
  </div>
  <div class="resume-hero">
    <ContainerBox maxWidth="100%" padding="2.5rem clamp(1.5rem, 4vw, 3rem)">
      <p class="eyebrow">{m.resume_hero_eyebrow()}</p>

      <div class="hero-heading">
        <div class="identity">
          <h1>{m.resume_hero_title()}</h1>
          <p class="hero-summary">
            {m.resume_hero_summary()}
          </p>
        </div>

        <div class="highlight-grid" aria-label="Snapshot">
          {#each heroHighlights as highlight (highlight.label)}
            <div class="highlight-card">
              <p class="highlight-label">{highlight.label}</p>
              <p class="highlight-value">{highlight.value}</p>
              <p class="highlight-detail">{highlight.detail}</p>
            </div>
          {/each}
        </div>
      </div>

      <div class="contact-grid">
        {#each contactDetails as detail (detail.label)}
          <div class="contact-card">
            <p class="contact-label">{detail.label}</p>
            {#if detail.href}
              <a
                class="contact-value"
                href={detail.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {detail.value}
              </a>
            {:else}
              <p class="contact-value">{detail.value}</p>
            {/if}
          </div>
        {/each}
      </div>
    </ContainerBox>
  </div>

  <div class="resume-content">
    <div class="resume-main">
      <div class="resume-card">
        <ContainerBox maxWidth="100%" padding="2rem clamp(1.25rem, 3vw, 2rem)">
          <p class="eyebrow">{m.resume_experience_eyebrow()}</p>
          <h2>{m.resume_experience_title()}</h2>
          <div class="experience-list">
            {#each experiences as experience (experience.company)}
              <article class="experience">
                <header class="experience-header">
                  <div>
                    <p class="experience-period">{experience.period}</p>
                    <h3>{experience.title}</h3>
                    <p class="experience-company">{experience.company} · {experience.location}</p>
                  </div>
                  <div class="experience-stack">
                    {#each experience.stack as tech (tech)}
                      <Tag>{tech}</Tag>
                    {/each}
                  </div>
                </header>
                <p class="experience-summary">{experience.summary}</p>
                <ul>
                  {#each experience.achievements as achievement (achievement)}
                    <li>{achievement}</li>
                  {/each}
                </ul>
              </article>
            {/each}
          </div>
        </ContainerBox>
      </div>

      <div class="resume-card">
        <ContainerBox maxWidth="100%" padding="2rem clamp(1.25rem, 3vw, 2rem)">
          <p class="eyebrow">{m.resume_projects_eyebrow()}</p>
          <h2>{m.resume_projects_title()}</h2>
          <div class="project-grid">
            {#each selectedProjects as project (project.name)}
              <article class="project-card">
                <p class="project-role">{project.role}</p>
                <h3>{project.name}</h3>
                <p>{project.description}</p>
                <p class="project-impact">{project.impact}</p>
                <div class="project-tags">
                  {#each project.stack as tech (tech)}
                    <Tag>{tech}</Tag>
                  {/each}
                </div>
              </article>
            {/each}
          </div>
        </ContainerBox>
      </div>
    </div>

    <div class="resume-side">
      <div class="resume-card">
        <ContainerBox maxWidth="100%" padding="1.75rem">
          <p class="eyebrow">{m.resume_skills_eyebrow()}</p>
          <h2>{m.resume_skills_title()}</h2>
          <div class="skills">
            {#each skillGroups as group (group.label)}
              <div class="skill-group">
                <p class="skill-label">{group.label}</p>
                <div class="skill-tags">
                  {#each group.items as item (item)}
                    <Tag>{item}</Tag>
                  {/each}
                </div>
              </div>
            {/each}
          </div>
        </ContainerBox>
      </div>

      <div class="resume-card">
        <ContainerBox maxWidth="100%" padding="1.75rem">
          <p class="eyebrow">{m.resume_education_eyebrow()}</p>
          <h2>{m.resume_education_title()}</h2>
          <div class="timeline">
            {#each educationHistory as education (education.institution)}
              <article>
                <p class="timeline-period">{education.period}</p>
                <h3>{education.institution}</h3>
                <p>{education.program}</p>
                {#if education.note}
                  <p class="timeline-note">{education.note}</p>
                {/if}
              </article>
            {/each}
          </div>
        </ContainerBox>
      </div>

      <div class="resume-card">
        <ContainerBox maxWidth="100%" padding="1.75rem">
          <p class="eyebrow">{m.resume_certifications_eyebrow()}</p>
          <h2>{m.resume_certifications_title()}</h2>
          <dl class="cert-list">
            {#each certifications as certification (certification.title)}
              <div>
                <dt>{certification.title}</dt>
                <dd>
                  <span>{certification.issuer}</span>
                  <span>{certification.issued}</span>
                </dd>
              </div>
            {/each}
          </dl>
        </ContainerBox>
      </div>
    </div>
  </div>
</section>

<style>
  .resume-page {
    --page-padding: clamp(1.5rem, 4vw, 3rem);
    min-height: 100dvh;
    padding: var(--page-padding);
    background: radial-gradient(circle at top, rgba(5, 6, 20, 0.95), #02010a 60%);
    color: #f4f4f5;
    display: flex;
    flex-direction: column;
    gap: clamp(1.5rem, 3vw, 2.5rem);
  }

  .resume-page__back-link {
    align-self: flex-start;
  }

  .resume-hero {
    width: 100%;
  }

  .hero-heading {
    display: grid;
    grid-template-columns: minmax(0, 3fr) minmax(0, 4fr);
    gap: clamp(1rem, 3vw, 2.5rem);
    align-items: center;
  }

  .identity h1 {
    font-size: clamp(2.5rem, 6vw, 3.8rem);
    margin-bottom: 0.35rem;
  }

  .hero-summary {
    font-size: 1.05rem;
    line-height: 1.65;
    color: rgba(244, 244, 245, 0.85);
  }

  .highlight-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
  }

  .highlight-card {
    padding: 1rem;
    border-radius: 1rem;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.08);
  }

  .highlight-label {
    text-transform: uppercase;
    letter-spacing: 0.1em;
    font-size: 0.8rem;
    color: rgba(244, 244, 245, 0.65);
    margin-bottom: 0.35rem;
  }

  .highlight-value {
    font-weight: 600;
    font-size: 1.05rem;
    margin: 0;
  }

  .highlight-detail {
    margin-top: 0.35rem;
    color: rgba(244, 244, 245, 0.75);
    font-size: 0.95rem;
  }
  .resume-main {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .contact-grid {
    margin-top: clamp(1.5rem, 3vw, 2.5rem);
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 1rem;
  }

  .contact-card {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    padding: 0.85rem;
    border-radius: 0.9rem;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.06);
  }

  .contact-label {
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    color: rgba(244, 244, 245, 0.6);
    margin: 0;
  }

  .contact-value {
    font-size: 1rem;
    font-weight: 600;
    color: #ffffff;
    text-decoration: none;
    margin: 0;
  }

  .contact-value:hover,
  .contact-value:focus-visible {
    text-decoration: underline;
  }

  .resume-content {
    display: grid;
    grid-template-columns: minmax(0, 3fr) minmax(0, 1.4fr);
    gap: clamp(1.25rem, 3vw, 2.5rem);
  }

  .eyebrow {
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    color: rgba(244, 244, 245, 0.65);
    margin: 0;
  }

  h2 {
    margin: 0.35rem 0 1rem;
    font-size: 1.65rem;
  }

  .experience-list {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .experience {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    padding-bottom: 1.25rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }

  .experience:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }

  .experience-header {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .experience-period {
    font-size: 0.95rem;
    color: rgba(244, 244, 245, 0.7);
    margin: 0;
  }

  .experience-company {
    color: rgba(244, 244, 245, 0.8);
    margin: 0.15rem 0 0.35rem;
  }

  .experience-stack {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
  }

  .experience-summary {
    color: rgba(244, 244, 245, 0.85);
    margin: 0;
  }

  .experience ul {
    margin: 0;
    padding-left: 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    color: rgba(244, 244, 245, 0.85);
    font-size: 0.98rem;
  }

  .project-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 1rem;
  }

  .resume-side {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .project-card {
    padding: 1rem;
    border-radius: 1rem;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.06);
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .project-role {
    margin: 0;
    font-size: 0.85rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgba(244, 244, 245, 0.65);
  }

  .project-card h3 {
    margin: 0;
    font-size: 1.1rem;
  }

  .project-impact {
    font-weight: 600;
    color: rgba(250, 250, 255, 0.9);
  }

  .project-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    margin-top: 0.15rem;
  }

  .skills {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .skill-group {
    padding-bottom: 0.75rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }

  .skill-group:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }

  .skill-label {
    font-weight: 600;
    margin-bottom: 0.4rem;
  }

  .skill-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.35rem;
  }

  .timeline {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .timeline-period {
    margin: 0;
    font-size: 0.9rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: rgba(244, 244, 245, 0.65);
  }

  .timeline h3 {
    margin: 0.2rem 0;
    font-size: 1.05rem;
  }

  .timeline-note {
    margin: 0.1rem 0 0;
    color: rgba(244, 244, 245, 0.75);
  }

  .cert-list {
    display: flex;
    flex-direction: column;
    gap: 0.85rem;
    margin: 0;
  }

  .cert-list div {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .cert-list dt {
    font-weight: 600;
  }

  .cert-list dd {
    margin: 0;
    display: flex;
    justify-content: space-between;
    font-size: 0.9rem;
    color: rgba(244, 244, 245, 0.75);
  }

  @media (max-width: 960px) {
    .hero-heading {
      grid-template-columns: 1fr;
    }

    .resume-content {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 640px) {
    .contact-grid {
      grid-template-columns: 1fr;
    }

    .project-grid {
      grid-template-columns: 1fr;
    }

    .highlight-card {
      padding: 0.85rem;
    }
  }
</style>
