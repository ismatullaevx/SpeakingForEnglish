import Groq from "groq-sdk";

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;

const groq = new Groq({
    apiKey: GROQ_API_KEY,
    dangerouslyAllowBrowser: true // For client-side demo purposes
});

export const evaluateSpeaking = async (question, transcription) => {
    if (!GROQ_API_KEY) {
        throw new Error("Groq API Key is missing. Please add VITE_GROQ_API_KEY to your .env file.");
    }

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
