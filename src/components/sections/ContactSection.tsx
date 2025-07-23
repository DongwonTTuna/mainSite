import { component$, useSignal, useStyles$, useVisibleTask$ } from "@builder.io/qwik"
import { inlineTranslate } from "qwik-speak"
import { SocialLinks } from "~/components/ui/SocialLinks"
import { personalInfo } from "~/data/personal-info"

export const ContactSection = component$(() => {
  const t = inlineTranslate()
  useStyles$(`
    .contact-section {
      position: relative;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var(--color-gray-50);
    }

    .contact-container {
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1rem;
      text-align: center;
    }

    .contact-headline {
      font-size: 3rem;
      font-weight: bold;
      color: var(--color-gray-800);
      margin-bottom: 2rem;
    }

    .email-section {
      margin-bottom: 3rem;
    }

    .email-link {
      display: inline-flex;
      align-items: center;
      gap: 0.75rem;
      font-size: 1.5rem;
      color: var(--color-gray-700);
      transition: color 300ms;
    }

    .email-link:hover {
      color: var(--color-blue-600);
    }

    .email-icon {
      width: 2rem;
      height: 2rem;
    }

    .email-text {
      text-underline-offset: 4px;
    }

    .email-text:hover {
      text-decoration: underline;
    }

    .social-section {
      margin-bottom: 4rem;
    }

    .message-section {
      font-size: 1.125rem;
      color: var(--color-gray-600);
      max-width: 32rem;
      margin: 0 auto;
      line-height: 1.6;
    }

    .bg-decoration {
      position: absolute;
      inset: 0;
      overflow: hidden;
      pointer-events: none;
    }

    .decoration-circle-1 {
      position: absolute;
      top: -50%;
      right: -50%;
      width: 24rem;
      height: 24rem;
      background-color: #3b82f6;
      opacity: 0.05;
      border-radius: 50%;
      filter: blur(96px);
    }

    .decoration-circle-2 {
      position: absolute;
      bottom: -50%;
      left: -50%;
      width: 24rem;
      height: 24rem;
      background-color: #8b5cf6;
      opacity: 0.05;
      border-radius: 50%;
      filter: blur(96px);
    }

    /* Responsive styles */
    @media (min-width: 640px) {
      .contact-container {
        padding: 0 1.5rem;
      }

      .contact-headline {
        font-size: 3.75rem;
      }

      .email-link {
        font-size: 1.5rem;
      }
    }

    @media (min-width: 768px) {
      .contact-headline {
        font-size: 4.5rem;
      }
    }

    @media (min-width: 1024px) {
      .contact-container {
        padding: 0 2rem;
      }
    }
  `)

  const sectionRef = useSignal<HTMLElement>()
  const headlineRef = useSignal<HTMLElement>()
  const emailRef = useSignal<HTMLElement>()
  const socialRef = useSignal<HTMLElement>()
  const messageRef = useSignal<HTMLElement>()

  useVisibleTask$(async () => {
    const { gsap } = await import("gsap")
    const { ScrollTrigger } = await import("gsap/ScrollTrigger")

    gsap.registerPlugin(ScrollTrigger)

    if (!sectionRef.value) return

    // Animate elements on scroll
    const elements = [headlineRef.value, emailRef.value, socialRef.value, messageRef.value].filter(Boolean)

    gsap.from(elements, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.value,
        start: "top 80%",
        end: "top 50%",
        toggleActions: "play none none reverse"
      }
    })
  })

  return (
    <section ref={sectionRef} id='contact' class='contact-section'>
      <div class='contact-container'>
        {/* Headline */}
        <h2 ref={headlineRef} class='contact-headline'>
          {t("app.contact.title")}
        </h2>

        {/* Email */}
        <div ref={emailRef} class='email-section'>
          <a href={`mailto:${personalInfo.email}`} class='email-link'>
            <svg
              class='email-icon'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                stroke-linecap='round'
                stroke-linejoin='round'
                stroke-width='2'
                d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
              />
            </svg>
            <span class='email-text'>{personalInfo.email}</span>
          </a>
        </div>

        {/* Social Links */}
        <div ref={socialRef} class='social-section'>
          <SocialLinks variant='center' size='large' />
        </div>

        {/* Thank you message */}
        <p ref={messageRef} class='message-section'>
          {t("app.contact.message")}
        </p>

        {/* Background decoration */}
        <div class='bg-decoration'>
          <div class='decoration-circle-1' />
          <div class='decoration-circle-2' />
        </div>
      </div>
    </section>
  )
})
