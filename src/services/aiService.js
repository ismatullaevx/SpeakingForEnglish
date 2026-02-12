import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

export const evaluateSpeaking = async (question, transcription) => {
    if (!API_KEY) {
        throw new Error("Gemini API Key is missing. Please add VITE_GEMINI_API_KEY to your .env file.");
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
    You are an expert English language examiner specializing in B1 (Intermediate) level certification.
    
    Task: Evaluate a student's spoken response to the following question.
    
    Question: "${question}"
    Student's Response: "${transcription}"
    
    Please provide a structured evaluation in JSON format. The response must be a single JSON object with EXACTLY these fields:
    - "score": (number 1-10)
    - "transcriptionCorrected": (string, corrected version of their answer)
    - "feedback": (string, brief summary of their performance)
    - "suggestions": (array of strings, 2-3 specific tips for improvement)
    
    Ensure the response is ONLY the JSON object, with no markdown formatting or extra text.
  `;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Extract JSON from the response (in case AI wraps it in markdown blocks)
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            return JSON.parse(jsonMatch[0]);
        }
        throw new Error("Invalid AI response format");
    } catch (error) {
        console.error("AI Evaluation Error:", error);
        throw error;
    }
};
