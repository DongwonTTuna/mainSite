<script lang="ts">
  import type { BlogArticle } from "#domain/blog/types";

  type InlineSegment = {
    text: string;
    kind: "text" | "strong" | "code";
  };

  let { article }: { article: BlogArticle } = $props();

  function getNextMarkerIndex(text: string, start: number) {
    const strongIndex = text.indexOf("**", start);
    const codeIndex = text.indexOf("`", start);

    if (strongIndex === -1) {
      return codeIndex;
    }

    if (codeIndex === -1) {
      return strongIndex;
    }

    return Math.min(strongIndex, codeIndex);
  }

  function parseInlineText(text: string): InlineSegment[] {
    const segments: InlineSegment[] = [];
    let cursor = 0;

    while (cursor < text.length) {
      if (text.startsWith("**", cursor)) {
        const closingIndex = text.indexOf("**", cursor + 2);

        if (closingIndex !== -1) {
          segments.push({
            kind: "strong",
            text: text.slice(cursor + 2, closingIndex),
          });
          cursor = closingIndex + 2;
          continue;
        }
      }

      if (text.startsWith("`", cursor)) {
        const closingIndex = text.indexOf("`", cursor + 1);

        if (closingIndex !== -1) {
          segments.push({
            kind: "code",
            text: text.slice(cursor + 1, closingIndex),
          });
          cursor = closingIndex + 1;
          continue;
        }
      }

      const nextMarkerIndex = getNextMarkerIndex(text, cursor + 1);
      segments.push({
        kind: "text",
        text:
          nextMarkerIndex === -1
            ? text.slice(cursor)
            : text.slice(cursor, nextMarkerIndex),
      });
      cursor = nextMarkerIndex === -1 ? text.length : nextMarkerIndex;
    }

    return segments;
  }
</script>

<main class="blog-page" id="main-content" tabindex="-1">
  <article class="shell">
    <header class="article-header">
      <nav class="article-nav" aria-label="블로그 내비게이션">
        <a href="/ko/blog">Blog</a>
        <a href="/ko/">Home</a>
      </nav>
      <div class="article-meta">
        <time datetime={article.publishedAt}>{article.publishedAt}</time>
        <span>{article.author}</span>
      </div>
      <h1>{article.title}</h1>
    </header>

    <div class="article-body">
      {#each article.blocks as block}
        {#if block.type === "heading"}
          <h2>{block.text}</h2>
        {:else}
          <p>
            {#each parseInlineText(block.text) as segment}
              {#if segment.kind === "strong"}
                <strong>{segment.text}</strong>
              {:else if segment.kind === "code"}
                <code>{segment.text}</code>
              {:else}
                {segment.text}
              {/if}
            {/each}
          </p>
        {/if}
      {/each}
    </div>
  </article>
</main>

<style>
  .blog-page {
    min-height: 100dvh;
    padding: 3rem clamp(1.25rem, 4vw, 3rem) 5rem;
  }

  .shell {
    width: min(760px, 100%);
    margin: 0 auto;
    background: var(--page-background);
  }

  .article-header {
    display: grid;
    gap: 1.25rem;
    padding: 1.25rem 0 2.5rem;
    border-bottom: 1px solid var(--surface-border);
  }

  .article-nav {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem 1rem;
  }

  .article-nav a {
    color: var(--link-color);
    border-bottom: 1px solid var(--link-border);
    padding-bottom: 0.1rem;
    text-decoration: none;
    transition:
      color 120ms ease,
      border-color 120ms ease;
  }

  .article-nav a:hover,
  .article-nav a:focus-visible {
    color: var(--text-strong);
    border-color: var(--link-border-active);
  }

  .article-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem 1rem;
    color: var(--text-muted);
    font-size: 0.76rem;
  }

  h1 {
    color: var(--text-strong);
    font-size: clamp(2rem, 5vw, 3rem);
    line-height: 1.35;
    letter-spacing: -0.045em;
    font-weight: 700;
    word-break: keep-all;
    overflow-wrap: anywhere;
  }

  .article-body {
    display: grid;
    gap: 1.5rem;
    padding: 2.5rem 0;
  }

  .article-body h2 {
    font-weight: 650;
    letter-spacing: -0.04em;
    color: var(--text-strong);
    font-size: clamp(1.35rem, 3vw, 1.9rem);
    line-height: 1.35;
    margin-top: 1.75rem;
  }

  .article-body h2:first-child {
    margin-top: 0;
  }

  .article-body p {
    color: var(--text-body);
    font-size: 1.04rem;
    line-height: 1.95;
    word-break: keep-all;
    overflow-wrap: anywhere;
  }

  strong {
    color: var(--text-strong);
    font-weight: 700;
  }

  code {
    border: 1px solid var(--surface-border);
    background: color-mix(in srgb, var(--surface-border) 35%, transparent);
    color: var(--text-strong);
    padding: 0.05rem 0.25rem;
    font-family: var(--font-mono);
    font-size: 0.92em;
  }

  @media (max-width: 720px) {
    .blog-page {
      padding: 1.5rem 1.25rem 3rem;
    }

    .article-header,
    .article-body {
      padding: 1.5rem 0;
    }

    .article-body p {
      word-break: normal;
    }
  }
</style>
