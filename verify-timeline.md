# Timeline 검증 가이드

## 구현 완료 사항

1. **카드 제거**: Timeline에서 모든 content-card를 제거하고 노드 서클만 표시
2. **Timeline 위치**: 섹션 상단에 배치 (margin-top: 4rem)
3. **EventCarousel 추가**: 하단에 현재 년도의 이벤트를 표시하는 카루셀
4. **월별 하이라이트**: 스크롤 시 해당 월의 카드가 자동으로 하이라이트

## 주요 변경사항

### Timeline.tsx
- timeline-container height를 100vh에서 200px로 변경
- currentMonth 상태 추가
- EventCarousel 컴포넌트 임포트 및 추가

### TimelineNode.tsx  
- content-card 관련 코드 모두 제거
- branch-line 높이를 6rem에서 3rem으로 축소
- 노드 서클만 표시되도록 수정

### TimelinePointer.tsx
- 위치를 중앙에서 상단으로 이동 (top: calc(4rem + 100px))
- 년도와 월을 함께 표시 (예: "2023년 8월")
- 화살표 방향을 아래로 변경

### EventCarousel.tsx (신규)
- 현재 년도의 이벤트만 필터링하여 표시
- 4개의 카드를 카루셀 형태로 표시
- 현재 월에 해당하는 카드 자동 하이라이트
- 부드러운 스크롤 및 호버 효과

## Playwright 테스트 실행 방법

```bash
# 의존성 설치
npm install --save-dev @playwright/test

# Playwright 브라우저 설치
npx playwright install

# 테스트 실행
npm run test:e2e

# 또는 직접 실행
npx playwright test

# UI 모드로 실행 (추천)
npx playwright test --ui

# 특정 테스트만 실행
npx playwright test timeline.spec.ts
```

## 수동 검증 체크리스트

1. [ ] Timeline이 섹션 상단에 위치하는가?
2. [ ] 카드가 모두 제거되고 노드 서클만 보이는가?
3. [ ] 하단에 EventCarousel이 표시되는가?
4. [ ] 스크롤 시 년도/월이 업데이트되는가?
5. [ ] 해당 월의 카드가 하이라이트되는가?
6. [ ] 카루셀 카드 호버 효과가 작동하는가?
7. [ ] 모바일에서 수평 스크롤이 가능한가?
8. [ ] 카테고리별 색상이 올바르게 표시되는가?

## 테스트 커버리지

- ✅ Timeline 위치 검증
- ✅ 카드 제거 확인
- ✅ EventCarousel 표시 확인
- ✅ 스크롤 시 년도/월 업데이트
- ✅ 카드 하이라이트 기능
- ✅ 호버 효과
- ✅ 모바일 대응
- ✅ 카테고리 색상
- ✅ 성능 (60fps)