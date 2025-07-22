# DongwonTTuna

개발자 이동원에 대한 포트폴리오 사이트입니다.

## 소개

이 사이트는 이동원의 개발 경력, 기술 스택, 프로젝트 및 연락처 정보를 포함하고 있습니다. 이력서와 포트폴리오를 한 곳에서 확인할 수 있습니다.

## 기술 스택

- **프론트엔드**: Qwik, Qwik City, TypeScript
- **스타일링**: Tailwind CSS
- **애니메이션**: GSAP
- **국제화(i18n)**: Qwik Speak
- **빌드**: Vite, Static Site Generation (SSG)
- **배포**: Cloudflare Pages

## 이력

- **이름**: 이동원
- **직업**: 풀스택 개발자
- **경력**: 1년
- **위치**: 일본, 도쿄
- **연락**:
  - 이메일: mailfortuna@gmail.com
  - 인스타그램: [@dongwonttuna](https://www.instagram.com/dongwonttuna/)
  - Github: [@DongwonTTuna](https://www.github.com/dongwonttuna)
- 현재 **株式会社ネクストビート**에서 풀스택 개발자로 근무 중입니다.

## 개발 서비스

- **RandomSeat**
  - 랜덤으로 좌석을 배정해주는 서비스입니다.
  - [서비스 바로가기](https://randomseat.dongwonttuna.com)
- **BiodenKR**
  - 주식회사 바이오덴의 공식 홈페이지입니다.
  - [서비스 바로가기](https://bioden.kr)

## 프로젝트 구조

- **src/routes/**
  - Qwik City의 파일 기반 라우팅
  - `[lang]/` - 다국어 지원을 위한 동적 라우팅
  - `index.tsx` - 각 라우트의 페이지 컴포넌트
  - `layout.tsx` - 레이아웃 컴포넌트
  - `plugin.ts` - 미들웨어 (i18n 설정 등)
- **src/components/**
  - 재사용 가능한 Qwik 컴포넌트 (.tsx)
  - `sections/` - 페이지 섹션 컴포넌트
  - `timeline/` - 타임라인 관련 컴포넌트
  - `ui/` - UI 컴포넌트 (Modal, SocialLinks 등)
  - `animations/` - 애니메이션 컴포넌트
- **src/lib/**
  - `i18n/` - Qwik Speak 설정 및 번역 함수
  - `stores/` - 전역 상태 관리
  - `utils/` - 유틸리티 함수
  - `hooks/` - 커스텀 훅
- **src/i18n/**
  - `en/`, `ko/`, `ja/` - 언어별 번역 파일
- **public/**
  - 정적 자산 (이미지, 폰트 등)
- **adapters/static/**
  - SSG 어댑터 설정

## 프로젝트 실행

```bash
# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# SSG 빌드 (정적 사이트 생성)
npm run build.server

# 빌드 미리보기
npm run preview

# 번역 추출
npm run qwik-speak-extract
```

## 마이그레이션 정보

이 프로젝트는 Svelte 5에서 Qwik으로 마이그레이션되었습니다.
- **성능 향상**: Qwik의 resumability로 초기 로딩 속도 개선
- **번들 크기 감소**: 자동 코드 분할로 ~1KB 초기 JS
- **SEO 최적화**: SSG를 통한 완전한 정적 사이트 생성
- **다국어 지원**: Qwik Speak를 통한 향상된 i18n
