import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host =
    requestHeaders.get("x-forwarded-host") ??
    requestHeaders.get("host") ??
    "localhost:3000";
  const protocol =
    requestHeaders.get("x-forwarded-proto") ??
    (host.startsWith("localhost") ? "http" : "https");
  const baseUrl = new URL(`${protocol}://${host}`);
  const imageUrl = new URL("/og.png", baseUrl).toString();

  return {
    metadataBase: baseUrl,
    title: "Coverage Intelligence | Global PR Demo",
    description:
      "An interactive concept for turning Muck Rack exports into reviewed, Lark-ready global PR coverage intelligence.",
    icons: {
      icon: "/favicon.png",
      shortcut: "/favicon.png",
    },
    openGraph: {
      title: "Coverage Intelligence",
      description: "One export. Every decision accounted for.",
      type: "website",
      images: [{ url: imageUrl, width: 1731, height: 909 }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Coverage Intelligence",
      description: "One export. Every decision accounted for.",
      images: [imageUrl],
    },
  };
}

const directionContract = `<!--
THESIS: A newsroom evidence ledger where every imported row visibly resolves into a rule, exception, or Lark-ready record; it refuses generic card-first dashboard chrome.
OWN-WORLD: Cold daylight surfaces, deep newsroom ink, electric blue decisions, and acid-lime ready states. Hairline rails, docket rows, compact labels, and evidence blocks carry the system.
STORY: A PR lead sees the weekly time sink collapse into a reconciled queue, reviews ambiguity, reads the intelligence, and understands the developer handoff.
FIRST VIEWPORT: A dark operating rail frames a wide reconciliation docket. The weekly import-to-Lark path dominates before tables or metrics; Run demo import is the primary action.
FORM: Newsroom evidence ledger, grounded direction 6, seed fce37b77.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md
-->`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <span
          className="direction-contract"
          aria-hidden="true"
          dangerouslySetInnerHTML={{ __html: directionContract }}
        />
        {children}
      </body>
    </html>
  );
}
