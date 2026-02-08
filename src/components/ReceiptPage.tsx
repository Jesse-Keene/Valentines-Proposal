"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heart, CalendarHeart, MapPin, Clock } from "lucide-react";
import { useValentine } from "@/context/ValentineContext";

const foodEmojis: Record<string, string> = {
    Fries: "🍟",
    Jollibee: "🐝",
    Mcdo: "🍔",
    Dessert: "🍰",
};

const drinkEmojis: Record<string, string> = {
    Soju: "🍾",
    Coco: "🧋",
    Softdrinks: "🥤",
    Coffee: "☕",
};

const movieEmojis: Record<string, string> = {
    PJO: "🔱",
    Bridgerton: "🏰",
    "Pride Prejudice": "💕",
    "Your Choice": "🌸",
};

function Barcode() {
  const widths = [3, 1, 2, 1, 3, 2, 1, 1, 3, 1, 2, 3, 1, 1, 2, 1, 3, 2, 1, 3, 1, 2, 1, 1, 3, 2, 1, 3, 1, 2];
  const heights = widths.map(() => 18 + Math.random() * 10);

  return (
    <div className="barcode" style={{ height: "28px" }}>
      {widths.map((w, i) => (
        <span
          key={i}
          style={{
            width: `${w}px`,
            height: `${heights[i]}px`,
            opacity: 0.7 + Math.random() * 0.3,
          }}
        />
      ))}
    </div>
  );
}

export default function ReceiptPage() {
  const { selections } = useValentine();

  return (
    <div className="flex flex-col items-center justify-center h-full px-2 md:px-4 py-3 md:py-4">
      {/* Tape top */}
      <motion.div
        initial={{ opacity: 0, rotate: -5 }}
        animate={{ opacity: 1, rotate: -2 }}
        transition={{ delay: 0.2 }}
        className="tape w-20 md:w-24 h-4 rounded-sm mb-1.5 z-10"
      />

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="receipt w-full max-w-[260px] md:max-w-[290px] px-4 md:px-5 py-4 md:py-5 rounded shadow-md"
      >
        {/* Header */}
        <div className="text-center mb-3">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5, type: "spring" }}>
            <Heart className="w-6 h-6 mx-auto text-rose fill-rose mb-1" />
          </motion.div>
          <h2 className="font-[family-name:var(--font-great-vibes)] text-2xl md:text-3xl text-burgundy">
            It&apos;s a Date!
          </h2>
          <div className="w-full h-[1px] bg-gray-300 mt-2 mb-0.5" />
          <div className="w-full h-[1px] bg-gray-300" />
        </div>

        {/* Date & Time */}
        <div className="space-y-1.5 mb-3 text-[10px] md:text-xs text-gray-600">
          <div className="flex items-center gap-1.5">
            <CalendarHeart className="w-3 h-3 text-rose flex-shrink-0" />
            <span className="font-semibold">Date:</span>
            <span>February 14, 2026</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3 h-3 text-rose flex-shrink-0" />
            <span className="font-semibold">Time:</span>
            <span>7:00 PM</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3 h-3 text-rose flex-shrink-0" />
            <span className="font-semibold">Where:</span>
            <span>On the Screen 🎥</span>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-dashed border-gray-300 my-2" />

        {/* Line Items */}
        <div className="space-y-1.5 mb-3">
          <p className="text-[8px] md:text-[9px] text-gray-400 uppercase tracking-widest font-bold mb-1">
            Order Details
          </p>
          <motion.div initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}
            className="flex justify-between items-center text-[10px] md:text-xs">
            <span className="text-gray-600">🍽️ Dinner</span>
            <span className="font-semibold text-gray-800">{foodEmojis[selections.food]} {selections.food}</span>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 }}
            className="flex justify-between items-center text-[10px] md:text-xs">
            <span className="text-gray-600">🥂 Drinks</span>
            <span className="font-semibold text-gray-800">{drinkEmojis[selections.drinks]} {selections.drinks}</span>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 }}
            className="flex justify-between items-center text-[10px] md:text-xs">
            <span className="text-gray-600">🎬 Movie</span>
            <span className="font-semibold text-gray-800">{movieEmojis[selections.movie]} {selections.movie}</span>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-dashed border-gray-300 my-2" />

        {/* Total */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
          className="flex justify-between items-center text-xs md:text-sm mb-3">
          <span className="font-bold text-gray-800">TOTAL</span>
          <span className="font-bold text-rose">∞ Love</span>
        </motion.div>

        {/* Barcode */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="mt-2">
          <Barcode />
          <p className="text-center text-[7px] md:text-[8px] text-gray-400 mt-1 tracking-widest">
            VAL-2026-0214-LOVE
          </p>
        </motion.div>

        {/* Divider */}
        <div className="border-t border-dashed border-gray-300 my-2" />

        {/* Signature */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }}
          className="text-center">
          <p className="font-[family-name:var(--font-great-vibes)] text-lg md:text-xl text-burgundy">
            With all my love,
          </p>
          <p className="font-[family-name:var(--font-great-vibes)] text-xl md:text-2xl text-rose mt-0.5">
            Your Valentine
          </p>
          <p className="text-sm mt-1">💕</p>
        </motion.div>
      </motion.div>

      {/* Tape bottom */}
      <motion.div
        initial={{ opacity: 0, rotate: 5 }}
        animate={{ opacity: 1, rotate: 3 }}
        transition={{ delay: 0.4 }}
        className="tape w-16 md:w-20 h-4 rounded-sm mt-1.5 z-10"
      />
    </div>
  );
}
