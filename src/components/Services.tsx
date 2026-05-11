"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Layers, Bed, Sofa, LayoutGrid } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Services() {
  const t = useTranslations("services");
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const services = [
    {
      icon: Layers,
      title: t("kitchens_title"),
      description: t("kitchens_desc"),
      features: [t("kitchens_f1"), t("kitchens_f2"), t("kitchens_f3")],
    },
    {
      icon: LayoutGrid,
      title: t("wardrobes_title"),
      description: t("wardrobes_desc"),
      features: [t("wardrobes_f1"), t("wardrobes_f2"), t("wardrobes_f3")],
    },
    {
      icon: Bed,
      title: t("bedrooms_title"),
      description: t("bedrooms_desc"),
      features: [t("bedrooms_f1"), t("bedrooms_f2"), t("bedrooms_f3")],
    },
    {
      icon: Sofa,
      title: t("living_title"),
      description: t("living_desc"),
      features: [t("living_f1"), t("living_f2"), t("living_f3")],
    },
  ];

  return (
    <section
      id="servicii"
      className="py-24 lg:py-32"
      style={{ backgroundColor: "var(--cream-200)" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          ref={ref}
          className="mb-16 max-w-2xl"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p
            className="text-xs font-medium tracking-[0.25em] uppercase mb-4"
            style={{ color: "var(--wood-600)" }}
          >
            {t("eyebrow")}
          </p>
          <h2
            className="text-4xl lg:text-5xl font-bold leading-tight mb-4"
            style={{
              color: "var(--charcoal-900)",
              fontFamily: "var(--font-playfair), serif",
            }}
          >
            {t("heading")}
          </h2>
          <p className="text-base leading-relaxed" style={{ color: "var(--charcoal-600)" }}>
            {t("subtitle")}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                className="group relative rounded-2xl p-8 border transition-all duration-300 flex flex-col gap-5"
                style={{
                  backgroundColor: "var(--cream-100)",
                  borderColor: "var(--charcoal-100)",
                }}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--wood-200)";
                  e.currentTarget.style.boxShadow = "0 12px 40px -8px rgba(92,61,46,0.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--charcoal-100)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: "var(--wood-100)", color: "var(--wood-800)" }}
                >
                  <Icon size={22} strokeWidth={1.5} />
                </div>
                <div>
                  <h3
                    className="text-xl font-semibold mb-2"
                    style={{
                      color: "var(--charcoal-900)",
                      fontFamily: "var(--font-playfair), serif",
                    }}
                  >
                    {service.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--charcoal-600)" }}>
                    {service.description}
                  </p>
                </div>
                <ul className="flex flex-col gap-2 mt-auto">
                  {service.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-2 text-xs font-medium"
                      style={{ color: "var(--charcoal-700)" }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: "var(--wood-400)" }}
                      />
                      {f}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
