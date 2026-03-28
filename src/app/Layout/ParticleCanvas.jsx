"use client"
import React, { useState, useEffect, useRef } from 'react';

const ParticleCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particlesArray = [];
    let animationFrameId;
    let mouse = { x: null, y: null, radius: 120 };

    const handleMouseMove = (event) => { mouse.x = event.x; mouse.y = event.y; };
    const handleMouseOut = () => { mouse.x = undefined; mouse.y = undefined; };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseOut);

    const initCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.density = (Math.random() * 30) + 1;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.color = `rgba(147, 197, 253, ${Math.random() * 0.4 + 0.1})`;
      }
      update() {
        this.x += this.speedX; this.y += this.speedY;
        if (mouse.x !== undefined && mouse.y !== undefined) {
          let dx = mouse.x - this.x; let dy = mouse.y - this.y;
          let distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < mouse.radius + 50) {
            const forceDirectionX = dx / distance; const forceDirectionY = dy / distance;
            const force = (mouse.radius - distance) / mouse.radius;
            this.x -= forceDirectionX * force * this.density; this.y -= forceDirectionY * force * this.density;
          }
        }
        if (this.x > canvas.width) this.x = 0; if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0; if (this.y < 0) this.y = canvas.height;
      }
      draw() {
        ctx.fillStyle = this.color; ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fill();
      }
    }

    function initParticles() {
      particlesArray = [];
      const numberOfParticles = (canvas.width * canvas.height) / 12000;
      for (let i = 0; i < numberOfParticles; i++) particlesArray.push(new Particle());
    }

    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update(); particlesArray[i].draw();
        for (let j = 0; j < particlesArray.length; j++) {
          let dx = particlesArray[i].x - particlesArray[j].x;
          let dy = particlesArray[i].y - particlesArray[j].y;
          let distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(147, 197, 253, ${0.15 - distance / 1000})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
            ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
            ctx.stroke();
          }
        }
      }
      if (mouse.x !== undefined && mouse.y !== undefined) {
        for (let i = 0; i < particlesArray.length; i++) {
          let dx = particlesArray[i].x - mouse.x; let dy = particlesArray[i].y - mouse.y;
          let distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < mouse.radius) {
            ctx.beginPath(); ctx.strokeStyle = `rgba(59, 130, 246, ${0.4 - distance / mouse.radius})`; ctx.lineWidth = 0.8;
            ctx.moveTo(particlesArray[i].x, particlesArray[i].y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
          }
        }
      }
      animationFrameId = requestAnimationFrame(animateParticles);
    }

    window.addEventListener('resize', initCanvas);
    initCanvas();
    animateParticles();

    return () => {
      window.removeEventListener('resize', initCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseOut);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0 opacity-40"></canvas>;
};

export default ParticleCanvas;
