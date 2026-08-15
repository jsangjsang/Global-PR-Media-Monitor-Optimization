"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type ViewKey =
  | "overview"
  | "review"
  | "coverage"
  | "analytics"
  | "brief"
  | "rules"
  | "handoff";

type CoverageRecord = {
  id: string;
  date: string;
  headline: string;
  outlet: string;
  journalist: string;
  product: string;
  campaign: string;
  market: string;
  sentiment: "Positive" | "Neutral" | "Mixed";
  reach: string;
  tier: string;
  pic: string;
  confidence: number;
  status: "Ready" | "Review" | "Synced";
  evidence: string;
};

type ReviewItem = {
  id: string;
  headline: string;
  outlet: string;
  journalist: string;
  issue: string;
  product: string;
  alternate: string;
  productChoices: string[];
  pic: string;
  picChoices: string[];
  confidence: number;
  evidence: string;
  status: "Needs review" | "Approved";
  reviewer?: string;
  reviewedAt?: string;
};

const navItems: Array<{ id: ViewKey; label: string; code: string }> = [
  { id: "overview", label: "Weekly run", code: "WR" },
  { id: "review", label: "Review queue", code: "RQ" },
  { id: "coverage", label: "Coverage ledger", code: "CL" },
  { id: "analytics", label: "Intelligence", code: "IN" },
  { id: "brief", label: "Monthly brief", code: "MB" },
  { id: "rules", label: "Routing rules", code: "RR" },
  { id: "handoff", label: "Build handoff", code: "BH" },
];

const viewTitles: Record<ViewKey, string> = {
  overview: "Weekly coverage run",
  review: "Exception review",
  coverage: "Coverage ledger",
  analytics: "Coverage intelligence",
  brief: "Monthly PR brief",
  rules: "Ownership and taxonomy",
  handoff: "Implementation handoff",
};

const coverageRecords: CoverageRecord[] = [
  {
    id: "MR-0814-0247",
    date: "Aug 14",
    headline: "A pocket camera built for spontaneous travel films",
    outlet: "Northstar Tech",
    journalist: "Maya Chen",
    product: "GO Ultra",
    campaign: "GO Ultra launch",
    market: "North America",
    sentiment: "Positive",
    reach: "8.4M",
    tier: "Tier 1",
    pic: "J. Park",
    confidence: 97,
    status: "Synced",
    evidence: "Title and first paragraph focus on GO Ultra; journalist rule MR-184 maps Maya Chen to J. Park.",
  },
  {
    id: "MR-0814-0231",
    date: "Aug 14",
    headline: "The creator cameras that earned a place in our kit",
    outlet: "Frame & Field",
    journalist: "Elias Romero",
    product: "X5",
    campaign: "Always-on X5",
    market: "Europe",
    sentiment: "Positive",
    reach: "3.1M",
    tier: "Tier 1",
    pic: "A. Morgan",
    confidence: 94,
    status: "Ready",
    evidence: "X5 receives a dedicated section and recommendation; outlet ownership rule EU-042 applies.",
  },
  {
    id: "MR-0813-0219",
    date: "Aug 13",
    headline: "Why compact 360 cameras are moving into the mainstream",
    outlet: "Signal Review",
    journalist: "Noah Williams",
    product: "X4 Air",
    campaign: "X4 Air launch",
    market: "United Kingdom",
    sentiment: "Neutral",
    reach: "1.8M",
    tier: "Tier 2",
    pic: "L. Evans",
    confidence: 91,
    status: "Ready",
    evidence: "X4 Air appears in the headline deck and four paragraphs; UK outlet rule assigns L. Evans.",
  },
  {
    id: "MR-0813-0208",
    date: "Aug 13",
    headline: "A new full-frame option enters the creator cinema conversation",
    outlet: "CineScope Daily",
    journalist: "Priya Desai",
    product: "Luna Ultra",
    campaign: "Luna Ultra launch",
    market: "APAC",
    sentiment: "Positive",
    reach: "2.6M",
    tier: "Tier 1",
    pic: "S. Lin",
    confidence: 99,
    status: "Synced",
    evidence: "Dedicated product story with exact product match; Priya Desai is owned by S. Lin.",
  },
  {
    id: "MR-0812-0194",
    date: "Aug 12",
    headline: "Three webcams for clearer hybrid workshops",
    outlet: "Workplace Current",
    journalist: "Hana Kim",
    product: "Link 2 Pro",
    campaign: "Link Pro launch",
    market: "South Korea",
    sentiment: "Positive",
    reach: "920K",
    tier: "Tier 2",
    pic: "D. Cho",
    confidence: 96,
    status: "Ready",
    evidence: "Link 2 Pro is a named recommendation; exact journalist and market rule applies.",
  },
  {
    id: "MR-0812-0182",
    date: "Aug 12",
    headline: "Action cameras meet a more cinematic editing workflow",
    outlet: "Motion Index",
    journalist: "Samir Patel",
    product: "Ace Pro 2",
    campaign: "Creator workflow",
    market: "North America",
    sentiment: "Mixed",
    reach: "1.2M",
    tier: "Tier 2",
    pic: "J. Park",
    confidence: 88,
    status: "Review",
    evidence: "Ace Pro 2 is the primary product, but the article includes a mixed low-light comparison.",
  },
  {
    id: "MR-0811-0168",
    date: "Aug 11",
    headline: "The mobile filming tools changing solo production",
    outlet: "Creator Dispatch",
    journalist: "Lea Martin",
    product: "Flow 2 Series",
    campaign: "Mobile creator",
    market: "France",
    sentiment: "Positive",
    reach: "740K",
    tier: "Tier 2",
    pic: "A. Morgan",
    confidence: 93,
    status: "Ready",
    evidence: "Flow 2 Series is discussed in a dedicated section; France territory rule applies.",
  },
  {
    id: "MR-0810-0149",
    date: "Aug 10",
    headline: "Imaging brands invest in smaller, smarter creator ecosystems",
    outlet: "Global Device Wire",
    journalist: "Oliver Grant",
    product: "Brand",
    campaign: "Corporate narrative",
    market: "Global",
    sentiment: "Neutral",
    reach: "5.7M",
    tier: "Tier 1",
    pic: "M. Torres",
    confidence: 90,
    status: "Synced",
    evidence: "The story discusses Insta360 as a portfolio brand rather than centering one product.",
  },
];

const initialReviewItems: ReviewItem[] = [
  {
    id: "RV-016",
    headline: "Tiny cameras take over the weekend travel bag",
    outlet: "Nomad Lens",
    journalist: "Amelia Ross",
    issue: "Product ambiguity",
    product: "GO Ultra",
    alternate: "GO 3S",
    productChoices: ["GO Ultra", "GO 3S", "Brand", "Not relevant"],
    pic: "A. Morgan",
    picChoices: ["A. Morgan", "L. Evans", "J. Park", "M. Torres"],
    confidence: 72,
    evidence: "The title uses only 'GO'. The excerpt mentions a detachable screen, which favors GO Ultra, but the URL slug contains GO 3S.",
    status: "Needs review",
  },
  {
    id: "RV-012",
    headline: "A field test of the latest 360 cameras",
    outlet: "Outside Signal",
    journalist: "Theo Burns",
    issue: "PIC conflict",
    product: "X5",
    alternate: "Outlet owner differs",
    productChoices: ["X5", "Brand", "Not relevant"],
    pic: "J. Park",
    picChoices: ["J. Park", "L. Evans", "M. Torres", "S. Lin"],
    confidence: 64,
    evidence: "Theo Burns maps to J. Park, while Outside Signal maps to L. Evans. Journalist-level rules normally take precedence.",
    status: "Needs review",
  },
  {
    id: "RV-009",
    headline: "Five tools spotted in this week's creator brief",
    outlet: "Studio Ledger",
    journalist: "Staff writer",
    issue: "Coverage relevance",
    product: "Brand",
    alternate: "Irrelevant mention",
    productChoices: ["Brand", "Not relevant"],
    pic: "M. Torres",
    picChoices: ["M. Torres", "J. Park", "L. Evans", "S. Lin"],
    confidence: 58,
    evidence: "Insta360 appears once in a list of twelve brands; no product or key message is discussed.",
    status: "Needs review",
  },
  {
    id: "RV-004",
    headline: "Creator camera launch coverage republished across regional feeds",
    outlet: "Metro Syndication",
    journalist: "News desk",
    issue: "Duplicate group",
    product: "Luna Ultra",
    alternate: "Keep primary source only",
    productChoices: ["Luna Ultra", "Brand", "Not relevant"],
    pic: "S. Lin",
    picChoices: ["S. Lin", "M. Torres", "J. Park", "L. Evans"],
    confidence: 81,
    evidence: "Seven URLs share 96% title and body similarity. The earliest timestamp is from CineScope Daily.",
    status: "Needs review",
  },
];

const importStages = [
  ["Source received", "247 rows from Muck Rack export"],
  ["Normalized", "Outlets, dates, bylines, and URLs standardized"],
  ["Deduplicated", "19 syndicated or repeated records grouped"],
  ["Classified", "Products, campaigns, sentiment, and PIC evaluated"],
  ["Reconciled", "212 ready; 16 moved to human review"],
];

const productMix = [
  ["GO Ultra", 82, 46],
  ["Luna Ultra", 68, 38],
  ["X5", 56, 31],
  ["X4 Air", 44, 25],
  ["Ace Pro 2", 31, 17],
  ["Brand", 26, 15],
];

export default function Home() {
  const [activeView, setActiveView] = useState<ViewKey>("overview");
  const [reviewItems, setReviewItems] = useState(initialReviewItems);
  const [activeReviewId, setActiveReviewId] = useState(initialReviewItems[0].id);
  const [selectedRecord, setSelectedRecord] = useState<CoverageRecord | null>(null);
  const [search, setSearch] = useState("");
  const [coverageFilter, setCoverageFilter] = useState("All");
  const [importOpen, setImportOpen] = useState(false);
  const [importProgress, setImportProgress] = useState(0);
  const [toast, setToast] = useState("");
  const [briefApproved, setBriefApproved] = useState(false);
  const [briefEdited, setBriefEdited] = useState(false);
  const [syncPreviewed, setSyncPreviewed] = useState(false);
  const importDialogRef = useRef<HTMLElement | null>(null);
  const drawerDialogRef = useRef<HTMLElement | null>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  const outstandingReviews = reviewItems.filter(
    (item) => item.status === "Needs review",
  );
  const currentReview =
    reviewItems.find((item) => item.id === activeReviewId) ?? reviewItems[0];

  const filteredCoverage = useMemo(() => {
    const query = search.trim().toLowerCase();
    return coverageRecords.filter((record) => {
      const matchesSearch =
        !query ||
        [record.headline, record.outlet, record.journalist, record.product, record.pic]
          .join(" ")
          .toLowerCase()
          .includes(query);
      const matchesFilter =
        coverageFilter === "All" || record.status === coverageFilter;
      return matchesSearch && matchesFilter;
    });
  }, [coverageFilter, search]);

  useEffect(() => {
    if (!toast) return;
    const timeout = window.setTimeout(() => setToast(""), 3200);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  useEffect(() => {
    if (!importOpen || importProgress >= importStages.length) return;
    const timeout = window.setTimeout(() => {
      setImportProgress((progress) => {
        const next = progress + 1;
        if (next === importStages.length) {
          setToast("Weekly export reconciled. 16 exceptions are ready for review.");
        }
        return next;
      });
    }, 620);
    return () => window.clearTimeout(timeout);
  }, [importOpen, importProgress]);

  useEffect(() => {
    const dialog = selectedRecord ? drawerDialogRef.current : importOpen ? importDialogRef.current : null;
    if (!dialog) return;

    returnFocusRef.current = document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null;
    const background = [
      document.querySelector<HTMLElement>(".sidebar"),
      document.querySelector<HTMLElement>(".main-frame"),
    ].filter((element): element is HTMLElement => Boolean(element));
    background.forEach((element) => element.setAttribute("inert", ""));

    const getFocusable = () => Array.from(
      dialog.querySelectorAll<HTMLElement>(
        'button:not([disabled]), select:not([disabled]), input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ),
    );
    window.setTimeout(() => (getFocusable()[0] ?? dialog).focus(), 0);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        if (selectedRecord) setSelectedRecord(null);
        else setImportOpen(false);
        return;
      }
      if (event.key !== "Tab") return;
      const focusable = getFocusable();
      if (focusable.length === 0) {
        event.preventDefault();
        dialog.focus();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      background.forEach((element) => element.removeAttribute("inert"));
      const returnTarget = returnFocusRef.current;
      window.setTimeout(() => returnTarget?.focus(), 0);
    };
  }, [importOpen, selectedRecord]);

  const changeView = (view: ViewKey) => {
    setActiveView(view);
    setSelectedRecord(null);
  };

  const startImport = () => {
    setImportProgress(0);
    setImportOpen(true);
  };

  const updateReviewDecision = (patch: Partial<Pick<ReviewItem, "product" | "pic">>) => {
    setReviewItems((items) => items.map((item) =>
      item.id === activeReviewId ? { ...item, ...patch } : item,
    ));
  };

  const approveReview = () => {
    const activeIndex = reviewItems.findIndex((item) => item.id === activeReviewId);
    const reviewedAt = new Date().toISOString();
    setReviewItems((items) =>
      items.map((item) =>
        item.id === activeReviewId
          ? { ...item, status: "Approved", reviewer: "PR demo reviewer", reviewedAt }
          : item,
      ),
    );
    const next = reviewItems.find(
      (item, index) => index > activeIndex && item.status === "Needs review",
    );
    if (next) setActiveReviewId(next.id);
    setToast("Classification and PIC saved to the demo audit trail.");
  };

  const copyBrief = async () => {
    const text = document.querySelector("[data-brief]")?.textContent ?? "";
    try {
      await navigator.clipboard.writeText(text);
      setToast("Monthly brief copied to the clipboard.");
    } catch {
      setToast("Select the brief text to copy it manually.");
    }
  };

  const renderCoverageTable = (records: CoverageRecord[], compact = false) => (
    <div className="table-scroll">
      <table className={`coverage-table ${compact ? "coverage-table--compact" : ""}`}>
        <thead>
          <tr>
            <th>Coverage</th>
            <th>Product</th>
            {!compact && <th>Market</th>}
            <th>PIC</th>
            <th>Confidence</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record.id} onClick={() => setSelectedRecord(record)}>
              <td>
                <button
                  className="record-link"
                  type="button"
                  onClick={() => setSelectedRecord(record)}
                >
                  <span className="record-headline">{record.headline}</span>
                  <span className="record-meta">
                    {record.date} / {record.outlet} / {record.journalist}
                  </span>
                </button>
              </td>
              <td>
                <span className="product-tag">{record.product}</span>
              </td>
              {!compact && <td>{record.market}</td>}
              <td>{record.pic}</td>
              <td>
                <span className="confidence-cell">
                  <span>{record.confidence}%</span>
                  <span className="confidence-track" aria-hidden="true">
                    <span style={{ width: `${record.confidence}%` }} />
                  </span>
                </span>
              </td>
              <td>
                <span className={`status status--${record.status.toLowerCase()}`}>
                  {record.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderOverview = () => (
    <>
      <section className="run-hero" aria-labelledby="run-heading">
        <div className="run-hero__intro">
          <div>
            <p className="section-label">WEEK 33 / AUG 10-16</p>
            <h1 id="run-heading">One export. Every decision accounted for.</h1>
            <p>
              The agent completes the repetitive path and stops only where PR
              judgment is needed.
            </p>
          </div>
          <button className="primary-action" type="button" onClick={startImport}>
            Run demo import
          </button>
        </div>

        <div className="reconciliation-rail" aria-label="Weekly reconciliation">
          <div className="rail-stage rail-stage--source">
            <span className="rail-value">247</span>
            <span className="rail-label">Rows received</span>
          </div>
          <div className="rail-line"><span /></div>
          <div className="rail-stage">
            <span className="rail-value">19</span>
            <span className="rail-label">Duplicates grouped</span>
          </div>
          <div className="rail-line rail-line--alert"><span /></div>
          <div className="rail-stage rail-stage--review">
            <span className="rail-value">{12 + outstandingReviews.length}</span>
            <span className="rail-label">Need review</span>
          </div>
          <div className="rail-line rail-line--ready"><span /></div>
          <div className="rail-stage rail-stage--ready">
            <span className="rail-value">212</span>
            <span className="rail-label">Ready for Lark</span>
          </div>
        </div>
        <div className="reconciliation-note">
          <span>100% row reconciliation</span>
          <span>91.4% straight-through processing</span>
          <span>Estimated 41h saved this week</span>
        </div>
      </section>

      <div className="overview-grid">
        <section className="ledger-section">
          <div className="section-heading">
            <div>
              <p className="section-label">RECENTLY CLASSIFIED</p>
              <h2>Coverage ledger</h2>
            </div>
            <button className="text-action" type="button" onClick={() => changeView("coverage")}>
              View all 247
            </button>
          </div>
          {renderCoverageTable(coverageRecords.slice(0, 5), true)}
        </section>

        <aside className="exception-panel">
          <div className="section-heading">
            <div>
              <p className="section-label">HUMAN JUDGMENT</p>
              <h2>{outstandingReviews.length} open exceptions</h2>
            </div>
          </div>
          <div className="exception-list">
            {outstandingReviews.slice(0, 3).map((item, index) => (
              <button
                className="exception-row"
                key={item.id}
                type="button"
                onClick={() => {
                  setActiveReviewId(item.id);
                  changeView("review");
                }}
              >
                <span className="exception-index">{String(index + 1).padStart(2, "0")}</span>
                <span>
                  <strong>{item.issue}</strong>
                  <small>{item.outlet} / {item.confidence}% confidence</small>
                </span>
                <span className="exception-arrow">Review</span>
              </button>
            ))}
          </div>
          <button className="secondary-action secondary-action--full" type="button" onClick={() => changeView("review")}>
            Open review queue
          </button>
        </aside>
      </div>

      <section className="workflow-strip">
        <div>
          <p className="section-label">THE BRIDGE IN PRACTICE</p>
          <h2>Same destination. Less manual handling.</h2>
        </div>
        <ol>
          <li><span>01</span>Muck Rack export</li>
          <li><span>02</span>Agent classification</li>
          <li><span>03</span>Exception review</li>
          <li><span>04</span>Lark-ready dashboard</li>
        </ol>
      </section>
    </>
  );

  const renderReview = () => (
    <div className="review-layout">
      <aside className="review-index">
        <div className="review-index__header">
          <p className="section-label">QUEUE</p>
          <strong>{outstandingReviews.length} need attention</strong>
        </div>
        {reviewItems.map((item, index) => (
          <button
            type="button"
            key={item.id}
            className={`review-index__item ${item.id === currentReview.id ? "is-active" : ""}`}
            onClick={() => setActiveReviewId(item.id)}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            <span>
              <strong>{item.issue}</strong>
              <small>{item.outlet}</small>
            </span>
            <span className={`review-state ${item.status === "Approved" ? "is-approved" : ""}`}>
              {item.status === "Approved" ? "Done" : `${item.confidence}%`}
            </span>
          </button>
        ))}
      </aside>

      <section className="review-workbench">
        <div className="review-workbench__topline">
          <span>{currentReview.id}</span>
          <span className="status status--review">{currentReview.issue}</span>
        </div>
        <h1>{currentReview.headline}</h1>
        <p className="review-byline">
          {currentReview.outlet} / {currentReview.journalist} / Synthetic demonstration
        </p>

        <div className="evidence-excerpt">
          <span>EVIDENCE EXCERPT</span>
          <p>{currentReview.evidence}</p>
        </div>

        <div className="decision-grid">
          <div className="decision-field">
            <label htmlFor="product-decision">Product classification</label>
            <select
              id="product-decision"
              value={currentReview.product}
              onChange={(event) => updateReviewDecision({ product: event.target.value })}
            >
              {currentReview.productChoices.map((choice) => <option key={choice}>{choice}</option>)}
            </select>
            <p>Model confidence <strong>{currentReview.confidence}%</strong></p>
          </div>
          <div className="decision-field">
            <label htmlFor="pic-decision">Responsible PIC</label>
            <select
              id="pic-decision"
              value={currentReview.pic}
              onChange={(event) => updateReviewDecision({ pic: event.target.value })}
            >
              {currentReview.picChoices.map((choice) => <option key={choice}>{choice}</option>)}
            </select>
            <p>Rules are evaluated before model suggestions.</p>
          </div>
        </div>

        <div className="decision-reason">
          <span>WHY THIS WAS FLAGGED</span>
          <p>{currentReview.evidence}</p>
          <div className="rule-chain">
            <span>Article evidence</span><i />
            <span>Product alias</span><i className="is-broken" />
            <span>PIC rule</span>
          </div>
        </div>

        <div className="review-actions">
          <button className="secondary-action" type="button" onClick={() => setToast("Record held for a PR lead.")}>
            Hold for lead
          </button>
          <button
            className="primary-action"
            type="button"
            onClick={approveReview}
            disabled={currentReview.status === "Approved"}
          >
            {currentReview.status === "Approved" ? "Decision approved" : "Approve decision"}
          </button>
        </div>
        {currentReview.reviewedAt && (
          <p className="review-audit">
            Saved by {currentReview.reviewer} at {new Date(currentReview.reviewedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}.
          </p>
        )}
      </section>

      <aside className="audit-panel">
        <p className="section-label">AUDIT TRAIL</p>
        <h2>Decision history</h2>
        <div className="audit-event">
          <span className="audit-dot" />
          <div><strong>Record imported</strong><small>09:02 / Source row 188</small></div>
        </div>
        <div className="audit-event">
          <span className="audit-dot" />
          <div><strong>Rules evaluated</strong><small>09:03 / 3 matches</small></div>
        </div>
        <div className="audit-event audit-event--current">
          <span className="audit-dot" />
          <div><strong>Exception raised</strong><small>09:03 / Awaiting PR</small></div>
        </div>
        <div className="audit-note">
          The final selection is stored with its evidence, reviewer, and timestamp.
        </div>
      </aside>
    </div>
  );

  const renderCoverage = () => (
    <section className="ledger-section ledger-section--full">
      <div className="section-heading section-heading--tools">
        <div>
          <p className="section-label">247 RECONCILED RECORDS</p>
          <h1>One ledger for every placement</h1>
        </div>
        <div className="table-tools">
          <label className="search-field">
            <span className="sr-only">Search coverage</span>
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search outlet, product, PIC..." />
          </label>
          <select aria-label="Filter coverage status" value={coverageFilter} onChange={(event) => setCoverageFilter(event.target.value)}>
            <option>All</option>
            <option>Ready</option>
            <option>Review</option>
            <option>Synced</option>
          </select>
        </div>
      </div>
      <div className="ledger-summary">
        <span><strong>{filteredCoverage.length}</strong> shown in demo</span>
        <span><strong>6</strong> products</span>
        <span><strong>5</strong> markets</span>
        <span><strong>96%</strong> PIC rule coverage</span>
      </div>
      {renderCoverageTable(filteredCoverage)}
    </section>
  );

  const renderAnalytics = () => (
    <div className="analytics-page">
      <section className="analytics-lead">
        <div>
          <p className="section-label">AUGUST / SYNTHETIC DEMO DATA</p>
          <h1>The product story is visible before the month closes.</h1>
        </div>
        <div className="analytics-lead__metric">
          <strong>+24%</strong>
          <span>Tier 1 coverage vs. July</span>
        </div>
      </section>

      <div className="analytics-grid">
        <section className="analysis-panel analysis-panel--wide">
          <div className="section-heading">
            <div><p className="section-label">PRODUCT SIGNAL</p><h2>Coverage by product</h2></div>
            <span className="data-note">Volume / Tier 1 highlighted</span>
          </div>
          <div className="bar-ledger">
            {productMix.map(([label, value, tier]) => (
              <div className="bar-row" key={label}>
                <span>{label}</span>
                <div className="bar-track">
                  <span className="bar-total" style={{ width: `${value}%` }} />
                  <span className="bar-tier" style={{ width: `${tier}%` }} />
                </div>
                <strong>{value}</strong>
              </div>
            ))}
          </div>
        </section>

        <section className="analysis-panel">
          <p className="section-label">SENTIMENT</p>
          <h2>Conversation quality</h2>
          <div className="sentiment-total">78% <span>positive</span></div>
          <div className="sentiment-stack" aria-label="78 percent positive, 17 percent neutral, 5 percent mixed">
            <span style={{ width: "78%" }} /><span style={{ width: "17%" }} /><span style={{ width: "5%" }} />
          </div>
          <dl className="legend-list"><div><dt>Positive</dt><dd>192</dd></div><div><dt>Neutral</dt><dd>42</dd></div><div><dt>Mixed</dt><dd>13</dd></div></dl>
        </section>

        <section className="analysis-panel">
          <p className="section-label">MARKET MIX</p>
          <h2>Global distribution</h2>
          <div className="region-list">
            <div><span>North America</span><strong>34%</strong></div>
            <div><span>Europe</span><strong>26%</strong></div>
            <div><span>APAC</span><strong>24%</strong></div>
            <div><span>United Kingdom</span><strong>10%</strong></div>
            <div><span>Other</span><strong>6%</strong></div>
          </div>
        </section>

        <section className="analysis-panel analysis-panel--wide weekly-cadence">
          <div className="section-heading"><div><p className="section-label">COVERAGE CADENCE</p><h2>Four weeks at a glance</h2></div><span className="data-note">247 placements in August</span></div>
          <div className="week-bars">
            {[58, 71, 64, 83].map((height, index) => (
              <div key={height}><span style={{ height: `${height}%` }}><i>{[52, 61, 57, 77][index]}</i></span><small>Week {index + 1}</small></div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );

  const renderBrief = () => (
    <div className="brief-page">
      <aside className="brief-controls">
        <p className="section-label">AUGUST 2026</p>
        <h1>Monthly brief</h1>
        <p>Generated from 247 reconciled placements. Every statement points back to supporting records.</p>
        <div className="brief-status">
          <span className={briefApproved ? "is-done" : ""} />
          <div><strong>{briefApproved ? "Reviewed" : briefEdited ? "Edited demo draft" : "Draft for PR lead"}</strong><small>{briefApproved ? "Ready to copy" : briefEdited ? "Temporary browser-only edits" : "Human review required"}</small></div>
        </div>
        <button className="primary-action primary-action--full" type="button" onClick={() => { setBriefApproved(true); setToast("Draft marked reviewed in this demo session."); }}>
          {briefApproved ? "Draft reviewed" : "Mark draft reviewed"}
        </button>
        <button className="secondary-action secondary-action--full" type="button" onClick={copyBrief}>Copy Lark-ready text</button>
        <p className="fine-print">Synthetic demonstration. Edits are temporary and reset when the page reloads; no Lark connection or company data is used.</p>
      </aside>

      <article
        className="brief-document"
        data-brief
        contentEditable
        suppressContentEditableWarning
        aria-label="Editable monthly brief draft. Changes are temporary in this demo."
        onInput={() => { setBriefEdited(true); setBriefApproved(false); }}
      >
        <header>
          <span>GLOBAL PR / MONTHLY COVERAGE INTELLIGENCE</span>
          <h2>August: launches widened the creator conversation</h2>
          <p>Executive draft / evidence-linked / synthetic demo</p>
        </header>
        <section>
          <h3>Executive signal</h3>
          <p>Coverage momentum increased across priority creator and imaging outlets, led by GO Ultra and Luna Ultra launch narratives. Tier 1 volume rose while the review queue remained concentrated in product ambiguity and outlet ownership conflicts.</p>
        </section>
        <div className="brief-metrics">
          <div><strong>247</strong><span>Placements</span></div>
          <div><strong>78%</strong><span>Positive</span></div>
          <div><strong>64</strong><span>Tier 1</span></div>
          <div><strong>91%</strong><span>Auto-processed</span></div>
        </div>
        <section>
          <h3>Three wins to carry forward</h3>
          <ol>
            <li><strong>GO Ultra owned the spontaneous-creation narrative.</strong><span>82 placements / 46 Tier 1</span></li>
            <li><strong>Luna Ultra expanded the conversation into creator cinema.</strong><span>68 placements / strongest APAC pull-through</span></li>
            <li><strong>X5 sustained recommendation coverage between launches.</strong><span>56 placements / high positive sentiment</span></li>
          </ol>
        </section>
        <section className="brief-risk">
          <h3>Watch item</h3>
          <p>Mixed Ace Pro 2 coverage clusters around comparative low-light testing. Review the thirteen linked records before the next creator briefing.</p>
        </section>
        <footer>Draft generated from reconciled coverage / Edit before distribution</footer>
      </article>
    </div>
  );

  const renderRules = () => (
    <div className="rules-page">
      <section className="rules-intro">
        <div><p className="section-label">RULES FIRST / AI SECOND</p><h1>PR operations owns the logic.</h1></div>
        <p>Assignments remain editable without changing code. The engine applies campaign overrides, exact journalist ownership, outlet ownership, market fallback, then human review.</p>
      </section>
      <div className="rules-grid">
        <section className="rules-table-wrap">
          <div className="section-heading"><div><p className="section-label">PIC ROUTING</p><h2>Ownership rules</h2></div><button className="text-action" type="button" onClick={() => setToast("Rule editing is a production handoff item, not connected in this demo.")}>Preview add rule</button></div>
          <table className="rules-table"><thead><tr><th>Priority</th><th>Match</th><th>Value</th><th>PIC</th><th>State</th></tr></thead><tbody>
            <tr><td>01</td><td>Campaign</td><td>Luna Ultra launch</td><td>S. Lin</td><td><span className="status status--ready">Live</span></td></tr>
            <tr><td>02</td><td>Journalist</td><td>Maya Chen</td><td>J. Park</td><td><span className="status status--ready">Live</span></td></tr>
            <tr><td>03</td><td>Outlet</td><td>Outside Signal</td><td>L. Evans</td><td><span className="status status--ready">Live</span></td></tr>
            <tr><td>04</td><td>Market</td><td>France</td><td>A. Morgan</td><td><span className="status status--ready">Live</span></td></tr>
          </tbody></table>
        </section>
        <section className="rules-table-wrap">
          <div className="section-heading"><div><p className="section-label">PRODUCT TAXONOMY</p><h2>Aliases</h2></div><button className="text-action" type="button" onClick={() => setToast("Alias editing is a production handoff item, not connected in this demo.")}>Preview add alias</button></div>
          <table className="rules-table"><thead><tr><th>Canonical product</th><th>Recognized aliases</th><th>Valid from</th></tr></thead><tbody>
            <tr><td>GO Ultra</td><td>GO Ultra / GOUltra</td><td>2026-01</td></tr>
            <tr><td>Luna Ultra</td><td>Luna / Luna Ultra</td><td>2026-07</td></tr>
            <tr><td>X4 Air</td><td>X4 Air / X4Air</td><td>2025-11</td></tr>
            <tr><td>Flow 2 Series</td><td>Flow 2 / Flow 2 Pro</td><td>2025-01</td></tr>
          </tbody></table>
        </section>
      </div>
      <section className="precedence-rail">
        <p className="section-label">ASSIGNMENT PRECEDENCE</p>
        <ol><li><span>01</span>Campaign override</li><li><span>02</span>Journalist</li><li><span>03</span>Outlet</li><li><span>04</span>Market</li><li><span>05</span>Human review</li></ol>
      </section>
    </div>
  );

  const renderHandoff = () => (
    <div className="handoff-page">
      <section className="handoff-lead">
        <div><p className="section-label">FROM DEMO TO DAILY WORK</p><h1>Start with the bridge. Build toward the hub.</h1></div>
        <p>This repository demonstrates the shared interaction model. Production work replaces the simulated boundaries without rewriting the PR taxonomy, review behavior, or reconciliation logic.</p>
      </section>
      <div className="handoff-tracks">
        <section className="handoff-track handoff-track--bridge">
          <div className="track-number">01</div>
          <p className="section-label">PR-OWNED BRIDGE</p>
          <h2>Coverage Copilot</h2>
          <p>Keep the existing Muck Rack export and Lark destination. Automate the handling in between.</p>
          <ul><li>Excel parser and reconciliation</li><li>Classification and PIC rules</li><li>Exception review</li><li>Lark-ready rows</li></ul>
          <div className="track-footer"><strong>2-4 week pilot</strong><span>No Muck Rack API required</span></div>
        </section>
        <div className="handoff-connector"><span>REUSE</span></div>
        <section className="handoff-track handoff-track--hub">
          <div className="track-number">02</div>
          <p className="section-label">DEVELOPER-BUILT TARGET</p>
          <h2>PR Intelligence Hub</h2>
          <p>Move the same engine behind secure ingestion, durable storage, Lark sync, and live reporting.</p>
          <ul><li>Muck Rack API or upload intake</li><li>Database and audit history</li><li>Lark Base integration</li><li>Scheduled monthly intelligence</li></ul>
          <div className="track-footer"><strong>4-8 week MVP</strong><span>Internal security review</span></div>
        </section>
      </div>
      <section className="integration-map">
        <div>
          <p className="section-label">INTEGRATION PREVIEW</p>
          <h2>Lark-ready payload</h2>
          <p>The demo shows the production contract without storing credentials or writing company data.</p>
          <button className="secondary-action" type="button" onClick={() => { setSyncPreviewed(true); setToast("Synthetic payload validated. No external data was sent."); }}>
            {syncPreviewed ? "Payload validated" : "Validate preview"}
          </button>
        </div>
        <pre>{`{
  "record_id": "MR-0814-0247",
  "product": "GO Ultra",
  "pic": "J. Park",
  "confidence": 0.97,
  "status": "approved",
  "destination": "lark_base_demo"
}`}</pre>
      </section>
    </div>
  );

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand-mark" aria-label="Coverage Intelligence">
          <span className="brand-symbol"><i /><i /><i /></span>
          <span><strong>Coverage</strong><small>Intelligence</small></span>
        </div>
        <div className="demo-badge"><span />Synthetic demo</div>
        <nav aria-label="Primary navigation">
          {navItems.map((item) => (
            <button
              type="button"
              key={item.id}
              className={activeView === item.id ? "is-active" : ""}
              aria-current={activeView === item.id ? "page" : undefined}
              onClick={() => changeView(item.id)}
            >
              <span>{item.code}</span>{item.label}
              {item.id === "review" && outstandingReviews.length > 0 && <b>{outstandingReviews.length}</b>}
            </button>
          ))}
        </nav>
        <div className="sidebar-foot">
          <span>Weekly run</span>
          <strong>Aug 10-16</strong>
          <small>Last reconciled 09:06</small>
        </div>
      </aside>

      <div className="main-frame">
        <header className="topbar">
          <div><span className="topbar-path">Global PR /</span><strong>{viewTitles[activeView]}</strong></div>
          <div className="topbar-actions">
            <button className="topbar-status" type="button" onClick={() => setToast("Demo systems are healthy. External connections remain simulated.")}><span />Systems ready</button>
            <button className="avatar" type="button" aria-label="Preview profile, not connected in this demo" onClick={() => setToast("Profile controls are not connected in this credential-free demo.")}>PR</button>
          </div>
        </header>

        <main>
          {activeView === "overview" && renderOverview()}
          {activeView === "review" && renderReview()}
          {activeView === "coverage" && renderCoverage()}
          {activeView === "analytics" && renderAnalytics()}
          {activeView === "brief" && renderBrief()}
          {activeView === "rules" && renderRules()}
          {activeView === "handoff" && renderHandoff()}
        </main>
      </div>

      {selectedRecord && (
        <div className="drawer-backdrop" role="presentation">
          <aside ref={drawerDialogRef} className="record-drawer" role="dialog" aria-modal="true" aria-labelledby="record-drawer-title" tabIndex={-1}>
            <button className="drawer-close" type="button" onClick={() => setSelectedRecord(null)}>Close</button>
            <p className="section-label">{selectedRecord.id}</p>
            <h2 id="record-drawer-title">{selectedRecord.headline}</h2>
            <p className="drawer-byline">{selectedRecord.outlet} / {selectedRecord.journalist} / {selectedRecord.date}</p>
            <dl className="record-fields">
              <div><dt>Product</dt><dd>{selectedRecord.product}</dd></div>
              <div><dt>Campaign</dt><dd>{selectedRecord.campaign}</dd></div>
              <div><dt>Market</dt><dd>{selectedRecord.market}</dd></div>
              <div><dt>Sentiment</dt><dd>{selectedRecord.sentiment}</dd></div>
              <div><dt>Reach</dt><dd>{selectedRecord.reach}</dd></div>
              <div><dt>Responsible PIC</dt><dd>{selectedRecord.pic}</dd></div>
            </dl>
            <div className="drawer-evidence"><span>DECISION EVIDENCE / {selectedRecord.confidence}%</span><p>{selectedRecord.evidence}</p></div>
            <button className="primary-action primary-action--full" type="button" onClick={() => { setSelectedRecord(null); setToast("Record marked ready for Lark preview."); }}>Mark ready</button>
          </aside>
        </div>
      )}

      {importOpen && (
        <div className="modal-backdrop" role="presentation">
          <section ref={importDialogRef} className="import-modal" role="dialog" aria-modal="true" aria-labelledby="import-title" aria-describedby="import-description" tabIndex={-1}>
            <div className="import-modal__header"><div><p className="section-label">SIMULATED MUCK RACK EXPORT</p><h2 id="import-title">Reconcile week 33</h2></div><span>{Math.min(importProgress, importStages.length)} / {importStages.length}</span></div>
            <p id="import-description" className="sr-only">A five-step simulated reconciliation using synthetic Muck Rack-style export data.</p>
            <div className="import-stages">
              {importStages.map(([title, detail], index) => (
                <div key={title} className={`${index < importProgress ? "is-complete" : ""} ${index === importProgress ? "is-active" : ""}`}>
                  <span>{index < importProgress ? "DONE" : String(index + 1).padStart(2, "0")}</span>
                  <div><strong>{title}</strong><small>{detail}</small></div>
                </div>
              ))}
            </div>
            <div className="import-progress" role="progressbar" aria-label="Import reconciliation progress" aria-valuemin={0} aria-valuemax={importStages.length} aria-valuenow={importProgress}><span style={{ transform: `scaleX(${importProgress / importStages.length})` }} /></div>
            <button className="primary-action primary-action--full" type="button" disabled={importProgress < importStages.length} onClick={() => { setImportOpen(false); changeView("review"); }}>
              {importProgress < importStages.length ? "Processing synthetic export..." : "Review 16 exceptions"}
            </button>
            <button className="modal-cancel" type="button" onClick={() => setImportOpen(false)}>Close demo</button>
          </section>
        </div>
      )}

      {toast && <div className="toast" role="status"><span />{toast}</div>}
    </div>
  );
}
