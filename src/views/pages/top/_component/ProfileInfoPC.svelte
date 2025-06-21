<script>
  import * as m from '$i18n/messages'
</script>

<div class="profile-info">
  <section class="basic-info">
    <h2>{m.name()}</h2>
    <p class="subtitle">{m.job_title()}</p>
    <div class="details">
      <span>📍 {m.location()}</span>
      <span>🎂 {m.birthday()}</span>
      <span>🇰🇷 {m.nationality()}</span>
    </div>
  </section>

  <section class="skills">
    <h3>{m.technical_skills()}</h3>
    <div class="skill-tags">
      <span class="tag">HTML</span>
      <span class="tag">CSS</span>
      <span class="tag">JavaScript</span>
      <span class="tag">React</span>
      <span class="tag">Next.js</span>
      <span class="tag">Python</span>
      <span class="tag">Django</span>
      <span class="tag">Java</span>
    </div>
    <p class="experience">{m.experience()}</p>
  </section>

  <section class="certifications">
    <h3>{m.certifications()}</h3>
    <ul>
      <li>{m.cert_fit()}</li>
      <li>{m.cert_jlpt()}</li>
      <li>{m.cert_license()}</li>
    </ul>
  </section>
</div>

<style>
  .profile-info {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 600px;
    padding: 2rem;
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: var(--color-text);
    z-index: 10;
  }

  .basic-info {
    margin-bottom: 2rem;
  }

  h2 {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }

  .subtitle {
    font-size: 1.2rem;
    color: var(--color-primary);
    margin-bottom: 1rem;
  }

  .details {
    display: flex;
    gap: 1.5rem;
    flex-wrap: wrap;
    font-size: 0.95rem;
    opacity: 0.8;
  }

  h3 {
    font-size: 1.3rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }

  .skills {
    margin-bottom: 2rem;
  }

  .skill-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }

  .tag {
    padding: 0.3rem 0.8rem;
    background: var(--color-primary);
    color: var(--color-bg);
    border-radius: 20px;
    font-size: 0.85rem;
    font-weight: 500;
  }

  .experience {
    font-size: 0.9rem;
    opacity: 0.8;
    font-style: italic;
  }

  .certifications ul {
    list-style: none;
    padding: 0;
  }

  .certifications li {
    padding: 0.5rem 0;
    font-size: 0.95rem;
    opacity: 0.9;
  }

  .certifications li::before {
    content: "✓ ";
    color: var(--color-primary);
    font-weight: bold;
    margin-right: 0.5rem;
  }

  @media (prefers-color-scheme: light) {
    .profile-info {
      background: rgba(255, 255, 255, 0.8);
      border: 1px solid rgba(0, 0, 0, 0.1);
    }
  }
</style>