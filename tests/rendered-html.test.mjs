import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the coverage intelligence demo", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Coverage Intelligence \| Global PR Demo<\/title>/i);
  assert.match(html, /One export\. Every decision accounted for\./);
  assert.match(html, /Run demo import/);
  assert.match(html, /Synthetic demo/);
  assert.match(html, /seed fce37b77/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
});

test("review decisions and dialogs retain the demo safety contract", async () => {
  const source = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");

  assert.match(source, /value=\{currentReview\.product\}/);
  assert.match(source, /updateReviewDecision\(\{ product:/);
  assert.match(source, /value=\{currentReview\.pic\}/);
  assert.match(source, /reviewer: "PR demo reviewer", reviewedAt/);
  assert.match(source, /event\.key === "Escape"/);
  assert.match(source, /setAttribute\("inert", ""\)/);
  assert.match(source, /role="progressbar"/);
  assert.doesNotMatch(source, /defaultValue=\{currentReview\./);
});
