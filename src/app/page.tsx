"use client";

import { ValentineProvider } from "@/context/ValentineContext";
import Book from "@/components/Book";

export default function Home() {
  return (
    <ValentineProvider>
      <Book />
    </ValentineProvider>
  );
}
