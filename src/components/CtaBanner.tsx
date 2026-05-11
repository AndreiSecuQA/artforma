"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

export default function CtaBanner() {
  const t = useTranslations("cta_banner");
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      className="py-0"
      style={{ backgroundColor: "var(--cream-100)" }}
    >
      <motion.div
        ref={ref}
        className="max-w-7xl mx-auto px-6 lg:px-8"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <div
          className="relative overflow-hidden rounded-3xl px-8 py-14 lg:px-16 flex flex-col lg:flex-row items-center justify-between gap-8"
          style={{
            background: "linear-gradient(135deg, var(--charcoal-900) 0%, var(--wood-800) 100%)",
          }}
        >
          {/* background grain */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
              backgroundSize: "256px 256px",
            }}
            aria-hidden="true"
          />
          {/* decorative circle */}
          <div
            className="pointer-events-none absolute -right-20 -top-20 w-64 h-64 rounded-full opacity-10"
            style={{ backgroundColor: "var(--wood-400)" }}
            aria-hidden="true"
          />

          <div className="relative text-center lg:text-left">
            <h2
              className="text-3xl lg:text-4xl font-bold mb-3"
              style={{
                color: "var(--cream-100)",
                fontFamily: "var(--font-playfair), serif",
              }}
            >
              {t("heading")}
            </h2>
            <p className="text-base" style={{ color: "var(--charcoal-200)" }}>
              {t("subtitle")}
            </p>
          </div>

          <button
            onClick={() =>
              document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })
            }
            className="relative flex-shrink-0 group flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-sm transition-all duration-200 active:scale-[0.97] cursor-pointer"
            style={{ backgroundColor: "var(--wood-400)", color: "var(--cream-100)" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "var(--wood-200)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "var(--wood-400)")
            }
          >
            {t("button")}
            <ArrowRight
              size={15}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </button>
        </div>
      </motion.div>
    </section>
  );
}
