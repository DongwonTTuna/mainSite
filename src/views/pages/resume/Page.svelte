<script lang="ts" module>
  import ContainerBox from '$lib/components/common/layout/ContainerBox.svelte';
  import BackLink from '$lib/components/navigation/BackLink.svelte';
  import { Tag } from '$lib/components/ui/tag';

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

  const heroHighlights: HeroHighlight[] = [
    {
      label: 'Current Role',
      value: 'Full-Stack Engineer · Nextbeat Inc.',
      detail: 'Omotenashi HR\'s  experience since Apr 2024.'
    },
    {
      label: 'Impact Areas',
      value: 'DevOps · Performance',
      detail: 'AWS SAM delivery, Core Web Vitals, SEO uplift.'
    },
    {
      label: 'Toolbox',
      value: 'Typescript · Nest.js · SvelteKit · AWS',
      detail: 'Cloud-native builds with multi-language delivery.'
    }
  ];

  const contactDetails: ContactDetail[] = [
    {
      label: 'Current Base',
      value: 'Ebisu, Shibuya-ku, Tokyo',
      href: 'https://www.google.com/maps/place/Ebisu,+Shibuya+City,+Tokyo+150-0013'
    },
    {
      label: 'Nationality',
      value: 'Republic of Korea'
    },
    {
      label: 'Languages',
      value: 'Korean (Native) · Japanese (JLPT N1) · English'
    }
  ];

  const experiences: Experience[] = [
    {
      company: 'Nextbeat Inc.',
      title: 'Full-Stack Engineer · Hoikushibank → Omotenashi HR',
      period: 'Apr 2024 – Present',
      location: 'Tokyo, Japan',
      summary:
        'Joined Nextbeat in Apr 2024 to support Hoikushibank, then transitioned in Oct 2024 to engineering for Omotenashi HR. I design and deliver features across Nest.js APIs, SvelteKit front-ends, and AWS infrastructure.',
      achievements: [
        'Maintained Hoikushibank\'s recruiting platform through Oct 2024, owning bug triage, feature delivery, and release ops before pivoting to Omotenashi HR.',
        'Migrated AWS Lambda deployments from the Serverless Framework to AWS SAM, standardizing templates and reducing deployment time by roughly 30%.',
        'Raised Lighthouse SEO and Core Web Vitals scores by 10+ points through SSR tuning, modern image formats, and bundle-level code-splitting in SvelteKit.',
        'Planned and executed a zero-downtime upgrade to Node.js across services with rollback coverage to meet security baselines.'
      ],
      stack: ['Nest.js', 'Typescript', 'AWS SAM', 'AWS Lambda', 'SvelteKit', 'Node.js']
    },
    {
      company: 'Bioden Corp.',
      title: 'Contract Full-Stack Engineer',
      period: 'Jul 2024',
      location: 'Remote · Tokyo',
      summary:
        'End-to-end delivery of BiodenKR, a corporate marketing site that needed fast global performance and native-level copy across five languages.',
      achievements: [
        'Architected and built the site from scratch in SvelteKit with a static SSR pipeline tailored to content updates.',
        'Localised every view for five languages to match regional brand guidelines without duplicating layouts.',
        'Deployed via Cloudflare Pages for world-wide edge rendering and automated CI so the client can publish independently.'
      ],
      stack: ['SvelteKit', 'Typescript', 'Cloudflare Pages', 'i18n']
    }
  ];

  const selectedProjects: Project[] = [
    {
      name: 'Serverless → AWS SAM migration',
      role: 'Nextbeat · Omotenashi HR',
      description: 'Rebuilt Lambda deployment workflows on AWS SAM to adopt native tooling and shared templates.',
      impact: 'Cut deployment times by about 30% while simplifying CI/CD for the team.',
      stack: ['AWS SAM', 'AWS Lambda', 'Infrastructure as Code']
    },
    {
      name: 'Core Web Vitals uplift',
      role: 'Nextbeat · Omotenashi HR',
      description: 'Audited SSR, images, and routes to modernise delivery and reduce blocking assets.',
      impact: 'Boosted Lighthouse SEO scores by 20+ points, improving organic acquisition.',
      stack: ['SvelteKit', 'SSR Tuning', 'Performance']
    },
    {
      name: 'BiodenKR multi-language launch',
      role: 'Bioden Corp. · Contract',
      description: 'A-to-Z website build with responsive layouts and localisation for five languages.',
      impact: 'Launched on Cloudflare Pages with a fast, globally cached experience for worldwide visitors.',
      stack: ['SvelteKit', 'Cloudflare Pages', 'i18n']
    }
  ];

  const educationHistory: EducationEntry[] = [
    {
      institution: 'Tokyo Communication University',
      program: 'Undergraduate studies',
      period: 'Apr 2024 – Present'
    },
    {
      institution: 'Tokyo Information Creator College',
      program: 'Information technology program',
      period: 'Graduated Mar 2024'
    }
  ];

  const certifications: Certification[] = [
    {
      title: 'JLPT N1',
      issuer: 'Japan Foundation',
      issued: 'Dec 2016'
    },
    {
      title: 'Fundamental Information Technology Engineer (FE)',
      issuer: 'Information-technology Promotion Agency (IPA)',
      issued: 'Dec 2022'
    }
  ];

  const skillGroups: SkillGroup[] = [
    {
      label: 'Core Stack',
      items: ['Typescript', 'Nest.js', 'SvelteKit', 'Node.js']
    },
    {
      label: 'Cloud & DevOps',
      items: ['AWS Lambda', 'AWS SAM', 'Cloudflare Pages', 'Infrastructure as Code']
    },
    {
      label: 'Product Focus',
      items: ['B2B SaaS UX', 'Performance & SEO', 'Multi-language delivery']
    },
    {
      label: 'Collaboration',
      items: ['Requirement discovery', 'Client communication', 'Zero-downtime releases']
    }
  ];
</script>

<script lang="ts"></script>

<section class="resume-page">
  <div class="resume-page__back-link">
    <BackLink/>
  </div>
  <div class="resume-hero">
    <ContainerBox maxWidth="100%" padding="2.5rem clamp(1.5rem, 4vw, 3rem)">
      <p class="eyebrow">Resume</p>

      <div class="hero-heading">
        <div class="identity">
          <h1>Dongwon Lee</h1>
          <p class="hero-summary">
            Full-Stack Engineer building dependable SaaS experiences for global hospitality clients. Currently at
            Nextbeat, shipping end-to-end features across Typescript, Nest.js, SvelteKit, and AWS.
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
          <p class="eyebrow">Experience</p>
          <h2>Hands-on delivery</h2>
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
          <p class="eyebrow">Selected Projects</p>
          <h2>Case studies</h2>
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
          <p class="eyebrow">Skills</p>
          <h2>How I work</h2>
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
          <p class="eyebrow">Education</p>
          <h2>Academic</h2>
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
          <p class="eyebrow">Certifications</p>
          <h2>Proof points</h2>
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
