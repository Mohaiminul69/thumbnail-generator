import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

// Helper to convert File to Base64 for the API
// Helper to convert File OR URL to Base64 for the API
async function fileToGenerativePart(input) {
  let blob;

  // Check if input is a URL string (common in React apps)
  if (typeof input === "string") {
    const response = await fetch(input);
    blob = await response.blob();
  } else {
    // If it's already a File or Blob
    blob = input;
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Data = reader.result.split(",")[1];
      resolve({
        inlineData: { data: base64Data, mimeType: blob.type },
      });
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

export const getAIColorSuggestions = async (imageFile) => {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  // THE SYSTEM PROMPT: This is how you get my specific logic
  const prompt = `
  SYSTEM INSTRUCTION:
  You are a high-end Digital Color Grade specialist. 
  
  TASK:
  1. Extract the specific HEX codes of the subject's shirt, skin undertone, and hair/accessories.
  2. Use these extracted colors to calculate mathematically complementary and analogous background shades.
  3. STRICT RULE: Do not provide the same generic colors (like standard Grey #808080 or Navy #000080) for every image. 
  4. Every suggestion MUST be uniquely tuned to the specific saturation and vibrance of the uploaded image's clothing.

  OUTPUT:
  Return ONLY a JSON array of 6 objects. 
  Each object must have: "name", "category", "rgb", "hex".

  Categories to include: 'Professional', 'Vibrant/Pop', and 'Minimalist'.

  IMPORTANT: 
  The "rgb" value MUST be an array of three numbers, e.g., [255, 0, 0].
  The "hex" value MUST be a string, e.g., "#FF0000".
`;

  const imagePart = await fileToGenerativePart(imageFile);
  const result = await model.generateContent([prompt, imagePart]);
  const response = await result.response;

  // Clean the response text to ensure it's valid JSON
  const text = response.text().replace(/```json|```/g, "");
  return JSON.parse(text);
};
