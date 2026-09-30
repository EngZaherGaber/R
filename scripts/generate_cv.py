"""Build the portfolio CV from the verified facts in src/app/core/data/.

Run with: py -3 scripts/generate_cv.py
The content below is editorially condensed from profile, experience, projects,
and skills data. Update it when those source files change.
"""

from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import (
    HRFlowable,
    KeepTogether,
    PageBreak,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "public" / "Zaher-Gaber-CV.pdf"
FONT_DIR = Path("C:/Windows/Fonts")

from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

pdfmetrics.registerFont(TTFont("Arial", str(FONT_DIR / "arial.ttf")))
pdfmetrics.registerFont(TTFont("Arial-Bold", str(FONT_DIR / "arialbd.ttf")))
pdfmetrics.registerFontFamily("Arial", normal="Arial", bold="Arial-Bold")

NAVY = colors.HexColor("#152536")
BLUE = colors.HexColor("#1D688B")
MUTED = colors.HexColor("#496070")
RULE = colors.HexColor("#D8E2E8")

styles = {
    "name": ParagraphStyle("name", fontName="Arial-Bold", fontSize=23, leading=27, textColor=NAVY),
    "role": ParagraphStyle("role", fontName="Arial", fontSize=10.2, leading=15, textColor=BLUE),
    "contact": ParagraphStyle("contact", fontName="Arial", fontSize=8.5, leading=13, textColor=MUTED),
    "section": ParagraphStyle("section", fontName="Arial-Bold", fontSize=10.1, leading=14, textColor=BLUE, spaceBefore=15, spaceAfter=7),
    "body": ParagraphStyle("body", fontName="Arial", fontSize=8.7, leading=13.4, textColor=NAVY, spaceAfter=4),
    "item": ParagraphStyle("item", fontName="Arial", fontSize=8.5, leading=12.7, textColor=NAVY, leftIndent=9, firstLineIndent=-7, spaceAfter=3),
    "job": ParagraphStyle("job", fontName="Arial-Bold", fontSize=9.1, leading=13, textColor=NAVY),
    "meta": ParagraphStyle("meta", fontName="Arial", fontSize=8.1, leading=12, textColor=MUTED),
    "project": ParagraphStyle("project", fontName="Arial", fontSize=8.4, leading=12.5, textColor=NAVY, spaceAfter=5),
    "skill": ParagraphStyle("skill", fontName="Arial", fontSize=8.5, leading=13, textColor=NAVY, spaceAfter=5),
}


def p(text: str, style: str = "body") -> Paragraph:
    return Paragraph(text, styles[style])


def section(title: str):
    return [p(title.upper(), "section"), HRFlowable(width="100%", thickness=0.7, color=RULE), Spacer(1, 6)]


def entry(title: str, organization: str, period: str, bullets: list[str]):
    heading = Table(
        [[p(title, "job"), p(period, "meta")]],
        colWidths=[370, 128],
        hAlign="LEFT",
    )
    heading.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("ALIGN", (1, 0), (1, 0), "RIGHT"),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 0),
        ("TOPPADDING", (0, 0), (-1, -1), 0),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
    ]))
    content = [heading, p(organization, "meta")]
    content.extend(p("• " + bullet, "item") for bullet in bullets)
    content.append(Spacer(1, 8))
    return KeepTogether(content)


def on_page(canvas, doc):
    canvas.saveState()
    w, h = A4
    canvas.setStrokeColor(RULE)
    canvas.setLineWidth(0.7)
    canvas.line(48, 42, w - 48, 42)
    canvas.setFont("Arial", 8)
    canvas.setFillColor(MUTED)
    canvas.drawString(48, 29, "Zaher Gaber  ·  Curriculum Vitae")
    canvas.drawRightString(w - 48, 29, f"{doc.page} / 2")
    canvas.restoreState()


doc = SimpleDocTemplate(
    str(OUTPUT),
    pagesize=A4,
    leftMargin=48,
    rightMargin=48,
    topMargin=42,
    bottomMargin=54,
    title="Zaher Gaber | CV",
    author="Zaher Gaber",
    subject="Full-Stack Angular Engineer",
)

story = [
    p("Zaher Gaber", "name"),
    p("Full-Stack Angular Engineer  |  Senior Front-End Developer", "role"),
    Spacer(1, 7),
    p(
        "Damascus, Syria  ·  +963 993 258 672  ·  "
        '<link href="mailto:eng.zaher.gaber@gmail.com" color="#1D688B">eng.zaher.gaber@gmail.com</link>',
        "contact",
    ),
    p(
        '<link href="https://zahergaber.vercel.app" color="#1D688B">zahergaber.vercel.app</link>'
        '  ·  <link href="https://github.com/EngZaherGaber" color="#1D688B">github.com/EngZaherGaber</link>'
        '  ·  <link href="https://t.me/ZaGa97" color="#1D688B">t.me/ZaGa97</link>',
        "contact",
    ),
    *section("Profile"),
    p(
        "Full-stack engineer focused on Angular products across web, mobile and backend systems. "
        "I lead enterprise frontend delivery, modernize inherited applications and design Nx-based "
        "platforms with Ionic, NestJS and PostgreSQL. My work spans telecom, UN-related operations, "
        "medical SaaS, distribution and commerce."
    ),
    *section("Professional experience"),
    entry(
        "Senior Front-End Developer", "IC&I · Damascus, Syria", "Jun 2023 - Present",
        [
            "Re-architected inherited Angular frontends and delivered Tower Load Inventory and Workflow Automation to production.",
            "Built enterprise HR and operations interfaces with complex forms, business rules and multilingual requirements.",
            "Defined Nx workspace boundaries, API contracts and shared UI infrastructure with backend and product teams.",
        ],
    ),
    entry(
        "Founder & Full-Stack Engineer", "Nasaq · in collaboration with IC&I", "Ongoing",
        [
            "Designed a multi-tenant medical SaaS with isolation enforced at the data-access layer.",
            "Built shared API contracts, dynamic forms and data views across Angular web, Ionic mobile, admin and landing applications.",
        ],
    ),
    entry(
        "Freelance Front-End Developer", "Independent clients", "Apr 2021 - Present",
        [
            "Delivered responsive Angular applications from requirements through client handover.",
        ],
    ),
    entry(
        "Shopify Developer", "2GO Group & independent clients", "May 2024 - Present",
        [
            "Customized Shopify themes and storefront experiences for German-market brands.",
        ],
    ),
    *section("Education"),
    entry("Information Technology Engineering", "Syrian Virtual University", "2020 - Present", []),
    entry("Information Technology", "Damascus Training Center (UNRWA)", "2020 - 2022", []),
    PageBreak(),
    p("SELECTED PROJECTS", "section"),
    HRFlowable(width="100%", thickness=0.7, color=RULE),
    Spacer(1, 9),
    p("<b>Nasaq · Medical SaaS</b> — Founded and built a multi-tenant clinic platform across Angular, Ionic, NestJS, PostgreSQL and Prisma. The MVP runs core clinic workflows.", "project"),
    p("<b>Mandoob · B2B distribution</b> — Designed solution and frontend architecture for a web platform now in launch stage and a built Android app connecting distributors, field representatives and stores. <link href='https://mmapp.ici-sy.com/' color='#1D688B'>mmapp.ici-sy.com</link>", "project"),
    p("<b>Tower Load Inventory · Syriatel</b> — Rebuilt the inherited Angular frontend for tower equipment and capacity management; delivered to the client.", "project"),
    p("<b>Workflow Automation System</b> — Reworked an enterprise Angular frontend for configurable requests, approvals, forms and workflow templates; delivered.", "project"),
    p("<b>UNDP Employee Management</b> — Built Angular interfaces for enterprise HR operations, including complex forms and multilingual workflows.", "project"),
    p("<b>School Management Platform</b> — Structured an Nx and Angular workspace for a multi-area education platform.", "project"),
    p("<b>Hülle 2GO · Shopify storefront</b> — Customized a mobile-first German accessories store with product presentation and a responsive buying flow; finished and live.", "project"),
    p("<b>Phone Parts 2GO · B2B Shopify</b> — Developed a catalog and order workflow for wholesale customers; previous work, no longer active.", "project"),
    p("<b>ReiseKoffer 2GO · B2C Shopify</b> — Developed luggage catalog and product pages for the German market; previous work, no longer active.", "project"),
    *section("Technical skills"),
    p("<b>Frontend:</b> Angular, TypeScript, RxJS, NgRx, Signals, reactive and dynamic forms, component architecture, SSR", "skill"),
    p("<b>Platform & backend:</b> Nx, NestJS, PostgreSQL, Prisma, REST APIs, authentication and authorization", "skill"),
    p("<b>Mobile:</b> Ionic, Capacitor, Android delivery, responsive architecture", "skill"),
    p("<b>Interface systems:</b> PrimeNG, Angular Material, design tokens, accessibility, Arabic/English and RTL, SCSS, Tailwind", "skill"),
    p("<b>Commerce:</b> Shopify, Liquid, e-commerce UX", "skill"),
    Spacer(1, 15),
    HRFlowable(width="100%", thickness=0.7, color=RULE),
    Spacer(1, 9),
    p("Portfolio and detailed case studies: <link href='https://zahergaber.vercel.app' color='#1D688B'>zahergaber.vercel.app</link>", "meta"),
]

OUTPUT.parent.mkdir(parents=True, exist_ok=True)
doc.build(story, onFirstPage=on_page, onLaterPages=on_page)
print(OUTPUT)
