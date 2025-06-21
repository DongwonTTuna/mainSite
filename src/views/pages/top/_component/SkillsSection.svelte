<script lang="ts">
  import { m } from '$lib/i18n'

  const skills = {
    frontend: ['HTML', 'CSS', 'JavaScript', 'React', 'Next.js', 'TailwindCSS', 'SvelteKit'],
    backend: ['Python', 'Django', 'Java', 'JavaFX', 'Node.js'],
    others: ['API Development', 'System Design', 'Git', 'Docker']
  }
</script>

<section class="skills-section">
  <div class="container">
    <h2 class="section-title">{m.technical_skills()}</h2>
    
    <div class="experience-banner">
      <span class="experience-number">2</span>
      <span class="experience-text">{m.years_of_experience()}</span>
    </div>

    <div class="skills-grid">
      <div class="skill-category">
        <h3>Frontend</h3>
        <div class="skill-tags">
          {#each skills.frontend as skill}
            <span class="skill-tag">{skill}</span>
          {/each}
        </div>
      </div>

      <div class="skill-category">
        <h3>Backend</h3>
        <div class="skill-tags">
          {#each skills.backend as skill}
            <span class="skill-tag">{skill}</span>
          {/each}
        </div>
      </div>

      <div class="skill-category">
        <h3>{m.others()}</h3>
        <div class="skill-tags">
          {#each skills.others as skill}
            <span class="skill-tag">{skill}</span>
          {/each}
        </div>
      </div>
    </div>

    <div class="projects-section">
      <h3>{m.projects_title()}</h3>
      <div class="projects-grid">
        <div class="project-card">
          <h4>{m.college_projects()}</h4>
          <ul>
            <li>{m.seat_assignment_system()}</li>
            <li>{m.crypto_chart_viewer()}</li>
          </ul>
        </div>
        <div class="project-card">
          <h4>{m.freelance_dev()}</h4>
          <ul>
            <li>BiodenKR (2024.07)</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .skills-section {
    padding: var(--spacing-4xl) 0;
    background: transparent;
  }

  .container {
    max-width: var(--max-width-container);
    margin: 0 auto;
    padding: 0 var(--spacing-xl);
  }

  .section-title {
    font-size: var(--font-size-5xl);
    text-align: center;
    margin-bottom: var(--spacing-2xl);
    color: var(--color-text-primary);
  }

  .experience-banner {
    text-align: center;
    margin-bottom: var(--spacing-3xl);
    padding: var(--spacing-2xl);
    background: var(--color-accent-gradient);
    border-radius: var(--radius-lg);
    color: var(--color-text-on-accent);
    box-shadow: var(--shadow-lg);
    position: relative;
    overflow: hidden;
  }
  
  .experience-banner::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
    animation: float 6s ease-in-out infinite;
  }

  .experience-number {
    display: block;
    font-size: calc(var(--font-size-5xl) * 1.5);
    font-weight: var(--font-weight-black);
    line-height: 1;
    position: relative;
    z-index: 1;
  }

  .experience-text {
    display: block;
    font-size: var(--font-size-xl);
    margin-top: var(--spacing-sm);
    font-weight: var(--font-weight-semibold);
    opacity: 0.95;
    position: relative;
    z-index: 1;
  }

  .skills-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: var(--spacing-xl);
    margin-bottom: var(--spacing-3xl);
  }

  .skill-category {
    background: var(--color-surface-card);
    padding: var(--spacing-xl);
    border-radius: var(--radius-lg);
    border: 1px solid var(--color-border);
    backdrop-filter: var(--blur-sm);
    box-shadow: var(--shadow-base);
    transition: all var(--transition-base);
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  
  .skill-category::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: var(--color-accent);
    opacity: 0.1;
    transform: translate(-50%, -50%);
    transition: width 0.6s, height 0.6s;
  }
  
  .skill-category:hover::before {
    width: 300%;
    height: 300%;
  }
  
  .skill-category:hover {
    transform: translateY(-6px) scale(1.02);
    box-shadow: var(--shadow-xl);
    border-color: var(--color-accent);
  }
  
  .skill-category:active {
    transform: translateY(-2px) scale(1.01);
    transition: all 0.1s;
  }

  .skill-category h3 {
    font-size: var(--font-size-2xl);
    margin-bottom: var(--spacing-lg);
    color: var(--color-accent-light);
    position: relative;
    z-index: 1;
  }

  .skill-tags {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-md);
    position: relative;
    z-index: 1;
  }

  .skill-tag {
    display: inline-block;
    padding: var(--spacing-sm) var(--spacing-base);
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-2xl);
    font-size: var(--font-size-sm);
    color: var(--color-text-primary);
    transition: all var(--transition-fast);
  }

  .skill-tag:hover {
    border-color: var(--color-accent);
    color: var(--color-accent);
    transform: translateY(-2px);
    box-shadow: var(--shadow-sm);
  }

  .projects-section {
    margin-top: var(--spacing-3xl);
  }

  .projects-section h3 {
    font-size: var(--font-size-3xl);
    text-align: center;
    margin-bottom: var(--spacing-xl);
    color: var(--color-text-primary);
  }

  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: var(--spacing-xl);
  }

  .project-card {
    background: var(--color-surface-card);
    padding: var(--spacing-xl);
    border-radius: var(--radius-lg);
    border: 1px solid var(--color-border);
    backdrop-filter: var(--blur-sm);
    box-shadow: var(--shadow-base);
    transition: all var(--transition-base);
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  
  .project-card::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: var(--color-accent);
    opacity: 0.1;
    transform: translate(-50%, -50%);
    transition: width 0.6s, height 0.6s;
  }
  
  .project-card:hover::before {
    width: 300%;
    height: 300%;
  }
  
  .project-card:hover {
    transform: translateY(-6px) scale(1.02);
    box-shadow: var(--shadow-xl);
    border-color: var(--color-accent);
  }
  
  .project-card:active {
    transform: translateY(-2px) scale(1.01);
    transition: all 0.1s;
  }

  .project-card h4 {
    font-size: var(--font-size-xl);
    margin-bottom: var(--spacing-base);
    color: var(--color-accent-light);
    position: relative;
    z-index: 1;
  }

  .project-card ul {
    list-style: none;
    padding: 0;
    position: relative;
    z-index: 1;
  }

  .project-card li {
    padding: var(--spacing-sm) 0;
    color: var(--color-text-secondary);
    position: relative;
    padding-left: var(--spacing-lg);
  }

  .project-card li::before {
    content: '▸';
    position: absolute;
    left: 0;
    color: var(--color-accent-light);
  }
</style>