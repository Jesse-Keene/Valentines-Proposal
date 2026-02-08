"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface DateSelections {
  food: string;
  drinks: string;
  movie: string;
}

interface ValentineContextType {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  accepted: boolean;
  setAccepted: (val: boolean) => void;
  selections: DateSelections;
  setSelections: React.Dispatch<React.SetStateAction<DateSelections>>;
  isFlipping: boolean;
  setIsFlipping: (val: boolean) => void;
}

const ValentineContext = createContext<ValentineContextType | undefined>(
  undefined
);

export function ValentineProvider({ children }: { children: ReactNode }) {
  const [currentPage, setCurrentPage] = useState(0); // 0=cover, 1=proposal, 2=dateSetup, 3=receipt
  const [accepted, setAccepted] = useState(false);
  const [selections, setSelections] = useState<DateSelections>({
    food: "",
    drinks: "",
    movie: "",
  });
  const [isFlipping, setIsFlipping] = useState(false);

  return (
    <ValentineContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        accepted,
        setAccepted,
        selections,
        setSelections,
        isFlipping,
        setIsFlipping,
      }}
    >
      {children}
    </ValentineContext.Provider>
  );
}

export function useValentine() {
  const context = useContext(ValentineContext);
  if (!context) {
    throw new Error("useValentine must be used within a ValentineProvider");
  }
  return context;
}
