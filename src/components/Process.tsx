"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MessageSquare, PenTool, Factory, Truck } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Process() {
  const t = useTranslations("process");
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const steps = [
    { icon: MessageSquare, number: "01", title: t("step1_title"), desc: t("step1_desc"), dur: t("step1_dur") },
    { icon: PenTool, number: "02", title: t("step2_title"), desc: t("step2_desc"), dur: t("step2_dur") },
    { icon: Factory, number: "03", title: t("step3_title"), desc: t("step3_desc"), dur: t("step3_dur") },
    { icon: Truck, number: "04", title: t("step4_title"), desc: t("step4_desc"), dur: t("step4_dur") },
  ];

  return (
    <section id="proces" className="py-24 lg:py-32" style={{ backgroundColor: "var(--charcoal-900)" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          ref={ref}
          className="mb-16 max-w-2xl"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-medium tracking-[0.25em] uppercase mb-4" style={{ color: "var(--wood-400)" }}>
            {t("eyebrow")}
          </p>
          <h2
            className="text-4xl lg:text-5xl font-bold leading-tight mb-4"
            style={{ color: "var(--cream-100)", fontFamily: "var(--font-playfair), serif" }}
          >
            {t("heading")}
          </h2>
          <p className="text-base leading-relaxed" style={{ color: "var(--charcoal-200)" }}>
            {t("subtitle")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px" style={{ backgroundColor: "var(--charcoal-700)" }}>
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                className="relative p-8 flex flex-col gap-6"
                style={{ backgroundColor: "var(--charcoal-900)" }}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.12 }}
              >
                <div className="flex items-start justify-between">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: "var(--charcoal-800)", color: "var(--wood-400)" }}
                  >
                    <Icon size={20} strokeWidth={1.5} />
                  </div>
                  <span
                    className="text-5xl font-bold leading-none opacity-15 select-none"
                    style={{ color: "var(--charcoal-200)", fontFamily: "var(--font-playfair), serif" }}
                  >
                    {step.number}
                  </span>
                </div>
                <div>
                  <h3
                    className="text-lg font-semibold mb-2"
                    style={{ color: "var(--cream-100)", fontFamily: "var(--font-playfair), serif" }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--charcoal-400)" }}>
                    {step.desc}
                  </p>
                </div>
                <div
                  className="mt-auto inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium w-fit"
                  style={{ backgroundColor: "var(--charcoal-800)", color: "var(--wood-400)" }}
                >
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "var(--wood-400)" }} />
                  {step.dur}
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          className="mt-16 flex flex-col sm:flex-row items-center gap-6 p-8 rounded-2xl"
          style={{ backgroundColor: "var(--charcoal-800)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="flex-1">
            <p
              className="text-xl font-semibold mb-1"
              style={{ color: "var(--cream-100)", fontFamily: "var(--font-playfair), serif" }}
            >
              {t("banner_heading")}
            </p>
            <p className="text-sm" style={{ color: "var(--charcoal-400)" }}>
              {t("banner_sub")}
            </p>
          </div>
          <button
            onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
            className="flex-shrink-0 px-8 py-3.5 text-sm font-semibold rounded-full transition-all duration-200 cursor-pointer"
            style={{ backgroundColor: "var(--wood-600)", color: "var(--cream-100)" }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--wood-400)")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "var(--wood-600)")}
          >
            {t("banner_cta")}
          </button>
        </motion.div>
      </div>
    </section>
  );
}
