"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger globally if not already done in layout
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const ScrollReveal = ({ children, className = "", delay = 0, y = 30 }) => {
  const elementRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const el = elementRef.current;
    
    // On mobile, we might want to skip the scroll reveal if it's causing issues,
    // or at least ensure it triggers more easily.
    const scrollConfig = isMobile 
      ? { trigger: el, start: "top 95%", toggleActions: "play none none none" }
      : { trigger: el, start: "top 90%", toggleActions: "play none none none" };

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y: isMobile ? 15 : y },
        {
          opacity: 1,
          y: 0,
          duration: isMobile ? 0.8 : 1.2,
          delay: delay,
          ease: "power4.out",
          scrollTrigger: scrollConfig,
        }
      );
    }, elementRef);

    return () => ctx.revert();
  }, [delay, y, isMobile]);

  return (
    <div 
      ref={elementRef} 
      className={className} 
      style={{ opacity: isMobile ? 1 : 0 }}
    >
      {children}
    </div>
  );
};

export const StaggerContainer = ({ children, className = "", delayChildren = 0.1, staggerChildren = 0.1 }) => {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    const items = el.querySelectorAll(".stagger-item");
    
    const scrollConfig = isMobile 
      ? { trigger: el, start: "top 95%", toggleActions: "play none none none" }
      : { trigger: el, start: "top 90%", toggleActions: "play none none none" };

    const ctx = gsap.context(() => {
      gsap.fromTo(
        items,
        { opacity: 0, y: isMobile ? 15 : 30 },
        {
          opacity: 1,
          y: 0,
          duration: isMobile ? 0.7 : 1,
          stagger: staggerChildren,
          delay: delayChildren,
          ease: "power3.out",
          scrollTrigger: scrollConfig,
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [delayChildren, staggerChildren, isMobile]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
};

export const StaggerItem = ({ children, className = "" }) => {
  // We use a CSS class to handle initial state, but for mobile we'll ensure it's visible if JS fails or before GSAP kicks in
  return (
    <div className={`${className} stagger-item`} style={{ opacity: 0 }}>
      {children}
    </div>
  );
};
