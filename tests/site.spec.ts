import { test, expect } from "@playwright/test";

async function readyForScreenshot(page: import("@playwright/test").Page) {
  for (const img of await page.locator("img").all()) {
    await img.scrollIntoViewIfNeeded();
    await expect
      .poll(() =>
        img.evaluate(
          (el: HTMLImageElement) => el.complete && el.naturalWidth > 0,
        ),
      )
      .toBe(true);
    await img.evaluate((el: HTMLImageElement) => el.decode());
  }
  await page.evaluate(async () => {
    await document.fonts.ready;
    window.scrollTo({ top: 0, behavior: "instant" });
    await new Promise<void>((resolve) =>
      requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
    );
  });
  // Allow the compositor to repaint images brought back into view by scrolling.
  await page.waitForTimeout(200);
}

test("routes, images, theme persistence, history, and missing projects", async ({
  page,
}) => {
  const failures: string[] = [];
  page.on("pageerror", (error) => failures.push(error.message));
  await page.goto("/");
  await expect(page.locator("h1")).toHaveAccessibleName(
    "Asterisk Design Studio.",
  );
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.getByRole("button", { name: "Switch to light mode" }).click();
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await expect(page.locator(".team-card")).toHaveCount(6);
  await expect(page.locator(".team-card img")).toHaveCount(6);
  await expect(
    page.getByRole("heading", { name: "Meet the team." }),
  ).toHaveCount(1);
  await expect(page.locator(".service-row")).toHaveCount(4);
  await expect(
    page.getByRole("heading", { name: "Mission", exact: true }),
  ).toBeVisible();
  await page
    .getByRole("link", { name: "View Scene 3_1.png", exact: true })
    .click();
  await expect(page).toHaveURL(/\/projects\/project-01$/);
  await expect(page.locator("h1")).toHaveText(
    "Asterisk Design Studio Headquarters.",
  );
  await expect(page.locator("main")).toBeFocused();
  await page.goBack();
  await expect(page.locator("h1")).toHaveAccessibleName(
    "Asterisk Design Studio.",
  );
  for (const route of [
    "/projects",
    "/about",
    "/contact",
    "/projects/project-01",
  ]) {
    await page.goto(route);
    await expect(page.locator("h1")).toBeVisible();
    for (const img of await page.locator("main img").all()) {
      await img.scrollIntoViewIfNeeded();
      await expect
        .poll(() =>
          img.evaluate(
            (el: HTMLImageElement) => el.complete && el.naturalWidth > 0,
          ),
        )
        .toBe(true);
    }
  }
  await page.goto("/projects/missing");
  await expect(page.locator("h1")).toHaveText("Project not found");
  await page.goto("/missing");
  await expect(page.locator("h1")).toHaveText("Page not found");
  expect(failures).toEqual([]);
});

test("portfolio entries, floor plans, and magazine use the final assets", async ({
  page,
}) => {
  await page.goto("/projects");
  await expect(page.locator(".portfolio-card")).toHaveCount(9);
  await page.getByRole("link", { name: /Monreal Residence 1/ }).click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Monreal Residence 1",
  );
  await expect(page.locator(".project-intro")).toContainText("Tarlac City");
  await page.getByRole("link", { name: "Back to Projects" }).click();
  await page.getByRole("link", { name: /Monreal Residence 2/ }).click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Monreal Residence 2",
  );
  await expect(page.locator(".project-intro")).toContainText("Makati City");
  await page.goto("/projects/project-01");
  await page.getByRole("button", { name: "Second floor", exact: true }).click();
  const plan = page.getByRole("dialog", { name: "Second floor" });
  await expect(
    plan.getByRole("link", { name: "Open full-size drawing" }),
  ).toHaveAttribute("href", /plan-second\.png$/);
  await page.keyboard.press("Escape");
  await expect(plan).toBeHidden();
  await page.goto("/magazine");
  await expect(page.getByRole("status")).toHaveText("Page 1 of 32");
  await page.locator(".book-stage").hover();
  await page.mouse.wheel(0, 180);
  await expect(page.getByRole("status")).toHaveText("Page 2 of 32");
  await expect(
    page.getByAltText("Asterisk Design Studio magazine, page 3"),
  ).toBeVisible();
  await page
    .getByLabel("Jump to a chapter")
    .selectOption({ label: "The studio mark" });
  await expect(page.getByRole("status")).toHaveText("Page 32 of 32");
});

test("gallery jumps to the chosen render and video loads only on request", async ({
  page,
}) => {
  const videoRequests: string[] = [];
  page.on("request", (request) => {
    if (request.url().endsWith("/firm-walkthrough-v2.mp4"))
      videoRequests.push(request.url());
  });
  await page.goto("/");
  const play = page.getByRole("button", { name: "Play walkthrough" });
  await play.scrollIntoViewIfNeeded();
  expect(videoRequests).toEqual([]);
  await play.click();
  await expect
    .poll(() => page.locator("video").evaluate((video) => video.readyState))
    .toBeGreaterThan(0);
  expect(videoRequests.length).toBeGreaterThan(0);
  await page.getByRole("button", { name: /Open actual studio/ }).click();
  await expect(
    page.getByRole("dialog", { name: "Render gallery" }),
  ).toBeVisible();
  await page
    .getByRole("dialog", { name: "Render gallery" })
    .getByRole("link", { name: "Image(13).png", exact: true })
    .click();
  await expect(page).toHaveURL(/project-01#view-image-13$/);
  const view = page.locator("#view-image-13");
  await expect(view).toBeFocused();
  await expect(view).toBeInViewport();
  await view.getByRole("button", { name: "Back to gallery" }).click();
  await expect(
    page.getByRole("dialog", { name: "Render gallery" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Interiors", exact: true }).click();
  await expect(page.locator(".showcase-thumbnails a")).toHaveCount(18);
  await page
    .locator(".showcase-thumbnails")
    .getByRole("link", { name: "Image(11).png", exact: true })
    .click();
  await expect(page).toHaveURL(/#view-image-11$/);
  await expect(page.locator("#view-image-11")).toBeInViewport();
  await expect(
    page.getByRole("dialog", { name: "Render gallery" }),
  ).toBeHidden();
  await page
    .getByRole("navigation", { name: "Main navigation", exact: true })
    .getByRole("link", { name: "Projects", exact: true })
    .click();
  const galleryButton = page.getByRole("button", {
    name: /Open actual studio/,
  });
  await galleryButton.click();
  await expect(
    page.getByRole("dialog", { name: "Render gallery" }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(
    page.getByRole("dialog", { name: "Render gallery" }),
  ).toBeHidden();
  await expect(galleryButton).toBeFocused();
});

test("the gallery shows loading previews and stays usable if a thumbnail fails", async ({
  page,
}) => {
  let releasePreview!: () => void;
  const delayed = new Promise<void>((resolve) => {
    releasePreview = resolve;
  });
  await page.route("**/images/view-scene-3-1-*-320.webp", async (route) => {
    await delayed;
    await route.continue();
  });
  await page.route("**/images/view-scene-4-1-*-320.webp", (route) =>
    route.abort(),
  );
  try {
    await page.goto("/projects");
    await page.getByRole("button", { name: /Open actual studio/ }).click();
    const dialog = page.getByRole("dialog", { name: "Render gallery" });
    const loader = dialog.getByRole("status", {
      name: "Loading gallery previews",
    });
    await expect(loader).toBeVisible();
    await expect(dialog.getByText("Preview unavailable")).toBeVisible();
    releasePreview();
    await expect(loader).toBeHidden();
    await expect(
      dialog.getByRole("link", { name: /Scene 4_1.png/ }),
    ).toBeVisible();
  } finally {
    releasePreview();
  }
});

test("home interiors advance with the wheel and support manual navigation", async ({
  page,
}) => {
  await page.goto("/");
  const section = page
    .getByRole("region", { name: "Interior perspectives.", exact: true })
    .filter({
      has: page.getByRole("heading", { name: "Interior perspectives." }),
    });
  await section.locator(".interior-track").hover();
  await section.getByRole("button", { name: "Previous", exact: true }).click();
  await expect(section.getByRole("status")).toHaveText("View 6 of 6");
  await section.getByRole("button", { name: "Next", exact: true }).click();
  await expect(section.getByRole("status")).toHaveText("View 1 of 6");
  await section.locator(".interior-track").hover();
  await page.mouse.wheel(0, 180);
  await expect(section.getByRole("status")).toHaveText("View 2 of 6");
  await section.getByRole("button", { name: "Next", exact: true }).click();
  await expect(section.getByRole("status")).toHaveText("View 3 of 6");
  await expect(section.getByRole("button", { name: /rotation/i })).toHaveCount(
    0,
  );
  await section
    .getByRole("link", { name: "Open full-size render: Workstations" })
    .click();
  await expect(page).toHaveURL(/project-01#view-image-2$/);
  await expect(page.locator("#view-image-2")).toBeFocused();
});

test("responsive layouts, mobile menu, reduced motion, and screenshots", async ({
  page,
}) => {
  for (const width of [360, 768, 1280, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of [
      "/",
      "/projects",
      "/projects/project-01",
      "/about",
      "/contact",
    ]) {
      await page.goto(route);
      await expect(page.locator("h1")).toBeVisible();
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
      ).toBe(true);
    }
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Menu" }).click();
  await expect(
    page.getByRole("navigation", { name: "Mobile navigation" }),
  ).toBeVisible();
  await expect(
    page
      .getByRole("navigation", { name: "Mobile navigation" })
      .getByRole("link", { name: /Home/ }),
  ).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: "Menu" })).toBeFocused();
  await page.getByRole("button", { name: "Menu" }).click();
  await page
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("link", { name: /About/ })
    .click();
  await expect(page).toHaveURL(/\/about$/);
  await expect(page.locator("#mobile-menu")).toHaveCount(0);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator("h1")).toBeVisible();
  await readyForScreenshot(page);
  await page.screenshot({
    path: "test-results/home-mobile.png",
    fullPage: true,
  });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  await readyForScreenshot(page);
  await page.screenshot({
    path: "test-results/home-desktop.png",
    fullPage: true,
  });
  await page.getByRole("button", { name: "Switch to light mode" }).click();
  await page.screenshot({
    path: "test-results/home-light.png",
    fullPage: true,
  });
});

test("wheel scrolling follows input freely without snapping or automatic movement", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  await expect(page.locator("#hero-heading")).toBeVisible();
  await page.mouse.wheel(0, 180);
  await expect
    .poll(() => page.evaluate(() => window.scrollY))
    .toBeGreaterThan(100);
  await page.waitForTimeout(250);
  const position = await page.evaluate(() => window.scrollY);
  expect(position).toBeLessThan(250);
  await page.waitForTimeout(900);
  expect(await page.evaluate(() => window.scrollY)).toBeCloseTo(position, 0);
  await page.mouse.wheel(0, 2200);
  await expect
    .poll(() => page.evaluate(() => window.scrollY))
    .toBeGreaterThan(position + 1800);
  const hero = await page.locator("#hero-heading").elementHandle();
  const home = page
    .getByRole("navigation", { name: "Main navigation", exact: true })
    .getByRole("link", { name: "Home", exact: true });
  await home.click();
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeLessThan(2);
  await expect(page.locator("#hero-heading")).toBeInViewport();
  await home.click();
  expect(
    await hero?.evaluate(
      (el) => el === document.getElementById("hero-heading"),
    ),
  ).toBe(true);
});

test("landing animation runs on initial load, refresh, and repeated refresh", async ({
  page,
}) => {
  await page.addInitScript(() => {
    const frames: number[] = [];
    (window as unknown as { landingFrames: number[] }).landingFrames = frames;
    let remaining = 180;
    const sample = () => {
      const line = document.querySelector(".hero-line > span");
      if (line) {
        const transform = getComputedStyle(line).transform;
        frames.push(
          transform === "none" ? 0 : new DOMMatrixReadOnly(transform).m42,
        );
      }
      if (remaining-- > 0) requestAnimationFrame(sample);
    };
    requestAnimationFrame(sample);
  });
  for (let visit = 0; visit < 3; visit++) {
    if (visit === 0) await page.goto("/");
    else await page.reload();
    await expect
      .poll(() =>
        page.evaluate(() =>
          (window as unknown as { landingFrames: number[] }).landingFrames.some(
            (y) => y > 20,
          ),
        ),
      )
      .toBe(true);
    await expect
      .poll(() =>
        page
          .locator(".hero-line > span")
          .first()
          .evaluate((el) => {
            const transform = getComputedStyle(el).transform;
            return transform === "none"
              ? 0
              : Math.abs(new DOMMatrixReadOnly(transform).m42);
          }),
      )
      .toBeLessThan(1);
  }
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.reload();
  await expect(page.locator("#hero-heading")).toBeVisible();
  await expect(page.locator(".hero-line > span").first()).toHaveCSS(
    "transform",
    "none",
  );
});

test("scrollbar space stays stable and a slow route waits before appearing", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1100 });
  await page.route("**/assets/Contact-*.js", async (route) => {
    await new Promise((resolve) => setTimeout(resolve, 1400));
    await route.continue();
  });
  await page.goto("/");
  await expect(page.locator("#hero-heading")).toBeVisible();
  await page.locator("#studio").scrollIntoViewIfNeeded();
  const heldScroll = await page.evaluate(() => window.scrollY);
  const width = await page.evaluate(() => document.documentElement.clientWidth);
  const brandLeft = await page
    .locator(".brand")
    .evaluate((el) => el.getBoundingClientRect().left);
  // Click the already-visible sticky link without Playwright auto-scrolling it.
  const contact = await page
    .getByRole("navigation", { name: "Main navigation", exact: true })
    .getByRole("link", { name: "Contact", exact: true })
    .boundingBox();
  await page.mouse.click(
    contact!.x + contact!.width / 2,
    contact!.y + contact!.height / 2,
  );
  await expect(
    page.getByRole("progressbar", { name: "Loading page" }),
  ).toBeVisible();
  await expect(page.locator("#hero-heading")).toHaveCount(1);
  await expect(page.locator("main")).toHaveAttribute("aria-busy", "true");
  expect(await page.evaluate(() => window.scrollY)).toBe(heldScroll);
  await page.mouse.wheel(0, 650);
  expect(await page.evaluate(() => window.scrollY)).toBe(heldScroll);
  await expect(page.locator("h1")).toHaveText("Let’s talk.");
  await expect(page.locator("main")).toHaveAttribute("aria-busy", "false");
  await expect(
    page.getByRole("progressbar", { name: "Loading page" }),
  ).toHaveCount(0);
  expect(
    await page.evaluate(() =>
      document.fonts.check('400 16px "Manrope Variable"'),
    ),
  ).toBe(true);
  expect(await page.evaluate(() => document.documentElement.clientWidth)).toBe(
    width,
  );
  expect(
    await page
      .locator(".brand")
      .evaluate((el) => el.getBoundingClientRect().left),
  ).toBe(brandLeft);
  await page
    .getByRole("navigation", { name: "Main navigation", exact: true })
    .getByRole("link", { name: "Home", exact: true })
    .click();
  await expect(page.locator("#hero-heading")).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.clientWidth)).toBe(
    width,
  );
});

test("a newer navigation supersedes a page still loading", async ({ page }) => {
  await page.route("**/assets/Contact-*.js", async (route) => {
    await new Promise((resolve) => setTimeout(resolve, 1200));
    await route.continue();
  });
  await page.goto("/");
  await expect(page.locator("#hero-heading")).toBeVisible();
  const nav = page.getByRole("navigation", {
    name: "Main navigation",
    exact: true,
  });
  await nav.getByRole("link", { name: "Contact", exact: true }).click();
  await expect(
    page.getByRole("progressbar", { name: "Loading page" }),
  ).toBeVisible();
  await nav.getByRole("link", { name: "About", exact: true }).click();
  await expect(page.locator("h1")).toHaveText("The studio.");
  await page.waitForTimeout(1400);
  await expect(page.locator("h1")).toHaveText("The studio.");
  await expect(page.locator("main")).toHaveAttribute("aria-busy", "false");
  await nav.getByRole("link", { name: "Home", exact: true }).click();
  await expect(page.locator("#hero-heading")).toBeVisible();
});
