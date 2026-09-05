import { expect, type Route, test } from "@playwright/test";

test("cursor ripples are visible, pauseable, and cleared after playback", async ({
  page,
}) => {
  let modelRequests = 0;
  page.on("request", (request) => {
    if (request.url().endsWith("/models/dongwon-tuna.glb")) modelRequests += 1;
  });
  await page.goto("/ko");
  const animationTiming = await page.addStyleTag({
    content:
      ".tuna-stage .cursor-ripples .cursor-ripple { animation-duration: 60s; }",
  });
  const stage = page.locator(".tuna-stage");
  await stage.scrollIntoViewIfNeeded();
  await expect(stage).toHaveAttribute("data-scene-state", "ready");
  await expect(stage.locator(".stage-status")).toBeEmpty();
  const canvas = stage.locator("canvas");
  const bounds = await canvas.boundingBox();
  if (!bounds) throw new Error("The 3D artwork has no visible bounds");
  await page.mouse.move(
    bounds.x + bounds.width * 0.25,
    bounds.y + bounds.height * 0.25,
  );
  const ripples = stage.locator(".cursor-ripple");
  await expect(ripples).toHaveCount(1);
  await expect(ripples.first()).toHaveCSS("animation-duration", "60s");
  await expect
    .poll(() =>
      ripples
        .first()
        .evaluate((ripple) => Number(getComputedStyle(ripple).opacity)),
    )
    .toBeGreaterThan(0.1);
  await page.getByRole("button", { name: "움직임 멈추기" }).click();
  await expect(ripples.first()).toHaveCSS("animation-play-state", "paused");
  const pausedCount = await ripples.count();
  await page.mouse.move(
    bounds.x + bounds.width * 0.75,
    bounds.y + bounds.height * 0.75,
  );
  await expect(ripples).toHaveCount(pausedCount);
  await page.getByRole("button", { name: "물감 효과 다시 보기" }).click();
  await expect(ripples).toHaveCount(0);
  await page.mouse.move(
    bounds.x + bounds.width * 0.4,
    bounds.y + bounds.height * 0.4,
  );
  await expect(ripples).toHaveCount(1);
  await animationTiming.evaluate((style) => style.remove());
  await ripples.evaluateAll((elements) =>
    Promise.all(
      elements.flatMap((element) =>
        element.getAnimations().map((animation) => animation.finished),
      ),
    ),
  );
  await expect(ripples).toHaveCount(0);
  await expect(stage).not.toContainText("ORIGINAL COLORS");
  expect(modelRequests).toBe(1);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(stage).toHaveAttribute("data-scene-state", "reduced");
  await page.mouse.move(
    bounds.x + bounds.width * 0.6,
    bounds.y + bounds.height * 0.6,
  );
  await expect(ripples).toHaveCount(0);
});

test("GPU setup failure releases the context and preserves the poster", async ({
  page,
}) => {
  await page.addInitScript(() => {
    const failRendering = () => {
      throw new Error("Simulated GPU initialization failure");
    };
    WebGL2RenderingContext.prototype.drawArrays = failRendering;
    WebGL2RenderingContext.prototype.drawElements = failRendering;
  });
  await page.goto("/ko");
  const artwork = page.locator(".tuna-stage");
  await artwork.scrollIntoViewIfNeeded();
  await expect(artwork).toHaveAttribute("data-scene-state", "fallback");
  await expect(artwork.getByRole("img")).toHaveCSS("opacity", "1");
  expect(
    await artwork
      .locator("canvas")
      .evaluate((canvas: HTMLCanvasElement) =>
        canvas.getContext("webgl2")?.isContextLost(),
      ),
  ).toBe(true);
});

test("a motion preference change cancels an in-flight model", async ({
  page,
}) => {
  const pending = new Promise<Route>((resolve) => {
    void page.route("**/models/dongwon-tuna.glb", resolve, { times: 1 });
  });
  await page.goto("/ko");
  const artwork = page.locator(".tuna-stage");
  await artwork.scrollIntoViewIfNeeded();
  const request = await pending;
  await expect(artwork).toHaveAttribute("data-scene-state", "loading");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await request.abort("aborted");
  await expect(artwork).toHaveAttribute("data-scene-state", "reduced");
  await expect(artwork.getByRole("button")).toHaveCount(0);
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await expect(artwork).toHaveAttribute("data-scene-state", "ready");
});

test("navigation is not blocked by a pending model download", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  const pending = new Promise<Route>((resolve) => {
    void page.route("**/models/dongwon-tuna.glb", resolve, { times: 1 });
  });
  await page.goto("/ko");
  await page.locator(".tuna-stage").scrollIntoViewIfNeeded();
  const request = await pending;
  await expect(page.locator(".tuna-stage")).toHaveAttribute(
    "data-scene-state",
    "loading",
  );
  await page
    .getByRole("navigation", { name: "섹션", exact: true })
    .getByRole("link", { name: "블로그" })
    .click();
  await request.abort("aborted");
  await expect(page).toHaveURL(/\/ko\/blog$/);
  await page
    .getByRole("link", { name: "DongwonTTuna — Home", exact: true })
    .click();
  await page.locator(".tuna-stage").scrollIntoViewIfNeeded();
  await expect(page.locator(".tuna-stage")).toHaveAttribute(
    "data-scene-state",
    "ready",
  );
  expect(errors).toEqual([]);
});

test("real 3D loads, motion can pause, and paint can replay", async ({
  page,
}, testInfo) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/ko");
  const artwork = page.locator(".tuna-stage");
  await artwork.scrollIntoViewIfNeeded();
  await expect(artwork).toHaveAttribute("data-scene-state", "ready");
  await page.evaluate(() =>
    Promise.all(
      document.getAnimations().map((animation) => animation.finished),
    ),
  );
  await expect(
    page
      .getByRole("button", { name: "물감 효과 다시 보기" })
      .locator(".control-word"),
  ).toHaveText("다시 보기");
  await page.getByRole("button", { name: "움직임 멈추기" }).click();
  await expect(
    page.getByRole("button", { name: "움직임 재생하기" }),
  ).toHaveAttribute("aria-pressed", "true");
  await page.screenshot({
    path: testInfo.outputPath("home.png"),
    fullPage: true,
  });
  await page.getByRole("button", { name: "물감 효과 다시 보기" }).click();
  await expect(
    page.getByRole("button", { name: "움직임 멈추기" }),
  ).toHaveAttribute("aria-pressed", "false");
  expect(
    await page.evaluate(() =>
      document
        .getAnimations()
        .some((animation) => animation.playState === "running"),
    ),
  ).toBe(true);
  await page.getByRole("link", { name: "프로젝트 살펴보기" }).click();
  await expect(page).toHaveURL(/#projects$/);
  await expect(
    page.getByRole("heading", { name: "최근 작업" }),
  ).toBeInViewport();
  expect(errors).toEqual([]);
});

test("model failure keeps the artwork and the portfolio usable", async ({
  page,
}) => {
  await page.route("**/models/dongwon-tuna.glb", (route) =>
    route.fulfill({ status: 503, body: "Unavailable" }),
  );
  await page.goto("/ko");
  const artwork = page.locator(".tuna-stage");
  await artwork.scrollIntoViewIfNeeded();
  await expect(artwork).toHaveAttribute("data-scene-state", "fallback");
  await expect(artwork.getByRole("img")).toHaveCSS("opacity", "1");
  expect(
    await artwork
      .getByRole("img")
      .evaluate((image: HTMLImageElement) => image.naturalWidth),
  ).toBe(1000);
  await expect(artwork.getByRole("button")).toHaveCount(0);
  await page.getByRole("link", { name: "프로젝트 살펴보기" }).click();
  await expect(
    page.getByRole("heading", { name: "최근 작업" }),
  ).toBeInViewport();
});

test("WebGL context loss returns to the original render", async ({ page }) => {
  await page.goto("/ko");
  const artwork = page.locator(".tuna-stage");
  await artwork.scrollIntoViewIfNeeded();
  await expect(artwork).toHaveAttribute("data-scene-state", "ready");
  await artwork.locator("canvas").evaluate((canvas: HTMLCanvasElement) => {
    const context = canvas.getContext("webgl2");
    const extension = context?.getExtension("WEBGL_lose_context");
    if (!extension)
      throw new Error("The browser does not expose context loss simulation");
    extension.loseContext();
  });
  await expect(artwork).toHaveAttribute("data-scene-state", "fallback");
  await expect(artwork.getByRole("img")).toHaveCSS("opacity", "1");
});

test("reduced motion never requests 3D and honors preference changes", async ({
  page,
}) => {
  const models: string[] = [];
  page.on("request", (request) => {
    if (request.url().endsWith(".glb")) models.push(request.url());
  });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/ko");
  const artwork = page.locator(".tuna-stage");
  await artwork.scrollIntoViewIfNeeded();
  await expect(artwork).toHaveAttribute("data-scene-state", "reduced");
  await page.waitForLoadState("networkidle");
  expect(models).toEqual([]);
  expect(await page.evaluate(() => document.getAnimations().length)).toBe(0);
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await expect(artwork).toHaveAttribute("data-scene-state", "ready");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(artwork).toHaveAttribute("data-scene-state", "reduced");
  await expect(artwork.getByRole("img")).toHaveCSS("opacity", "1");
});

test("data saver uses only the static illustration", async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "connection", {
      configurable: true,
      value: Object.assign(new EventTarget(), { saveData: true }),
    });
  });
  const models: string[] = [];
  page.on("request", (request) => {
    if (request.url().endsWith(".glb")) models.push(request.url());
  });
  await page.goto("/ko");
  await expect(page.locator(".tuna-stage")).toHaveAttribute(
    "data-scene-state",
    "save-data",
  );
  await page.waitForLoadState("networkidle");
  expect(models).toEqual([]);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "기술에 깊이를,경험에 색을.",
  );
});

test("language switching preserves the portfolio and localized controls", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/ko");
  await page.getByRole("link", { name: "Change language to EN" }).click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Depth in code.A splash of color.",
  );
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await page.getByRole("link", { name: "Change language to JA" }).click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "技術に深みを、体験に彩りを。",
  );
  await expect(page.locator("html")).toHaveAttribute("lang", "ja");
  await expect(page.getByText("動きを抑える設定 · 静止画")).toBeVisible();
});

for (const { language, blogLabel } of [
  { language: "EN", blogLabel: "Blog" },
  { language: "JA", blogLabel: "ブログ" },
] as const) {
  test(`${language} home to Korean blog keeps document and header locale aligned`, async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/ko");
    await page
      .getByRole("link", { name: `Change language to ${language}` })
      .click();
    await expect(page.locator("html")).toHaveAttribute(
      "lang",
      language.toLowerCase(),
    );
    await page
      .locator(".navigation")
      .getByRole("link", { name: blogLabel })
      .click();
    await expect(page).toHaveURL(/\/ko\/blog$/);
    await expect(page.locator("html")).toHaveAttribute("lang", "ko");
    const navigation = page.getByRole("navigation", {
      name: "섹션",
      exact: true,
    });
    await expect(navigation.getByRole("link", { name: "경력" })).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Change language to KO" }),
    ).toHaveAttribute("aria-current", "true");
    await page.locator(".article-list h2 a").first().click();
    await expect(page.locator(".article-body p").first()).toBeVisible();
    const home = page.getByRole("link", {
      name: "DongwonTTuna — Home",
      exact: true,
    });
    await expect(home).toHaveAttribute("href", "/ko/");
    await home.click();
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "기술에 깊이를,경험에 색을.",
    );
    await expect(page.locator("html")).toHaveAttribute("lang", "ko");
  });
}

test("blog navigation returns to a working home scene", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/ko");
  const artwork = page.locator(".tuna-stage");
  await artwork.scrollIntoViewIfNeeded();
  await expect(artwork).toHaveAttribute("data-scene-state", "ready");
  await page
    .getByRole("navigation", { name: "섹션", exact: true })
    .getByRole("link", { name: "블로그" })
    .click();
  await expect(page).toHaveURL(/\/ko\/blog$/);
  await page.locator(".article-list h2 a").first().click();
  await expect(page.locator(".article-body p").first()).toBeVisible();
  await page
    .getByRole("link", { name: "DongwonTTuna — Home", exact: true })
    .click();
  await artwork.scrollIntoViewIfNeeded();
  await expect(artwork).toHaveAttribute("data-scene-state", "ready");
  expect(errors).toEqual([]);
});

test("narrow screens retain all sections without horizontal overflow", async ({
  page,
}, testInfo) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 320, height: 780 });
  await page.goto("/ko");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  for (const section of ["intro", "projects", "experience", "skills"]) {
    await expect(page.locator(`#${section}`)).toBeVisible();
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(
    320,
  );
  await page.screenshot({
    path: testInfo.outputPath("narrow.png"),
    fullPage: true,
  });
});

test("keyboard users can skip directly to the content", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/ko");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "본문으로 건너뛰기" }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("#main-content")).toBeFocused();
});

test.describe("without JavaScript", () => {
  test.use({ javaScriptEnabled: false });
  test("the artwork, content, anchors and language links still work", async ({
    page,
  }) => {
    await page.goto("/ko");
    const artwork = page.locator(".tuna-stage");
    await expect(artwork).toHaveAttribute("data-scene-state", "static");
    expect(await artwork.getByRole("img").getAttribute("src")).toBe(
      "/images/tuna-poster.webp",
    );
    await page.getByRole("link", { name: "프로젝트 살펴보기" }).click();
    await expect(page).toHaveURL(/#projects$/);
    await page.getByRole("link", { name: "Change language to EN" }).click();
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "Depth in code.A splash of color.",
    );
  });
});
