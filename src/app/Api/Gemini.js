// The previous API key was reported as leaked and disabled by Google.
// Please create a new key from https://aistudio.google.com/app/apikey 
// and insert it below (or use environment variables).
const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "INSERT_NEW_API_KEY_HERE";

const callGemini = async (prompt) => {
  if (!apiKey || apiKey === "INSERT_NEW_API_KEY_HERE") {
    console.error("API Key missing. Please set NEXT_PUBLIC_GEMINI_API_KEY in .env.local or paste it natively.");
    return null;
  }
  
  // Use a valid model name: gemini-2.5-flash
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
    });
    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return null;
  }
};

export default callGemini;