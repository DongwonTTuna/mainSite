import { component$ } from "@builder.io/qwik"
import type { DocumentHead, StaticGenerateHandler } from "@builder.io/qwik-city"
import { ContactSection } from "~/components/sections/ContactSection"
import { FirstView } from "~/components/sections/FirstView"
import { Timeline } from "~/components/timeline/Timeline"
import { config } from "~/lib/i18n/speak-config"

/**
 * Main portfolio page component
 */
export default component$(() => {
  return (
    <>
      {/* Hero Section */}
      <FirstView />

      {/* Timeline Section */}
      <Timeline />

      {/* Contact Section */}
      <ContactSection />
    </>
  )
})

/**
 * Generate static pages for all supported languages
 */
export const onStaticGenerate: StaticGenerateHandler = () => {
  return {
    params: config.supportedLocales.map((locale) => ({
      lang: locale.lang !== config.defaultLocale.lang ? locale.lang : "."
    }))
  }
}

/**
 * Document head configuration
 */
export const head: DocumentHead = ({ params }) => {
  const lang = params.lang || "en"

  const titles: Record<string, string> = {
    en: "Lee Dongwon - Interactive Portfolio",
    ko: "이동원 - 인터랙티브 포트폴리오",
    ja: "イ・ドンウォン - インタラクティブポートフォリオ"
  }

  const descriptions: Record<string, string> = {
    en: "Interactive portfolio showcasing creative works and projects",
    ko: "창의적인 작품과 프로젝트를 소개하는 인터랙티브 포트폴리오",
    ja: "クリエイティブな作品とプロジェクトを紹介するインタラクティブポートフォリオ"
  }

  return {
    title: titles[lang] || titles["en"],
    meta: [
      {
        name: "description",
        content: descriptions[lang] || descriptions["en"]
      },
      {
        property: "og:title",
        content: titles[lang] || titles["en"]
      },
      {
        property: "og:description",
        content: descriptions[lang] || descriptions["en"]
      },
      {
        property: "og:type",
        content: "website"
      },
      {
        property: "og:locale",
        content: lang.replace("-", "_")
      }
    ],
    links: [
      {
        rel: "alternate",
        hreflang: "en",
        href: "https://dongwontuna.net/en/"
      },
      {
        rel: "alternate",
        hreflang: "ko",
        href: "https://dongwontuna.net/ko/"
      },
      {
        rel: "alternate",
        hreflang: "ja",
        href: "https://dongwontuna.net/ja/"
      },
      {
        rel: "alternate",
        hreflang: "x-default",
        href: "https://dongwontuna.net/"
      }
    ]
  }
}
