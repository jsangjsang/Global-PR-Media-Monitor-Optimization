---
name: Coverage Intelligence
description: A calm, evidence-led newsroom ledger for global PR operations.
colors:
  deep-ink: "#101a2c"
  secondary-ink: "#18243a"
  muted-copy: "#627083"
  quiet-copy: "#596779"
  cold-daylight: "#f2f6fa"
  paper: "#ffffff"
  hairline: "#d8e0e8"
  strong-hairline: "#b8c4d1"
  electric-blue: "#2854f5"
  deep-blue: "#173bc1"
  blue-wash: "#e6ebff"
  acid-lime: "#c9f25b"
  lime-wash: "#f0f9d7"
  exception-coral: "#f46754"
  coral-wash: "#fff0ed"
  warning-amber: "#e29a26"
typography:
  display:
    fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif"
    fontSize: "clamp(2rem, 3vw, 3.45rem)"
    fontWeight: 800
    lineHeight: 0.98
    letterSpacing: "-0.028em"
  headline:
    fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif"
    fontSize: "2rem"
    fontWeight: 750
    lineHeight: 1.12
    letterSpacing: "-0.028em"
  title:
    fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif"
    fontSize: "1.28rem"
    fontWeight: 750
    lineHeight: 1.12
    letterSpacing: "-0.028em"
  body:
    fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  label:
    fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif"
    fontSize: "9px"
    fontWeight: 800
    lineHeight: 1.5
    letterSpacing: "0.08em"
rounded:
  compact: "6px"
  control: "9px"
  panel: "14px"
  hero: "16px"
spacing:
  micro: "4px"
  compact: "8px"
  control: "14px"
  section: "18px"
  page: "27px"
components:
  button-primary:
    backgroundColor: "{colors.electric-blue}"
    textColor: "{colors.paper}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "0 17px"
    height: "42px"
  button-primary-hover:
    backgroundColor: "{colors.deep-blue}"
    textColor: "{colors.paper}"
  button-secondary:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.deep-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "0 17px"
    height: "42px"
  field:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.deep-ink}"
    typography: "{typography.body}"
    rounded: "8px"
    padding: "0 11px"
    height: "40px"
  panel:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.deep-ink}"
    rounded: "{rounded.panel}"
    padding: "20px"
  status-ready:
    backgroundColor: "{colors.lime-wash}"
    textColor: "#567415"
    rounded: "{rounded.compact}"
    padding: "5px 7px"
---

# Design System: Coverage Intelligence

## Overview

**Creative North Star: "The Newsroom Evidence Ledger"**

Coverage Intelligence feels like an editorial operations desk: cold daylight surfaces hold dense records, deep ink anchors navigation, and hairline rules make evidence easy to scan. The experience is precise and operational rather than promotional, with every surface helping PR teams move from import to exception review, intelligence, and implementation handoff.

The world is mostly flat and paper-like. Electric blue marks decisive action and active state; acid lime signals reconciled or ready evidence; exception coral interrupts the ledger only when human judgment is required. It rejects a generic grid of interchangeable dashboard cards in favor of rails, ledgers, workbenches, and briefing documents.

**Key Characteristics:**

- Cold daylight canvas with white paper work surfaces and deep-ink anchors.
- Dense, hairline-divided evidence ledgers with tabular numbers and compact labels.
- Electric blue for agency, acid lime for completion, and coral for exceptions.
- A reconciliation rail in the first viewport that makes import state legible at a glance.
- Responsive layouts that preserve the record-first story before collapsing to one column.

## Colors

The palette treats color as operational notation layered onto a quiet newsroom foundation.

### Primary

- **Electric Blue:** Primary actions, active navigation, selected records, confidence fills, and focus outlines.
- **Deep Blue:** Hover and high-emphasis blue text where the base accent needs more contrast.
- **Blue Wash:** Selected rows, product tags, and low-intensity active surfaces.

### Secondary

- **Acid Lime:** Completion indicators, ready-stage connectors, and signals against deep ink.
- **Lime Wash:** Ready, approved, and successful evidence surfaces.

### Tertiary

- **Exception Coral:** Low-confidence review states, mixed sentiment, and exception markers.
- **Coral Wash:** Exception rows, review stages, and risk callouts without flooding the page.
- **Warning Amber:** Reserved warning tone for future states that are neither ready nor blocked.

### Neutral

- **Deep Ink:** Sidebar, narrative lead panels, principal text, and structural connectors.
- **Secondary Ink:** Alternate deep surface when tonal separation is needed.
- **Cold Daylight:** App canvas and connector backing.
- **Paper:** Records, review workbenches, documents, drawers, and dialogs.
- **Muted Copy / Quiet Copy:** Secondary descriptions and compact metadata; quiet copy is the minimum contrast for readable text.
- **Hairline / Strong Hairline:** Table rows, panel borders, input strokes, and timeline rails.

### Named Rules

**The Operational Color Rule.** Blue means act, lime means reconciled, and coral means review; never use these accents as arbitrary decoration.

**The Paper Majority Rule.** Cold daylight, paper, and ink occupy most of every screen so evidence remains the visual priority.

## Typography

**Display Font:** Native system sans-serif with Segoe UI, Helvetica, and Arial fallbacks  
**Body Font:** Native system sans-serif with Segoe UI, Helvetica, and Arial fallbacks  
**Label/Mono Font:** System sans-serif labels; SFMono/Consolas/Liberation Mono only for payload previews

**Character:** The single system-sans family is fast, platform-native, and unceremonious. Weight, scale, tracking, and tabular figures create the hierarchy; compact uppercase labels behave as coordinates, not marketing slogans.

### Hierarchy

- **Display:** Heavy, tightly tracked, and compact; reserved for page leads, large metrics, and the monthly document title.
- **Headline:** Strong section and feature titles, generally around 2rem with tight leading.
- **Title:** Panel and section headings that establish local hierarchy without competing with the page lead.
- **Body:** Regular 14px copy at 1.5 line height; explanatory paragraphs stay near 58–68 characters when the layout permits.
- **Label:** Heavy 9–11px uppercase notation with generous tracking for statuses, coordinates, and table headings.

### Named Rules

**The Coordinate Label Rule.** Uppercase microtype identifies operational position or state; it does not introduce every block.

**The Numeric Evidence Rule.** Counts, reach, confidence, and metrics use tabular figures and tighter display tracking.

## Layout

The desktop shell uses a fixed 232px deep-ink navigation rail and a fluid work area with 27px page gutters. Primary screens are ledgers or split workbenches rather than repeated equal-weight cards: the weekly view pairs a fluid ledger with a 318px exception column, while review uses a three-part index, decision canvas, and audit rail.

An 18px rhythm separates major surfaces; compact control gaps use 8–14px, and page-level padding returns to 27px. Hairlines create internal rhythm inside panels, allowing dense content without extra containers. The first viewport reserves visual priority for the source-to-ready reconciliation rail.

At 1120px, secondary rails collapse or stack. At 880px, the sidebar becomes a horizontal navigation band and analytical grids become single-column. At 650px, the reconciliation rail turns vertical, workbench decisions stack, and page padding contracts to 14px while touch targets remain at least 40px high.

## Elevation & Depth

The system is flat by default and uses borders plus tonal layering for most depth. Soft ambient shadows appear only on heroes, floating overlays, the editable brief, and the primary action; drawers receive a directional shadow that clarifies their edge. Deep-ink lead panels create depth through contrast rather than elevation.

### Shadow Vocabulary

- **Hero ambient:** A low 8px/30px blue-gray diffusion for the weekly run hero.
- **Action lift:** A compact blue shadow that strengthens when the primary action rises 1px on hover.
- **Overlay ambient:** The shared 18px/48px shadow for dialogs and toasts.
- **Drawer edge:** A left-cast 20px/55px shadow that separates the inspection drawer from the ledger.
- **Document float:** A restrained 14px/45px shadow for the monthly brief sheet.

### Named Rules

**The Flat Ledger Rule.** Evidence surfaces stay border-defined at rest; elevation is reserved for hierarchy, overlays, and direct interaction.

## Shapes

Controls use gently curved 8–9px corners, recurring panels use 14px corners, and the weekly hero reaches 16px. Compact statuses and product tags use 6px corners. Circular geometry is limited to status dots, rail markers, and the faint orbital lines that give deep-ink and hero surfaces a technical editorial signature.

**The Bounded Curvature Rule.** Corners communicate scale: compact for notation, control-sized for actions, and panel-sized for work surfaces; avoid indiscriminate pill shapes.

## Components

### Buttons

- **Shape:** Gently curved control corners, 42px minimum height, compact horizontal padding.
- **Primary:** Electric blue with white type and a low blue shadow; used for the next operational commitment.
- **Hover / Focus:** Deepens to blue, rises 1px, and receives a solid 3px electric-blue focus outline with 2px offset.
- **Secondary / Text:** Paper with a strong hairline for secondary actions; text actions are borderless blue and underline only on hover.

### Chips

- **Style:** Compact 6px corners with 5px by 7px padding and heavy 9px labels.
- **State:** Blue wash marks product classification, lime wash marks ready or synced evidence, and coral wash marks exceptions; every chip includes readable text rather than color alone.

### Cards / Containers

- **Corner Style:** 14px panels and 16px heroes.
- **Background:** Paper on cold daylight, or deep ink for narrative and workflow strips.
- **Shadow Strategy:** Borders and tonal contrast first; use the shadow vocabulary only for named elevated roles.
- **Border:** One-pixel hairlines divide both outer surfaces and internal evidence rows.
- **Internal Padding:** Typically 18–29px at panel level, with 12–17px table and row density.

### Inputs / Fields

- **Style:** White fill, strong hairline stroke, 8px corners, 40px minimum height, and deep-ink value text.
- **Focus:** Solid 3px electric-blue outline with a 2px offset.
- **Disabled:** Reduced opacity with a not-allowed cursor; no color-only state dependency.

### Navigation

The desktop rail is deep ink with 43px rows, compact two-letter coordinates, and muted copy. Hover adds a translucent paper wash; active state becomes a full electric-blue block with white text and a restrained blue shadow. On tablet widths the rail becomes a horizontally scrollable band without changing the active-state grammar.

### Reconciliation Rail

The signature rail is a four-stage evidence flow connected by two-pixel rules and circular markers. Source and normalization stay neutral, human review uses coral, and Lark-ready output uses lime. On small screens, the rail rotates vertically while preserving order and state labels.

### Evidence Ledger

Tables use paper, one-pixel hairlines, compact uppercase headers, tabular figures, and a slight blue row wash on hover. The headline remains the strongest cell; outlet and journalist sit directly beneath it so each record reads as an evidence unit rather than a spreadsheet row.

## Do's and Don'ts

### Do:

- **Do** preserve the record-first sequence: import, reconcile, review exceptions, interpret, then hand off.
- **Do** use hairlines and tonal shifts to organize dense evidence before adding a new container.
- **Do** keep primary actions blue, reconciled states lime, and review states coral, always paired with a text label.
- **Do** maintain 40–43px minimum interactive heights and the visible 3px focus treatment.
- **Do** let large metrics and counts use tabular numerals and tight tracking.

### Don't:

- **Don't** turn the workspace into a generic mosaic of equal-weight metric cards.
- **Don't** use accent colors as decoration or communicate status through color alone.
- **Don't** make every caption an uppercase eyebrow; coordinate labels should earn their place.
- **Don't** add heavy shadows to ordinary evidence panels or table rows.
- **Don't** imply that synthetic demo data, external integrations, or temporary edits are production-connected.
