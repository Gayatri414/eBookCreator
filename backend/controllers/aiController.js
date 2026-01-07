const { GoogleGenAI } = require("@google/genai");
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });


//@desc generate a book outline
//@route POST /api/ai/generate-outline
//@access Private

const generateOutline = async (req, res) => {
  try {
    const { topic, style, numChapters, description } = req.body;

    if (!topic) {
      return res.status(400).json({ message: "Please provide a topic" });
    }

    //  ADDED LOGIC: prompt creation
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

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: prompt,
    });

    //  CORRECTION: access text safely
    const text = response.text;

    // find and extract the json array from the response text
    const startIndex = text.indexOf("[");
    const endIndex = text.lastIndexOf("]");

    if (startIndex === -1 || endIndex === -1) {
      console.error("Could not find JSON array in AI response:", text);
      return res.status(500).json({
        message: "Failed to parse AI response, no JSON array found.",
      });
    }

    const jsonString = text.substring(startIndex, endIndex + 1);

    
    let outline;
    try {
      outline = JSON.parse(jsonString);
    } catch (err) {
      console.error("Invalid JSON from AI:", jsonString);
      return res.status(500).json({
        message: "AI returned invalid JSON",
      });
    }

    
    res.status(200).json(outline);

  } catch (error) {
    console.error("Error generating outline:", error);
    res.status(500).json({
      message: "Server error during AI outline generation",
    });
  }
};


//@desc  Generate content for a chapter
//@route POST /api/ai/generate-chapter-content
//@access Private

const generateChapterContent = async (req, res) => {
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
- No markdown
- No bullet points
- Return only plain text
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: prompt,
    });

    const chapterText = response.text;

    if (!chapterText) {
      return res.status(500).json({
        message: "AI returned empty chapter content",
      });
    }

  
    res.status(200).json({
      title: chapterTitle,
      content: chapterText,
    });

  } catch (error) {
    console.error("Error generating chapter:", error);
    res.status(500).json({
      message: "Server error during AI chapter generation",
    });
  }
};

module.exports = {
  generateOutline,
  generateChapterContent,
};
