"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

const values = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ),
    key: "value1",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"/>
        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
      </svg>
    ),
    key: "value2",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/>
        <path d="M8 21h8M12 17v4"/>
      </svg>
    ),
    key: "value3",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
    key: "value4",
  },
];

export default function Brand() {
  const t = useTranslations("brand");
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section style={{ backgroundColor: "var(--charcoal-950)" }} className="overflow-hidden">
      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-32">

        {/* Logo + tagline */}
        <motion.div
          className="flex flex-col items-center text-center mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-8"
          >
            <Image
              src="/logo.svg"
              alt="ArtForma"
              width={280}
              height={80}
              className="h-16 lg:h-20 w-auto object-contain"
              priority={false}
            />
          </motion.div>

          <motion.p
            className="text-2xl lg:text-3xl font-semibold mb-6"
            style={{ color: "var(--cream-100)", fontFamily: "var(--font-playfair), serif" }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t("tagline")}
          </motion.p>

          <motion.p
            className="text-base lg:text-lg leading-relaxed max-w-2xl"
            style={{ color: "rgba(200,200,184,0.75)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {t("description")}
          </motion.p>
        </motion.div>

        {/* Divider */}
        <motion.div
          className="h-px mb-16 lg:mb-20"
          style={{ backgroundColor: "rgba(255,255,255,0.07)" }}
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        />

        {/* Value pillars */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {values.map((v, i) => (
            <motion.div
              key={v.key}
              className="flex flex-col gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.45 + i * 0.08 }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: "rgba(125,90,71,0.2)", color: "var(--wood-400)" }}
              >
                {v.icon}
              </div>
              <div>
                <p
                  className="text-base font-semibold mb-2"
                  style={{ color: "var(--cream-100)" }}
                >
                  {t(v.key as "value1" | "value2" | "value3" | "value4")}
                </p>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "rgba(200,200,184,0.6)" }}
                >
                  {t(`${v.key}_desc` as "value1_desc" | "value2_desc" | "value3_desc" | "value4_desc")}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
