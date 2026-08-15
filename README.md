# Coverage Intelligence Demo

An interactive product concept for turning a weekly Muck Rack export into reviewed, categorized, PIC-assigned, and Lark-ready global PR coverage.

> This is an independent demonstration built with synthetic data. It is not an official Insta360 product and does not connect to Muck Rack, Lark, or company systems.

## Start here

- **PR leadership:** open the [one-page PDF](output/pdf/global_pr_media_coverage_automation.pdf), then follow [START_HERE.md](START_HERE.md) for a five-minute Codespaces or local demo.
- **Internal development:** read [START_HERE.md](START_HERE.md), then the [architecture](docs/ARCHITECTURE.md) and [design system](DESIGN.md).

## Why this exists

The current workflow requires a PR coordinator to export monitored coverage, interpret every article, normalize products and campaigns, identify the responsible PIC, remove duplicates, and manually transfer the result into Lark. The process can consume up to 45 hours each week.

This repository makes two implementation paths tangible:

1. **Coverage Copilot:** a PR-owned bridge that automates the existing Muck Rack -> Excel -> Lark workflow.
2. **PR Intelligence Hub:** a developer-built internal product with ingestion, review, audit, Lark synchronization, analytics, and monthly intelligence.

The same parser, taxonomy, ownership rules, review behavior, and validation set can power both paths.

## What the demo shows

- A simulated Muck Rack weekly import and row reconciliation
- Duplicate grouping and straight-through processing
- Product, campaign, sentiment, and PIC classification
- Explainable confidence and evidence for every decision
- A human exception-review queue
- A searchable coverage ledger
- Product, market, sentiment, and cadence analytics
- An editable, evidence-led monthly brief
- PR-owned PIC routing rules and product aliases
- A Lark-ready payload and production implementation handoff

## Run locally

Requirements: Node.js 22.13 or newer and pnpm.

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

For a browser-based setup with no local installation, use the repository's included GitHub Codespaces configuration and follow [START_HERE.md](START_HERE.md).

Build the production bundle:

```bash
pnpm build
```

## Demo walkthrough

1. Start on **Weekly run** and select **Run demo import**.
2. Watch all 247 source rows reconcile into duplicates, exceptions, and Lark-ready records.
3. Open **Review queue** and approve an ambiguous product or PIC decision.
4. Inspect a record in **Coverage ledger** to see its evidence and confidence.
5. Review **Intelligence** and edit the synthetic **Monthly brief**.
6. Open **Routing rules** to see how PR operations owns assignment logic.
7. Finish in **Build handoff** to compare the bridge and production target.

See [docs/DEMO_GUIDE.md](docs/DEMO_GUIDE.md) for the five-minute presentation script.

## Repository map

```text
.devcontainer/                One-click GitHub Codespaces environment
app/                         Interactive product demo
docs/                        Architecture and presentation guidance
sample-data/                 Synthetic Muck Rack-shaped example export
output/pdf/                  Executive one-page PDF
scripts/                     PDF generation utility
START_HERE.md                Executive viewing and implementation instructions
PR_COVERAGE_AUTOMATION_ONE_PAGER.md
PRODUCT.md                   Durable product context
DESIGN.md                    Interface system and interaction rules
```

## Production boundary

The demo runs entirely on local synthetic data. A production implementation would replace the boundaries below:

| Demo boundary | Production implementation |
| --- | --- |
| Timed import simulation | Muck Rack Saved Search API or controlled Excel upload |
| In-memory records | Audited relational database |
| Deterministic sample classification | Rules plus approved structured AI service |
| Local review actions | Authenticated reviewer actions and audit events |
| Lark payload preview | Lark Base record synchronization and message cards |
| Synthetic brief | Evidence-linked draft from approved coverage |

The preferred rollout is an upload-based MVP first, Lark synchronization second, and Muck Rack API ingestion after entitlement and security review.

## Documentation

- [One-page proposal](PR_COVERAGE_AUTOMATION_ONE_PAGER.md)
- [Architecture](docs/ARCHITECTURE.md)
- [Demo guide](docs/DEMO_GUIDE.md)
- [Executive PDF](output/pdf/global_pr_media_coverage_automation.pdf)

## Data and trademarks

All people, publications, placement metrics, article titles, record IDs, and campaign performance shown in the interface are synthetic. Product names are used only to demonstrate a possible internal categorization workflow. Muck Rack, Lark, Insta360, and their respective marks belong to their owners.
