import { $, component$, useSignal, useStyles$, useVisibleTask$ } from "@builder.io/qwik"
import { useNavigate } from "@builder.io/qwik-city"
import { inlineTranslate } from "qwik-speak"

interface IntroCTAProps {
  class?: string
}

export const IntroCTA = component$<IntroCTAProps>((props) => {
  const containerRef = useSignal<HTMLDivElement>()
  const t = inlineTranslate()
  const _nav = useNavigate()

  useStyles$(`
    .intro-cta {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 2rem;
      padding: 3rem 1.5rem;
      opacity: 0;
    }

    .cta-button {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 1rem 2.5rem;
      font-size: 1.1rem;
      font-weight: 600;
      text-decoration: none;
      border-radius: 50px;
      transition: all 0.3s ease;
      cursor: pointer;
      overflow: hidden;
      opacity: 0;
      transform: translateY(20px);
    }

    .cta-primary {
      background: linear-gradient(135deg, #667eea, #764ba2);
      color: white;
      border: none;
    }

    .cta-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
    }

    .cta-primary::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
      transition: left 0.5s;
    }

    .cta-primary:hover::before {
      left: 100%;
    }

    .cta-secondary {
      background: transparent;
      color: var(--text-primary);
      border: 2px solid rgba(255,255,255,0.3);
      backdrop-filter: blur(10px);
    }

    .cta-secondary:hover {
      border-color: rgba(255,255,255,0.6);
      background: rgba(255,255,255,0.1);
      transform: translateY(-2px);
      box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    }

    .cta-icon {
      margin-left: 0.5rem;
      transition: transform 0.3s ease;
    }

    .cta-button:hover .cta-icon {
      transform: translateX(5px);
    }

    @media (max-width: 640px) {
      .intro-cta {
        flex-direction: column;
        gap: 1rem;
      }

      .cta-button {
        width: 100%;
        max-width: 280px;
        padding: 0.875rem 2rem;
        font-size: 1rem;
      }
    }
  `)

  const handleProjectsClick = $(() => {
    // Scroll to projects section
    const projectsSection = document.getElementById("projects")
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth" })
    }
  })

  const handleContactClick = $(() => {
    // Scroll to contact section
    const contactSection = document.getElementById("contact")
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" })
    }
  })

  useVisibleTask$(() => {
    if (!containerRef.value) return

    const loadGSAP = async () => {
      const { gsap } = await import("gsap")

      // Animate container
      gsap.to(".intro-cta", {
        opacity: 1,
        duration: 0.8,
        ease: "power2.out"
      })

      // Animate buttons with stagger
      gsap.to(".cta-button", {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.2,
        ease: "power2.out",
        delay: 0.2
      })

      // Add hover animation
      const buttons = document.querySelectorAll(".cta-button")
      buttons.forEach((button) => {
        button.addEventListener("mouseenter", () => {
          gsap.to(button, {
            scale: 1.05,
            duration: 0.2,
            ease: "power2.out"
          })
        })

        button.addEventListener("mouseleave", () => {
          gsap.to(button, {
            scale: 1,
            duration: 0.2,
            ease: "power2.out"
          })
        })
      })
    }

    loadGSAP()
  })

  return (
    <div ref={containerRef} class={`intro-cta ${props.class || ""}`}>
      <button class='cta-button cta-primary' onClick$={handleProjectsClick} aria-label={t("app.intro.cta.primary")}>
        {t("app.intro.cta.primary")}
        <span class='cta-icon'>→</span>
      </button>
      <button class='cta-button cta-secondary' onClick$={handleContactClick} aria-label={t("app.intro.cta.secondary")}>
        {t("app.intro.cta.secondary")}
        <span class='cta-icon'>→</span>
      </button>
    </div>
  )
})
