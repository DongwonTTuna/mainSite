<script lang="ts">
  import type { BlogIndexItem } from "#domain/blog/types";

  let { articles }: { articles: BlogIndexItem[] } = $props();
</script>

<section class="blog-page">
  <div class="shell">
    <header class="blog-header">
      <a class="back-link" href="/ko/">Home</a>
      <p class="section-label">Blog</p>
      <h1>글</h1>
      <p class="blog-description">만들며 배운 것들을 기록합니다.</p>
    </header>

    <main id="main-content" class="article-list" aria-label="블로그 글 목록" tabindex="-1">
      {#each articles as article (article.slug)}
        <article class="entry">
          <div class="meta-row">
            <time datetime={article.publishedAt}>{article.publishedAt}</time>
            <span>{article.author}</span>
          </div>
          <h2>
            <a href={`/ko/blog/${article.slug}`}>{article.title}</a>
          </h2>
        </article>
      {/each}
    </main>
  </div>
</section>

<style>
  .blog-page {
    min-height: 100dvh;
    padding: 3rem clamp(1.25rem, 4vw, 3rem) 5rem;
  }

  .shell {
    width: min(920px, 100%);
    margin: 0 auto;
    background: var(--page-background);
  }

  .blog-header {
    display: grid;
    gap: 1rem;
    padding: 1.25rem 0 2.5rem;
    border-bottom: 1px solid var(--surface-border);
  }

  .back-link {
    width: fit-content;
    color: var(--link-color);
    border-bottom: 1px solid var(--link-border);
    padding-bottom: 0.1rem;
    text-decoration: none;
    transition:
      color 120ms ease,
      border-color 120ms ease;
  }

  .back-link:hover,
  .back-link:focus-visible {
    color: var(--text-strong);
    border-color: var(--link-border-active);
  }

  .section-label {
    font-family: var(--font-mono);
    color: var(--text-muted);
    font-size: 0.76rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  h1 {
    color: var(--text-strong);
    font-size: clamp(2.8rem, 6vw, 4rem);
    font-weight: 700;
    letter-spacing: -0.05em;
    line-height: 1.1;
  }

  .article-list {
    display: grid;
    gap: 1px;
    background: var(--surface-border);
  }

  .entry {
    display: grid;
    gap: 0.7rem;
    padding: 2.25rem 0;
    background: var(--page-background);
  }

  .meta-row {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem 1rem;
    color: var(--text-muted);
    font-size: 0.76rem;
  }

  h2 {
    font-weight: 650;
    letter-spacing: -0.04em;
    font-size: clamp(1.15rem, 3vw, 1.6rem);
    line-height: 1.35;
  }

  h2 a {
    color: var(--text-strong);
    text-decoration: none;
  }

  h2 a:hover,
  h2 a:focus-visible {
    border-bottom: 1px solid var(--link-border-active);
  }

  @media (max-width: 720px) {
    .blog-page {
      padding: 1.5rem 1.25rem 3rem;
    }

    .blog-header,
    .entry {
      padding: 1.5rem 0;
    }
  }
</style>
