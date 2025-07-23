import { component$ } from "@builder.io/qwik"
import { isDev } from "@builder.io/qwik/build"
import { QwikCityProvider, RouterOutlet, ServiceWorkerRegister } from "@builder.io/qwik-city"
import { useQwikSpeak, useSpeakLocale } from "qwik-speak"
import { RouterHead } from "./components/router-head/router-head"
import { config } from "./lib/i18n/speak-config"
import { translationFn } from "./lib/i18n/speak-functions"

import "./global.css"

export default component$(() => {
  /**
   * The root of a QwikCity site always start with the <QwikCityProvider> component,
   * immediately followed by the document's <head> and <body>.
   *
   * Don't remove the `<head>` and `<body>` elements.
   */

  /**
   * Init Qwik Speak
   */
  useQwikSpeak({ config, translationFn })
  const locale = useSpeakLocale()

  return (
    <QwikCityProvider>
      <head>
        <meta charset='utf-8' />
        {!isDev && <link rel='manifest' href={`${import.meta.env.BASE_URL}manifest.json`} />}
        <RouterHead />
      </head>
      <body lang={locale.lang}>
        <RouterOutlet />
        {!isDev && <ServiceWorkerRegister />}
      </body>
    </QwikCityProvider>
  )
})
