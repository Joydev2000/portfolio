// import React, { useState, useEffect, useRef } from 'react';

// =====================================================================
// GLOBAL CONFIG & API UTILITY
// =====================================================================
const apiKey = "AIzaSyBwhU1KPMROrK5pm9aQTpw3Fg5-OGiQ0w0"; // Insert your Gemini API key here

const callGemini = async (prompt) => {
  if (!apiKey) {
    console.error("API Key missing (environment variable).");
    return null;
  }
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
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