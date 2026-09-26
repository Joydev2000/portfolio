"use client";
import { useState, useEffect } from "react";
import { ScrollReveal } from "../components/ScrollReveal";
import { client } from "@/sanity/lib/client";
import { PROJECTS_QUERY } from "@/sanity/lib/queries";

const PLACEHOLDER_IMAGE =
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80";

function normalizeProject(p, index = 0) {
  const featImg =
    p.featuredImage &&
    typeof p.featuredImage === "string" &&
    p.featuredImage.trim().length > 0
      ? p.featuredImage
      : Array.isArray(p.gallery) &&
        p.gallery[0] &&
        typeof p.gallery[0] === "string" &&
        p.gallery[0].trim().length > 0
      ? p.gallery[0]
      : PLACEHOLDER_IMAGE;

  const rawGallery =
    Array.isArray(p.gallery) && p.gallery.filter(Boolean).length > 0
      ? p.gallery.filter((img) => typeof img === "string" && img.trim().length > 0)
      : [];

  const galleryImgs = rawGallery.length > 0 ? rawGallery : [featImg];

  const tagsList =
    Array.isArray(p.tags) && p.tags.length > 0
      ? p.tags
      : p.category
      ? [p.category]
      : ["Web Development"];

  return {
    id: p._id || `proj-${index}`,
    _id: p._id || `proj-${index}`,
    title: p.title || "Untitled Project",
    category: p.category || "Web Development",
    shortDescription:
      p.shortDescription ||
      p.fullDescription ||
      "Project details and specifications are being updated.",
    fullDescription:
      p.fullDescription ||
      p.shortDescription ||
      "Comprehensive project overview, deliverables, and architecture details.",
    featuredImage: featImg,
    gallery: galleryImgs,
    link: p.link || "#",
    githubLink: p.githubLink || "",
    tags: tagsList,
    client: p.client || "Client Confidential",
    role: p.role || "Lead Developer",
    year: p.year || "2024",
    status: p.status || "Live in Production",
    features:
      Array.isArray(p.features) && p.features.length > 0 ? p.features : [],
  };
}

const Portfolio = ({ initialProjects = [] }) => {
  const [allProjects, setAllProjects] = useState(() =>
    Array.isArray(initialProjects) ? initialProjects.map(normalizeProject) : []
  );
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isGalleryHovered, setIsGalleryHovered] = useState(false);

  // Client-side fetch to keep content updated in real-time
  useEffect(() => {
    let isMounted = true;
    async function loadDynamicProjects() {
      try {
        const data = await client.fetch(PROJECTS_QUERY);
        if (isMounted && Array.isArray(data)) {
          setAllProjects(data.map(normalizeProject));
        }
      } catch (err) {
        console.warn("Client-side Sanity project fetch:", err);
      }
    }
    loadDynamicProjects();
    return () => {
      isMounted = false;
    };
  }, []);

  // Current project index in the full list
  const currentProjectIndex = allProjects.findIndex(
    (p) => (p._id || p.id) === (selectedProject?._id || selectedProject?.id)
  );

  const nextProject = (e) => {
    if (e) e.stopPropagation();
    if (allProjects.length === 0) return;
    const nextIdx = (currentProjectIndex + 1) % allProjects.length;
    setSelectedProject(allProjects[nextIdx]);
    setActiveImageIndex(0);
    setIsGalleryHovered(false);
  };

  const prevProject = (e) => {
    if (e) e.stopPropagation();
    if (allProjects.length === 0) return;
    const prevIdx =
      (currentProjectIndex - 1 + allProjects.length) % allProjects.length;
    setSelectedProject(allProjects[prevIdx]);
    setActiveImageIndex(0);
    setIsGalleryHovered(false);
  };

  // Keyboard navigation for modal
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
  }, [selectedProject, currentProjectIndex, allProjects.length]);

  // Modal Gallery Auto-Slide
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

  // Divide into Row 1 & Row 2
  const half = Math.ceil(allProjects.length / 2);
  const row1 = allProjects.slice(0, half);
  const row2 = allProjects.length > 1 ? allProjects.slice(half) : allProjects;

  // Helper to ensure marquee loops smoothly without cutting off
  const fillMarquee = (items) => {
    if (!items || items.length === 0) return [];
    let repeated = [...items];
    while (repeated.length < 5) {
      repeated = [...repeated, ...items];
    }
    return [...repeated, ...repeated];
  };

  // Minimalist Project Card
  const renderCard = (project, keyPrefix = "") => {
    const pId = project._id || project.id;
    const pImg = project.featuredImage || PLACEHOLDER_IMAGE;

    return (
      <div
        key={`${keyPrefix}-${pId}`}
        onClick={() => openModal(project)}
        className="flex-shrink-0 mx-3.5 w-[330px] sm:w-[380px] bg-[#0d121f]/95 border border-white/10 hover:border-blue-500/50 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-[0_12px_36px_rgba(59,130,246,0.18)] hover:-translate-y-1.5 flex flex-col justify-between cursor-pointer group backdrop-blur-md"
      >
        {/* Featured Image Thumbnail */}
        <div className="relative aspect-[16/10] overflow-hidden bg-[#090d16]">
          <img
            src={pImg}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src = PLACEHOLDER_IMAGE;
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30" />

          {/* Category Pill Over Image */}
          <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wide bg-[#0d121f]/90 backdrop-blur-md text-blue-300 border border-blue-500/20 shadow-sm">
              {project.category}
            </span>
          </div>

          {/* Centered Button on Hover */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/55 backdrop-blur-[2px] z-20">
            <span className="px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold tracking-wide shadow-xl shadow-blue-500/40 flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 pointer-events-none">
              <i className="fas fa-eye text-xs"></i>
              <span>View Details</span>
            </span>
          </div>

          {/* Tags Overlaid on the Image Bottom */}
          <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-1.5 z-10">
            {project.tags.slice(0, 4).map((tag, tIdx) => (
              <span
                key={tIdx}
                className="text-[10px] px-2 py-0.5 rounded-md bg-black/65 backdrop-blur-md text-slate-200 border border-white/15 font-mono shadow-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Card Content Body */}
        <div className="p-5 flex-1 flex flex-col justify-center">
          <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-blue-300 transition-colors leading-snug mb-2 line-clamp-1">
            {project.title}
          </h3>
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
  };

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

      {/* When no projects are in Sanity yet */}
      {allProjects.length === 0 ? (
        <div className="max-w-md mx-auto px-4 py-16 text-center relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center mx-auto mb-4 text-2xl">
            <i className="fas fa-folder-open"></i>
          </div>
          <h3 className="text-lg font-bold text-white mb-2">
            No Published Projects Yet
          </h3>
          <p className="text-slate-400 text-xs sm:text-sm mb-6 leading-relaxed">
            Publish your first project in Sanity Studio to see it appear here live on your portfolio.
          </p>
          <a
            href="/joydevadmin"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs tracking-wide shadow-lg shadow-blue-500/30 transition-all"
          >
            <i className="fas fa-plus"></i>
            <span>Open Studio to Add Project</span>
          </a>
        </div>
      ) : (
        <>
          {/* AUTO-SLIDING ROW 1 */}
          <div className="slide-row marquee-pause-hover w-full overflow-hidden mb-7 relative flex">
            <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-36 bg-gradient-to-r from-[#070b14] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-36 bg-gradient-to-l from-[#070b14] to-transparent z-10 pointer-events-none" />

            <div className="flex w-max animate-scroll-left">
              {fillMarquee(row1).map((p, idx) => renderCard(p, `r1-${idx}`))}
            </div>
          </div>

          {/* AUTO-SLIDING ROW 2 */}
          <div className="slide-row marquee-pause-hover w-full overflow-hidden relative flex">
            <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-36 bg-gradient-to-r from-[#070b14] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-36 bg-gradient-to-l from-[#070b14] to-transparent z-10 pointer-events-none" />

            <div className="flex w-max animate-scroll-right">
              {fillMarquee(row2).map((p, idx) => renderCard(p, `r2-${idx}`))}
            </div>
          </div>
        </>
      )}

      {/* PRODUCT-DETAILS STYLE MODAL */}
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
          <div className="relative w-full max-w-5xl my-auto flex items-center justify-center">
            {/* Left Floating Button: Previous Project */}
            {allProjects.length > 1 && (
              <button
                type="button"
                onClick={prevProject}
                className="absolute -left-2 sm:-left-5 lg:-left-16 z-30 w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-[#0d121f]/95 hover:bg-blue-600 border border-white/20 hover:border-blue-400 text-white flex items-center justify-center backdrop-blur-md transition-all duration-200 hover:scale-110 shadow-2xl shadow-black/90 group"
                title="Previous Project (Left Arrow)"
                aria-label="Previous Project"
              >
                <i className="fas fa-chevron-left text-xs sm:text-base transform group-hover:-translate-x-0.5 transition-transform"></i>
              </button>
            )}

            {/* Right Floating Button: Next Project */}
            {allProjects.length > 1 && (
              <button
                type="button"
                onClick={nextProject}
                className="absolute -right-2 sm:-right-5 lg:-right-16 z-30 w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-[#0d121f]/95 hover:bg-blue-600 border border-white/20 hover:border-blue-400 text-white flex items-center justify-center backdrop-blur-md transition-all duration-200 hover:scale-110 shadow-2xl shadow-black/90 group"
                title="Next Project (Right Arrow)"
                aria-label="Next Project"
              >
                <i className="fas fa-chevron-right text-xs sm:text-base transform group-hover:translate-x-0.5 transition-transform"></i>
              </button>
            )}

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

              {/* Modal Body: Two-column layout */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-5 sm:p-6 overflow-y-auto custom-scrollbar">
                {/* Column 1: Auto-Sliding Gallery */}
                <div className="lg:col-span-7 flex flex-col">
                  <div
                    onMouseEnter={() => setIsGalleryHovered(true)}
                    onMouseLeave={() => setIsGalleryHovered(false)}
                    className="relative aspect-[16/10] w-full bg-[#070a12] rounded-xl overflow-hidden border border-white/10 flex items-center justify-center group/mainimg"
                  >
                    <img
                      key={`${selectedProject.id}-${activeImageIndex}`}
                      src={
                        selectedProject.gallery[activeImageIndex] ||
                        selectedProject.featuredImage ||
                        PLACEHOLDER_IMAGE
                      }
                      alt={`${selectedProject.title} preview ${activeImageIndex + 1}`}
                      className="w-full h-full object-cover transition-opacity duration-500 animate-fade-in"
                      onError={(e) => {
                        e.currentTarget.src = PLACEHOLDER_IMAGE;
                      }}
                    />

                    {/* Auto-Slide Indicator */}
                    {selectedProject.gallery.length > 1 && (
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
                    )}

                    {/* Slide progress bar */}
                    {selectedProject.gallery.length > 1 && (
                      <div className="absolute bottom-0 inset-x-0 h-1 bg-white/10">
                        <div
                          key={`progress-${selectedProject.id}-${activeImageIndex}-${isGalleryHovered}`}
                          className={`h-full bg-gradient-to-r from-blue-500 to-indigo-500 ${
                            isGalleryHovered
                              ? "w-full opacity-60"
                              : "animate-progress"
                          }`}
                          style={{
                            animation: isGalleryHovered
                              ? "none"
                              : "galleryProgress 3s linear infinite",
                          }}
                        />
                      </div>
                    )}
                  </div>

                  {/* Clickable Thumbnail Gallery Strip */}
                  {selectedProject.gallery && selectedProject.gallery.length > 1 && (
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
                                onError={(e) => {
                                  e.currentTarget.src = PLACEHOLDER_IMAGE;
                                }}
                              />
                              {isActive && (
                                <div className="absolute inset-0 bg-blue-500/10 pointer-events-none" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                {/* Column 2: Full Information & Project Specs */}
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
                    {selectedProject.features &&
                      selectedProject.features.length > 0 && (
                        <div className="mb-5">
                          <h4 className="text-xs uppercase tracking-wider font-semibold text-slate-300 mb-2 flex items-center gap-1.5">
                            <i className="fas fa-check-circle text-emerald-400"></i>{" "}
                            Key Deliverables
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
                    {selectedProject.tags && selectedProject.tags.length > 0 && (
                      <div className="mb-6">
                        <h4 className="text-xs uppercase tracking-wider font-semibold text-slate-300 mb-2 flex items-center gap-1.5">
                          <i className="fas fa-code text-purple-400"></i> Tech
                          Stack &amp; Tools
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
                    )}
                  </div>

                  {/* Modal Footer Actions */}
                  <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-end gap-3">
                    {selectedProject.githubLink &&
                      selectedProject.githubLink.trim().length > 0 && (
                        <a
                          href={selectedProject.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full sm:w-auto py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-xs sm:text-sm text-center border border-white/10 transition-all flex items-center justify-center gap-2 group/gh"
                        >
                          <i className="fab fa-github text-sm text-slate-300 group-hover/gh:text-white transition-colors"></i>
                          <span>Source Code</span>
                        </a>
                      )}

                    {selectedProject.link &&
                    selectedProject.link !== "#" &&
                    selectedProject.link.trim().length > 0 ? (
                      <a
                        href={selectedProject.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:flex-1 py-2.5 px-5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-xs sm:text-sm text-center shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center gap-2 group/live"
                      >
                        <span>Visit Live Website</span>
                        <i className="fas fa-arrow-up-right-from-square text-xs transform group-hover/live:translate-x-0.5 group-hover/live:-translate-y-0.5 transition-transform"></i>
                      </a>
                    ) : (
                      <span className="w-full sm:flex-1 py-2.5 px-5 rounded-xl bg-white/5 text-slate-400 font-medium text-xs sm:text-sm text-center border border-white/5">
                        Preview link not set
                      </span>
                    )}

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

      {/* Styles for guaranteed pause-on-hover & gallery animation */}
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