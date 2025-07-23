import { $, component$, useSignal, useStyles$ } from "@builder.io/qwik"
import { Link, useLocation } from "@builder.io/qwik-city"
import { inlineTranslate } from "qwik-speak"
import { LanguageSwitch } from "./LanguageSwitch"

interface NavItem {
  key: string
  href: string
}

export const Navigation = component$(() => {
  const t = inlineTranslate()
  const location = useLocation()
  const isMenuOpen = useSignal(false)
  const currentLang = location.url.pathname.split("/")[1] || "en"

  useStyles$(`
    .navigation {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
      box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
      z-index: 1000;
      transition: transform 0.3s ease;
    }

    .nav-wrapper {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 60px;
    }

    .nav-brand {
      font-weight: bold;
      font-size: 1.25rem;
      text-decoration: none;
      color: var(--qwik-primary-color);
    }

    .menu-toggle {
      display: none;
      background: none;
      border: none;
      cursor: pointer;
      padding: 0.5rem;
    }

    .hamburger {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .hamburger span {
      display: block;
      width: 24px;
      height: 2px;
      background: var(--qwik-primary-color);
      transition: transform 0.3s ease;
    }

    .nav-menu {
      display: flex;
      align-items: center;
      gap: 2rem;
    }

    .nav-list {
      display: flex;
      list-style: none;
      margin: 0;
      padding: 0;
      gap: 2rem;
    }

    .nav-link {
      text-decoration: none;
      color: var(--qwik-primary-color);
      font-weight: 500;
      transition: opacity 0.3s ease;
      position: relative;
    }

    .nav-link:hover {
      opacity: 0.7;
    }

    .nav-link.is-active::after {
      content: '';
      position: absolute;
      bottom: -4px;
      left: 0;
      right: 0;
      height: 2px;
      background: var(--qwik-primary-color);
    }

    /* Mobile Styles */
    @media (max-width: 768px) {
      .menu-toggle {
        display: block;
      }

      .nav-menu {
        position: fixed;
        top: 60px;
        left: 0;
        right: 0;
        background: white;
        box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
        transform: translateY(-100%);
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        padding: 2rem;
      }

      .nav-menu.is-active {
        transform: translateY(0);
        opacity: 1;
        visibility: visible;
      }

      .nav-list {
        flex-direction: column;
        gap: 1rem;
      }

      .nav-actions {
        margin-top: 2rem;
        padding-top: 2rem;
        border-top: 1px solid #eee;
      }
    }
  `)

  const navItems: NavItem[] = [
    { key: "home", href: `/${currentLang}/` },
    { key: "about", href: `/${currentLang}/#about` },
    { key: "projects", href: `/${currentLang}/#projects` },
    { key: "contact", href: `/${currentLang}/#contact` }
  ]

  const toggleMenu = $(() => {
    isMenuOpen.value = !isMenuOpen.value
  })

  return (
    <nav class='navigation' role='navigation'>
      <div class='container'>
        <div class='nav-wrapper'>
          {/* Logo/Brand */}
          <Link href={`/${currentLang}/`} class='nav-brand'>
            <span class='brand-text'>Lee Dongwon</span>
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            class='menu-toggle'
            onClick$={toggleMenu}
            aria-label={t("app.aria.menu_toggle")}
            aria-expanded={isMenuOpen.value}
          >
            <span class='hamburger'>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>

          {/* Navigation Menu */}
          <div class={`nav-menu ${isMenuOpen.value ? "is-active" : ""}`}>
            <ul class='nav-list'>
              {navItems.map((item) => (
                <li key={item.key} class='nav-item'>
                  <Link href={item.href} class={`nav-link ${location.url.pathname === item.href ? "is-active" : ""}`}>
                    {t(`app.nav.${item.key}`)}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Language Switcher */}
            <div class='nav-actions'>
              <LanguageSwitch />
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
})
