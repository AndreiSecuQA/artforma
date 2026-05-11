"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { useTranslations } from "next-intl";

const projects = [
  { title: "Bucătărie Nordic",  catKey: "filter_kitchens",  color: "#3d3d35", tall: true  },
  { title: "Dormitor Minimal",  catKey: "filter_bedrooms",  color: "#5c3d2e", tall: false },
  { title: "Bucătărie Clasică", catKey: "filter_kitchens",  color: "#555549", tall: false },
  { title: "Dressing Premium",  catKey: "filter_wardrobes", color: "#7d5a47", tall: true  },
  { title: "Living Modern",     catKey: "filter_living",    color: "#2a2a24", tall: false },
  { title: "Dormitor Luxos",    catKey: "filter_bedrooms",  color: "#4a2e22", tall: false },
  { title: "Living Bej",        catKey: "filter_living",    color: "#8a8a7a", tall: true  },
  { title: "Bucătărie Albă",    catKey: "filter_kitchens",  color: "#3d3d35", tall: false },
];

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      className="relative overflow-hidden rounded-2xl cursor-pointer"
      style={{ height: project.tall ? 380 : 240 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.35, delay: index * 0.045 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      role="figure"
      aria-label={project.title}
    >
      <div
        className="absolute inset-0 transition-transform duration-500"
        style={{ backgroundColor: project.color, transform: hovered ? "scale(1.05)" : "scale(1)" }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(14deg, transparent, transparent 22px, rgba(255,255,255,0.025) 22px, rgba(255,255,255,0.025) 23px)`,
          }}
        />
      </div>
      <div
        className="absolute inset-0 flex items-end p-5 transition-opacity duration-300"
        style={{
          background: "linear-gradient(to top, rgba(13,13,11,0.75) 0%, rgba(13,13,11,0.1) 50%, transparent 100%)",
          opacity: hovered ? 1 : 0.8,
        }}
      >
        <div>
          <p className="text-xs font-medium tracking-[0.18em] uppercase mb-1" style={{ color: "var(--wood-200)" }}>
            ArtForma
          </p>
          <p className="text-sm font-semibold" style={{ color: "var(--cream-100)", fontFamily: "var(--font-playfair), serif" }}>
            {project.title}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Portfolio() {
  const t = useTranslations("portfolio");
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const filterKeys = ["filter_all", "filter_kitchens", "filter_bedrooms", "filter_living", "filter_wardrobes"] as const;
  const [activeKey, setActiveKey] = useState<typeof filterKeys[number]>("filter_all");

  const filtered = activeKey === "filter_all" ? projects : projects.filter((p) => p.catKey === activeKey);

  return (
    <section id="portofoliu" className="py-24 lg:py-32" style={{ backgroundColor: "var(--cream-100)" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          ref={ref}
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-medium tracking-[0.25em] uppercase mb-4" style={{ color: "var(--wood-600)" }}>
            {t("eyebrow")}
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <h2
              className="text-4xl lg:text-5xl font-bold leading-tight"
              style={{ color: "var(--charcoal-900)", fontFamily: "var(--font-playfair), serif" }}
            >
              {t("heading")}
            </h2>
            <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filtrare categorie">
              {filterKeys.map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveKey(key)}
                  role="tab"
                  aria-selected={activeKey === key}
                  className="px-4 py-1.5 text-sm font-medium rounded-full border transition-all duration-200 cursor-pointer"
                  style={{
                    backgroundColor: activeKey === key ? "var(--charcoal-900)" : "transparent",
                    color: activeKey === key ? "var(--cream-100)" : "var(--charcoal-600)",
                    borderColor: activeKey === key ? "var(--charcoal-900)" : "var(--charcoal-200)",
                  }}
                >
                  {t(key)}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Masonry-style columns grid — no spanning, no aspect-ratio conflicts */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-0">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <div key={p.title} className="break-inside-avoid mb-3">
                <ProjectCard project={p} index={i} />
              </div>
            ))}
          </AnimatePresence>
        </div>

        <motion.div
          className="mt-14 text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-sm mb-5" style={{ color: "var(--charcoal-600)" }}>
            {t("cta_text")}
          </p>
          <button
            onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
            className="px-8 py-3.5 text-sm font-semibold rounded-full border-2 transition-all duration-200 cursor-pointer"
            style={{ borderColor: "var(--charcoal-900)", color: "var(--charcoal-900)" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "var(--charcoal-900)";
              e.currentTarget.style.color = "var(--cream-100)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = "var(--charcoal-900)";
            }}
          >
            {t("cta_button")}
          </button>
        </motion.div>
      </div>
    </section>
  );
}
