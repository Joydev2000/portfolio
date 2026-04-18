"use client";
import { useEffect, useRef } from "react";

const TEXT_SELECTORS  = "h1, h2, h3, h4, h5, h6, p, span, label, a, li";
const BTN_SELECTORS   = "button, [role='button']";

const CursorGlow = () => {
  const dotRef   = useRef(null);   // tiny precision dot (default)
  const ringRef  = useRef(null);   // lagging gradient ring (default)
  const glowRef  = useRef(null);   // ambient glow halo (default)
  const blobRef  = useRef(null);   // big white blob (text-hover only)

  useEffect(() => {
    if (typeof window === "undefined") return;

    // ── Hide native cursor everywhere ──
    const styleTag = document.createElement("style");
    styleTag.innerHTML = `*, *::before, *::after { cursor: none !important; }`;
    document.head.appendChild(styleTag);

    let mouseX = window.innerWidth  / 2;
    let mouseY = window.innerHeight / 2;

    // Per-layer lagging positions
    let ringX = mouseX, ringY = mouseY;
    let glowX = mouseX, glowY = mouseY;
    let blobX = mouseX, blobY = mouseY;

    let isOnText = false;
    let isOnBtn  = false;
    let rafId;

    // ── Track mouse ──
    const onMove = (e) => {
      mouseX   = e.clientX;
      mouseY   = e.clientY;
      isOnText = !!e.target.closest(TEXT_SELECTORS) && !e.target.closest(BTN_SELECTORS);
      isOnBtn  = !!e.target.closest(BTN_SELECTORS);
    };
    window.addEventListener("mousemove", onMove);

    // ── Animation loop ──
    const animate = () => {
      // Precise dot – snaps instantly
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
        // Hide dot when on text (blob takes over) or on buttons
        dotRef.current.style.opacity = isOnText || isOnBtn ? "0" : "1";
      }

      // Ring – medium lag
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      if (ringRef.current) {
        const size = isOnBtn ? 56 : 40;
        ringRef.current.style.width  = `${size}px`;
        ringRef.current.style.height = `${size}px`;
        ringRef.current.style.transform = `translate(${ringX - size / 2}px, ${ringY - size / 2}px)`;
        // Hide ring when on text
        ringRef.current.style.opacity = isOnText ? "0" : "1";
        ringRef.current.style.borderColor = isOnBtn
          ? "rgba(160,120,255,0.95)"
          : "rgba(120,80,255,0.7)";
        ringRef.current.style.background = isOnBtn
          ? "rgba(120,80,255,0.08)"
          : "transparent";
      }

      // Glow halo – slow drift
      glowX += (mouseX - glowX) * 0.055;
      glowY += (mouseY - glowY) * 0.055;
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${glowX - 90}px, ${glowY - 90}px)`;
        // Dim glow when on text
        glowRef.current.style.opacity = isOnText ? "0.3" : "1";
      }

      // White blob – appears ONLY on text hover
      blobX += (mouseX - blobX) * (isOnText ? 0.14 : 0.22);
      blobY += (mouseY - blobY) * (isOnText ? 0.14 : 0.22);
      if (blobRef.current) {
        blobRef.current.style.transform = `translate(${blobX - 35}px, ${blobY - 35}px)`;
        blobRef.current.style.opacity   = isOnText ? "1" : "0";
        blobRef.current.style.transform += isOnText ? " scale(1)" : " scale(0.3)";
      }

      rafId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      document.head.removeChild(styleTag);
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      {/* ── Ambient glow halo (default state) ── */}
      <div
        ref={glowRef}
        className="fixed top-0 left-0 pointer-events-none z-[9988] will-change-transform rounded-full"
        style={{
          width:  180,
          height: 180,
          background:
            "radial-gradient(circle, rgba(140,80,255,0.18) 0%, rgba(80,60,220,0.09) 45%, transparent 70%)",
          filter: "blur(22px)",
          transition: "opacity 0.35s ease",
        }}
      />

      {/* ── Precision dot (default state) ── */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] will-change-transform"
        style={{
          width:  8,
          height: 8,
          background: "radial-gradient(circle, #d8b4fe 0%, #818cf8 100%)",
          boxShadow: "0 0 8px rgba(167,139,250,0.8)",
          transition: "opacity 0.15s ease",
        }}
      />

      {/* ── Outer gradient ring (default state) ── */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9998] will-change-transform"
        style={{
          width:  40,
          height: 40,
          border: "1.5px solid rgba(120,80,255,0.7)",
          background: "transparent",
          boxShadow: "0 0 12px rgba(120,80,255,0.2), inset 0 0 8px rgba(120,80,255,0.05)",
          transition:
            "width 0.3s cubic-bezier(0.34,1.56,0.64,1), height 0.3s cubic-bezier(0.34,1.56,0.64,1), border-color 0.25s, background 0.25s, opacity 0.2s",
        }}
      />

      {/* ── White inversion blob (text-hover state only) ── */}
      <div
        ref={blobRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] will-change-transform rounded-full mix-blend-difference"
        style={{
          width:  70,
          height: 70,
          background: "white",
          transition:
            "opacity 0.25s cubic-bezier(0.34,1.56,0.64,1), transform 0.25s cubic-bezier(0.34,1.56,0.64,1)",
        }}
      />
    </>
  );
};

export default CursorGlow;
