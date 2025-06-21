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
    padding: 5rem 0;
    background: transparent;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
  }

  .section-title {
    font-size: 3rem;
    text-align: center;
    margin-bottom: 3rem;
    color: #ffffff;
  }

  .experience-banner {
    text-align: center;
    margin-bottom: 4rem;
    padding: 2rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 1rem;
    color: white;
    box-shadow: 0 4px 20px rgba(102, 126, 234, 0.3);
  }

  .experience-number {
    display: block;
    font-size: 4rem;
    font-weight: 900;
    line-height: 1;
  }

  .experience-text {
    display: block;
    font-size: 1.5rem;
    margin-top: 0.5rem;
  }

  .skills-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin-bottom: 4rem;
  }

  .skill-category {
    background: rgba(255, 255, 255, 0.05);
    padding: 2rem;
    border-radius: 1rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
  }

  .skill-category h3 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    color: #8b9cff;
  }

  .skill-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
  }

  .skill-tag {
    display: inline-block;
    padding: 0.5rem 1rem;
    background: rgba(255, 255, 255, 0.05);
    border: 2px solid rgba(255, 255, 255, 0.2);
    border-radius: 2rem;
    font-size: 0.875rem;
    color: #ffffff;
    transition: all 0.2s;
  }

  .skill-tag:hover {
    border-color: #8b9cff;
    color: #8b9cff;
    transform: translateY(-2px);
    background: rgba(139, 156, 255, 0.1);
  }

  .projects-section {
    margin-top: 4rem;
  }

  .projects-section h3 {
    font-size: 2rem;
    text-align: center;
    margin-bottom: 2rem;
    color: #ffffff;
  }

  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
  }

  .project-card {
    background: rgba(255, 255, 255, 0.05);
    padding: 2rem;
    border-radius: 1rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
  }

  .project-card h4 {
    font-size: 1.25rem;
    margin-bottom: 1rem;
    color: #a77bc4;
  }

  .project-card ul {
    list-style: none;
    padding: 0;
  }

  .project-card li {
    padding: 0.5rem 0;
    color: #d0d0d0;
    position: relative;
    padding-left: 1.5rem;
  }

  .project-card li::before {
    content: '▸';
    position: absolute;
    left: 0;
    color: #8b9cff;
  }
</style>