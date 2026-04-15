"use client";
import { useEffect, useRef } from "react";

const LENS_SIZE = 140; // px diameter of magnifier lens

const CursorGlow = () => {
  const dotRef   = useRef(null);
  const ringRef  = useRef(null);
  const glowRef  = useRef(null);
  const lensRef  = useRef(null);
  const trailsRef = useRef([]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    document.documentElement.style.cursor = "none";

    // Restore text-cursor only on text nodes
    const textSelectors = "h1, h2, h3, h4, h5, h6, p, span, label";
    const styleTag = document.createElement("style");
    styleTag.innerHTML = `
      ${textSelectors} { cursor: crosshair !important; }
      .magnify-active { 
        transform-origin: center;
        transition: transform 0.25s cubic-bezier(0.34,1.56,0.64,1), filter 0.25s; 
      }`;
    document.head.appendChild(styleTag);

    let mouseX  = window.innerWidth  / 2;
    let mouseY  = window.innerHeight / 2;
    let ringX   = mouseX, ringY  = mouseY;
    let glowX   = mouseX, glowY  = mouseY;
    let lensX   = mouseX, lensY  = mouseY;
    let isOnText = false;
    let rafId;
    let currentMagnified = null; // the text element currently scaled up
    const trails = trailsRef.current;

    // ── Magnify a text element ──
    const magnifyEl = (el) => {
      if (currentMagnified === el) return;
      unMagnify();
      currentMagnified = el;
      el.classList.add("magnify-active");
      el.style.transform = "scale(1.08)";
      el.style.filter = "drop-shadow(0 0 12px rgba(88,166,255,0.35))";
      el.style.zIndex = "10";
    };

    const unMagnify = () => {
      if (!currentMagnified) return;
      currentMagnified.style.transform = "";
      currentMagnified.style.filter    = "";
      currentMagnified.style.zIndex    = "";
      currentMagnified.classList.remove("magnify-active");
      currentMagnified = null;
    };

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // ── Magnetic pull toward headings ──
      document.querySelectorAll("h1, h2, h3").forEach((el) => {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width  / 2;
        const cy = rect.top  + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          const strength = (1 - dist / 150) * 0.3;
          mouseX = e.clientX - dx * strength;
          mouseY = e.clientY - dy * strength;
        }
      });

      // ── Lens circle: update CSS vars relative to each text wrapper ──
      document.querySelectorAll(".lens-text-wrap").forEach((wrap) => {
        const rect = wrap.getBoundingClientRect();
        const relX = e.clientX - rect.left;
        const relY = e.clientY - rect.top;
        wrap.style.setProperty("--lx", `${relX}px`);
        wrap.style.setProperty("--ly", `${relY}px`);
      });

      isOnText = e.target.closest("h1, h2, h3, h4, h5, h6, p") !== null;
    };

    window.addEventListener("mousemove", onMove);

    // ── Animation loop ──
    const animate = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      glowX += (mouseX - glowX) * 0.06;
      glowY += (mouseY - glowY) * 0.06;
      lensX += (mouseX - lensX) * 0.18;
      lensY += (mouseY - lensY) * 0.18;

      // Dot (always follows precisely)
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
        dotRef.current.style.opacity   = isOnText ? "0" : "1";
      }

      // Ring — hidden on text, shows on interactive
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX - 20}px, ${ringY - 20}px)`;
        ringRef.current.style.opacity   = isOnText ? "0" : "1";
      }

      // Comet glow
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${glowX - 80}px, ${glowY - 80}px)`;
      }

      // ── Magnifier lens position ──
      const half = LENS_SIZE / 2;
      if (lensRef.current) {
        lensRef.current.style.transform = `translate(${lensX - half}px, ${lensY - half}px)`;
        lensRef.current.style.opacity   = isOnText ? "1" : "0";
        lensRef.current.style.transform += isOnText ? " scale(1)" : " scale(0.4)";
      }

      // Trails
      trails.forEach((trail, i) => {
        if (!trail) return;
        const tx = mouseX + (Math.random() - 0.5) * 4;
        const ty = mouseY + (Math.random() - 0.5) * 4;
        trail.style.transform = `translate(${tx - 3}px, ${ty - 3}px)`;
        trail.style.opacity   = isOnText ? "0" : `${(1 - (i + 1) * 0.07 * 3) * 0.5}`;
      });

      rafId = requestAnimationFrame(animate);
    };
    animate();

    // Hover: buttons enlarge ring
    const onEnter = () => {
      if (!ringRef.current) return;
      ringRef.current.style.width  = "52px";
      ringRef.current.style.height = "52px";
      ringRef.current.style.borderColor = "rgba(88,166,255,0.9)";
      ringRef.current.style.background  = "rgba(88,166,255,0.05)";
    };
    const onLeave = () => {
      if (!ringRef.current) return;
      ringRef.current.style.width  = "40px";
      ringRef.current.style.height = "40px";
      ringRef.current.style.borderColor = "rgba(88,166,255,0.6)";
      ringRef.current.style.background  = "transparent";
    };
    const buttons = document.querySelectorAll("a, button, [role='button']");
    buttons.forEach((el) => { el.addEventListener("mouseenter", onEnter); el.addEventListener("mouseleave", onLeave); });

    return () => {
      document.documentElement.style.cursor = "";
      document.head.removeChild(styleTag);
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
      unMagnify();
      buttons.forEach((el) => { el.removeEventListener("mouseenter", onEnter); el.removeEventListener("mouseleave", onLeave); });
    };
  }, []);

  return (
    <>
      {/* ── Comet glow ── */}
      <div
        ref={glowRef}
        className="fixed top-0 left-0 pointer-events-none z-[9988] will-change-transform rounded-full"
        style={{
          width: 160, height: 160,
          background: "radial-gradient(circle, rgba(88,166,255,0.10) 0%, rgba(88,166,255,0.04) 45%, transparent 70%)",
          filter: "blur(14px)",
        }}
      />

      {/* ── Trail sparks ── */}
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          ref={(el) => (trailsRef.current[i] = el)}
          className="fixed top-0 left-0 rounded-full pointer-events-none will-change-transform"
          style={{
            width:  `${8 - i * 0.7}px`,
            height: `${8 - i * 0.7}px`,
            background: `rgba(88,166,255,${0.5 - i * 0.05})`,
            filter: `blur(${1 + i * 0.5}px)`,
            zIndex: 9992 - i,
            transition: `transform ${0.06 + i * 0.04}s linear, opacity 0.2s`,
          }}
        />
      ))}

      {/* ── Magnifier lens (appears on text hover) ── */}
      <div
        ref={lensRef}
        className="fixed top-0 left-0 pointer-events-none will-change-transform"
        style={{
          width:  LENS_SIZE,
          height: LENS_SIZE,
          borderRadius: "50%",
          border: "1.5px solid rgba(88,166,255,0.5)",
          background: "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.04) 0%, rgba(88,166,255,0.03) 60%, transparent 100%)",
          backdropFilter: "blur(0.5px) brightness(1.08) contrast(1.05)",
          WebkitBackdropFilter: "blur(0.5px) brightness(1.08) contrast(1.05)",
          boxShadow: "inset 0 0 30px rgba(88,166,255,0.06), 0 0 20px rgba(88,166,255,0.08), 0 0 60px rgba(88,166,255,0.04)",
          zIndex: 9995,
          transition: "opacity 0.2s, transform 0.2s cubic-bezier(0.34,1.56,0.64,1)",
        }}
      >
        {/* Lens glare highlight */}
        <div style={{
          position: "absolute",
          top: "12%", left: "18%",
          width: "30%", height: "14%",
          borderRadius: "50%",
          background: "rgba(255,255,255,0.12)",
          filter: "blur(3px)",
          transform: "rotate(-30deg)",
        }} />
        {/* Lens cross-hair center dot */}
        <div style={{
          position: "absolute",
          top: "50%", left: "50%",
          width: 4, height: 4,
          transform: "translate(-50%,-50%)",
          borderRadius: "50%",
          background: "rgba(88,166,255,0.6)",
          boxShadow: "0 0 6px rgba(88,166,255,0.8)",
        }} />
      </div>

      {/* ── Inner precision dot ── */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] will-change-transform mix-blend-difference"
        style={{ width: 8, height: 8, background: "white", transition: "opacity 0.15s" }}
      />

      {/* ── Outer lagging ring ── */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9998] will-change-transform"
        style={{
          width: 40, height: 40,
          border: "1px solid rgba(88,166,255,0.6)",
          transition: "width 0.25s, height 0.25s, border-color 0.25s, background 0.25s, opacity 0.15s",
        }}
      />
    </>
  );
};

export default CursorGlow;
