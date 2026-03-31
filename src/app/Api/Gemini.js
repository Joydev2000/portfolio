const apiKey = process.env.NEXT_PUBLIC_GROQ_API_KEY || "INSERT_NEW_API_KEY_HERE";

const callGemini = async (prompt) => {
  if (!apiKey || apiKey === "INSERT_NEW_API_KEY_HERE") {
    console.error("API Key missing. Please set NEXT_PUBLIC_GROQ_API_KEY in .env.local");
    return null;
  }
  
  const url = `https://api.groq.com/openai/v1/chat/completions`;
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant", // Updated to the newest available Llama model on Groq
        messages: [{ role: "user", content: prompt }]
      })
    });
    
    // Check if the API request itself fails (e.g. invalid key)
    if (!response.ok) {
        const err = await response.json();
        console.error("Groq API Error Details:", err);
        return null;
    }
    
    const data = await response.json();
    return data.choices?.[0]?.message?.content;
  } catch (error) {
    console.error("Fetch Error:", error);
    return null;
  }
};

export default callGemini;