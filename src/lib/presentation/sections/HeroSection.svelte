<script lang="ts">
  import type { HomePageViewModel } from "#application/home/types";
  import TunaStage from "#presentation/components/tuna/TunaStage.svelte";

  let { hero }: { hero: HomePageViewModel["hero"] } = $props();
</script>

<section class="hero" aria-labelledby="welcome-title">
  <div class="hero-copy">
    <p class="hero-eyebrow eyebrow"><span></span> FULL-STACK ENGINEER / TOKYO</p>
    <h1 id="welcome-title">{hero.headline}<br /><span class="accent-line">{hero.accentLine}</span></h1>
    <p class="hero-greeting">{hero.greeting} <strong>{hero.title}</strong>{hero.greetingEnding}</p>
    <p class="hero-role">{hero.role}</p>
    <p class="hero-summary">{hero.summary}</p>
    <div class="hero-actions">
      <a class="primary-action" href="#projects">{hero.primaryAction}<span aria-hidden="true">↗</span></a>
      <a class="secondary-action" href="#intro">{hero.secondaryAction}<span aria-hidden="true">↘</span></a>
    </div>
  </div>
  <TunaStage text={hero.artwork} />
  <div class="hero-footnote eyebrow" aria-hidden="true">
    <span>CODE WITH DEPTH. CREATE WITH COLOR.</span>
    <span class="scroll-note">SCROLL TO EXPLORE <span>↓</span></span>
  </div>
</section>

<style>
  .hero { position: relative; display: grid; grid-template-columns: 1.05fr 1fr; align-items: center; column-gap: 1rem; padding-top: 3.5rem; }
  .hero-copy { position: relative; z-index: 2; padding-block: 2rem 3rem; }
  .hero-eyebrow { display: flex; align-items: center; gap: 0.6rem; color: var(--text-body); margin-bottom: 1.6rem; }
  .hero-eyebrow > span { width: 7px; height: 7px; border-radius: 50%; background: var(--accent-bright); }
  h1 { color: var(--text-strong); font-size: clamp(2.6rem, 4.35vw, 4.2rem); font-weight: 760; line-height: 1.22; letter-spacing: -0.065em; word-break: keep-all; }
  .accent-line { position: relative; display: inline-block; color: var(--accent); }
  .accent-line::after { content: ""; position: absolute; left: 0; bottom: -0.12em; width: 96%; height: 0.1em; background: #efb65b; clip-path: polygon(0 50%, 83% 0, 100% 45%, 96% 90%, 15% 72%, 2% 100%); transform: rotate(-1deg); }
  .hero-greeting { margin-top: 2.3rem; color: var(--text-strong); font-size: 1.2rem; letter-spacing: -0.03em; }
  .hero-greeting strong { font-weight: 700; }
  .hero-role { margin-top: 0.45rem; color: var(--text-muted); font-size: 0.87rem; }
  .hero-summary { max-width: 440px; margin-top: 1.2rem; color: var(--text-body); font-size: 0.97rem; line-height: 1.9; word-break: keep-all; overflow-wrap: anywhere; }
  .hero-actions { display: flex; flex-wrap: wrap; align-items: center; gap: 1.5rem; margin-top: 1.8rem; }
  .hero-actions a { display: inline-flex; align-items: center; gap: 1rem; min-height: 50px; font-size: 0.85rem; font-weight: 600; text-decoration: none; }
  .primary-action { padding: 0.8rem 1.25rem; border: 1px solid var(--text-strong); border-radius: 4px; color: #fffefb; background: var(--text-strong); transition: background 160ms ease, transform 160ms ease; }
  .primary-action:hover { background: #2b505c; transform: translateY(-2px); }
  .primary-action span { font-size: 1.15rem; color: #f7c977; }
  .secondary-action { color: var(--text-strong); }
  .secondary-action:hover { color: var(--accent); }
  .hero-footnote { grid-column: 1 / -1; display: flex; justify-content: space-between; gap: 1rem; padding-block: 1.75rem 2rem; font-size: 0.59rem; letter-spacing: 0.12em; color: var(--text-muted); }
  .scroll-note { display: inline-flex; align-items: center; gap: 0.8rem; }
  .scroll-note > span { font-size: 1rem; color: var(--accent); }
  @media (max-width: 1000px) and (min-width: 761px) {
    h1 { font-size: 3.2rem; }
    .hero-actions { gap: 0.65rem; }
  }
  @media (max-width: 760px) {
    .hero { grid-template-columns: 1fr; padding-top: 1.75rem; }
    .hero-copy { padding-block: 1.2rem 0; }
    h1 { font-size: clamp(2.2rem, 8.8vw, 3.7rem); }
    .hero-eyebrow { margin-bottom: 1.25rem; font-size: 0.64rem; }
    .hero-greeting { margin-top: 1.75rem; }
    .hero-summary { max-width: 530px; }
    .hero-actions { margin-top: 1.5rem; gap: 1rem; }
    .hero-actions a { font-size: 0.78rem; gap: 0.6rem; }
    .hero-footnote { padding-block: 0.8rem 1.5rem; }
    .scroll-note { display: none; }
  }
  @media (prefers-reduced-motion: reduce) {
    .primary-action { transition: none; }
    .primary-action:hover { transform: none; }
  }
</style>
