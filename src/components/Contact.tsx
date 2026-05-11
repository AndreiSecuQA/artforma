"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from "lucide-react";
import { useTranslations } from "next-intl";

const MAPS_EMBED =
  "https://maps.google.com/maps?q=47.0359625,28.8189488&z=16&output=embed&hl=ro";
const MAPS_LINK =
  "https://www.google.com/maps/place/ArtForma/@47.0359625,28.8189488,16z";

export default function Contact() {
  const t = useTranslations("contact");
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  const contactItems = [
    { icon: Phone, label: t("label_phone"), value: "+373 79-100-380", href: "tel:+37379100380" },
    { icon: Mail, label: t("label_email"), value: "artforma.md@gmail.com", href: "mailto:artforma.md@gmail.com" },
    { icon: MapPin, label: t("label_address"), value: "Str. Mitropolit Dosoftei 115 A, Chișinău", href: MAPS_LINK },
    { icon: Clock, label: t("label_hours"), value: t("hours_value"), href: null },
  ];

  return (
    <section id="contact" className="py-24 lg:py-32" style={{ backgroundColor: "var(--cream-200)" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          ref={ref}
          className="mb-16 max-w-2xl"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-medium tracking-[0.25em] uppercase mb-4" style={{ color: "var(--wood-600)" }}>
            {t("eyebrow")}
          </p>
          <h2
            className="text-4xl lg:text-5xl font-bold leading-tight mb-4"
            style={{ color: "var(--charcoal-900)", fontFamily: "var(--font-playfair), serif" }}
          >
            {t("heading")}
          </h2>
          <p className="text-base leading-relaxed" style={{ color: "var(--charcoal-600)" }}>
            {t("subtitle")}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: info + map */}
          <motion.div
            className="flex flex-col gap-6"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="grid sm:grid-cols-2 gap-4">
              {contactItems.map((item) => {
                const Icon = item.icon;
                const card = (
                  <div
                    className="flex items-start gap-4 p-5 rounded-xl border"
                    style={{ backgroundColor: "var(--cream-100)", borderColor: "var(--charcoal-100)" }}
                  >
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ backgroundColor: "var(--wood-100)", color: "var(--wood-800)" }}
                    >
                      <Icon size={16} strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-[11px] font-medium tracking-wide uppercase mb-1" style={{ color: "var(--charcoal-400)" }}>
                        {item.label}
                      </p>
                      <p className="text-sm font-medium" style={{ color: "var(--charcoal-800)" }}>
                        {item.value}
                      </p>
                    </div>
                  </div>
                );
                return item.href ? (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="block transition-opacity duration-200 hover:opacity-80"
                  >
                    {card}
                  </a>
                ) : (
                  <div key={item.label}>{card}</div>
                );
              })}
            </div>

            {/* Google Maps — real ArtForma location */}
            <div
              className="rounded-2xl overflow-hidden border flex-1 min-h-[240px]"
              style={{ borderColor: "var(--charcoal-100)" }}
            >
              <iframe
                title="Locația ArtForma Chișinău"
                src={MAPS_EMBED}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: 240, display: "block" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/37379100380?text=Bun%C4%83%20ziua%2C%20sunt%20interesat%20de%20o%20consulta%C8%9Bie%20gratuit%C4%83."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 py-4 rounded-xl font-semibold text-sm transition-all duration-200"
              style={{ backgroundColor: "#25D366", color: "#fff" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#1ebe5d")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#25D366")}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              {t("whatsapp")}
            </a>
          </motion.div>

          {/* Right: lead form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div
              className="rounded-2xl border p-8 lg:p-10"
              style={{ backgroundColor: "var(--cream-100)", borderColor: "var(--charcoal-100)" }}
            >
              {submitted ? (
                <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
                  <CheckCircle size={48} strokeWidth={1.5} style={{ color: "var(--wood-600)" }} />
                  <h3
                    className="text-2xl font-semibold"
                    style={{ color: "var(--charcoal-900)", fontFamily: "var(--font-playfair), serif" }}
                  >
                    {t("success_heading")}
                  </h3>
                  <p style={{ color: "var(--charcoal-600)" }}>{t("success_sub")}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                  <div>
                    <h3
                      className="text-2xl font-bold mb-1"
                      style={{ color: "var(--charcoal-900)", fontFamily: "var(--font-playfair), serif" }}
                    >
                      {t("form_heading")}
                    </h3>
                    <p className="text-sm" style={{ color: "var(--charcoal-600)" }}>
                      {t("form_sub")}
                    </p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <FormField label={t("field_name")} id="name" type="text" required placeholder="Ion Popescu" />
                    <FormField label={t("field_phone")} id="phone" type="tel" required placeholder="+373 7x xxx xxx" />
                  </div>
                  <FormField label={t("field_email")} id="email" type="email" placeholder="ion@email.com" />

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="service" className="text-sm font-medium" style={{ color: "var(--charcoal-800)" }}>
                      {t("field_service")}
                    </label>
                    <select
                      id="service"
                      name="service"
                      className="w-full rounded-xl border px-4 py-3 text-sm outline-none transition-colors duration-200"
                      style={{ borderColor: "var(--charcoal-200)", backgroundColor: "var(--cream-100)", color: "var(--charcoal-800)" }}
                      onFocus={(e) => (e.target.style.borderColor = "var(--wood-600)")}
                      onBlur={(e) => (e.target.style.borderColor = "var(--charcoal-200)")}
                    >
                      <option value="">{t("field_service_placeholder")}</option>
                      <option>{t("service_kitchen")}</option>
                      <option>{t("service_wardrobe")}</option>
                      <option>{t("service_bedroom")}</option>
                      <option>{t("service_living")}</option>
                      <option>{t("service_other")}</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="message" className="text-sm font-medium" style={{ color: "var(--charcoal-800)" }}>
                      {t("field_message")}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      placeholder={t("field_message_placeholder")}
                      className="w-full rounded-xl border px-4 py-3 text-sm outline-none transition-colors duration-200 resize-none"
                      style={{ borderColor: "var(--charcoal-200)", backgroundColor: "var(--cream-100)", color: "var(--charcoal-800)" }}
                      onFocus={(e) => (e.target.style.borderColor = "var(--wood-600)")}
                      onBlur={(e) => (e.target.style.borderColor = "var(--charcoal-200)")}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center justify-center gap-2 py-4 rounded-xl font-semibold text-sm transition-all duration-200 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                    style={{ backgroundColor: "var(--charcoal-900)", color: "var(--cream-100)" }}
                    onMouseEnter={(e) => { if (!loading) e.currentTarget.style.backgroundColor = "var(--wood-800)"; }}
                    onMouseLeave={(e) => { if (!loading) e.currentTarget.style.backgroundColor = "var(--charcoal-900)"; }}
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                        </svg>
                        {t("submitting")}
                      </span>
                    ) : (
                      <><Send size={16} /> {t("submit")}</>
                    )}
                  </button>

                  <p className="text-xs text-center" style={{ color: "var(--charcoal-400)" }}>
                    {t("privacy")}
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function FormField({ label, id, type, required, placeholder }: {
  label: string; id: string; type: string; required?: boolean; placeholder?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium" style={{ color: "var(--charcoal-800)" }}>
        {label}
      </label>
      <input
        id={id} name={id} type={type} required={required} placeholder={placeholder}
        autoComplete={type === "tel" ? "tel" : type === "email" ? "email" : "name"}
        className="w-full rounded-xl border px-4 py-3 text-sm outline-none transition-colors duration-200"
        style={{ borderColor: "var(--charcoal-200)", backgroundColor: "var(--cream-100)", color: "var(--charcoal-800)" }}
        onFocus={(e) => (e.target.style.borderColor = "var(--wood-600)")}
        onBlur={(e) => (e.target.style.borderColor = "var(--charcoal-200)")}
      />
    </div>
  );
}
