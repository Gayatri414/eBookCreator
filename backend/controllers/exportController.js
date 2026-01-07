const {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  ImageRun,
} = require("docx");

const PDFDocument = require("pdfkit");
const MarkdownIt = require("markdown-it");
const Book = require("../models/Book");
const path = require("path");
const fs = require("fs");

const md = new MarkdownIt();

/* ================= DOCX TYPOGRAPHY (SAFE) ================= */
const DOCX_STYLE = {
  fonts: {
    body: "Times New Roman",
    heading: "Arial",
  },
  sizes: {
    title: 32,
    chapter: 24,
    h1: 20,
    h2: 18,
    h3: 16,
    body: 12,
  },
  spacing: {
    paragraphBefore: 200,
    paragraphAfter: 200,
    chapterBefore: 400,
    chapterAfter: 400,
  },
};

/* ================= PDF TYPOGRAPHY ================= */
const TYPOGRAPHY = {
  fonts: {
    serif: "Times-Roman",
    serifBold: "Times-Bold",
    serifItalic: "Times-Italic",
    serifBoldItalic: "Times-BoldItalic",
    mono: "Courier",
  },
  sizes: {
    title: 28,
    chapterTitle: 20,
    body: 11,
  },
};

/* ================= MARKDOWN → DOCX ================= */
const processMarkdownToDocx = (markdown = "") => {
  const tokens = md.parse(markdown, {});
  const paragraphs = [];

  let listType = null;
  let orderedCounter = 1;

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];

    // ---------- HEADINGS ----------
    if (token.type === "heading_open") {
      const level = parseInt(token.tag.substring(1), 10);
      const next = tokens[i + 1];

      if (next?.type === "inline") {
        const fontSize =
          DOCX_STYLE.sizes[`h${level}`] || DOCX_STYLE.sizes.h1;

        const heading =
          HeadingLevel[`HEADING_${level}`] || HeadingLevel.HEADING_1;

        paragraphs.push(
          new Paragraph({
            children: [
              new TextRun({
                text: next.content,
                bold: true,
                font: DOCX_STYLE.fonts.heading,
                size: fontSize * 2,
              }),
            ],
            heading,
            spacing: {
              before: DOCX_STYLE.spacing.paragraphBefore,
              after: DOCX_STYLE.spacing.paragraphAfter,
            },
          })
        );
      }
    }

    // ---------- PARAGRAPH ----------
    if (token.type === "paragraph_open") {
      const next = tokens[i + 1];
      if (next?.type === "inline") {
        paragraphs.push(
          new Paragraph({
            children: [
              new TextRun({
                text: next.content,
                font: DOCX_STYLE.fonts.body,
                size: DOCX_STYLE.sizes.body * 2,
              }),
            ],
            spacing: {
              before: DOCX_STYLE.spacing.paragraphBefore,
              after: DOCX_STYLE.spacing.paragraphAfter,
            },
          })
        );
      }
    }

    // ---------- LISTS ----------
    if (token.type === "ordered_list_open") {
      listType = "ordered";
      orderedCounter = 1;
    }
    if (token.type === "bullet_list_open") {
      listType = "bullet";
    }

    if (token.type === "list_item_open") {
      const next = tokens[i + 2];
      if (next?.type === "inline") {
        const prefix =
          listType === "ordered" ? `${orderedCounter++}. ` : "• ";

        paragraphs.push(
          new Paragraph({
            children: [
              new TextRun({
                text: prefix + next.content,
                size: DOCX_STYLE.sizes.body * 2,
              }),
            ],
          })
        );
      }
    }

    if (
      token.type === "ordered_list_close" ||
      token.type === "bullet_list_close"
    ) {
      listType = null;
      orderedCounter = 1;
    }
  }

  return paragraphs;
};

/* ================= INLINE PDF RENDER ================= */
const renderInlineToken = (doc, token) => {
  if (!token?.children?.length) return;

  let isBold = false;
  let isItalic = false;

  token.children.forEach((child, index) => {
    if (child.type === "strong_open") isBold = true;
    else if (child.type === "strong_close") isBold = false;
    else if (child.type === "em_open") isItalic = true;
    else if (child.type === "em_close") isItalic = false;
    else if (child.type === "code_inline") {
      doc
        .font(TYPOGRAPHY.fonts.mono)
        .fontSize(TYPOGRAPHY.sizes.body)
        .text(child.content, { continued: true });
    } else if (child.type === "text") {
      let font = TYPOGRAPHY.fonts.serif;
      if (isBold && isItalic) font = TYPOGRAPHY.fonts.serifBoldItalic;
      else if (isBold) font = TYPOGRAPHY.fonts.serifBold;
      else if (isItalic) font = TYPOGRAPHY.fonts.serifItalic;

      doc
        .font(font)
        .fontSize(TYPOGRAPHY.sizes.body)
        .text(child.content, {
          continued: index !== token.children.length - 1,
          align: "justify",
        });
    }
  });

  doc.text("\n");
};

/* ================= EXPORT DOCX ================= */
const exportAsDocument = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });

    if (book.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const sections = [];

    // ---------- COVER IMAGE ----------
    if (book.coverImage && typeof book.coverImage === "string") {
      const imagePath = path.join(process.cwd(), book.coverImage.substring(1));
      if (fs.existsSync(imagePath)) {
        const imageBuffer = fs.readFileSync(imagePath);
        sections.push(
          new Paragraph({
            children: [
              new ImageRun({
                data: imageBuffer,
                transformation: { width: 400, height: 550 },
              }),
            ],
            alignment: AlignmentType.CENTER,
          }),
          new Paragraph({ pageBreakBefore: true })
        );
      }
    }

    // ---------- TITLE PAGE ----------
    sections.push(
      new Paragraph({
        children: [
          new TextRun({
            text: book.title,
            bold: true,
            font: DOCX_STYLE.fonts.heading,
            size: DOCX_STYLE.sizes.title * 2,
          }),
        ],
        alignment: AlignmentType.CENTER,
      }),
      new Paragraph({ pageBreakBefore: true })
    );

    // ---------- CHAPTERS ----------
    book.chapters?.forEach((chapter) => {
      sections.push(...processMarkdownToDocx(chapter.content || ""));
    });

    if (sections.length === 0) {
      sections.push(new Paragraph({ text: "" }));
    }

    const doc = new Document({
      sections: [{ children: sections }],
    });

    const buffer = await Packer.toBuffer(doc);

    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${book.title}.docx"`
    );
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    );

    res.send(buffer);
  } catch (error) {
  console.error("🔥 EXPORT DOCX ERROR 🔥");
  console.error(error);
  console.error(error.stack);

  res.status(500).json({
    message: "Failed to export document",
    error: error.message,
  });
}

};

/* ================= EXPORT PDF ================= */
const exportAsPDF = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });

    if (book.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const doc = new PDFDocument({ margin: 50 });

    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${book.title}.pdf"`
    );
    res.setHeader("Content-Type", "application/pdf");

    doc.pipe(res);

    // ---------- TITLE ----------
    doc
      .font(TYPOGRAPHY.fonts.serifBold)
      .fontSize(TYPOGRAPHY.sizes.title)
      .text(book.title, { align: "center" })
      .moveDown();

    doc.addPage();

    // ---------- CHAPTERS ----------
    book.chapters?.forEach((chapter, index) => {
      doc
        .font(TYPOGRAPHY.fonts.serifBold)
        .fontSize(TYPOGRAPHY.sizes.chapterTitle)
        .text(chapter.title)
        .moveDown(0.5);

      const tokens = md.parse(chapter.content || "", {});
      tokens.forEach((t) => {
        if (t.type === "inline") renderInlineToken(doc, t);
      });

      if (index !== book.chapters.length - 1) doc.addPage();
    });

    doc.end();
  } catch (error) {
    console.error("Export PDF Error:", error);
    res.status(500).json({ message: "Failed to export PDF" });
  }
};

/* ================= EXPORTS ================= */
module.exports = {
  exportAsDocument,
  exportAsPDF,
};
