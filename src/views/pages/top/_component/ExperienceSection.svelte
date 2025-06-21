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
    background: rgba(255, 255, 255, 0.2);
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
    background: #8b9cff;
    border-radius: 50%;
    box-shadow: 0 0 0 4px rgba(0, 0, 17, 0.8), 0 0 0 6px rgba(139, 156, 255, 0.3);
  }

  .timeline-content {
    background: rgba(255, 255, 255, 0.05);
    padding: 2rem;
    border-radius: 1rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
  }

  .timeline-content h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: #ffffff;
  }

  .job-details {
    display: flex;
    gap: 2rem;
    margin-bottom: 1.5rem;
    flex-wrap: wrap;
  }

  .period {
    font-size: 0.875rem;
    color: #a0a0a0;
    font-weight: 600;
  }

  .position {
    font-size: 0.875rem;
    color: #8b9cff;
    font-weight: 600;
  }

  .description {
    color: #d0d0d0;
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