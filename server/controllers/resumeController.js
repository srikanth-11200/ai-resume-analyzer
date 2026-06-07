const pdfParse = require("pdf-parse");
const groq = require("../utils/groqClient");

const analyzeResume = async (req, res, next) => {

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a PDF file",
      });
    }

  try {
    const pdfData = await pdfParse(req.file.buffer);

    const resumeText = pdfData.text;

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `
Analyze the following resume.

Act as an ATS system and senior technical recruiter.

Score the resume from 0 to 100 based on:

- Technical skills
- Experience
- Projects
- Resume quality
- ATS friendliness

Return ONLY valid JSON.

{
  "score": 0,
  "strengths": [],
  "weaknesses": [],
  "missingSkills": [],
  "atsSuggestions": [],
  "recommendations": []
}

Resume:

${resumeText}
`,
        },
      ],
      model: "llama-3.3-70b-versatile",
    });

    const analysisText = completion.choices[0].message.content;

    const cleanedResponse = analysisText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const analysis = JSON.parse(cleanedResponse);
    console.log(analysis);

    res.status(200).json({
      success: true,
      analysis,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  analyzeResume,
};
