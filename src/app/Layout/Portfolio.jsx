"use client";
import { useState, useEffect } from "react";
import { ScrollReveal } from "../components/ScrollReveal";

const mockProjectsRow1 = [
  {
    id: 1,
    title: "LuxeCommerce – Premium WooCommerce Store",
    category: "WordPress / WooCommerce",
    shortDescription:
      "High-converting custom WooCommerce storefront with AJAX-based instant cart, customized checkout funnel, and sub-second load speeds.",
    fullDescription:
      "A complete bespoke e-commerce platform built on WordPress and WooCommerce. The client needed a luxury brand experience with tailored product filtering, custom swatch selectors, dynamic stock countdowns, and a streamlined multi-step checkout to minimize cart abandonment. Built with clean PHP, tailored WordPress hooks, and modern frontend styling.",
    featuredImage:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1200&auto=format&fit=crop&q=80",
    ],
    link: "https://wordpress.org",
    tags: ["WordPress", "WooCommerce", "PHP", "Elementor Pro"],
    client: "LuxeRetail Co.",
    role: "Lead WordPress & WooCommerce Developer",
    year: "2024",
    status: "Live in Production",
    features: [
      "Customized WooCommerce single product & multi-step AJAX checkout",
      "Dynamic faceted search and facetWP attribute filtering",
      "GTMetrix A-grade 98% desktop & 94% mobile PageSpeed performance",
      "Integrated secure payment gateways and custom order tracking",
    ],
  },
  {
    id: 2,
    title: "Apex Creative – Bespoke WordPress Theme",
    category: "Custom WP Theme",
    shortDescription:
      "Engineered from scratch without heavy pre-made themes, featuring custom Gutenberg blocks, dynamic micro-interactions, and 99+ PageSpeed.",
    fullDescription:
      "A custom-coded WordPress theme crafted from ground zero for an award-winning digital design agency. By avoiding generic third-party page builders, this theme delivers unrivaled loading speeds, fluid responsive typography, and custom Gutenberg blocks that empower the marketing team to build complex layouts without breaking brand guidelines.",
    featuredImage:
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1200&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&auto=format&fit=crop&q=80",
    ],
    link: "https://wordpress.org",
    tags: ["Custom Theme", "Core PHP", "Tailwind CSS", "JavaScript"],
    client: "Apex Digital Agency",
    role: "Full-Stack Theme Developer",
    year: "2024",
    status: "Completed & Deployed",
    features: [
      "Bespoke WordPress theme architecture with zero bloat",
      "Custom ACF Pro blocks and Gutenberg integration",
      "Fluid scroll animations and micro-interactions",
      "Comprehensive SEO optimization and schema markup",
    ],
  },
  {
    id: 3,
    title: "NovaCloud – Next.js & React Analytics Hub",
    category: "React / Next.js",
    shortDescription:
      "Modern SaaS analytics dashboard featuring real-time telemetry graphs, dark glassmorphism styling, and seamless REST API integrations.",
    fullDescription:
      "An enterprise-grade SaaS analytics frontend dashboard engineered with React, Next.js App Router, and Tailwind CSS. Provides business operators with real-time customer behavior analytics, interactive Chart.js visualizations, user role permissions, and instant data filtering with smooth layout transitions.",
    featuredImage:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=1200&auto=format&fit=crop&q=80",
    ],
    link: "https://nextjs.org",
    tags: ["React.js", "Next.js", "Tailwind CSS", "REST API"],
    client: "NovaCloud Technologies",
    role: "Frontend Architect",
    year: "2023",
    status: "Live in Production",
    features: [
      "Interactive data visualizations with dynamic filtering",
      "Lightweight state management and optimized re-renders",
      "Responsive mobile and tablet dashboard navigation",
      "Accessible dark mode aesthetic with glassmorphism effects",
    ],
  },
];

const mockProjectsRow2 = [
  {
    id: 4,
    title: "FinPulse – High-Converting Elementor Funnel",
    category: "Elementor / Landing Page",
    shortDescription:
      "Conversion-focused marketing funnel built with Elementor Pro, featuring custom CSS enhancements, interactive calculators, and CRM webhook sync.",
    fullDescription:
      "A high-impact B2B FinTech marketing landing page engineered to maximize visitor conversions. Combines pixel-perfect Elementor Pro design with custom JavaScript calculators, automated CRM lead capture hooks, and optimized asset delivery for ultra-fast mobile loading.",
    featuredImage:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1200&auto=format&fit=crop&q=80",
    ],
    link: "https://elementor.com",
    tags: ["Elementor Pro", "WordPress", "UI/UX", "Responsive Web"],
    client: "FinPulse Capital",
    role: "Landing Page & Funnel Specialist",
    year: "2023",
    status: "Active Campaign",
    features: [
      "Custom interactive ROI and loan projection calculator",
      "A/B tested hero section with 28% increase in conversion",
      "Seamless integration with Mailchimp and HubSpot CRM",
      "Fully responsive touch gestures and mobile-optimized layouts",
    ],
  },
  {
    id: 5,
    title: "MediCare – Clinic & Appointment Booking Platform",
    category: "WordPress / Full Site",
    shortDescription:
      "Full-featured medical clinic portal with real-time doctor appointment scheduling, patient testimonials, and multi-location directories.",
    fullDescription:
      "An end-to-end WordPress medical directory and appointment booking system designed for a multi-specialty healthcare clinic. Enables patients to view doctor credentials, check real-time availability slots, book consultations online, and receive automated SMS/Email confirmations.",
    featuredImage:
      "https://images.unsplash.com/photo-1504813184591-01572f98c85f?w=1200&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1504813184591-01572f98c85f?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80",
    ],
    link: "https://wordpress.org",
    tags: ["WordPress", "Custom Post Types", "ACF Pro", "JavaScript"],
    client: "MediCare Health Group",
    role: "Full-Stack WordPress Developer",
    year: "2023",
    status: "Live in Production",
    features: [
      "Dynamic doctor filtering by specialty, location, and insurance",
      "Interactive appointment calendar with automated email confirmations",
      "HIPAA-conscious inquiry forms and encrypted communications",
      "Accessible ADA-compliant UI architecture for all user demographics",
    ],
  },
  {
    id: 6,
    title: "Zenith Studio – Semantic HTML5 & CSS3 Showcase",
    category: "Semantic HTML5 / CSS3",
    shortDescription:
      "Pixel-perfect creative portfolio crafted with pure semantic HTML5, modern CSS grid architecture, and fluid kinetic typography.",
    fullDescription:
      "A creative studio showcase developed with a strong emphasis on semantic HTML5 structure, modern CSS features (Grid, Subgrid, Flexbox, CSS Variables), and lightweight vanilla JavaScript animations. Zero framework overhead yields an instant 100/100 Lighthouse performance score.",
    featuredImage:
      "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=1200&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80",
    ],
    link: "https://github.com",
    tags: ["HTML Developer", "CSS3 / Animation", "Figma", "Responsive Web"],
    client: "Zenith Creative Collective",
    role: "UI/UX & Frontend Developer",
    year: "2022",
    status: "Completed",
    features: [
      "100/100 Google Lighthouse score across Performance, SEO & Accessibility",
      "Pure CSS responsive grid layout with fluid clamp typography",
      "Accessible ARIA landmarks and keyboard navigation support",
      "Smooth dark mode color transitions and micro-interactions",
    ],
  },
];

const allProjects = [...mockProjectsRow1, ...mockProjectsRow2];

const Portfolio = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isGalleryHovered, setIsGalleryHovered] = useState(false);

  // Current project index in the full list
  const currentProjectIndex = allProjects.findIndex(
    (p) => p.id === selectedProject?.id
  );

  const nextProject = (e) => {
    if (e) e.stopPropagation();
    const nextIdx = (currentProjectIndex + 1) % allProjects.length;
    setSelectedProject(allProjects[nextIdx]);
    setActiveImageIndex(0);
    setIsGalleryHovered(false);
  };

  const prevProject = (e) => {
    if (e) e.stopPropagation();
    const prevIdx =
      (currentProjectIndex - 1 + allProjects.length) % allProjects.length;
    setSelectedProject(allProjects[prevIdx]);
    setActiveImageIndex(0);
    setIsGalleryHovered(false);
  };

  // Keyboard navigation for modal (Escape to close, Left/Right arrows to cycle projects)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setSelectedProject(null);
      } else if (e.key === "ArrowRight") {
        nextProject();
      } else if (e.key === "ArrowLeft") {
        prevProject();
      }
    };

    if (selectedProject) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedProject, currentProjectIndex]);

  // Modal Gallery Auto-Slide (cycles every 3s, pauses on hover)
  useEffect(() => {
    if (!selectedProject || isGalleryHovered) return;
    if (!selectedProject.gallery || selectedProject.gallery.length <= 1) return;

    const interval = setInterval(() => {
      setActiveImageIndex(
        (prev) => (prev + 1) % selectedProject.gallery.length
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [selectedProject, isGalleryHovered]);

  const openModal = (project) => {
    setSelectedProject(project);
    setActiveImageIndex(0);
    setIsGalleryHovered(false);
  };

  const closeModal = () => {
    setSelectedProject(null);
    setActiveImageIndex(0);
    setIsGalleryHovered(false);
  };

  // Minimalist Project Card
  const renderCard = (project, keyPrefix = "") => (
    <div
      key={`${keyPrefix}-${project.id}`}
      onClick={() => openModal(project)}
      className="flex-shrink-0 mx-3.5 w-[330px] sm:w-[380px] bg-[#0d121f]/95 border border-white/10 hover:border-blue-500/50 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-[0_12px_36px_rgba(59,130,246,0.18)] hover:-translate-y-1.5 flex flex-col justify-between cursor-pointer group backdrop-blur-md"
    >
      {/* Featured Image Thumbnail */}
      <div className="relative aspect-[16/10] overflow-hidden bg-[#090d16]">
        <img
          src={project.featuredImage}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30" />

        {/* Category Pill Over Image */}
        <div className="absolute top-3 left-3 z-10">
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wide bg-[#0d121f]/90 backdrop-blur-md text-blue-300 border border-blue-500/20 shadow-sm">
            {project.category}
          </span>
        </div>

        {/* Centered Button on Hover like before */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/55 backdrop-blur-[2px] z-20">
          <span className="px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold tracking-wide shadow-xl shadow-blue-500/40 flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 pointer-events-none">
            <i className="fas fa-eye text-xs"></i>
            <span>View Details</span>
          </span>
        </div>

        {/* Tags Overlaid on the Image Bottom */}
        <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-1.5 z-10">
          {project.tags.map((tag, tIdx) => (
            <span
              key={tIdx}
              className="text-[10px] px-2 py-0.5 rounded-md bg-black/65 backdrop-blur-md text-slate-200 border border-white/15 font-mono shadow-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Card Content Body (Clean & Minimalist: Only Title + 2-Line Description) */}
      <div className="p-5 flex-1 flex flex-col justify-center">
        {/* Title */}
        <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-blue-300 transition-colors leading-snug mb-2 line-clamp-1">
          {project.title}
        </h3>

        {/* 2-Line Short Description */}
        <p
          className="text-slate-400 text-xs sm:text-sm leading-relaxed line-clamp-2"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {project.shortDescription}
        </p>
      </div>
    </div>
  );

  return (
    <section
      id="portfolio"
      className="py-24 bg-[#070b14] relative overflow-hidden z-10 border-y border-white/5"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-14">
        <ScrollReveal className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-widest mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
            Portfolio
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white tracking-tight mb-4">
            Featured Projects
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            A showcase of custom WordPress themes, e-commerce stores, responsive
            web applications, and conversion-optimized digital experiences.
          </p>
        </ScrollReveal>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          AUTO-SLIDING ROW 1 (Pauses completely when mouse hovers anywhere on section/cards)
          ───────────────────────────────────────────────────────────── */}
      <div className="slide-row marquee-pause-hover w-full overflow-hidden mb-7 relative flex">
        {/* Left & Right gradient edge fades */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-36 bg-gradient-to-r from-[#070b14] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-36 bg-gradient-to-l from-[#070b14] to-transparent z-10 pointer-events-none" />

        <div className="flex w-max animate-scroll-left">
          {[...mockProjectsRow1, ...mockProjectsRow1, ...mockProjectsRow1].map(
            (p, idx) => renderCard(p, `r1-${idx}`)
          )}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          AUTO-SLIDING ROW 2 (Pauses completely when mouse hovers anywhere on section/cards)
          ───────────────────────────────────────────────────────────── */}
      <div className="slide-row marquee-pause-hover w-full overflow-hidden relative flex">
        {/* Left & Right gradient edge fades */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-36 bg-gradient-to-r from-[#070b14] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-36 bg-gradient-to-l from-[#070b14] to-transparent z-10 pointer-events-none" />

        <div className="flex w-max animate-scroll-right">
          {[...mockProjectsRow2, ...mockProjectsRow2, ...mockProjectsRow2].map(
            (p, idx) => renderCard(p, `r2-${idx}`)
          )}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          PRODUCT-DETAILS STYLE MODAL WITH BLURRED BACKDROP & SIDE PROJECT SWITCHERS
          ───────────────────────────────────────────────────────────── */}
      {selectedProject && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={closeModal}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-8 md:p-14 lg:p-20 bg-black/80 backdrop-blur-2xl overflow-y-auto animate-fade-in"
          style={{
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
          }}
        >
          {/* Modal Relative Wrapper with Floating Left/Right Project Nav Buttons */}
          <div className="relative w-full max-w-5xl my-auto flex items-center justify-center">
            {/* Left Floating Button: Previous Project */}
            <button
              type="button"
              onClick={prevProject}
              className="absolute -left-2 sm:-left-5 lg:-left-16 z-30 w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-[#0d121f]/95 hover:bg-blue-600 border border-white/20 hover:border-blue-400 text-white flex items-center justify-center backdrop-blur-md transition-all duration-200 hover:scale-110 shadow-2xl shadow-black/90 group"
              title="Previous Project (Left Arrow)"
              aria-label="Previous Project"
            >
              <i className="fas fa-chevron-left text-xs sm:text-base transform group-hover:-translate-x-0.5 transition-transform"></i>
            </button>

            {/* Right Floating Button: Next Project */}
            <button
              type="button"
              onClick={nextProject}
              className="absolute -right-2 sm:-right-5 lg:-right-16 z-30 w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-[#0d121f]/95 hover:bg-blue-600 border border-white/20 hover:border-blue-400 text-white flex items-center justify-center backdrop-blur-md transition-all duration-200 hover:scale-110 shadow-2xl shadow-black/90 group"
              title="Next Project (Right Arrow)"
              aria-label="Next Project"
            >
              <i className="fas fa-chevron-right text-xs sm:text-base transform group-hover:translate-x-0.5 transition-transform"></i>
            </button>

            {/* Main Modal Card */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative w-full bg-[#0c101c]/95 border border-white/15 rounded-2xl shadow-2xl shadow-black/90 overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Modal Header */}
              <div className="p-4 sm:p-5 px-6 border-b border-white/10 flex items-center justify-between bg-[#0e1424] gap-4">
                <div className="flex items-center gap-3 overflow-hidden">
                  <span className="px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide bg-blue-500/15 text-blue-300 border border-blue-500/30 shrink-0">
                    {selectedProject.category}
                  </span>
                  <h3 className="text-base sm:text-xl font-bold text-white truncate">
                    {selectedProject.title}
                  </h3>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="hidden sm:inline-block text-xs font-mono text-slate-400 px-2.5 py-1 rounded-md bg-white/5 border border-white/10">
                    Project {currentProjectIndex + 1} / {allProjects.length}
                  </span>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center border border-white/10 transition-colors shrink-0"
                    aria-label="Close details modal"
                  >
                    <i className="fas fa-times text-sm"></i>
                  </button>
                </div>
              </div>

              {/* Modal Body: Two-column layout (Auto-sliding Gallery on left, Details on right) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-5 sm:p-6 overflow-y-auto custom-scrollbar">
                {/* Column 1: Product-style Auto-Sliding Gallery (lg:col-span-7) */}
                <div className="lg:col-span-7 flex flex-col">
                  {/* Main Showcase (Auto-slides every 3s, pauses on hover, NO manual slide buttons needed) */}
                  <div
                    onMouseEnter={() => setIsGalleryHovered(true)}
                    onMouseLeave={() => setIsGalleryHovered(false)}
                    className="relative aspect-[16/10] w-full bg-[#070a12] rounded-xl overflow-hidden border border-white/10 flex items-center justify-center group/mainimg"
                  >
                    <img
                      key={`${selectedProject.id}-${activeImageIndex}`}
                      src={
                        selectedProject.gallery[activeImageIndex] ||
                        selectedProject.featuredImage
                      }
                      alt={`${selectedProject.title} preview ${activeImageIndex + 1}`}
                      className="w-full h-full object-cover transition-opacity duration-500 animate-fade-in"
                    />

                    {/* Auto-Slide Indicator & Counter Pill */}
                    <div className="absolute top-3 right-3 flex items-center gap-2 px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-md border border-white/10 text-[11px] font-mono text-slate-300 shadow-sm">
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          isGalleryHovered
                            ? "bg-amber-400"
                            : "bg-blue-400 animate-pulse"
                        }`}
                      ></span>
                      <span>
                        {isGalleryHovered ? "Paused" : "Auto-Slide"} (
                        {activeImageIndex + 1}/{selectedProject.gallery.length})
                      </span>
                    </div>

                    {/* Sleek bottom slide progress bar */}
                    <div className="absolute bottom-0 inset-x-0 h-1 bg-white/10">
                      <div
                        key={`progress-${selectedProject.id}-${activeImageIndex}-${isGalleryHovered}`}
                        className={`h-full bg-gradient-to-r from-blue-500 to-indigo-500 ${
                          isGalleryHovered ? "w-full opacity-60" : "animate-progress"
                        }`}
                        style={{
                          animation: isGalleryHovered
                            ? "none"
                            : "galleryProgress 3s linear infinite",
                        }}
                      />
                    </div>
                  </div>

                  {/* Clickable Thumbnail Gallery Strip (Like E-commerce product details) */}
                  <div className="mt-3">
                    <p className="text-[11px] text-slate-400 uppercase font-semibold tracking-wider mb-2 flex items-center gap-1.5">
                      <i className="fas fa-th-large text-blue-400"></i> Click
                      thumbnail to view:
                    </p>
                    <div className="grid grid-cols-4 gap-2.5">
                      {selectedProject.gallery.map((imgUrl, gIdx) => {
                        const isActive = activeImageIndex === gIdx;
                        return (
                          <button
                            key={gIdx}
                            type="button"
                            onClick={() => {
                              setActiveImageIndex(gIdx);
                              setIsGalleryHovered(true);
                            }}
                            className={`relative aspect-[16/10] rounded-lg overflow-hidden border transition-all duration-200 cursor-pointer ${
                              isActive
                                ? "border-blue-500 ring-2 ring-blue-500/40 opacity-100 scale-[1.02] shadow-md shadow-blue-500/20"
                                : "border-white/10 opacity-60 hover:opacity-100 hover:border-white/30"
                            }`}
                          >
                            <img
                              src={imgUrl}
                              alt={`Thumbnail ${gIdx + 1}`}
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                            {isActive && (
                              <div className="absolute inset-0 bg-blue-500/10 pointer-events-none" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Column 2: Full Information & Project Specs (lg:col-span-5) */}
                <div className="lg:col-span-5 flex flex-col justify-between">
                  <div>
                    {/* Meta Specs Grid */}
                    <div className="grid grid-cols-2 gap-2.5 p-3.5 rounded-xl bg-white/[0.03] border border-white/5 mb-5 text-xs">
                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                          Client
                        </span>
                        <span className="text-white font-medium">
                          {selectedProject.client}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                          Role
                        </span>
                        <span className="text-white font-medium">
                          {selectedProject.role}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                          Year
                        </span>
                        <span className="text-white font-medium">
                          {selectedProject.year}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                          Status
                        </span>
                        <span className="text-emerald-400 font-medium flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                          {selectedProject.status}
                        </span>
                      </div>
                    </div>

                    {/* Full Description */}
                    <div className="mb-5">
                      <h4 className="text-xs uppercase tracking-wider font-semibold text-slate-300 mb-2 flex items-center gap-1.5">
                        <i className="fas fa-align-left text-blue-400"></i> Project
                        Overview
                      </h4>
                      <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-light">
                        {selectedProject.fullDescription}
                      </p>
                    </div>

                    {/* Key Features Bullet List */}
                    {selectedProject.features && (
                      <div className="mb-5">
                        <h4 className="text-xs uppercase tracking-wider font-semibold text-slate-300 mb-2 flex items-center gap-1.5">
                          <i className="fas fa-check-circle text-emerald-400"></i> Key
                          Deliverables
                        </h4>
                        <ul className="space-y-1.5">
                          {selectedProject.features.map((feat, fIdx) => (
                            <li
                              key={fIdx}
                              className="text-xs text-slate-300 flex items-start gap-2 leading-relaxed"
                            >
                              <i className="fas fa-arrow-right text-[10px] text-blue-400 mt-1 shrink-0"></i>
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Technologies Used */}
                    <div className="mb-6">
                      <h4 className="text-xs uppercase tracking-wider font-semibold text-slate-300 mb-2 flex items-center gap-1.5">
                        <i className="fas fa-code text-purple-400"></i> Tech Stack &amp;
                        Tools
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedProject.tags.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="text-xs px-2.5 py-1 rounded-md bg-white/5 text-blue-300 border border-blue-500/20 font-mono"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Modal Footer Actions (Spacious & Clean - No Cluttered Buttons) */}
                  <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-end gap-3">
                    <a
                      href={selectedProject.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:flex-1 py-2.5 px-5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-xs sm:text-sm text-center shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center gap-2 group/live"
                    >
                      <span>Visit Live Website</span>
                      <i className="fas fa-arrow-up-right-from-square text-xs transform group-hover/live:translate-x-0.5 group-hover/live:-translate-y-0.5 transition-transform"></i>
                    </a>

                    <button
                      type="button"
                      onClick={closeModal}
                      className="w-full sm:w-auto py-2.5 px-6 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 text-xs sm:text-sm font-semibold transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Custom Styles for guaranteed pause-on-hover & gallery animation */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .marquee-pause-hover:hover * {
              animation-play-state: paused !important;
            }
            @keyframes galleryProgress {
              0% { width: 0%; }
              100% { width: 100%; }
            }
          `,
        }}
      />
    </section>
  );
};

export default Portfolio;