# Content Security Policy (CSP) Guide for Qwik

## 이슈 설명

Qwik의 resumability 아키텍처는 컴포넌트 상태와 이벤트 리스너를 HTML에 직접 시리얼라이즈하기 위해 인라인 스크립트를 생성합니다. 이는 전통적인 hydration 기반 프레임워크와 다른 접근방식입니다.

## CSP 에러 해결 방법

### 1. 현재 구현 (권장)

`src/utils/csp-config.ts`에서 중앙화된 CSP 설정을 관리합니다:

- **개발 환경**: `'unsafe-inline'` 사용으로 편리한 개발 경험
- **프로덕션**: SHA-256 해시를 사용한 엄격한 CSP

### 2. 해시 업데이트 방법

빌드 후 새로운 인라인 스크립트가 추가되면:

1. 빌드 실행:
   ```bash
   npm run build
   npm run build.server
   ```

2. CSP 해시 수집:
   ```bash
   node scripts/collect-csp-hashes.js
   ```

3. 출력된 해시를 `src/utils/csp-config.ts`의 `QWIK_SCRIPT_HASHES` 배열에 추가

### 3. frame-ancestors 경고

`frame-ancestors` 지시어는 meta 태그에서 작동하지 않습니다. HTTP 헤더에서만 설정 가능합니다:
- 개발/프리뷰: `src/routes/plugin.ts`에서 자동 설정
- 프로덕션 (SSG): 웹 서버 설정에서 헤더 추가 필요

### 4. 대안적 접근

포트폴리오 사이트처럼 민감한 데이터를 다루지 않는 경우:

```typescript
// src/utils/csp-config.ts
directives['script-src'] = "'self' 'wasm-unsafe-eval' 'unsafe-inline'";
```

이렇게 설정하면 개발과 프로덕션 모두에서 인라인 스크립트가 허용됩니다.

## 추가 리소스

- [Qwik CSP Documentation](https://qwik.dev/docs/advanced/csp/)
- [MDN CSP Reference](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)