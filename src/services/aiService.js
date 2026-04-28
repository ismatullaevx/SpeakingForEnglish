import Groq from "groq-sdk";
import { GoogleGenerativeAI } from "@google/generative-ai";

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// Initialize Groq
const groq = GROQ_API_KEY ? new Groq({
    apiKey: GROQ_API_KEY,
    dangerouslyAllowBrowser: true
}) : null;

// Initialize Gemini
const genAI = GEMINI_API_KEY ? new GoogleGenerativeAI(GEMINI_API_KEY) : null;

export const evaluateSpeaking = async (question, transcription, level = "B1") => {
    // We prefer Groq if available, otherwise Gemini
    if (GROQ_API_KEY && groq) {
        return await evaluateWithGroq(question, transcription, level);
    } else if (GEMINI_API_KEY && genAI) {
        return await evaluateWithGemini(question, transcription, level);
    } else {
        throw new Error("No AI API Key found. Please add VITE_GROQ_API_KEY or VITE_GEMINI_API_KEY to your .env file.");
    }
};

const evaluateWithGemini = async (question, transcription, level) => {
    try {
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            generationConfig: { responseMimeType: "application/json" }
        });

        const prompt = `
            You are a professional English language examiner (like IELTS or Cambridge).
            Task: Evaluate a student's spoken response to a question based on the CEFR ${level.toUpperCase()} level standards.
            
            Question: "${question}"
            Student's Response: "${transcription}"
            
            Instructions for Feedback:
            1. Be specific and critical. Avoid generic praise like "you did well".
            2. Identify exact grammar mistakes and provide corrections using examples from their text.
            3. Suggest 2-3 specific vocabulary improvements that would elevate their response to a higher level.
            4. Evaluate if they actually answered the question (Relevance).
            5. Provide a summary that highlights both strengths and specific weaknesses.
            
            Return a JSON object with these fields:
            - "score": (number 1-10, be honest and strict based on ${level} level)
            - "transcriptionCorrected": (string, a natural, professional version of their response)
            - "feedback": (string, a detailed evaluation with specific examples of what was wrong)
            - "suggestions": (array of strings, specific actionable tips for improvement)
        `;

        const result = await model.generateContent(prompt);
        const text = result.response.text();
        return JSON.parse(text);
    } catch (error) {
        console.error("Gemini Evaluation Error:", error);
        // Fallback to Groq if Gemini fails
        if (GROQ_API_KEY && groq) {
            console.log("Falling back to Groq...");
            return await evaluateWithGroq(question, transcription, level);
        }
        throw error;
    }
};

const evaluateWithGroq = async (question, transcription, level) => {
    const prompt = `
    You are a professional English language examiner (like IELTS or Cambridge).
    Task: Evaluate a student's spoken response to a question based on the CEFR ${level.toUpperCase()} level standards.
    
    Question: "${question}"
    Student's Response: "${transcription}"
    
    Instructions for Feedback:
    1. Be specific and critical. Avoid generic praise like "you did well".
    2. Identify exact grammar mistakes and provide corrections using examples from their text.
    3. Suggest 2-3 specific vocabulary improvements that would elevate their response to a higher level.
    4. Evaluate if they actually answered the question (Relevance).
    5. Provide a summary that highlights both strengths and specific weaknesses.
    
    Return a JSON object with these fields:
    - "score": (number 1-10, be honest and strict based on ${level} level)
    - "transcriptionCorrected": (string, a natural, professional version of their response)
    - "feedback": (string, a detailed evaluation with specific examples of what was wrong)
    - "suggestions": (array of strings, specific actionable tips for improvement)

    Respond ONLY with valid JSON.
  `;

    try {
        const response = await groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: `You are an English examiner evaluating level ${level.toUpperCase()}. Respond ONLY with a valid JSON object.`
                },
                {
                    role: "user",
                    content: prompt,
                },
            ],
            model: "llama-3.3-70b-versatile",
            response_format: { type: "json_object" }
        });

        const text = response.choices[0]?.message?.content;
        return JSON.parse(text);
    } catch (error) {
        console.error("Groq Evaluation Error:", error);
        throw error;
    }
};
