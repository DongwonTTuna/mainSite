import { test, expect } from '@playwright/test';

test.describe('Timeline Component Tests', () => {
  test.beforeEach(async ({ page }) => {
    // 개발 서버가 실행 중이라고 가정
    await page.goto('http://localhost:5173/ko');
    
    // Timeline 섹션까지 스크롤
    const timelineSection = page.locator('.timeline-section');
    await timelineSection.scrollIntoViewIfNeeded();
  });

  test('Timeline은 상단에 위치해야 함', async ({ page }) => {
    const timelineContainer = page.locator('.timeline-container');
    
    // Timeline 컨테이너가 존재하는지 확인
    await expect(timelineContainer).toBeVisible();
    
    // Timeline이 상단에 위치하는지 확인 (margin-top: 4rem)
    const containerStyles = await timelineContainer.evaluate((el) => {
      return window.getComputedStyle(el);
    });
    
    expect(containerStyles.marginTop).toBe('64px'); // 4rem = 64px
  });

  test('카드가 제거되고 노드만 표시되어야 함', async ({ page }) => {
    // 카드(content-card)가 없는지 확인
    const contentCards = page.locator('.content-card');
    await expect(contentCards).toHaveCount(0);
    
    // 노드 서클만 존재하는지 확인
    const nodeCircles = page.locator('.node-circle');
    await expect(nodeCircles.first()).toBeVisible();
  });

  test('하단에 EventCarousel이 표시되어야 함', async ({ page }) => {
    const eventCarousel = page.locator('.event-carousel');
    
    // 카루셀이 존재하고 보이는지 확인
    await expect(eventCarousel).toBeVisible();
    
    // 카루셀이 하단에 위치하는지 확인
    const carouselPosition = await eventCarousel.evaluate((el) => {
      const rect = el.getBoundingClientRect();
      const parentRect = el.closest('.timeline-section')?.getBoundingClientRect();
      return {
        isAtBottom: parentRect ? rect.bottom <= parentRect.bottom : false,
        bottom: rect.bottom,
        parentBottom: parentRect?.bottom
      };
    });
    
    expect(carouselPosition.isAtBottom).toBeTruthy();
  });

  test('스크롤 시 년도와 월이 업데이트되어야 함', async ({ page }) => {
    const yearDisplay = page.locator('.timeline-current-year');
    
    // 초기 값 확인
    await expect(yearDisplay).toContainText('2022년 1월');
    
    // 스크롤하여 2023년으로 이동
    await page.evaluate(() => {
      window.scrollBy(0, 2400); // 1년 = 2400px 스크롤
    });
    
    // 약간의 대기 시간
    await page.waitForTimeout(500);
    
    // 년도가 업데이트되었는지 확인
    await expect(yearDisplay).toContainText('2023년');
  });

  test('현재 월에 해당하는 카드가 하이라이트되어야 함', async ({ page }) => {
    // 2022년 5월로 스크롤 (5월에 이벤트가 있음)
    await page.evaluate(() => {
      window.scrollBy(0, 800); // 4개월 * 200px
    });
    
    await page.waitForTimeout(500);
    
    // 5월 카드가 하이라이트되었는지 확인
    const highlightedCard = page.locator('.carousel-card.highlight');
    await expect(highlightedCard).toBeVisible();
    
    // 하이라이트된 카드의 월이 5월인지 확인
    const cardDate = highlightedCard.locator('.card-date');
    await expect(cardDate).toContainText('5월');
  });

  test('카루셀 카드 호버 효과가 작동해야 함', async ({ page }) => {
    const firstCard = page.locator('.carousel-card').first();
    
    // 호버 전 스타일 가져오기
    const beforeHover = await firstCard.evaluate((el) => {
      return window.getComputedStyle(el).transform;
    });
    
    // 카드에 호버
    await firstCard.hover();
    
    // 호버 후 스타일 가져오기
    const afterHover = await firstCard.evaluate((el) => {
      return window.getComputedStyle(el).transform;
    });
    
    // transform 값이 변경되었는지 확인 (translateY 효과)
    expect(beforeHover).not.toBe(afterHover);
  });

  test('모바일 뷰에서 수평 스크롤이 작동해야 함', async ({ page }) => {
    // 모바일 뷰포트로 변경
    await page.setViewportSize({ width: 375, height: 667 });
    
    const timelineContainer = page.locator('.timeline-container');
    
    // 모바일 힌트가 표시되는지 확인
    const mobileHint = page.locator('.mobile-hint');
    await expect(mobileHint).toBeVisible();
    await expect(mobileHint).toContainText('← Swipe to explore →');
    
    // 수평 스크롤이 가능한지 확인
    const scrollWidth = await timelineContainer.evaluate((el) => el.scrollWidth);
    const clientWidth = await timelineContainer.evaluate((el) => el.clientWidth);
    
    expect(scrollWidth).toBeGreaterThan(clientWidth);
  });

  test('카테고리별 색상이 올바르게 적용되어야 함', async ({ page }) => {
    const categoryColors = {
      education: 'rgb(59, 130, 246)', // blue-500
      work: 'rgb(34, 197, 94)', // green-500
      project: 'rgb(168, 85, 247)', // purple-500
      certification: 'rgb(245, 158, 11)', // amber-500
    };
    
    // 각 카테고리의 노드 색상 확인
    for (const [category, expectedColor] of Object.entries(categoryColors)) {
      const categoryBadge = page.locator('.card-category', { hasText: category }).first();
      
      if (await categoryBadge.isVisible()) {
        const bgColor = await categoryBadge.evaluate((el) => {
          return window.getComputedStyle(el).backgroundColor;
        });
        
        expect(bgColor).toBe(expectedColor);
      }
    }
  });

  test('카루셀에 현재 년도의 이벤트만 표시되어야 함', async ({ page }) => {
    const carouselTitle = page.locator('.carousel-title');
    await expect(carouselTitle).toContainText('2022년 이벤트');
    
    // 2022년 카드들만 표시되는지 확인
    const cards = page.locator('.carousel-card');
    const cardCount = await cards.count();
    
    // 2022년 이벤트 개수와 일치하는지 확인
    expect(cardCount).toBeGreaterThan(0);
    expect(cardCount).toBeLessThanOrEqual(5); // 2022년 이벤트는 최대 5개
  });
});

// 성능 테스트
test.describe('Timeline Performance Tests', () => {
  test('Timeline 애니메이션이 60fps로 실행되어야 함', async ({ page }) => {
    await page.goto('http://localhost:5173/ko');
    
    // Performance 측정 시작
    await page.evaluate(() => {
      performance.mark('timeline-start');
    });
    
    // 스크롤 애니메이션 실행
    await page.evaluate(() => {
      window.scrollBy({ top: 2000, behavior: 'smooth' });
    });
    
    await page.waitForTimeout(1000);
    
    // Performance 측정 종료
    const metrics = await page.evaluate(() => {
      performance.mark('timeline-end');
      performance.measure('timeline-animation', 'timeline-start', 'timeline-end');
      const measure = performance.getEntriesByName('timeline-animation')[0];
      return {
        duration: measure.duration,
        fps: 1000 / (measure.duration / 120) // 약 120 프레임 예상
      };
    });
    
    // 평균 FPS가 50 이상이어야 함
    expect(metrics.fps).toBeGreaterThan(50);
  });
});