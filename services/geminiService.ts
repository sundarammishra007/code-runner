import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
You are an expert Senior Frontend Engineer and Creative Coder.
Your task is to generate complete, single-file HTML5 applications based on user prompts.
The code must include all necessary CSS (in <style> tags) and JavaScript (in <script> tags).
Do not use external CSS or JS files (except for CDNs if absolutely necessary for libraries like React, Vue, or Three.js).
The code should be modern, responsive, and visually appealing.
If the user asks to modify existing code, you will receive the current code context.
Strictly output ONLY the raw HTML code. Do not wrap it in markdown backticks (e.g. \`\`\`html).
Do not add conversational text before or after the code.
`;

export const generateCode = async (prompt: string, currentCode?: string): Promise<string> => {
  try {
    const model = "gemini-3-pro-preview";
    
    let fullPrompt = prompt;
    if (currentCode) {
      fullPrompt = `
      Current Code:
      ${currentCode}
      
      User Request:
      ${prompt}
      
      Task: Return the full updated HTML file implementing the requested changes.
      `;
    }

    const response = await ai.models.generateContent({
      model: model,
      contents: fullPrompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        thinkingConfig: { thinkingBudget: 1024 } // Allow some thinking for complex logic
      }
    });

    const text = response.text || "";
    // Clean up any potential markdown formatting just in case the model slips up
    return text.replace(/^```html/, '').replace(/^```/, '').replace(/```$/, '').trim();
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
