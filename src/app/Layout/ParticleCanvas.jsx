"use client"
import React, { useEffect, useRef } from 'react';

const ParticleCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particlesArray = [];
    let animationFrameId;
    let mouse = { x: null, y: null, radius: 140 };
    let time = 0;

    const handleMouseMove = (e) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const handleMouseOut = () => { mouse.x = null; mouse.y = null; };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseOut);

    const initCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    // ── Aurora blob state ──
    const blobs = [
      { x: 0.25, y: 0.2, r: 320, color: '59,130,246', speed: 0.0004 },   // blue
      { x: 0.7,  y: 0.3, r: 280, color: '139,92,246', speed: 0.0003 },   // purple
      { x: 0.5,  y: 0.7, r: 260, color: '6,182,212',  speed: 0.0005 },   // cyan
    ];

    class Particle {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.5 + 0.5;
        this.density = (Math.random() * 25) + 1;
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.speedY = (Math.random() - 0.5) * 0.4;
        this.opacity = Math.random() * 0.5 + 0.15;
        this.color = Math.random() > 0.5 ? `rgba(147,197,253,${this.opacity})` : `rgba(196,181,253,${this.opacity})`;
      }
      update() {
        this.x += this.speedX; this.y += this.speedY;
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x, dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            this.x -= (dx / dist) * force * this.density * 0.6;
            this.y -= (dy / dist) * force * this.density * 0.6;
          }
        }
        if (this.x > canvas.width + 5) this.x = -5;
        if (this.x < -5) this.x = canvas.width + 5;
        if (this.y > canvas.height + 5) this.y = -5;
        if (this.y < -5) this.y = canvas.height + 5;
      }
      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function initParticles() {
      particlesArray = [];
      const n = Math.floor((canvas.width * canvas.height) / 10000);
      for (let i = 0; i < n; i++) particlesArray.push(new Particle());
    }

    function drawGrid() {
      const spacing = 80;
      ctx.strokeStyle = 'rgba(88,166,255,0.04)';
      ctx.lineWidth = 1;
      // Vertical lines
      for (let x = 0; x < canvas.width; x += spacing) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
      }
      // Horizontal lines
      for (let y = 0; y < canvas.height; y += spacing) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
      }
      // Dot intersections
      ctx.fillStyle = 'rgba(88,166,255,0.12)';
      for (let x = 0; x < canvas.width; x += spacing) {
        for (let y = 0; y < canvas.height; y += spacing) {
          ctx.beginPath(); ctx.arc(x, y, 1, 0, Math.PI * 2); ctx.fill();
        }
      }
    }

    function drawAuroraBlobs() {
      blobs.forEach((b) => {
        const cx = (Math.sin(time * b.speed + b.x * 10) * 0.08 + b.x) * canvas.width;
        const cy = (Math.cos(time * b.speed * 0.8 + b.y * 10) * 0.06 + b.y) * canvas.height;
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, b.r);
        grad.addColorStop(0, `rgba(${b.color},0.12)`);
        grad.addColorStop(0.5, `rgba(${b.color},0.05)`);
        grad.addColorStop(1, `rgba(${b.color},0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(cx, cy, b.r, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    function drawMouseGlow() {
      if (mouse.x === null) return;
      const grad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 180);
      grad.addColorStop(0, 'rgba(88,166,255,0.06)');
      grad.addColorStop(1, 'rgba(88,166,255,0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 180, 0, Math.PI * 2);
      ctx.fill();
    }

    function connectParticles() {
      for (let i = 0; i < particlesArray.length; i++) {
        for (let j = i + 1; j < particlesArray.length; j++) {
          const dx = particlesArray[i].x - particlesArray[j].x;
          const dy = particlesArray[i].y - particlesArray[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 90) {
            ctx.strokeStyle = `rgba(147,197,253,${0.12 - dist / 900})`;
            ctx.lineWidth = 0.4;
            ctx.beginPath();
            ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
            ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
            ctx.stroke();
          }
        }
        // Connect to mouse
        if (mouse.x !== null) {
          const dx = particlesArray[i].x - mouse.x;
          const dy = particlesArray[i].y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            ctx.strokeStyle = `rgba(88,166,255,${0.35 - dist / mouse.radius})`;
            ctx.lineWidth = 0.7;
            ctx.beginPath();
            ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
      }
    }

    function animate() {
      time++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawGrid();
      drawAuroraBlobs();
      drawMouseGlow();
      particlesArray.forEach(p => { p.update(); p.draw(); });
      connectParticles();
      animationFrameId = requestAnimationFrame(animate);
    }

    window.addEventListener('resize', initCanvas);
    initCanvas();
    animate();

    return () => {
      window.removeEventListener('resize', initCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseOut);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0" />;
};

export default ParticleCanvas;
