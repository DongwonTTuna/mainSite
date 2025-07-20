import { component$, useStyles$ } from '@builder.io/qwik';
import type { DocumentHead, StaticGenerateHandler } from '@builder.io/qwik-city';
import { inlineTranslate } from 'qwik-speak';
import { config } from '~/lib/i18n/speak-config';
import { FirstView } from '~/components/sections/FirstView';
import { Timeline } from '~/components/timeline/Timeline';

/**
 * Main portfolio page component
 */
export default component$(() => {
  const t = inlineTranslate();
  
  useStyles$(`
    .about-section,
    .contact-section {
      padding: 5rem 0;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .about-section {
      background: #ffffff;
    }

    .contact-section {
      background: #f8f9fa;
    }

    section h2 {
      font-size: 2.5rem;
      font-weight: 800;
      text-align: center;
      margin-bottom: 3rem;
      color: #2d3748;
    }
  `);
  
  return (
    <>
      {/* Hero Section */}
      <FirstView />
      
      {/* About Section */}
      <section id="about" class="about-section">
        <div class="container">
          <h2>{t('app.nav.about')}</h2>
          {/* About content will be added */}
        </div>
      </section>
      
      {/* Projects Timeline */}
      <Timeline />
      
      {/* Contact Section */}
      <section id="contact" class="contact-section">
        <div class="container">
          <h2>{t('app.nav.contact')}</h2>
          {/* Contact form will be added */}
        </div>
      </section>
    </>
  );
});

/**
 * Generate static pages for all supported languages
 */
export const onStaticGenerate: StaticGenerateHandler = () => {
  return {
    params: config.supportedLocales.map(locale => ({
      lang: locale.lang !== config.defaultLocale.lang ? locale.lang : '.'
    }))
  };
};

/**
 * Document head configuration
 */
export const head: DocumentHead = ({ params }) => {
  const lang = params.lang || 'en-US';
  
  const titles: Record<string, string> = {
    'en-US': 'Lee Dongwon - Interactive Portfolio',
    'ko': '이동원 - 인터랙티브 포트폴리오',
    'ja': 'イ・ドンウォン - インタラクティブポートフォリオ'
  };
  
  const descriptions: Record<string, string> = {
    'en-US': 'Interactive portfolio showcasing creative works and projects',
    'ko': '창의적인 작품과 프로젝트를 소개하는 인터랙티브 포트폴리오',
    'ja': 'クリエイティブな作品とプロジェクトを紹介するインタラクティブポートフォリオ'
  };
  
  return {
    title: titles[lang] || titles['en-US'],
    meta: [
      {
        name: 'description',
        content: descriptions[lang] || descriptions['en-US'],
      },
      {
        property: 'og:title',
        content: titles[lang] || titles['en-US'],
      },
      {
        property: 'og:description',
        content: descriptions[lang] || descriptions['en-US'],
      },
      {
        property: 'og:type',
        content: 'website',
      },
      {
        property: 'og:locale',
        content: lang.replace('-', '_'),
      },
    ],
    links: [
      {
        rel: 'alternate',
        hreflang: 'en-US',
        href: 'https://dongwontuna.net/en-US/',
      },
      {
        rel: 'alternate',
        hreflang: 'ko',
        href: 'https://dongwontuna.net/ko/',
      },
      {
        rel: 'alternate',
        hreflang: 'ja',
        href: 'https://dongwontuna.net/ja/',
      },
      {
        rel: 'alternate',
        hreflang: 'x-default',
        href: 'https://dongwontuna.net/',
      },
    ],
  };
};