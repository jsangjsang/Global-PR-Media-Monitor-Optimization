# Global PR Media Coverage Automation

**Start here:** Read this page, then follow [START_HERE.md](START_HERE.md) to open the interactive demo through GitHub Codespaces or locally and to hand the concept to the internal development team.

## The opportunity

The current weekly process - exporting Muck Rack coverage, interpreting every article, assigning the correct PR PIC, and rebuilding the result in Lark - can consume up to **45 hours per week**. The goal is not to remove PR judgment. It is to move the team from repetitive copy-paste work to a short, auditable exception-review process.

## Plan 1 - Coverage Copilot: the PR team can start quickly

**Purpose:** Automate the existing Muck Rack -> Excel -> Lark workflow without asking the team to adopt a new system.

**Owner:** Global PR operations, with light IT/security support  
**Estimated pilot:** 2-4 weeks  
**Target result:** 1-3 hours of weekly review instead of manual processing

The agent opens the authorized Muck Rack account, exports the weekly report, parses the Excel file, removes duplicates, identifies brand and product coverage, assigns the responsible PIC, and prepares the same Lark dashboard rows the team uses today. High-confidence rows are processed automatically; uncertain product, reporter, outlet, or PIC decisions enter a human review queue. Each assignment includes a reason and confidence score.

**What the PR team needs to do:**

1. Provide one anonymized Muck Rack export and the current Lark dashboard template.
2. Provide the product/alias list and reporter/outlet-to-PIC ownership rules.
3. Label about 200 historical rows as the accuracy benchmark.
4. Appoint one PR owner to review exceptions during a 2-3 week parallel pilot.
5. Approve production use only after row reconciliation and accuracy targets are met.

**Success gate:** Every source row is accounted for; product classification reaches at least 95%; PIC assignment reaches at least 97% where a rule exists; low-confidence cases are never silently published.

**Trade-off:** Fast and inexpensive, but browser automation can require maintenance when Muck Rack or Lark changes its interface.

## Plan 2 - PR Intelligence Hub: the internal development team builds the target system

**Purpose:** Replace spreadsheet assembly with a secure internal application that collects, categorizes, reviews, synchronizes, and summarizes coverage.

**Owner:** Internal development team, with Global PR as product owner  
**Estimated MVP:** 4-8 weeks  
**Target result:** Automated ingestion, one review inbox, live dashboards, and monthly AI briefs

The app ingests a Muck Rack Saved Search through its API when licensed, or accepts the existing Excel export as a fallback. A shared processing engine normalizes records, deduplicates syndication, classifies products/campaigns/sentiment/key messages, and applies editable PIC rules. Approved data is stored in a database, synchronized to Lark Base, displayed in live views, and used to draft evidence-linked weekly and monthly reports.

**What the development team needs to do:**

1. Confirm Muck Rack API entitlement; it is currently a paid Premier add-on. If unavailable, begin with upload-based Excel ingestion.
2. Confirm the Lark destination - preferably Base rather than a manually maintained document table - and approve the minimum API permissions.
3. Build the upload-based MVP first: ingestion, review queue, rules, audit log, dashboard, and Lark-ready export.
4. Add Lark synchronization and notifications, then scheduled Muck Rack ingestion.
5. Keep credentials server-side and use only company-approved AI infrastructure and data-retention settings.

**Success gate:** No manual re-entry, full auditability, exception-only review, reliable weekly reconciliation, and an editable monthly brief linked to its supporting coverage.

## Recommended decision

**Start Plan 1 as the immediate bridge and reuse its parser, taxonomy, PIC rules, and validation set inside Plan 2.** This gives the PR team a practical near-term win while giving developers a tested specification instead of an abstract request.

**Requested next step:** Authorize one controlled pilot using an anonymized export and synthetic or approved test data. Do not connect production credentials until IT/security approval and the accuracy gates above are met.

Reference: [Muck Rack API](https://muckrack.com/pr-software/api) | [Lark Base SDK](https://lark-base-team.github.io/js-sdk-docs/en/api/guide)
