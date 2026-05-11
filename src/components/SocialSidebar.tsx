"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const socials = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/artforma.md/",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/artforma.md/",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@artforma.md",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V9.35a8.16 8.16 0 004.77 1.52V7.42a4.85 4.85 0 01-1-.73z" />
      </svg>
    ),
  },
];

export default function SocialSidebar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed left-4 lg:left-6 bottom-6 z-50 flex flex-col gap-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          aria-label="Rețele de socializare"
        >
          {/* Vertical line above icons */}
          <motion.div
            className="w-px h-10 mx-auto rounded-full"
            style={{ backgroundColor: "rgba(13,13,11,0.2)" }}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          />
          {socials.map((s, i) => (
            <motion.a
              key={s.name}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.name}
              className="w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-all duration-200"
              style={{
                backgroundColor: "var(--charcoal-900)",
                color: "rgba(200,200,184,0.75)",
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.07 }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "var(--wood-600)";
                e.currentTarget.style.color = "var(--cream-100)";
                e.currentTarget.style.transform = "scale(1.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "var(--charcoal-900)";
                e.currentTarget.style.color = "rgba(200,200,184,0.75)";
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              {s.icon}
            </motion.a>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
