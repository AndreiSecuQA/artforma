"use client";

import { motion, useMotionValue, useSpring, useTransform, type Variants } from "framer-motion";
import { useEffect, useRef } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";

const MARQUEE_SPEED = 45;

function Marquee({ text }: { text: string }) {
  const repeated = `${text} ${text} ${text}`;
  return (
    <div
      className="relative overflow-hidden py-5 border-t"
      style={{ borderColor: "rgba(13,13,11,0.1)" }}
      aria-hidden="true"
    >
      <motion.p
        className="whitespace-nowrap text-xs font-medium tracking-[0.22em] uppercase"
        style={{ color: "var(--charcoal-400)" }}
        animate={{ x: ["0%", "-33.33%"] }}
        transition={{ duration: MARQUEE_SPEED, repeat: Infinity, ease: "linear" }}
      >
        {repeated}
      </motion.p>
    </div>
  );
}

const imageSlots = [
  { label: "Bucătărie Modernă", color: "#2e2e28", accent: "#45453e", gridArea: "1 / 1 / 3 / 2" },
  { label: "Dormitor Elegant",  color: "#4a2e22", accent: "#6b4436", gridArea: "1 / 2 / 2 / 3" },
  { label: "Dressing Premium",  color: "#1e1e1a", accent: "#2e2e28", gridArea: "2 / 2 / 3 / 3" },
];

export default function Hero() {
  const t = useTranslations("hero");
  const containerRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 22 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 22 });
  const blobX = useTransform(springX, [0, 1], [-40, 40]);
  const blobY = useTransform(springY, [0, 1], [-25, 25]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handler = (e: MouseEvent) => {
      const { left, top, width, height } = el.getBoundingClientRect();
      mouseX.set((e.clientX - left) / width);
      mouseY.set((e.clientY - top) / height);
    };
    el.addEventListener("mousemove", handler);
    return () => el.removeEventListener("mousemove", handler);
  }, [mouseX, mouseY]);

  const scrollTo = (id: string) =>
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.11, delayChildren: 0.2 } },
  };
  const item: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
  };

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden flex flex-col"
      style={{ minHeight: "100dvh", backgroundColor: "var(--cream-100)" }}
    >
      {/* Ambient warm blobs */}
      <motion.div
        className="pointer-events-none absolute -top-60 -right-60 w-[800px] h-[800px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(166,124,100,0.18) 0%, transparent 60%)",
          x: blobX,
          y: blobY,
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-20 -left-20 w-[500px] h-[500px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(125,90,71,0.10) 0%, transparent 65%)" }}
        aria-hidden="true"
      />

      {/* Subtle warm grain grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(rgba(13,13,11,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(13,13,11,0.035) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
        aria-hidden="true"
      />

      {/* Main content — flex-1 fills space, then marquee is pinned */}
      <div className="relative z-10 flex-1 flex flex-col max-w-7xl mx-auto w-full px-6 lg:px-8 pt-24 pb-0">
        <div className="flex flex-col lg:flex-row items-stretch gap-10 lg:gap-16 flex-1">

          {/* ── LEFT ── */}
          <motion.div
            className="flex-1 max-w-xl flex flex-col pt-10 lg:pt-14 pb-10 lg:pb-12"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {/* Top group */}
            <div className="flex-1">
              <motion.div variants={item} className="flex flex-wrap items-center gap-3 mb-8">
                <span
                  className="text-xs font-medium tracking-[0.25em] uppercase"
                  style={{ color: "var(--wood-600)" }}
                >
                  {t("eyebrow")}
                </span>
                <span
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold border"
                  style={{
                    backgroundColor: "rgba(125,90,71,0.1)",
                    borderColor: "rgba(125,90,71,0.22)",
                    color: "var(--wood-800)",
                  }}
                >
                  <Sparkles size={10} />
                  {t("badge")}
                </span>
              </motion.div>

              <motion.h1
                variants={item}
                className="font-bold leading-[1.04] tracking-tight mb-7"
                style={{
                  fontSize: "clamp(2.8rem, 6vw, 4.8rem)",
                  color: "var(--charcoal-900)",
                  fontFamily: "var(--font-playfair), serif",
                }}
              >
                {t("h1_line1")}
                <br />
                <span className="relative inline-block">
                  <span style={{ color: "var(--wood-600)" }}>{t("h1_accent")}</span>
                  <motion.span
                    className="absolute -bottom-1 left-0 h-[3px] rounded-full"
                    style={{ backgroundColor: "var(--wood-400)", opacity: 0.7 }}
                    initial={{ scaleX: 0, originX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.9, delay: 0.8 }}
                    aria-hidden="true"
                  />
                </span>
              </motion.h1>

              <motion.p
                variants={item}
                className="text-base lg:text-lg leading-[1.75] mb-10"
                style={{ color: "var(--charcoal-600)" }}
              >
                {t("subtitle")}
              </motion.p>

              <motion.div variants={item} className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => scrollTo("#contact")}
                  className="group flex items-center justify-center gap-2 px-7 py-4 text-sm font-semibold rounded-full transition-all duration-200 active:scale-[0.98] cursor-pointer"
                  style={{ backgroundColor: "var(--wood-600)", color: "var(--cream-100)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--wood-800)")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "var(--wood-600)")}
                >
                  {t("cta_primary")}
                  <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-1" />
                </button>
                <button
                  onClick={() => scrollTo("#servicii")}
                  className="px-7 py-4 text-sm font-semibold rounded-full border-2 transition-all duration-200 cursor-pointer"
                  style={{ borderColor: "var(--charcoal-200)", color: "var(--charcoal-700)" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--charcoal-700)";
                    e.currentTarget.style.color = "var(--charcoal-900)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--charcoal-200)";
                    e.currentTarget.style.color = "var(--charcoal-700)";
                  }}
                >
                  {t("cta_secondary")}
                </button>
              </motion.div>
            </div>

            {/* Stats — pinned to bottom */}
            <motion.div variants={item} className="flex items-center gap-10 pt-10 mt-auto border-t" style={{ borderColor: "rgba(13,13,11,0.08)" }}>
              {[
                { value: t("stat1_value"), label: t("stat1_label") },
                { value: t("stat2_value"), label: t("stat2_label") },
                { value: t("stat3_value"), label: t("stat3_label") },
              ].map((s, i) => (
                <div key={i} className="relative">
                  {i > 0 && (
                    <div className="absolute -left-5 top-1/2 -translate-y-1/2 w-px h-6" style={{ backgroundColor: "var(--charcoal-200)" }} />
                  )}
                  <p className="text-2xl font-bold" style={{ color: "var(--charcoal-900)", fontFamily: "var(--font-playfair), serif" }}>
                    {s.value}
                  </p>
                  <p className="text-[11px] mt-1" style={{ color: "var(--charcoal-400)" }}>
                    {s.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── RIGHT: image grid, stretches full height ── */}
          <motion.div
            className="flex-1 w-full max-w-md lg:max-w-[500px] flex flex-col pt-10 lg:pt-14 pb-10 lg:pb-12"
            initial={{ opacity: 0, x: 50, scale: 0.97 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            aria-hidden="true"
          >
            <div
              className="flex-1 grid gap-3"
              style={{ gridTemplateColumns: "1fr 1fr", gridTemplateRows: "1fr 1fr", minHeight: "380px" }}
            >
              {imageSlots.map((slot, i) => (
                <motion.div
                  key={i}
                  className="relative overflow-hidden rounded-2xl"
                  style={{ gridArea: slot.gridArea, backgroundColor: slot.color }}
                  whileHover={{ scale: 1.025 }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `repeating-linear-gradient(14deg, transparent, transparent 20px, ${slot.accent}44 20px, ${slot.accent}44 21px)`,
                    }}
                  />
                  <div
                    className="absolute bottom-0 inset-x-0 p-5"
                    style={{ background: "linear-gradient(to top, rgba(0,0,0,0.6), transparent)" }}
                  >
                    <span className="text-xs font-medium tracking-wide" style={{ color: "rgba(250,248,245,0.85)" }}>
                      {slot.label}
                    </span>
                  </div>
                  <motion.div
                    className="absolute inset-y-0 w-20"
                    style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)" }}
                    animate={{ x: ["-80px", "calc(100% + 80px)"] }}
                    transition={{ duration: 2.8, repeat: Infinity, repeatDelay: 4 + i * 2, ease: "easeInOut" }}
                  />
                </motion.div>
              ))}
            </div>

            {/* Social proof */}
            <motion.div
              className="mt-3 flex items-center justify-between px-5 py-4 rounded-2xl"
              style={{ backgroundColor: "rgba(13,13,11,0.05)", border: "1px solid rgba(13,13,11,0.09)" }}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.5 }}
            >
              <div className="flex -space-x-2">
                {["#5c3d2e", "#3d3d35", "#7d5a47", "#2a2a24"].map((c, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 flex items-center justify-center text-[10px] font-bold"
                    style={{ backgroundColor: c, borderColor: "var(--cream-100)", color: "var(--cream-100)" }}
                  >
                    {String.fromCharCode(65 + i)}
                  </div>
                ))}
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold" style={{ color: "var(--wood-600)" }}>★★★★★</p>
                <p className="text-[11px]" style={{ color: "var(--charcoal-500)" }}>500+ clienți mulțumiți</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Marquee — pinned at bottom */}
      <Marquee text={t("marquee")} />
    </section>
  );
}
