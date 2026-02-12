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

export const evaluateSpeaking = async (question, transcription) => {
    // We prefer Gemini if available, otherwise Groq
    if (GEMINI_API_KEY && genAI) {
        return await evaluateWithGemini(question, transcription);
    } else if (GROQ_API_KEY && groq) {
        return await evaluateWithGroq(question, transcription);
    } else {
        throw new Error("No AI API Key found. Please add VITE_GEMINI_API_KEY or VITE_GROQ_API_KEY to your .env file.");
    }
};

const evaluateWithGemini = async (question, transcription) => {
    try {
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            generationConfig: { responseMimeType: "application/json" }
        });

        const prompt = `
            You are an expert English language examiner specializing in B1 (Intermediate) level certification.
            Evaluate this spoken response to the question.
            Question: "${question}"
            Student's Response: "${transcription}"
            
            Return a JSON object with these fields:
            - "score": (number 1-10)
            - "transcriptionCorrected": (string, corrected version)
            - "feedback": (string, performance summary)
            - "suggestions": (array of strings, 2-3 tips)
        `;

        const result = await model.generateContent(prompt);
        const text = result.response.text();
        return JSON.parse(text);
    } catch (error) {
        console.error("Gemini Evaluation Error:", error);
        // Fallback to Groq if Gemini fails
        if (GROQ_API_KEY && groq) {
            console.log("Falling back to Groq...");
            return await evaluateWithGroq(question, transcription);
        }
        throw error;
    }
};

const evaluateWithGroq = async (question, transcription) => {
    const prompt = `
    You are an expert English language examiner specializing in B1 (Intermediate) level certification.
    Task: Evaluate a student's spoken response to the following question.
    Question: "${question}"
    Student's Response: "${transcription}"
    
    Provide a structured evaluation in JSON format with fields: score (1-10), transcriptionCorrected, feedback, suggestions (array).
    Respond ONLY with valid JSON.
  `;

    try {
        const response = await groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: "Evaluate English speaking level B1. Respond ONLY with a valid JSON object."
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
