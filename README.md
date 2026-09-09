# DongwonTTuna

Svelte 5 / SvelteKit 기반 개인 포트폴리오입니다. 기존 한국어·영어·일본어 프로필과
한국어 블로그를 유지하면서, 브랜드 참치를 실제 3D 조형과 물감 웰컴 효과로 표현합니다.

## 실행

```sh
bun install --frozen-lockfile
bun run dev --host 127.0.0.1
```

한국어는 `http://127.0.0.1:5173/ko`, 영어는 `/`, 일본어는 `/ja`에서 확인합니다.
언어 선택은 기존 쿠키 정책을 따르며 JavaScript를 꺼도 동작합니다.

## 구성

- `src/lib/presentation/components/tuna/`: Three.js 렌더러, Svelte attachment 수명 관리, SVG 물감 효과.
- `src/lib/presentation/sections/`: 웰컴, 소개, 프로젝트, 경력, 기술 섹션.
- `src/lib/infrastructure/i18n/home-section-text.ts`: 다국어 UI 및 접근성 문구.
- `src/lib/domain/profile/content/`: 기존 프로필과 경력의 다국어 콘텐츠.
- `assets/blender/dongwon-tuna.blend`: 부위별 메시와 포스터용 카메라·조명을 담은 편집 원본.
- `assets/blender/generate_tuna.py`: Blender 기본 Python API와 공식 glTF exporter를 사용하는 생성기.
- `static/models/dongwon-tuna.glb`: 웹용 3D 모델, 3 MB 미만의 양면 PBR 입체 모델 (사진 텍스처 없음).
- `static/images/tuna-poster.webp`: 같은 모델의 투명 1000×1000 렌더, 약 75 KB.

참고 그림의 색과 실루엣을 입체 조형으로 재해석했습니다. 사진을 평면에 붙인 모델이 아닙니다.
물감은 가벼운 SVG 붓 자국·입자 애니메이션이며, 유체 시뮬레이션을 실행하지 않습니다.
프로젝트의 그림은 구현 영역을 설명하는 도식으로, 실제 제품 화면을 가장하지 않습니다.
원본 참고 사진은 외부 서비스에 업로드하지 않았습니다.

### Svelte와 3D의 경계

`TunaStage`는 화면 상태만 `$state`로 관리하고 상태 문구는 `$derived`로 계산합니다.
렌더러 컨트롤러는 반응형 객체가 아닌 일반 참조이며, 회전·카메라·프레임 상태는
`create-tuna-scene.ts` 안에만 둡니다. 매 프레임 Svelte 상태를 갱신하지 않습니다.
표준 `{@attach}`가 캔버스 연결과 해제를 소유하고, 초기 연결의 `untrack`은 버튼·물결 상태
변경이 비싼 3D 초기화를 다시 실행하지 않게 합니다. 모델 요청 취소, 관찰자·이벤트 정리,
GPU 자원 해제도 이 수명에 맞춥니다. 설명문·언어 전환을 위해 별도 전역 상태를 만들지 않습니다.
내비게이션은 공통 헤더가 소유하며 홈 데이터에 중복 직렬화하지 않습니다. 다른 언어 홈에서
한국어 블로그로 넘어갈 때는 LanguageSwitcher와 같은 문서 탐색 방식을 사용해
레이아웃 locale와 `html.lang`이 본문 언어와 함께 바뀌게 합니다.

## 모션·성능·접근성

- 본문과 포스터는 서버에서 바로 표시합니다. 강제 인트로, 로딩 장벽, 스크롤 잠금이 없습니다.
- 참치 영역이 보일 때만 3D 모듈과 GLB를 불러옵니다. 포스터는 첫 3D 프레임이 준비될 때까지 유지합니다.
- 물감 웰컴은 한 번 펼쳐지고 끝납니다. `다시 보기`로 재생하고 `멈추기`로 참치와 물감을 멈춥니다. 버튼 이름도 각 언어로 표시합니다.
- 참치는 커서를 따라 가볍게 기울며 꼬리를 움직입니다. 터치 화면에서는 스크롤을 가로채지 않습니다.
- 참치 영역에서 커서를 움직이면 그 위치에 작은 물결이 퍼집니다. 최대 6개로 제한하고 애니메이션이 끝나면 제거합니다. 일시정지·모션 감소 설정을 따르며 별도 설명문은 표시하지 않습니다.
- 렌더링은 최대 30 fps / pixel ratio 1.6으로 제한합니다. 화면 밖·숨긴 탭·일시정지 상태에서는 렌더 루프를 멈춥니다.
- `prefers-reduced-motion` 또는 브라우저 데이터 절약 설정이 켜지면 3D를 요청하지 않습니다.
- WebGL 생성 실패·컨텍스트 손실·모델 오류·12초 로딩 제한 시 같은 모델의 정적 렌더로 대체합니다.
- 페이지 이동 시 fetch, observer, 이벤트 리스너, GPU 자원을 정리합니다.
- 언어·본문 건너뛰기·재생 제어는 키보드로 사용할 수 있습니다.

Three.js와 glTF loader는 초기 본문과 분리된 지연 로딩 청크입니다. 현재 청크는 약 604 KB
(gzip 약 153 KB)로 Vite의 500 KB 안내가 발생합니다. 경고 한도를 올려 숨기지 않았습니다.
모션 감소·데이터 절약·블로그만 방문하는 경우에는 이 청크를 내려받지 않습니다.

## 검증

```sh
bun run verify
```

`verify`는 Svelte 타입·접근성 검사, Biome, Bun 단위 테스트, Cloudflare adapter 빌드를 실행합니다.
이 명령은 3D 외형이나 브라우저 동작을 검증하지 않습니다. 브라우저 작업은 설치된
`ego-browser` 스킬과 `~/.codex/runbooks/ego-browser.md`에 따라 ego lite로 수행합니다.
로컬 검증은 `bun run preview --host 127.0.0.1 --port 4173`으로 빌드 결과를 제공하고,
참고 그림과 실제 화면 캡처를 비교합니다. 정면·커서 회전·꼬리 움직임에서 얼굴, 실루엣,
색과 지느러미를 확인하고, 데스크톱·모바일 크기에서 재생·일시정지·모션 감소·데이터 절약·
fallback·언어 전환·블로그 왕복·키보드 접근성을 확인합니다.
기존 `e2e/*.pw.ts`는 Bun 단위 테스트에 포함되지 않으며, 에이전트가 별도 Playwright
브라우저를 실행하는 경로로 사용하지 않습니다. 실제 휴대폰 GPU와 운영 환경의 네트워크 성능은
별도 확인 대상입니다. 코드 검사 통과나 모델 생성 성공을 시각적 승인으로 간주하지 않습니다.

Blender 수정과 재생성은 `assets/blender/README.md`를 따릅니다.
수동으로 편집한 `.blend`는 생성기를 다시 실행하기 전에 다른 이름으로 보관해야 합니다.

## 프로덕션 배포

기존 Cloudflare Pages 프로젝트는 `mainsite`이며 운영 도메인은 `https://dongwontuna.net`입니다.
기본 Pages 주소 `https://mainsite-6l5.pages.dev`도 같은 프로덕션을 제공합니다.
배포 직전 Wrangler 인증, 프로젝트의 프로덕션 브랜치와 연결 도메인을 확인합니다.
로컬 빌드만으로 운영 사이트가 바뀌지는 않습니다.

```sh
bun run verify
bunx wrangler whoami
bunx wrangler pages project list
```

프로덕션 브랜치가 `main`인 것을 확인한 후 검증한 산출물을 직접 배포합니다.

```sh
bunx wrangler pages deploy .svelte-kit/cloudflare \
  --project-name mainsite --branch main --commit-dirty=true \
  --commit-message "Blender tuna welcome and cursor ripples"
```

Cloudflare adapter 출력은 `build/`가 아니라 `.svelte-kit/cloudflare`입니다.
Blender 작업 중 웹에 필요한 `models/dongwon-tuna.glb`와 `images/tuna-poster.webp`가 포함됩니다.
편집 원본 `.blend`와 참고 사진은 공개 정적 파일로 올리지 않습니다.
배포 후 운영 주소에서 페이지·모델·포스터의 HTTP 응답을 확인하고, ego lite에서 실제
WebGL·커서 효과·언어 전환과 모바일 크기를 다시 확인합니다. 운영 화면도 캡처하여 참고 그림 및
검증한 로컬 결과와 비교합니다.

직접 업로드는 GitHub 소스를 갱신하지 않습니다. 이후 Git 연동 배포가 이전 소스로 덮어쓰지 않도록,
커밋·push는 별도 승인 후 수행합니다. 인증이 만료되면 사용자 본인이 `bunx wrangler login`의
로그인·2단계 인증·권한 승인을 완료해야 합니다. 토큰이나 인증 코드를 문서·대화에 붙여 넣지 않습니다.
