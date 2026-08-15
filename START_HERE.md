# Start Here: Global PR Coverage Automation Demo

This repository is a credential-free product demonstration. It uses synthetic coverage and does not connect to Insta360, Muck Rack, Lark, or any company system.

## For the Global PR lead: understand it in 10 minutes

1. Open the [one-page executive PDF](output/pdf/global_pr_media_coverage_automation.pdf).
2. Launch the interactive demo using GitHub Codespaces or the local instructions below.
3. Follow the five-screen walkthrough.
4. Decide whether to authorize a controlled Plan 1 pilot and send Plan 2 to the internal development team.

### Fastest interactive option: GitHub Codespaces

This requires a GitHub account with access to the repository, but no local software setup.

1. On the repository page, select **Code**, then **Codespaces**, then **Create codespace on main**.
2. Wait for the setup task to finish installing dependencies.
3. In the Codespaces terminal, run `pnpm dev`.
4. When GitHub reports that port 3000 is available, select **Open in Browser**. If another port is shown, open that port instead.
5. Stop the terminal process with `Ctrl+C` when finished.

### Local option

Install Node.js 22.13 or newer and pnpm, then run:

```bash
git clone <repository-url>
cd "Global PR Media Coverage Dashboard DEMO"
pnpm install
pnpm dev
```

Open the local address printed in the terminal, normally [http://localhost:3000](http://localhost:3000).

## Five-screen walkthrough

1. **Weekly run:** Select **Run demo import** and watch all 247 synthetic rows reconcile into duplicates, exceptions, and ready records.
2. **Review queue:** Change a product or PIC, approve it, and verify that the decision records a reviewer and timestamp.
3. **Coverage ledger:** Search the approved record set and open a row to inspect its classification evidence.
4. **Intelligence + Monthly brief:** Review product and market signals, then edit and copy the temporary evidence-led brief.
5. **Routing rules + Build handoff:** See how PR owns taxonomy and PIC logic, then compare the immediate bridge with the production application.

## Recommended implementation sequence

### Track 1: PR-owned bridge

**Goal:** Automate the current Muck Rack export -> Excel -> Lark process before changing the team's daily workflow.

1. PR supplies one anonymized export, the current Lark schema, product aliases, PIC rules, and roughly 200 validated historical rows.
2. The pilot team implements parsing, normalization, duplicate grouping, classification, PIC routing, reconciliation, and a review queue.
3. Run the tool beside the manual process for two to three weekly cycles.
4. Compare every source row with the approved Lark output and measure correction volume.
5. Move into controlled use only after the success gates below are met.

**Owners:** Global PR operations owns decisions and rules; IT/security reviews credentials and permitted automation; one PR reviewer owns weekly exceptions.

### Track 2: developer-built PR Intelligence Hub

**Goal:** Reuse the validated Track 1 engine inside a secure internal product.

1. Start with signed Excel upload unless Muck Rack API entitlement is confirmed.
2. Add authenticated ingestion, durable coverage and audit tables, the exception inbox, versioned rules, analytics, and export.
3. Add Lark Base synchronization with idempotent create/update behavior and least-privilege credentials.
4. Add scheduled Muck Rack ingestion only after API, security, retention, and observability reviews.
5. Generate weekly and monthly drafts from approved records only, with links back to supporting evidence.

See [Architecture](docs/ARCHITECTURE.md) for the system boundary and [Design system](DESIGN.md) for interface rules.

## Pilot success gates

- Every source row ends as approved, duplicate, irrelevant, or human review.
- Product classification reaches at least 95% on the labeled validation set.
- PIC assignment reaches at least 97% wherever a documented rule exists.
- Conflicting or low-confidence assignments never publish silently.
- Every correction records the previous value, new value, reviewer, timestamp, and reason.
- The PR owner confirms that weekly handling time and correction risk are materially reduced.

## What to send with the repository

- The repository link
- The [one-page PDF](output/pdf/global_pr_media_coverage_automation.pdf)
- This `START_HERE.md` guide
- A short note stating that all data is synthetic and the requested decision is approval for a controlled pilot, not production deployment

