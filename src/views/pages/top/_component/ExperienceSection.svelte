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
            <span class="period">2024.04 - {m.present()}</span>
            <span class="position">{m.engineer()}</span>
          </div>
          <p class="description">{m.nextbeat_desc()}</p>
        </div>
      </div>

      <div class="timeline-item">
        <div class="timeline-marker"></div>
        <div class="timeline-content">
          <h3>FamilyMart Co., Ltd.</h3>
          <div class="job-details">
            <span class="period">2022.03 - 2022.12</span>
            <span class="position">{m.part_time()}</span>
          </div>
          <div class="responsibilities">
            <h4>{m.responsibilities()}</h4>
            <ul>
              <li>{m.product_stocking()}</li>
              <li>{m.cash_register()}</li>
              <li>{m.customer_service()}</li>
            </ul>
          </div>
          <div class="achievement">
            <h4>{m.achievement()}</h4>
            <p>{m.familymart_achievement()}</p>
          </div>
        </div>
      </div>

      <div class="timeline-item">
        <div class="timeline-marker"></div>
        <div class="timeline-content">
          <h3>Niku no Hanamasa Co., Ltd.</h3>
          <div class="job-details">
            <span class="period">2021.02 - 2022.02</span>
            <span class="position">{m.part_time()}</span>
          </div>
          <div class="responsibilities">
            <h4>{m.responsibilities()}</h4>
            <ul>
              <li>{m.product_stocking()}</li>
              <li>{m.meat_preparation()}</li>
              <li>{m.customer_service()}</li>
            </ul>
          </div>
          <div class="achievement">
            <h4>{m.achievement()}</h4>
            <p>{m.hanamasa_achievement()}</p>
          </div>
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

  .responsibilities,
  .achievement {
    margin-top: 1.5rem;
  }

  .responsibilities h4,
  .achievement h4 {
    font-size: 1rem;
    color: #764ba2;
    margin-bottom: 0.75rem;
  }

  .responsibilities ul {
    list-style: none;
    padding: 0;
  }

  .responsibilities li {
    padding: 0.25rem 0;
    color: #666;
    position: relative;
    padding-left: 1.5rem;
  }

  .responsibilities li::before {
    content: '•';
    position: absolute;
    left: 0;
    color: #667eea;
  }

  .achievement p {
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