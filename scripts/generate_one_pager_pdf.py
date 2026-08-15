from pathlib import Path

from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4, landscape
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.pdfbase.pdfmetrics import stringWidth
from reportlab.pdfgen import canvas
from reportlab.platypus import Paragraph


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "output" / "pdf" / "global_pr_media_coverage_automation.pdf"

PAGE_W, PAGE_H = landscape(A4)

INK = HexColor("#17202A")
MUTED = HexColor("#59636E")
PAPER = HexColor("#F5F2EA")
WHITE = HexColor("#FFFFFF")
TEAL = HexColor("#117C78")
TEAL_SOFT = HexColor("#DCEDEA")
CORAL = HexColor("#D65E4B")
CORAL_SOFT = HexColor("#F3E1DB")
LINE = HexColor("#D5D0C6")
CHARCOAL = HexColor("#202830")


def paragraph(c, text, x, y_top, width, style):
    p = Paragraph(text, style)
    _, height = p.wrap(width, PAGE_H)
    p.drawOn(c, x, y_top - height)
    return height


def rounded_label(c, x, y, text, bg, fg, pad_x=8, height=18):
    width = stringWidth(text, "Helvetica-Bold", 7.4) + pad_x * 2
    c.setFillColor(bg)
    c.roundRect(x, y, width, height, 7, fill=1, stroke=0)
    c.setFillColor(fg)
    c.setFont("Helvetica-Bold", 7.4)
    c.drawString(x + pad_x, y + 5.2, text)
    return width


def bullet_list(c, items, x, y_top, width, color):
    body = ParagraphStyle(
        "bullet-body",
        fontName="Helvetica",
        fontSize=8.2,
        leading=11.1,
        textColor=INK,
        alignment=TA_LEFT,
    )
    y = y_top
    for item in items:
        c.setFillColor(color)
        c.circle(x + 2.3, y - 5.7, 1.55, fill=1, stroke=0)
        height = paragraph(c, item, x + 11, y, width - 11, body)
        y -= height + 5.4
    return y


def draw_plan(c, x, y_top, width, accent, soft, number, title, audience, timeline, flow, bullets, action):
    c.setFillColor(accent)
    c.rect(x, y_top - 4, 42, 4, fill=1, stroke=0)

    c.setFillColor(MUTED)
    c.setFont("Helvetica-Bold", 7.2)
    c.drawString(x, y_top - 22, f"PLAN {number}  /  {audience.upper()}")

    title_style = ParagraphStyle(
        "plan-title",
        fontName="Helvetica-Bold",
        fontSize=19,
        leading=21,
        textColor=INK,
    )
    paragraph(c, title, x, y_top - 34, width, title_style)

    rounded_label(c, x, y_top - 89, timeline, soft, accent)

    c.setFillColor(MUTED)
    c.setFont("Helvetica-Bold", 7.2)
    c.drawString(x, y_top - 115, "WORKFLOW")
    flow_style = ParagraphStyle(
        "flow",
        fontName="Helvetica-Bold",
        fontSize=9,
        leading=11,
        textColor=accent,
    )
    paragraph(c, flow, x, y_top - 123, width, flow_style)

    c.setStrokeColor(LINE)
    c.setLineWidth(0.6)
    c.line(x, y_top - 151, x + width, y_top - 151)

    c.setFillColor(INK)
    c.setFont("Helvetica-Bold", 8.6)
    c.drawString(x, y_top - 170, "WHAT HAPPENS")
    y = bullet_list(c, bullets, x, y_top - 181, width, accent)

    c.setFillColor(soft)
    c.roundRect(x, y - 47, width, 40, 9, fill=1, stroke=0)
    action_style = ParagraphStyle(
        "action",
        fontName="Helvetica",
        fontSize=7.8,
        leading=10,
        textColor=INK,
    )
    paragraph(c, f"<b>Next action:</b> {action}", x + 12, y - 14, width - 24, action_style)


def build_pdf():
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    c = canvas.Canvas(str(OUTPUT), pagesize=(PAGE_W, PAGE_H))
    c.setTitle("Global PR Media Coverage Automation")
    c.setAuthor("Global PR Media Coverage Dashboard Proposal")

    c.setFillColor(PAPER)
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)

    margin = 15 * mm
    top = PAGE_H - 13 * mm

    c.setFillColor(CORAL)
    c.circle(margin + 5, top - 4, 4.4, fill=1, stroke=0)
    c.setFillColor(TEAL)
    c.circle(margin + 14, top - 4, 4.4, fill=1, stroke=0)

    c.setFillColor(INK)
    c.setFont("Helvetica-Bold", 23)
    c.drawString(margin + 28, top - 11, "Global PR Media Coverage Automation")

    subtitle = ParagraphStyle(
        "subtitle",
        fontName="Helvetica",
        fontSize=10.4,
        leading=14,
        textColor=MUTED,
    )
    paragraph(
        c,
        "Two connected paths to turn up to <b>45 hours of weekly copy-paste</b> into a short, auditable review process.",
        margin + 28,
        top - 20,
        520,
        subtitle,
    )

    c.setFillColor(CHARCOAL)
    c.roundRect(PAGE_W - margin - 184, top - 34, 184, 34, 10, fill=1, stroke=0)
    c.setFillColor(WHITE)
    c.setFont("Helvetica-Bold", 7.2)
    c.drawString(PAGE_W - margin - 171, top - 14, "FASTEST VIEW FROM GITHUB")
    c.setFont("Helvetica", 8.4)
    c.drawString(PAGE_W - margin - 171, top - 26, "Code > Codespaces > Create > pnpm dev")

    content_top = top - 72
    gutter = 22
    column_width = (PAGE_W - 2 * margin - gutter) / 2

    c.setStrokeColor(LINE)
    c.setLineWidth(0.8)
    c.line(PAGE_W / 2, content_top + 4, PAGE_W / 2, 142)

    draw_plan(
        c,
        margin,
        content_top,
        column_width,
        TEAL,
        TEAL_SOFT,
        "1",
        "Coverage Copilot",
        "PR-owned bridge",
        "2-4 week pilot",
        "Muck Rack  >  Excel  >  Agent  >  Existing Lark dashboard",
        [
            "Keeps the current workflow and output; automates export, cleanup, classification, PIC assignment, and data entry.",
            "Processes high-confidence rows automatically and sends only uncertain products, reporters, outlets, or PICs for review.",
            "Best for immediate adoption with light IT/security support and no Muck Rack API requirement.",
        ],
        "PR provides one anonymized export, the Lark template, product aliases, PIC rules, and about 200 validated rows; appoint one pilot owner.",
    )

    draw_plan(
        c,
        PAGE_W / 2 + gutter / 2,
        content_top,
        column_width,
        CORAL,
        CORAL_SOFT,
        "2",
        "PR Intelligence Hub",
        "Developer-built target",
        "4-8 week MVP",
        "Muck Rack/API  >  Processing engine  >  Review  >  Lark + live insights",
        [
            "Replaces spreadsheet assembly with a secure internal app, database, exception inbox, dashboard, and audit history.",
            "Adds product/campaign/sentiment analysis, editable PIC rules, Lark Base synchronization, and evidence-linked monthly briefs.",
            "Starts with Excel upload; adds scheduled Muck Rack ingestion after API entitlement, security, and data-retention review.",
        ],
        "Developers validate API access and Lark permissions, then build ingestion, review, rules, audit, dashboard, and export before live sync.",
    )

    band_y = 38
    c.setFillColor(WHITE)
    c.roundRect(margin, band_y, PAGE_W - 2 * margin, 88, 11, fill=1, stroke=0)

    band_width = PAGE_W - 2 * margin
    split_x = margin + band_width * 0.49
    c.setStrokeColor(LINE)
    c.setLineWidth(0.7)
    c.line(split_x, band_y + 13, split_x, band_y + 75)

    c.setFillColor(INK)
    c.setFont("Helvetica-Bold", 8.2)
    c.drawString(margin + 15, band_y + 68, "OPEN THE INTERACTIVE DEMO")
    c.drawString(split_x + 15, band_y + 68, "IMPLEMENTATION HANDOFF")

    foundation = ParagraphStyle(
        "foundation",
        fontName="Helvetica",
        fontSize=8.2,
        leading=11,
        textColor=MUTED,
    )
    paragraph(
        c,
        "<b>1.</b> Read this page. &nbsp; <b>2.</b> In GitHub, choose Code > Codespaces > Create codespace on main. &nbsp; <b>3.</b> Run <b>pnpm dev</b> and open the forwarded port.",
        margin + 15,
        band_y + 57,
        band_width * 0.49 - 30,
        foundation,
    )
    paragraph(
        c,
        "Then follow <b>START_HERE.md</b> for the five-screen walkthrough. GitHub access is required; local Node/pnpm instructions are included as a fallback.",
        margin + 15,
        band_y + 28,
        band_width * 0.49 - 30,
        foundation,
    )
    paragraph(
        c,
        "<b>PR lead:</b> authorize an anonymized Plan 1 pilot. &nbsp; <b>Developers:</b> reuse its parser, taxonomy, PIC rules, validation set, and review behavior in Plan 2.",
        split_x + 15,
        band_y + 57,
        band_width * 0.51 - 30,
        foundation,
    )
    paragraph(
        c,
        "<b>Success gates:</b> every row reconciled; product >=95%; PIC >=97% where a documented rule exists; no low-confidence record silently published.",
        split_x + 15,
        band_y + 28,
        band_width * 0.51 - 30,
        foundation,
    )

    c.setFillColor(MUTED)
    c.setFont("Helvetica", 6.6)
    c.drawString(margin, 15, "Credential-free synthetic demo. Production connections require IT/security approval.")
    c.drawRightString(PAGE_W - margin, 15, "Start with the bridge. Reuse it in the app.")

    c.showPage()
    c.save()


if __name__ == "__main__":
    build_pdf()
