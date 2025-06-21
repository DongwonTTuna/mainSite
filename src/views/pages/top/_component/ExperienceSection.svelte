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
    padding: 5rem 0;
    background: #f8f9fa;
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

  .timeline {
    position: relative;
    padding-left: 2rem;
  }

  .timeline::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 2px;
    background: #e0e0e0;
  }

  .timeline-item {
    position: relative;
    padding-bottom: 3rem;
  }

  .timeline-item:last-child {
    padding-bottom: 0;
  }

  .timeline-marker {
    position: absolute;
    left: -2rem;
    top: 0;
    width: 12px;
    height: 12px;
    background: #667eea;
    border-radius: 50%;
    box-shadow: 0 0 0 4px white, 0 0 0 6px #e0e0e0;
  }

  .timeline-content {
    background: white;
    padding: 2rem;
    border-radius: 1rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .timeline-content h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: #333;
  }

  .job-details {
    display: flex;
    gap: 2rem;
    margin-bottom: 1.5rem;
    flex-wrap: wrap;
  }

  .period {
    font-size: 0.875rem;
    color: #888;
    font-weight: 600;
  }

  .position {
    font-size: 0.875rem;
    color: #667eea;
    font-weight: 600;
  }

  .description {
    color: #666;
    line-height: 1.6;
  }

  @media (max-width: 768px) {
    .timeline {
      padding-left: 1rem;
    }

    .timeline-marker {
      left: -1rem;
    }
  }
</style>