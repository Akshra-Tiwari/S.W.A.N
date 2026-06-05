const {
  GoogleGenerativeAI,
} = require("@google/generative-ai");

const genAI =
  new GoogleGenerativeAI(
    process.env.GEMINI_API_KEY
  );

const analyzeReport = async (
  title,
  description
) => {
  try {
    const model =
      genAI.getGenerativeModel({
        model: "gemini-2.0-flash",
      });

    const prompt = `
You are an environmental analyst.

Analyze the following pollution complaint.

Title:
${title}

Description:
${description}

Return ONLY valid JSON.

{
  "summary": "short complaint summary",
  "solution": "recommended solution",
  "severity": "low|medium|high|critical"
}
`;

    const result =
      await model.generateContent(
        prompt
      );

    const text =
      result.response.text();

    const cleaned =
      text.replace(
        /```json|```/g,
        ""
      );

    const parsed =
      JSON.parse(cleaned);

    return {
      summary:
        parsed.summary ||
        "No summary available",

      solution:
        parsed.solution ||
        "No solution available",

      severity:
        parsed.severity ||
        "medium",
    };
  } catch (error) {
    console.error(
      "AI Analysis Error:",
      error
    );

    return {
      summary:
        "AI analysis unavailable",

      solution:
        "Manual review required",

      severity:
        "medium",
    };
  }
};

module.exports = {
  analyzeReport,
};