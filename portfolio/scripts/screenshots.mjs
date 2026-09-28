// Captures portfolio screenshots for Upwork. Run against a running server:
//   npm run build && npm run start
//   node scripts/screenshots.mjs [baseUrl]
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const base = process.argv[2] ?? "http://localhost:3000";
const out = "screenshots";
mkdirSync(out, { recursive: true });

const browser = await chromium.launch();

async function page(viewport, deviceScaleFactor = 1) {
  const ctx = await browser.newContext({ viewport, deviceScaleFactor, reducedMotion: "reduce" });
  return ctx.newPage();
}

async function settle(p) {
  // Scroll through the page so every in-view reveal has run, then return to top.
  await p.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 400) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 40));
    }
    window.scrollTo(0, 0);
  });
  await p.waitForTimeout(500);
}

const desktop = await page({ width: 1440, height: 900 });

await desktop.goto(`${base}/en`, { waitUntil: "networkidle" });
await settle(desktop);
await desktop.screenshot({ path: `${out}/01-home-desktop-full.png`, fullPage: true });
await desktop.screenshot({ path: `${out}/02-hero.png` });

await desktop.goto(`${base}/en/work`, { waitUntil: "networkidle" });
await settle(desktop);
await desktop.screenshot({ path: `${out}/03-work-grid.png`, fullPage: true });

await desktop.goto(`${base}/en/work/velora-estates`, { waitUntil: "networkidle" });
await settle(desktop);
await desktop.screenshot({ path: `${out}/04-velora-case-study.png`, fullPage: true });

await desktop.goto(`${base}/en/work/nova-commerce`, { waitUntil: "networkidle" });
await settle(desktop);
await desktop.screenshot({ path: `${out}/05-nova-commerce.png`, fullPage: true });

await desktop.goto(`${base}/en/work/flowfin`, { waitUntil: "networkidle" });
await settle(desktop);
await desktop.locator("h2", { hasText: "Mobile screens" }).evaluate((el) => {
  window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - 140);
});
await desktop.waitForTimeout(400);
await desktop.screenshot({ path: `${out}/06-flowfin-mobile.png` });

await desktop.goto(`${base}/en/contact`, { waitUntil: "networkidle" });
await settle(desktop);
await desktop.screenshot({ path: `${out}/08-contact.png` });

const mobile = await page({ width: 390, height: 844 }, 2);
await mobile.goto(`${base}/en`, { waitUntil: "networkidle" });
await settle(mobile);
await mobile.screenshot({ path: `${out}/07-home-mobile.png`, fullPage: true });

await browser.close();
console.log(`Screenshots saved to ./${out}`);
