"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, MessageCircle, X } from "lucide-react";

export default function StickyContact() {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.25 }}
        >
          <AnimatePresence>
            {expanded && (
              <motion.div
                className="flex flex-col gap-2 items-end"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
              >
                <a
                  href="tel:+37379100380"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold shadow-lg transition-opacity duration-200 hover:opacity-90"
                  style={{ backgroundColor: "var(--charcoal-900)", color: "var(--cream-100)" }}
                >
                  <Phone size={15} />
                  +373 79-100-380
                </a>
                <a
                  href="https://wa.me/37379100380?text=Bun%C4%83%20ziua%2C%20am%20o%20%C3%AEntrebare%20despre%20mobila%20la%20comand%C4%83."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold shadow-lg transition-opacity duration-200 hover:opacity-90"
                  style={{ backgroundColor: "#25D366", color: "#fff" }}
                >
                  <MessageCircle size={15} />
                  WhatsApp
                </a>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            onClick={() => setExpanded(!expanded)}
            className="w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-colors duration-200 cursor-pointer"
            style={{
              backgroundColor: expanded ? "var(--charcoal-700)" : "var(--wood-600)",
              color: "var(--cream-100)",
            }}
            aria-label={expanded ? "Close contact options" : "Contact us"}
            aria-expanded={expanded}
          >
            {expanded ? <X size={20} /> : <Phone size={20} />}
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
