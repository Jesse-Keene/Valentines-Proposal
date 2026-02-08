"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  UtensilsCrossed,
  Wine,
  Film,
  Sparkles,
  Check,
} from "lucide-react";
import { useValentine } from "@/context/ValentineContext";

interface OptionItem {
  id: string;
  label: string;
  emoji: string;
}

const foodOptions: OptionItem[] = [
  { id: "Fries", label: "Fries", emoji: "🍟" },
  { id: "Jollibee", label: "Jollibee", emoji: "🐝" },
  { id: "Mcdo", label: "Mcdo", emoji: "🍔" },
  { id: "Dessert", label: "Dessert or Pastries", emoji: "🍰" },
];

const drinkOptions: OptionItem[] = [
  { id: "Soju", label: "Soju", emoji: "🍾" },
  { id: "Coco", label: "Coco", emoji: "🧋" },
  { id: "Softdrinks", label: "Softdrinks", emoji: "🥤" },
  { id: "Coffee", label: "Coffee", emoji: "☕" },
];

const movieOptions: OptionItem[] = [
  { id: "PJO", label: "Percy Jackson Series", emoji: "🔱" },
  { id: "Bridgerton", label: "Bridgerton", emoji: "🏰" },
  { id: "Pride and Prejudice", label: "Pride and Prejudice", emoji: "💕" },
  { id: "Your Choice", label: "Your Choice", emoji: "🌸" },
];

function SelectionCategory({
  title,
  icon,
  options,
  selected,
  onSelect,
  delay,
}: {
  title: string;
  icon: React.ReactNode;
  options: OptionItem[];
  selected: string;
  onSelect: (id: string) => void;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="mb-3"
    >
      {/* Category label */}
      <div className="flex items-center gap-1.5 mb-2">
        <span className="text-rose">{icon}</span>
        <h3 className="font-[family-name:var(--font-playfair)] text-burgundy font-bold text-sm md:text-base tracking-wide">
          {title}
        </h3>
      </div>

      {/* Circle icon buttons with label below */}
      <div className="grid grid-cols-4 gap-2 md:gap-3">
        {options.map((option) => {
          const isSelected = selected === option.id;
          return (
            <motion.button
              key={option.id}
              whileTap={{ scale: 0.94 }}
              onClick={() => onSelect(option.id)}
              className="relative flex flex-col items-center gap-1 cursor-pointer"
            >
              {/* Circle icon */}
              <div
                className={`relative w-11 h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center border-2 transition-all duration-200
                  ${isSelected
                    ? "border-rose bg-blush shadow-sm shadow-rose/20"
                    : "border-cream-dark bg-white hover:border-rose-light"
                  }`}
              >
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-4 h-4 bg-rose rounded-full flex items-center justify-center z-10"
                  >
                    <Check className="w-2.5 h-2.5 text-white" />
                  </motion.div>
                )}
                <span className="text-base md:text-lg">{option.emoji}</span>
              </div>

              {/* Label below */}
              <span
                className={`font-[family-name:var(--font-playfair)] text-[10px] md:text-xs leading-tight
                  ${isSelected ? "text-rose-dark font-bold" : "text-gray-600"}`}
              >
                {option.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}

export default function DateSetupPage() {
  const { selections, setSelections, setCurrentPage, setIsFlipping } =
    useValentine();

  const allSelected = selections.food && selections.drinks && selections.movie;

  const handleSeal = () => {
    if (!allSelected) return;
    setIsFlipping(true);
    setTimeout(() => {
      setCurrentPage(3);
      setIsFlipping(false);
    }, 100);
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto custom-scroll">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-2 md:mb-3"
      >
        <h2 className="font-[family-name:var(--font-great-vibes)] text-2xl md:text-3xl text-burgundy mb-0.5">
          Plan Our Date
        </h2>
        <p className="font-[family-name:var(--font-playfair)] text-gray-500 text-[10px] md:text-xs italic">
          Pick one from each category to build our perfect evening
        </p>
        <div className="w-16 md:w-24 h-[1px] bg-gradient-to-r from-transparent via-rose/30 to-transparent mx-auto mt-1.5" />
      </motion.div>

      {/* Selection Categories */}
      <div className="flex-1 flex flex-col justify-center ml-6 pl- gap-4">
        <SelectionCategory
          title="Dinner"
          icon={<UtensilsCrossed className="w-3.5 h-3.5" />}
          options={foodOptions}
          selected={selections.food}
          onSelect={(id) => setSelections((prev) => ({ ...prev, food: id }))}
          delay={0.2}
        />

        <SelectionCategory
          title="Drinks"
          icon={<Wine className="w-3.5 h-3.5" />}
          options={drinkOptions}
          selected={selections.drinks}
          onSelect={(id) => setSelections((prev) => ({ ...prev, drinks: id }))}
          delay={0.35}
        />

        <SelectionCategory
          title="Movie"
          icon={<Film className="w-3.5 h-3.5" />}
          options={movieOptions}
          selected={selections.movie}
          onSelect={(id) => setSelections((prev) => ({ ...prev, movie: id }))}
          delay={0.5}
        />
      </div>

      {/* Seal the Deal Button — ~1.5rem below choices */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65 }}
        className="flex justify-center pb-1 mb-4"
      >
        <motion.button
          whileHover={allSelected ? { scale: 1.05 } : {}}
          whileTap={allSelected ? { scale: 0.95 } : {}}
          onClick={handleSeal}
          disabled={!allSelected}
          className={`flex items-center gap-1.5 px-5 md:px-7 py-2 md:py-2.5 rounded-full font-[family-name:var(--font-playfair)] 
            text-xs md:text-sm tracking-wider transition-all duration-300 cursor-pointer
            ${
              allSelected
                ? "bg-gradient-to-r from-rose to-rose-dark text-white shadow-lg hover:shadow-xl hover:shadow-rose/30"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
        >
          <Sparkles className="w-3 h-3" />
          <span>Seal the Deal</span>
          <Sparkles className="w-3 h-3" />
        </motion.button>
      </motion.div>
        <div className="bg-transparent h-[30px] w-full"></div>
    </div>
  );
}
