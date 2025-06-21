<script lang="ts">
  import { m } from '$lib/i18n'
</script>

<section class="hero-section">
  <div class="hero-content">
    <h1 class="hero-title">
      <span class="name">LEE DONGWON</span>
      <span class="role">{m.hero_role()}</span>
    </h1>
    <p class="hero-subtitle">{m.hero_subtitle()}</p>
    <div class="hero-links">
      <a href="https://github.com/DongwonTTuna" target="_blank" rel="noopener noreferrer" class="github-link">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
        GitHub
      </a>
    </div>
  </div>
  <div class="hero-visual">
    <div class="floating-shapes">
      <div class="shape shape-1"></div>
      <div class="shape shape-2"></div>
      <div class="shape shape-3"></div>
    </div>
  </div>
</section>

<style>
  .hero-section {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    padding: 2rem;
  }

  .hero-content {
    z-index: 1;
    text-align: center;
    max-width: 800px;
  }

  .hero-title {
    margin-bottom: 1rem;
  }

  .name {
    display: block;
    font-size: clamp(3rem, 8vw, 6rem);
    font-weight: 900;
    letter-spacing: -0.02em;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 0.5rem;
  }

  .role {
    display: block;
    font-size: clamp(1.5rem, 4vw, 2.5rem);
    font-weight: 300;
    color: #666;
  }

  .hero-subtitle {
    font-size: 1.25rem;
    color: #888;
    margin-bottom: 2rem;
  }

  .hero-links {
    display: flex;
    gap: 1rem;
    justify-content: center;
  }

  .github-link {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    background: #24292e;
    color: white;
    text-decoration: none;
    border-radius: 0.5rem;
    transition: transform 0.2s, box-shadow 0.2s;
  }

  .github-link:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  .hero-visual {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    z-index: 0;
  }

  .floating-shapes {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .shape {
    position: absolute;
    border-radius: 50%;
    filter: blur(60px);
    opacity: 0.3;
    animation: float 20s infinite ease-in-out;
  }

  .shape-1 {
    width: 400px;
    height: 400px;
    background: #667eea;
    top: 10%;
    left: 10%;
    animation-delay: 0s;
  }

  .shape-2 {
    width: 300px;
    height: 300px;
    background: #764ba2;
    top: 60%;
    right: 10%;
    animation-delay: 5s;
  }

  .shape-3 {
    width: 250px;
    height: 250px;
    background: #f093fb;
    bottom: 10%;
    left: 30%;
    animation-delay: 10s;
  }

  @keyframes float {
    0%, 100% {
      transform: translate(0, 0) scale(1);
    }
    33% {
      transform: translate(30px, -30px) scale(1.1);
    }
    66% {
      transform: translate(-20px, 20px) scale(0.9);
    }
  }
</style>