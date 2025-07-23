import { $, component$, useSignal, useStyles$ } from "@builder.io/qwik"
import { useLocation, useNavigate } from "@builder.io/qwik-city"
import { inlineTranslate } from "qwik-speak"
import { languages } from "~/lib/i18n/speak-config"

interface Language {
  lang: string
  label: string
  flag: string
}

const languageOptions: Language[] = [
  { lang: "en", label: "English", flag: "🇺🇸" },
  { lang: "ko", label: "한국어", flag: "🇰🇷" },
  { lang: "ja", label: "日本語", flag: "🇯🇵" }
]

export const LanguageSwitch = component$(() => {
  useStyles$(`
    .language-switch {
      position: relative;
    }

    .language-button {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      background: transparent;
      border: 1px solid #e5e5e5;
      border-radius: 8px;
      cursor: pointer;
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--qwik-primary-color);
      transition: all 0.2s ease;
    }

    .language-button:hover {
      border-color: var(--qwik-primary-color);
    }

    .language-flag {
      font-size: 1.25rem;
      line-height: 1;
    }

    .chevron {
      transition: transform 0.2s ease;
    }

    .chevron.is-open {
      transform: rotate(180deg);
    }

    .language-dropdown {
      position: absolute;
      top: calc(100% + 0.5rem);
      right: 0;
      min-width: 150px;
      background: white;
      border: 1px solid #e5e5e5;
      border-radius: 8px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      padding: 0.5rem;
      z-index: 10;
    }

    .language-option {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      width: 100%;
      padding: 0.5rem;
      background: transparent;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--qwik-primary-color);
      text-align: left;
      transition: background 0.2s ease;
    }

    .language-option:hover {
      background: #f5f5f5;
    }

    .language-option.is-active {
      background: #f0f0f0;
      font-weight: 600;
    }

    .check-icon {
      margin-left: auto;
      color: #10b981;
    }
  `)

  const t = inlineTranslate()
  const location = useLocation()
  const _navigate = useNavigate()
  const isOpen = useSignal(false)

  const currentLang = location.url.pathname.split("/")[1] || "en"
  const currentLanguage = languageOptions.find((lang) => lang.lang === currentLang) || languageOptions[0]

  const toggleDropdown = $(() => {
    isOpen.value = !isOpen.value
  })

  const selectLanguage = $((lang: string) => {
    const currentPath = location.url.pathname
    const pathParts = currentPath.split("/")
    pathParts[1] = lang
    const newPath = pathParts.join("/")

    // 페이지 새로고침으로 언어 변경
    window.location.href = newPath
  })

  return (
    <div class='language-switch'>
      <button
        class='language-button'
        onClick$={toggleDropdown}
        aria-label={t("app.aria.language_selector")}
        aria-expanded={isOpen.value}
      >
        <span class='language-flag'>{currentLanguage.flag}</span>
        <span class='language-label'>{currentLanguage.label}</span>
        <svg
          class={`chevron ${isOpen.value ? "is-open" : ""}`}
          width='12'
          height='12'
          viewBox='0 0 12 12'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M3 4.5L6 7.5L9 4.5'
            stroke='currentColor'
            stroke-width='2'
            stroke-linecap='round'
            stroke-linejoin='round'
          />
        </svg>
      </button>

      {isOpen.value && (
        <div class='language-dropdown'>
          {languageOptions.map((option) => (
            <button
              key={option.lang}
              class={`language-option ${option.lang === currentLang ? "is-active" : ""}`}
              onClick$={() => selectLanguage(option.lang)}
            >
              <span class='language-flag'>{option.flag}</span>
              <span class='language-label'>{option.label}</span>
              {option.lang === currentLang && (
                <svg
                  class='check-icon'
                  width='16'
                  height='16'
                  viewBox='0 0 16 16'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M13.5 4.5L6 12L2.5 8.5'
                    stroke='currentColor'
                    stroke-width='2'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                  />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
})
