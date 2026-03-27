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
    Act as a professional color theorist and portrait photographer.
    Analyze the user's uploaded image.
    Identify the dominant colors of their clothing, skin tone, and accessories.
    Suggest 5-6 background colors categorized by 'Professional', 'Vibrant/Pop', and 'Minimalist'.
    
    Return ONLY a JSON array of objects with these keys: 
    "name", "category", "rgb", "hex".
  `;

  const imagePart = await fileToGenerativePart(imageFile);
  const result = await model.generateContent([prompt, imagePart]);
  const response = await result.response;

  // Clean the response text to ensure it's valid JSON
  const text = response.text().replace(/```json|```/g, "");
  return JSON.parse(text);
};
