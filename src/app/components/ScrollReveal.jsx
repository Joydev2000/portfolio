"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger globally if not already done in layout
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const ScrollReveal = ({ children, className = "", delay = 0, y = 30 }) => {
  const elementRef = useRef(null);

  useEffect(() => {
    const el = elementRef.current;
    gsap.fromTo(
      el,
      { opacity: 0, y: y },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        delay: delay,
        ease: "power4.out",
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      }
    );
  }, [delay, y]);

  return (
    <div ref={elementRef} className={className} style={{ opacity: 0 }}>
      {children}
    </div>
  );
};

export const StaggerContainer = ({ children, className = "", delayChildren = 0.1, staggerChildren = 0.1 }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    const items = el.querySelectorAll(".stagger-item");
    
    gsap.fromTo(
      items,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: staggerChildren,
        delay: delayChildren,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      }
    );
  }, [delayChildren, staggerChildren]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
};

export const StaggerItem = ({ children, className = "" }) => {
  return (
    <div className={`${className} stagger-item`} style={{ opacity: 0 }}>
      {children}
    </div>
  );
};
