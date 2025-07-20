# Qwik Portfolio - Lee Dongwon

Interactive portfolio built with Qwik, featuring SSG, i18n support, and GSAP animations.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run qwik:dev

# Build for production (SSG)
npm run qwik:build
npm run qwik:build.server

# Preview production build
npm run qwik:preview
```

## 📁 Project Structure

```
src/
├── routes/                 # Qwik City routing
│   ├── [lang]/            # Language-specific routes
│   │   ├── index.tsx      # Main portfolio page
│   │   └── layout.tsx     # Language layout wrapper
│   ├── plugin.ts          # i18n middleware
│   ├── layout.tsx         # Root layout
│   └── index.tsx          # Root redirect
├── components/
│   ├── sections/          # Page sections
│   │   └── FirstView.tsx  # Hero section
│   ├── timeline/          # Timeline components
│   │   └── Timeline.tsx   # Interactive timeline
│   ├── ui/                # UI components
│   │   ├── Navigation.tsx # Navigation bar
│   │   └── LanguageSwitch.tsx # Language switcher
│   └── router-head/       # SEO component
├── lib/
│   ├── i18n/             # Internationalization
│   │   ├── speak-config.ts
│   │   └── speak-functions.ts
│   ├── gsap/             # GSAP integration
│   │   ├── use-gsap.ts
│   │   ├── use-scroll-trigger.ts
│   │   ├── use-timeline.ts
│   │   └── use-gsap-context.ts
│   └── stores/           # Global state
│       └── scroll.ts
├── i18n/                 # Translation files
│   ├── en-US/
│   ├── ko/
│   └── ja/
└── assets/               # Static assets
```

## 🌐 Internationalization

The portfolio supports three languages:
- English (en-US)
- Korean (ko)
- Japanese (ja)

Languages are automatically detected from browser preferences or can be manually selected.

## 🎨 Features

### ✨ Animations
- GSAP-powered animations with ScrollTrigger
- Smooth page transitions
- Interactive timeline component
- Parallax effects

### 🔧 Technical Features
- **Static Site Generation (SSG)** for optimal performance
- **Resumability** - No hydration needed
- **Progressive Enhancement** - Works without JavaScript
- **Lazy Loading** - Components load on demand
- **Type Safety** - Full TypeScript support

### 📱 Responsive Design
- Mobile-first approach
- Touch-friendly interactions
- Adaptive layouts

## 🛠️ Development

### Available Scripts

```bash
# Qwik specific commands
npm run qwik              # Run Qwik CLI
npm run qwik:add          # Add Qwik integrations
npm run qwik:build.types  # Type checking

# Original Svelte commands (preserved)
npm run dev               # Svelte dev server
npm run build             # Svelte build
npm run preview           # Svelte preview
```

### Environment Variables

Create a `.env` file for local development:
```env
PUBLIC_API_URL=https://api.example.com
```

### Adding New Components

1. Create component in appropriate directory
2. Use `component$()` wrapper
3. Import with `$` suffix for lazy loading
4. Add GSAP animations with provided hooks

Example:
```tsx
import { component$, useSignal } from '@builder.io/qwik';
import { useGSAP } from '~/lib/gsap';

export const MyComponent = component$(() => {
  const elementRef = useSignal<HTMLElement>();
  
  useGSAP((gsap) => {
    if (!elementRef.value) return;
    gsap.from(elementRef.value, { opacity: 0, y: 20 });
  }, [elementRef.value]);
  
  return <div ref={elementRef}>Content</div>;
});
```

## 📦 Deployment

### Cloudflare Pages

1. Build the project:
   ```bash
   npm run qwik:build.server
   ```

2. Deploy the `dist` directory

3. Configure routes in `_routes.json` if needed

### Environment-specific builds

```bash
# Production
NODE_ENV=production npm run qwik:build.server

# Staging
NODE_ENV=staging npm run qwik:build.server
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Unit tests
npm run test:unit

# E2E tests
npm run test:e2e
```

## 📄 License

MIT License - see LICENSE file for details

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 🐛 Known Issues

- GSAP animations may flicker on first load in dev mode
- Language switching preserves scroll position (by design)
- Timeline component requires minimum viewport width of 768px

## 📚 Resources

- [Qwik Documentation](https://qwik.builder.io/)
- [Qwik City](https://qwik.builder.io/docs/qwikcity/)
- [GSAP Documentation](https://greensock.com/docs/)
- [Qwik Speak](https://github.com/robisim74/qwik-speak)