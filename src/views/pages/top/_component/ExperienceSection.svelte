<script lang="ts">
  import { m } from '$lib/i18n'
</script>

<section class="experience-section">
  <div class="container">
    <h2 class="section-title">{m.work_experience()}</h2>
    
    <div class="timeline">
      <div class="timeline-item">
        <div class="timeline-marker"></div>
        <div class="timeline-content">
          <h3>Nextbeat Inc.</h3>
          <div class="job-details">
            <span class="period">2023.05 - {m.present()}</span>
            <span class="position">{m.engineer()}</span>
          </div>
          <p class="description">{m.nextbeat_desc()}</p>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .experience-section {
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

  .timeline {
    position: relative;
    padding-left: var(--spacing-xl);
  }

  .timeline::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 2px;
    background: var(--color-border-light);
  }

  .timeline-item {
    position: relative;
    padding-bottom: var(--spacing-2xl);
  }

  .timeline-item:last-child {
    padding-bottom: 0;
  }

  .timeline-marker {
    position: absolute;
    left: calc(-1 * var(--spacing-xl));
    top: 0;
    width: 12px;
    height: 12px;
    background: var(--color-accent-light);
    border-radius: var(--radius-full);
    box-shadow: 0 0 0 4px var(--color-background), 0 0 0 6px var(--color-border-accent);
  }

  .timeline-content {
    background: var(--color-surface-card);
    padding: var(--spacing-xl);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-base);
    border: 1px solid var(--color-border);
    backdrop-filter: var(--blur-sm);
    transition: all var(--transition-base);
  }
  
  .timeline-content:hover {
    transform: translateX(4px);
    box-shadow: var(--shadow-md);
    border-color: var(--color-border-accent);
  }

  .timeline-content h3 {
    font-size: var(--font-size-2xl);
    margin-bottom: var(--spacing-base);
    color: var(--color-text-primary);
  }

  .job-details {
    display: flex;
    gap: var(--spacing-xl);
    margin-bottom: var(--spacing-lg);
    flex-wrap: wrap;
  }

  .period {
    font-size: var(--font-size-sm);
    color: var(--color-text-secondary);
    font-weight: var(--font-weight-semibold);
  }

  .position {
    font-size: var(--font-size-sm);
    color: var(--color-accent-light);
    font-weight: var(--font-weight-semibold);
  }

  .description {
    color: var(--color-text-secondary);
    line-height: var(--line-height-relaxed);
  }

  @media (max-width: 768px) {
    .timeline {
      padding-left: var(--spacing-base);
    }

    .timeline-marker {
      left: calc(-1 * var(--spacing-base));
    }
  }
</style>