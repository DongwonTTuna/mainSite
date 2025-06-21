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
    background: white;
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
    color: #333;
  }

  .experience-banner {
    text-align: center;
    margin-bottom: 4rem;
    padding: 2rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 1rem;
    color: white;
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
    background: #f8f9fa;
    padding: 2rem;
    border-radius: 1rem;
  }

  .skill-category h3 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    color: #667eea;
  }

  .skill-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
  }

  .skill-tag {
    display: inline-block;
    padding: 0.5rem 1rem;
    background: white;
    border: 2px solid #e0e0e0;
    border-radius: 2rem;
    font-size: 0.875rem;
    color: #333;
    transition: all 0.2s;
  }

  .skill-tag:hover {
    border-color: #667eea;
    color: #667eea;
    transform: translateY(-2px);
  }

  .projects-section {
    margin-top: 4rem;
  }

  .projects-section h3 {
    font-size: 2rem;
    text-align: center;
    margin-bottom: 2rem;
    color: #333;
  }

  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
  }

  .project-card {
    background: #f8f9fa;
    padding: 2rem;
    border-radius: 1rem;
  }

  .project-card h4 {
    font-size: 1.25rem;
    margin-bottom: 1rem;
    color: #764ba2;
  }

  .project-card ul {
    list-style: none;
    padding: 0;
  }

  .project-card li {
    padding: 0.5rem 0;
    color: #666;
    position: relative;
    padding-left: 1.5rem;
  }

  .project-card li::before {
    content: '▸';
    position: absolute;
    left: 0;
    color: #667eea;
  }
</style>