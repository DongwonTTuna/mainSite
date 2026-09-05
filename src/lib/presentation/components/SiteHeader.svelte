<script lang="ts">
  import { buildHomeNavigation } from "#application/home/build-home-navigation";
  import { getHomeSectionText } from "#infrastructure/i18n/home-section-text";
  import { type AppLocale, localizePath } from "#infrastructure/i18n/locale";
  import { getLocalizedHomeSectionHref } from "#infrastructure/routing/anchors";
  import LanguageSwitcher from "#presentation/components/LanguageSwitcher.svelte";
  import TunaMark from "#presentation/components/TunaMark.svelte";
  import { page } from "$app/state";

  let { locale }: { locale: AppLocale } = $props();
  let navigation = $derived(buildHomeNavigation(locale));
  let text = $derived(getHomeSectionText(locale));
</script>

<a class="skip-link" href="#main-content">{text.skipLabel}</a>
<header class="site-header">
  <div class="header-inner content-width">
    <a class="brand" href={localizePath(page.url, locale, "/")} aria-label="DongwonTTuna — Home">
      <span class="brand-mark"><TunaMark /></span>
      <span>Dongwon<span class="brand-accent">TTuna</span><span class="brand-period">.</span></span>
    </a>
    <nav class="navigation" aria-label={navigation.ariaLabel}>
      {#each navigation.items as item (item.id)}
        <a href={item.id === "blog" ? item.href : getLocalizedHomeSectionHref(page.url, locale, item.id)}
          data-sveltekit-reload={item.id === "blog" && locale !== "ko"}
        >{item.label}{#if item.id === "blog"}<span aria-hidden="true">↗</span>{/if}</a>
      {/each}
    </nav>
    <LanguageSwitcher {locale} />
  </div>
</header>

<style>
  .site-header { position: sticky; top: 0; z-index: 30; background: color-mix(in srgb, var(--page-background) 95%, transparent); backdrop-filter: blur(16px); border-bottom: 1px solid var(--surface-border); }
  .header-inner { display: flex; align-items: center; gap: 2.5rem; min-height: 88px; }
  .brand { display: inline-flex; align-items: center; gap: 0.65rem; margin-right: auto; color: var(--text-strong); text-decoration: none; font-size: 1.12rem; font-weight: 750; letter-spacing: -0.055em; white-space: nowrap; }
  .brand-mark { width: 34px; color: var(--accent); transform: rotate(-16deg); }
  .brand-accent { font-weight: 450; }
  .brand-period { color: var(--accent); }
  .navigation { display: flex; gap: 1.75rem; }
  .navigation a { display: inline-flex; align-items: center; gap: 0.35rem; min-height: 44px; color: var(--text-body); font-size: 0.83rem; font-weight: 550; text-decoration: none; transition: color 160ms ease; }
  .navigation a:hover, .navigation span { color: var(--accent); }
  .skip-link { position: fixed; z-index: 50; top: 0.5rem; left: 1rem; padding: 0.8rem 1rem; transform: translateY(-160%); background: var(--text-strong); color: white; }
  .skip-link:focus { transform: translateY(0); }
  @media (max-width: 900px) {
    .header-inner { gap: 1.25rem; }
    .navigation { gap: 1rem; }
  }
  @media (max-width: 660px) {
    .header-inner { flex-wrap: wrap; gap: 0; min-height: 108px; padding-top: 0.6rem; }
    .brand { font-size: 1.05rem; }
    .brand-mark { width: 30px; }
    .navigation { order: 3; width: 100%; justify-content: space-between; gap: 1rem; }
    .navigation a { font-size: 0.76rem; }
  }
</style>
