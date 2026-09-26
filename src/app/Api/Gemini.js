// Primary AI Service: Google Gemini (gemini-2.5-flash) with automatic fallback to Groq
const geminiApiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const groqApiKey = process.env.NEXT_PUBLIC_GROQ_API_KEY;

const callGemini = async (prompt) => {
  // 1. Try Google Gemini first
  if (geminiApiKey) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiApiKey}`;
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const content = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (content) {
          return content;
        }
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.warn("Gemini API call failed, attempting fallback:", errorData);
      }
    } catch (geminiError) {
      console.warn("Gemini network error, attempting fallback:", geminiError);
    }
  }

  // 2. Fallback to Groq if Gemini key is missing or request failed
  if (groqApiKey) {
    try {
      const url = `https://api.groq.com/openai/v1/chat/completions`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${groqApiKey}`,
        },
        body: JSON.stringify({
          model: "openai/gpt-oss-120b",
          messages: [{ role: "user", content: prompt }],
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const content = data.choices?.[0]?.message?.content;
        if (content) {
          return content;
        }
      } else {
        const err = await response.json().catch(() => ({}));
        console.error("Groq fallback error:", err);
      }
    } catch (groqError) {
      console.error("Groq fetch error:", groqError);
    }
  }

  console.error("All AI providers (Gemini & Groq) failed or keys are missing.");
  return null;
};

export default callGemini;