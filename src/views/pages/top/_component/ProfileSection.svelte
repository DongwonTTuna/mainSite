<script lang="ts">
  import { m } from '$lib/i18n'
</script>

<section class="profile-section">
  <div class="container">
    <h2 class="section-title">{m.profile_title()}</h2>
    
    <div class="profile-grid">
      <div class="profile-card">
        <h3>{m.basic_info()}</h3>
        <dl class="info-list">
          <dt>{m.birth_date()}</dt>
          <dd>1999.08.14 (25)</dd>
          
          <dt>{m.nationality()}</dt>
          <dd>{m.korean()}</dd>
          
          <dt>{m.location()}</dt>
          <dd>Takasaki, Gunma, Japan</dd>
        </dl>
      </div>

      <div class="profile-card">
        <h3>{m.education()}</h3>
        <ul class="timeline">
          <li>
            <span class="date">2024.04 - {m.present()}</span>
            <span class="content">{m.tokyo_tsushin_university()}</span>
          </li>
          <li>
            <span class="date">2024.03</span>
            <span class="content">{m.tokyo_info_creator()}</span>
          </li>
        </ul>
      </div>

      <div class="profile-card">
        <h3>{m.certifications()}</h3>
        <ul class="cert-list">
          <li>
            <span class="date">2022.11</span>
            <span>{m.cert_fit()}</span>
          </li>
          <li>
            <span class="date">2022.09</span>
            <span>{m.cert_kanji()}</span>
          </li>
          <li>
            <span class="date">2020.11</span>
            <span>{m.cert_meet()}</span>
          </li>
          <li>
            <span class="date">2016.11</span>
            <span>JLPT N1</span>
          </li>
        </ul>
      </div>
    </div>

    <div class="about-section">
      <h3>{m.about_me()}</h3>
      <div class="about-grid">
        <div class="about-card">
          <h4>{m.user_centered_dev()}</h4>
          <p>{m.user_centered_desc()}</p>
        </div>
        <div class="about-card">
          <h4>{m.proactivity()}</h4>
          <p>{m.proactivity_desc()}</p>
        </div>
        <div class="about-card">
          <h4>{m.responsibility_title()}</h4>
          <p>{m.responsibility_desc()}</p>
        </div>
        <div class="about-card">
          <h4>{m.customer_oriented()}</h4>
          <p>{m.customer_oriented_desc()}</p>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .profile-section {
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

  .profile-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: var(--spacing-xl);
    margin-bottom: var(--spacing-3xl);
  }

  .profile-card {
    background: var(--color-border-light);
    padding: var(--spacing-xl);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-base);
    border: 1px solid var(--color-border-light);
    backdrop-filter: var(--blur-base);
  }

  .profile-card h3 {
    font-size: var(--font-size-2xl);
    margin-bottom: var(--spacing-lg);
    color: var(--color-accent-light);
  }

  .info-list {
    display: grid;
    gap: var(--spacing-base);
  }

  .info-list dt {
    font-weight: var(--font-weight-semibold);
    color: var(--color-text-secondary);
    margin-bottom: var(--spacing-xs);
  }

  .info-list dd {
    margin: 0;
    color: var(--color-text-primary);
  }

  .timeline {
    list-style: none;
    padding: 0;
  }

  .timeline li {
    padding: var(--spacing-md) 0;
    border-bottom: 1px solid var(--color-border-light);
  }

  .timeline li:last-child {
    border-bottom: none;
  }

  .timeline .date,
  .cert-list .date {
    display: block;
    font-size: var(--font-size-sm);
    color: var(--color-text-secondary);
    margin-bottom: var(--spacing-xs);
  }

  .timeline .content {
    color: var(--color-text-primary);
  }

  .cert-list {
    list-style: none;
    padding: 0;
  }

  .cert-list li {
    padding: var(--spacing-sm) 0;
    display: flex;
    flex-direction: column;
    color: var(--color-text-primary);
  }

  .about-section {
    margin-top: var(--spacing-3xl);
  }

  .about-section h3 {
    font-size: var(--font-size-3xl);
    text-align: center;
    margin-bottom: var(--spacing-xl);
    color: var(--color-text-primary);
  }

  .about-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: var(--spacing-xl);
  }

  .about-card {
    background: var(--color-border-light);
    padding: var(--spacing-xl);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-base);
    border: 1px solid var(--color-border-light);
    backdrop-filter: var(--blur-base);
  }

  .about-card h4 {
    font-size: var(--font-size-xl);
    margin-bottom: var(--spacing-base);
    color: var(--color-accent-light);
  }

  .about-card p {
    color: var(--color-text-secondary);
    line-height: var(--line-height-relaxed);
  }
</style>