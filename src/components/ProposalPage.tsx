"use client";

import React, { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Heart, HeartCrack } from "lucide-react";
import { useValentine } from "@/context/ValentineContext";
import confetti from "canvas-confetti";

const REJECTION_MESSAGES = [
  "Are you sure? 🥺",
  "Think again... 💔",
  "Really?! 😢",
  "My heart is breaking... 💔",
  "Please reconsider! 🥹",
  "I'll cry... 😭",
  "You don't mean that! 😤",
  "Try again, babe 💕",
  "Wrong answer! 😜",
  "Nope, not allowed 🚫",
  "Nice try 😏",
  "Still no? Impossible! 💘",
];

export default function ProposalPage() {
  const { setCurrentPage, setAccepted } = useValentine();
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [noMoved, setNoMoved] = useState(false);
  const [noClickCount, setNoClickCount] = useState(0);
  const [showHearts, setShowHearts] = useState(false);
  const [noHovered, setNoHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const moveNoButton = useCallback(() => {
    if (!containerRef.current) return;
    const container = containerRef.current.getBoundingClientRect();
    // Button is ~80px wide, ~100px tall with label. Keep well within bounds.
    const btnW = 80;
    const btnH = 100;
    const margin = 12;

    // Max offset from center of the button area
    const maxX = (container.width / 2) - btnW - margin;
    const maxY = (container.height / 2) - btnH - margin;

    const clampedMaxX = Math.max(maxX, 20);
    const clampedMaxY = Math.max(maxY, 20);

    const newX = (Math.random() * 2 - 1) * clampedMaxX;
    const newY = (Math.random() * 2 - 1) * clampedMaxY;

    setNoPosition({ x: newX, y: newY });
    setNoMoved(true);
  }, []);

  const handleYes = () => {
    setAccepted(true);
    setShowHearts(true);

    const duration = 2000;
    const end = Date.now() + duration;
    const colors = ["#E8547C", "#FFB6C1", "#FF69B4", "#FF1493", "#C73E67"];

    (function frame() {
      confetti({ particleCount: 3, angle: 60, spread: 55, origin: { x: 0, y: 0.7 }, colors });
      confetti({ particleCount: 3, angle: 120, spread: 55, origin: { x: 1, y: 0.7 }, colors });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();

    confetti({ particleCount: 40, spread: 100, origin: { x: 0.5, y: 0.5 }, colors, shapes: ["circle"], scalar: 1.5 });

    setTimeout(() => {
      setCurrentPage(2);
    }, 1800);
  };

  const handleNoClick = () => {
    setNoClickCount((c) => c + 1);
    moveNoButton();
  };

  const rejectionMsg = noClickCount > 0
    ? REJECTION_MESSAGES[(noClickCount - 1) % REJECTION_MESSAGES.length]
    : null;

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col items-center justify-center h-full px-3 md:px-6 py-4 overflow-hidden"
    >
      {/* Floating hearts */}
      {showHearts &&
        Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-rose/30 pointer-events-none"
            initial={{ x: Math.random() * 200 - 100, y: 200, scale: Math.random() * 0.5 + 0.5, rotate: Math.random() * 360 }}
            animate={{ y: -300, rotate: Math.random() * 720, opacity: [0, 1, 1, 0] }}
            transition={{ duration: 2 + Math.random() * 2, delay: Math.random() * 0.5, ease: "easeOut" }}
          >
            <Heart className="w-5 h-5 fill-rose-light" />
          </motion.div>
        ))}

      {/* Decorative top */}
      <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="text-rose/20 mb-1">
        <span className="text-xl md:text-2xl">✦</span>
      </motion.div>

      {/* Main question — smaller text to fit half-page */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }}
        className="font-[family-name:var(--font-great-vibes)] text-2xl md:text-3xl text-burgundy text-center leading-tight"
      >
        Will You Be
      </motion.h2>
      <motion.h2
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.8 }}
        className="font-[family-name:var(--font-great-vibes)] text-2xl md:text-3xl text-burgundy text-center leading-tight"
      >
        My Valentine,
      </motion.h2>
      <motion.h2
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.8 }}
        className="font-[family-name:var(--font-great-vibes)] text-3xl md:text-4xl text-rose text-center mb-2 md:mb-3"
      >
        Babe?
      </motion.h2>

      {/* Decorative line */}
      <motion.div
        initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.9, duration: 0.5 }}
        className="w-16 md:w-24 h-[1px] bg-gradient-to-r from-transparent via-rose/40 to-transparent mb-2"
      />

      {/* Rejection message */}
      <div className="h-5 mb-2">
        {rejectionMsg && (
          <motion.p
            key={noClickCount}
            initial={{ opacity: 0, y: 8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="text-rose font-[family-name:var(--font-playfair)] text-xs md:text-sm font-semibold"
          >
            {rejectionMsg}
          </motion.p>
        )}
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-6 md:gap-10 relative">
        {/* YES */}
        <motion.button
          initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.1, type: "spring", stiffness: 200 }}
          whileHover={{ scale: 1.12 }} whileTap={{ scale: 0.9 }}
          onClick={handleYes}
          className="group relative flex flex-col items-center gap-1.5 cursor-pointer"
        >
          <motion.div
            className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-rose to-rose-dark rounded-full flex items-center justify-center shadow-lg pulse-glow"
            whileHover={{ boxShadow: "0 0 25px rgba(232,84,124,0.8), 0 0 50px rgba(232,84,124,0.4)" }}
          >
            <Heart className="w-7 h-7 md:w-8 md:h-8 text-white fill-white" />
          </motion.div>
          <span className="font-[family-name:var(--font-playfair)] text-rose-dark font-semibold text-sm md:text-base tracking-wide">Yes!</span>
        </motion.button>

        {/* NO — bounded */}
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1, x: noPosition.x, y: noPosition.y }}
          transition={
            noMoved
              ? { x: { type: "spring", stiffness: 500, damping: 25 }, y: { type: "spring", stiffness: 500, damping: 25 } }
              : { delay: 1.3, type: "spring", stiffness: 200 }
          }
          onClick={handleNoClick}
          onMouseEnter={() => setNoHovered(true)}
          onMouseLeave={() => setNoHovered(false)}
          onTouchStart={handleNoClick}
          className="group relative flex flex-col items-center gap-1.5 cursor-pointer z-10"
        >
          <motion.div
            className={`w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 
              ${noHovered ? "bg-gray-300" : "bg-gradient-to-br from-gray-200 to-gray-300"}`}
            whileHover={{ scale: 0.95 }}
          >
            {noHovered ? (
              <HeartCrack className="w-7 h-7 md:w-8 md:h-8 text-gray-500" />
            ) : (
              <Heart className="w-7 h-7 md:w-8 md:h-8 text-gray-400 fill-gray-400" />
            )}
          </motion.div>
          <span className={`font-[family-name:var(--font-playfair)] font-semibold text-sm md:text-base tracking-wide transition-colors ${noHovered ? "text-gray-400" : "text-gray-500"}`}>
            {noHovered ? "😢" : "No"}
          </span>
        </motion.button>
      </div>

      {/* Footer */}
      <motion.p
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }}
        className="absolute bottom-3 md:bottom-4 text-[9px] md:text-[10px] text-gray-400 italic font-[family-name:var(--font-playfair)]"
      >
        Choose wisely... there is only one right answer 💕
      </motion.p>
    </div>
  );
}
