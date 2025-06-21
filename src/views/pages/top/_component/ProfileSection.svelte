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

  .profile-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin-bottom: 4rem;
  }

  .profile-card {
    background: white;
    padding: 2rem;
    border-radius: 1rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .profile-card h3 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    color: #667eea;
  }

  .info-list {
    display: grid;
    gap: 1rem;
  }

  .info-list dt {
    font-weight: 600;
    color: #666;
    margin-bottom: 0.25rem;
  }

  .info-list dd {
    margin: 0;
    color: #333;
  }

  .timeline {
    list-style: none;
    padding: 0;
  }

  .timeline li {
    padding: 0.75rem 0;
    border-bottom: 1px solid #eee;
  }

  .timeline li:last-child {
    border-bottom: none;
  }

  .timeline .date,
  .cert-list .date {
    display: block;
    font-size: 0.875rem;
    color: #888;
    margin-bottom: 0.25rem;
  }

  .timeline .content {
    color: #333;
  }

  .cert-list {
    list-style: none;
    padding: 0;
  }

  .cert-list li {
    padding: 0.5rem 0;
    display: flex;
    flex-direction: column;
  }

  .about-section {
    margin-top: 4rem;
  }

  .about-section h3 {
    font-size: 2rem;
    text-align: center;
    margin-bottom: 2rem;
    color: #333;
  }

  .about-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
  }

  .about-card {
    background: white;
    padding: 2rem;
    border-radius: 1rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .about-card h4 {
    font-size: 1.25rem;
    margin-bottom: 1rem;
    color: #764ba2;
  }

  .about-card p {
    color: #666;
    line-height: 1.6;
  }
</style>