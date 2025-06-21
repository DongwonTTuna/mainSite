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

  .profile-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin-bottom: 4rem;
  }

  .profile-card {
    background: rgba(255, 255, 255, 0.05);
    padding: 2rem;
    border-radius: 1rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
  }

  .profile-card h3 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    color: #8b9cff;
  }

  .info-list {
    display: grid;
    gap: 1rem;
  }

  .info-list dt {
    font-weight: 600;
    color: #a0a0a0;
    margin-bottom: 0.25rem;
  }

  .info-list dd {
    margin: 0;
    color: #ffffff;
  }

  .timeline {
    list-style: none;
    padding: 0;
  }

  .timeline li {
    padding: 0.75rem 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .timeline li:last-child {
    border-bottom: none;
  }

  .timeline .date,
  .cert-list .date {
    display: block;
    font-size: 0.875rem;
    color: #a0a0a0;
    margin-bottom: 0.25rem;
  }

  .timeline .content {
    color: #ffffff;
  }

  .cert-list {
    list-style: none;
    padding: 0;
  }

  .cert-list li {
    padding: 0.5rem 0;
    display: flex;
    flex-direction: column;
    color: #ffffff;
  }

  .about-section {
    margin-top: 4rem;
  }

  .about-section h3 {
    font-size: 2rem;
    text-align: center;
    margin-bottom: 2rem;
    color: #ffffff;
  }

  .about-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
  }

  .about-card {
    background: rgba(255, 255, 255, 0.05);
    padding: 2rem;
    border-radius: 1rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
  }

  .about-card h4 {
    font-size: 1.25rem;
    margin-bottom: 1rem;
    color: #a77bc4;
  }

  .about-card p {
    color: #d0d0d0;
    line-height: 1.6;
  }
</style>