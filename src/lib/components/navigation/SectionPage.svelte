<script lang="ts">
  type SectionPageProps = {
    title: string;
    summary: string;
    href: string;
    linkLabel: string;
  };

  let { title, summary, href, linkLabel }: SectionPageProps = $props();
</script>

<section class="section-page">
  <div class="section-page__box">
    <h1>{title}</h1>
    <p>{summary}</p>
    <!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
    <a href={href}>{linkLabel}</a>
  </div>
</section>

<style>
  .section-page {
    min-height: 100dvh;
    padding: clamp(1.5rem, 4vw, 3rem);
    background: #0b0d10;
    color: #e5e7eb;
    display: grid;
    place-items: center;
    font-family:
      'SFMono-Regular',
      'Menlo',
      'Monaco',
      'Consolas',
      'Liberation Mono',
      monospace;
  }

  .section-page__box {
    width: min(560px, 100%);
    border: 1px solid #262b31;
    background: #101318;
    padding: 1.25rem;
    display: grid;
    gap: 0.9rem;
  }

  h1,
  p {
    margin: 0;
  }

  h1 {
    font-size: clamp(1.5rem, 4vw, 2rem);
    color: #f9fafb;
    line-height: 1.2;
  }

  p {
    color: #d1d5db;
    line-height: 1.7;
  }

  a {
    width: fit-content;
    color: #f3f4f6;
    text-decoration: none;
    border-bottom: 1px solid #39414a;
    padding-bottom: 0.1rem;
  }

  a:hover,
  a:focus-visible {
    color: #ffffff;
    border-color: #9ca3af;
    outline: none;
  }
</style>
