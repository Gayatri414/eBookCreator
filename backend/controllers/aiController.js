const axios = require("axios");

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

//  Stable & available model
const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";


  // GENERATE OUTLINE

const generateOutline = async (req, res) => {
  try {
    const { topic, style, numChapters, description } = req.body;

    if (!topic) {
      return res.status(400).json({ message: "Topic is required" });
    }

    const prompt = `
Generate a book outline as a JSON array.

Topic: ${topic}
Style: ${style || "general"}
Number of chapters: ${numChapters || 8}
Description: ${description || ""}

Rules:
- Return ONLY a JSON array
- Each item must contain:
  {
    "chapter": number,
    "title": string,
    "summary": string
  }
`;

    const response = await axios.post(
      `${GEMINI_URL}?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }],
          },
        ],
      }
    );

    const text =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) throw new Error("Empty AI response");

    const start = text.indexOf("[");
    const end = text.lastIndexOf("]");

    if (start === -1 || end === -1) {
      return res
        .status(500)
        .json({ message: "Invalid AI response format" });
    }

    const outline = JSON.parse(text.substring(start, end + 1));
    res.status(200).json(outline);
  } catch (error) {
    console.error(" OUTLINE ERROR:", error.response?.data || error.message);
    res.status(500).json({
      message: "Failed to generate outline",
    });
  }
};


  // GENERATE CHAPTER CONTENT   

const generateChapterContent = async (req, res) => {
  console.log(" CHAPTER AI HIT:", req.body);

  try {
    const { topic, chapterTitle, chapterSummary, style, wordCount } = req.body;

    if (!topic || !chapterTitle) {
      return res.status(400).json({
        message: "Topic and chapter title are required",
      });
    }

    const prompt = `
Write a detailed book chapter.

Book topic: ${topic}
Chapter title: ${chapterTitle}
Chapter summary: ${chapterSummary || ""}
Writing style: ${style || "clear and engaging"}
Length: about ${wordCount || 800} words

Rules:
- Plain text only
- No markdown
- No bullet points
`;

    const response = await axios.post(
      `${GEMINI_URL}?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }],
          },
        ],
      }
    );

    const content =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!content) throw new Error("Empty chapter response");

    res.status(200).json({
      title: chapterTitle,
      content,
    });
  } catch (error) {
    console.error(" CHAPTER ERROR:", error.response?.data || error.message);
    res.status(500).json({
      message: "Failed to generate chapter",
    });
  }
};

module.exports = {
  generateOutline,
  generateChapterContent,
};
