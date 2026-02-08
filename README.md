# Valentine's Book 💕

An interactive Valentine's Day web application that mimics a physical book with realistic page-turning effects. Built as a creative way to ask someone to be your Valentine and plan a date together.

## Features

- **Realistic book experience** — powered by [react-pageflip](https://github.com/Nodlik/react-pageflip) with 3D page-flip animations and shadows
- **Cover page** — elegant book cover with decorative flourishes that opens like a real book
- **Proposal page** — "Will You Be My Valentine?" with a Yes button (triggers confetti) and a No button that dodges your cursor
- **Date setup page** — pick dinner, drinks, and a movie from emoji-based selection cards
- **Receipt page** — a styled receipt summarizing the date plan with a barcode and signature

## Tech Stack

- **Next.js 16** (App Router, TypeScript)
- **Tailwind CSS v4**
- **Framer Motion** — entrance animations, button effects
- **react-pageflip** — realistic book page-turn physics
- **Lucide React** — icons
- **canvas-confetti** — celebration effect on "Yes"
- **Google Fonts** — Playfair Display + Great Vibes

## Getting Started

```bash
# Install dependencies
npm install

# Run the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/
│   ├── layout.tsx        # Root layout with fonts
│   ├── page.tsx          # Main page
│   └── globals.css       # Theme, textures, custom styles
├── components/
│   ├── Book.tsx           # Book container with react-pageflip
│   ├── CoverPage.tsx      # Front cover
│   ├── ProposalPage.tsx   # Valentine proposal with Yes/No
│   ├── DateSetupPage.tsx  # Food/Drinks/Movie selection
│   └── ReceiptPage.tsx    # Date summary receipt
└── context/
    └── ValentineContext.tsx  # Shared state (page, selections)
```

## Deploy

Deploy on [Vercel](https://vercel.com/new) — works out of the box with Next.js.
