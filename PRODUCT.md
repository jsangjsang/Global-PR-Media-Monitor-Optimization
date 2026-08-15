# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Delegated by the user: use the repository's Sites/Vinext React scaffold for a portable interactive demo. The demo uses synthetic local data and no production credentials; API and persistence boundaries remain documented for an internal engineering handoff.

## Users

- Global PR leads who need to understand the operational value and authorize a pilot.
- Global PR coordinators who import, classify, review, assign, and report media coverage every week.
- Internal developers who need a concrete interaction model and implementation boundary for production.

## Product Purpose

Turn a weekly Muck Rack export and manual Lark copy-paste process into an exception-led coverage operation. The demo must show both the near-term Coverage Copilot bridge and the long-term PR Intelligence Hub in one credible product experience.

## Positioning

Every coverage record carries its operational decision with it: normalized product, campaign, PIC, confidence, and evidence. Humans review ambiguity instead of rebuilding the dataset.

## Operating Context

The current workflow exports monitored coverage from Muck Rack into Excel, interprets the article, categorizes brand and product references, maps the outlet and journalist to a Global PR PIC, and transfers the result into a detailed Lark Media Coverage Dashboard. This happens weekly and can consume up to 45 hours.

## Capabilities and Constraints

- Demonstrate a Muck Rack import without requiring Muck Rack access.
- Show normalization, deduplication, product/campaign classification, sentiment, and rules-first PIC assignment.
- Provide a human review queue for low-confidence decisions.
- Show approved coverage, live analytics, an evidence-linked monthly brief, and a Lark synchronization preview.
- Keep all example outlets, journalists, metrics, and coverage explicitly synthetic.
- Do not imply that real API connections, company authentication, production AI, or durable storage are implemented.
- Preserve the two-plan framing: PR-owned bridge first, developer-built platform second.

## Brand Commitments

Working product name: Coverage Intelligence. Voice: globally minded, precise, calm, operational, and evidence-led. The demo is an independent concept and must not present itself as an official Insta360 product.

## Evidence on Hand

- `PR_COVERAGE_AUTOMATION_ONE_PAGER.md`
- `output/pdf/global_pr_media_coverage_automation.pdf`
- The user's description of the Muck Rack to Excel to Lark workflow and PIC assignment task.
- No real Muck Rack exports, Lark templates, journalist ownership rules, brand assets, or internal performance data are available; future work must not fabricate them as real.

## Product Principles

1. Review exceptions, not every row.
2. Make every automated decision explainable.
3. Reconcile every source record before publishing.
4. Keep organizational rules editable by PR operations.
5. Let the bridge implementation become the production platform's foundation.

## Accessibility & Inclusion

The demo should be keyboard navigable, readable at common laptop widths, responsive on mobile, and avoid using color as the only status signal.
