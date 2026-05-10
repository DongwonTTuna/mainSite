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
    </header>

    <main class="article-list" aria-label="블로그 글 목록">
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
    padding: clamp(4.5rem, 8vw, 5.5rem) clamp(1rem, 4vw, 3rem)
      clamp(1.5rem, 4vw, 3rem);
  }

  .shell {
    width: min(920px, 100%);
    margin: 0 auto;
    border: 1px solid var(--surface-border);
    background: var(--surface-elevated);
    box-shadow: 0 30px 120px color-mix(in srgb, black 55%, transparent);
  }

  .blog-header {
    display: grid;
    gap: 0.65rem;
    padding: 1.25rem;
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
    outline: none;
  }

  .section-label {
    color: var(--text-muted);
    font-size: 0.76rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  h1 {
    color: var(--text-strong);
    font-size: clamp(2rem, 5vw, 3rem);
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
    padding: 1.25rem;
    background: var(--surface-elevated);
  }

  .meta-row {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem 1rem;
    color: var(--text-muted);
    font-size: 0.76rem;
  }

  h2 {
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
    outline: none;
  }

  @media (max-width: 720px) {
    .blog-page {
      padding: 4.25rem 1rem 1rem;
    }

    .blog-header,
    .entry {
      padding: 1rem;
    }
  }
</style>
