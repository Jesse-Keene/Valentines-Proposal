"use client";

import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Heart } from "lucide-react";
import { useValentine } from "@/context/ValentineContext";

export default function CoverPage() {
  const { setCurrentPage } = useValentine();

  const handleOpen = () => {
    setCurrentPage(1);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full px-6 py-6 text-center relative">
      {/* Decorative corner flourishes */}
      <div className="absolute top-4 left-4 md:top-6 md:left-6 text-gold/60 text-xl md:text-2xl">❧</div>
      <div className="absolute top-4 right-4 md:top-6 md:right-6 text-gold/60 text-xl md:text-2xl rotate-y-180">❧</div>
      <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 text-gold/60 text-xl md:text-2xl rotate-180">❧</div>
      <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 text-gold/60 text-xl md:text-2xl rotate-x-180">❧</div>

      {/* Heart decoration */}
      <motion.div
        initial={{ scale: 0, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
        className="mb-3 md:mb-4"
      >
        <Heart
          className="w-10 h-10 md:w-14 md:h-14 text-gold fill-gold/30"
          strokeWidth={1.5}
        />
      </motion.div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="font-[family-name:var(--font-great-vibes)] text-4xl md:text-6xl lg:text-7xl text-gold mb-2 md:mb-3 leading-tight"
      >
        My Dearest...
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="font-[family-name:var(--font-playfair)] text-gold-light/80 text-sm md:text-base italic tracking-wider"
      >
        A Question for You
      </motion.p>

      {/* Decorative divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="w-24 md:w-40 h-[1px] bg-gradient-to-r from-transparent via-gold/50 to-transparent my-5 md:my-6"
      />

      {/* Open Book Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        whileHover={{ scale: 1.08, y: -3 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleOpen}
        className="group flex items-center gap-3 px-7 md:px-10 py-3 md:py-4 bg-gold/20 hover:bg-gold/30 
                   border-2 border-gold/40 hover:border-gold/60 rounded-full text-gold 
                   font-[family-name:var(--font-playfair)] text-sm md:text-lg tracking-wider
                   transition-all duration-300 cursor-pointer backdrop-blur-sm"
      >
        <BookOpen className="w-5 h-5 md:w-6 md:h-6 group-hover:rotate-12 transition-transform" />
        <span className="mx-5 md:mx-7 sm:mx-9 "> Open the Book </span>
      </motion.button>

      {/* Year */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 md:bottom-10 text-gold/40 font-[family-name:var(--font-playfair)] text-[10px] tracking-[0.3em]"
      >
        FEBRUARY 2026
      </motion.p>
    </div>
  );
}
