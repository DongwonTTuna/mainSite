# DongwonTTuna
개발자 이동원에 대한 포트폴리오 사이트입니다.

## 소개

이 사이트는 이동원의 개발 경력, 기술 스택, 프로젝트 및 연락처 정보를 포함하고 있습니다. 이력서와 포트폴리오를 한 곳에서 확인할 수 있습니다.

## 기술 스택
- **프론트엔드**: Svelte, SvelteKit, Typescript
- **백엔드**: Node.js, Express
- **데이터베이스**: MySQL

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
- **src/views**
  - 각 페이지의 Svelte 컴포넌트가 위치합니다.
- **src/views/common**
  - 공통적으로 사용되는 레이아웃, 헤더, 푸터 등의 컴포넌트가 위치합니다.
- **src/views/pages**
  - 각 페이지별로 컴포넌트가 위치합니다.
  - 각 페이지는 Svelte 컴포넌트로 작성되어 있으며, 라우팅에 따라 자동으로 매핑됩니다.
  - src/routes/+page.svelte의 경우, src/views/pages/Page.svelte로 이동합니다.
- **src/views/**/_components**
  - 재사용 가능한 컴포넌트들이 위치합니다.
- **src/views/**/_images**
  - 이미지 파일들이 위치합니다.
- **src/views/**/_types**
  - 페이지에서 사용하는 타입 정의가 위치합니다.
- **src/lib**
  - 유틸리티 함수, 타입 정의 등 공통적으로 사용되는 코드가 위치합니다.
- **src/routes/api**
  - API 엔드포인트가 정의되어 있습니다.
  - 예: `/api/contact`는 연락처 폼 제출을 처리합니다.
- **src/routes**
  - SvelteKit의 라우팅 설정이 포함되어 있습니다.
