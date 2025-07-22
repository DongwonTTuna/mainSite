## Project Overview
이 프로젝트는 Qwik Framework를 사용한 정적 사이트 생성(SSG) 포트폴리오입니다.

## Tech Stack
- **Framework**: Qwik + Qwik City
- **Rendering**: Static Site Generation (SSG)
- **Styling**: Tailwind CSS
- **Animation**: GSAP (useVisibleTask$로 통합)
- **i18n**: Qwik Speak
- **Language**: TypeScript

## Key Qwik Patterns
1. **Components**: `component$()` 사용, .tsx 확장자
2. **State**: `useSignal()`, `useStore()` 사용 (Svelte runes 대체)
3. **Computed**: `useComputed$()` 사용
4. **Effects**: `useVisibleTask$()` for client-side, `useTask$()` for SSR
5. **Events**: `onClick$` 같은 $ suffix 필수

## Important Considerations
- **No Hydration**: Qwik은 resumability 사용 - hydration 없음
- **Lazy Loading**: 모든 것이 자동으로 lazy load됨
- **$ Suffix**: 모든 lazy-loadable 함수는 $ suffix 필요
- **GSAP**: 반드시 useVisibleTask$ 내부에서만 사용
- **SSG Routes**: onStaticGenerate로 정적 경로 생성

## i18n Structure
- `/src/routes/[lang]/` - 언어별 라우팅
- `qwik-speak` 사용 - Paraglide 대체
- 지원 언어: en, ko, ja

## Build Commands
```bash
npm run dev          # 개발 서버
npm run build        # 프로덕션 빌드  
npm run build.server # SSG 빌드
npm run preview      # 빌드 미리보기
```

## 주의사항
테일윈드는 절대 쓰지말 것.