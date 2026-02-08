"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { Heart } from "lucide-react";
import { useValentine } from "@/context/ValentineContext";
import CoverPage from "./CoverPage";
import ProposalPage from "./ProposalPage";
import DateSetupPage from "./DateSetupPage";
import ReceiptPage from "./ReceiptPage";

/* ── Decorative left page ─────────────────────────────────── */
function LeftPageContent() {
    return (
        <div className="h-full w-full flex flex-col items-center justify-center bg-gradient-to-br from-[#FFF8F0] to-[#FFE4EC] relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.04]" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 10 C20 6, 26 0, 30 6 C34 12, 20 24, 20 24 C20 24, 6 12, 10 6 C14 0, 20 6, 20 10Z' fill='%23E8547C'/%3E%3C/svg%3E")`,
                backgroundSize: '40px 40px',
            }} />
            <div className="relative z-10 flex flex-col items-center gap-4 opacity-40">
                <Heart className="w-10 h-10 md:w-14 md:h-14 text-rose fill-rose-light/50" strokeWidth={1} />
                <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-rose/30 to-transparent" />
                <p className="font-[family-name:var(--font-great-vibes)] text-rose/60 text-lg md:text-xl">xoxo</p>
            </div>
            <Heart className="absolute top-4 left-4 w-3 h-3 text-rose/10 fill-rose/10" />
            <Heart className="absolute top-4 right-4 w-3 h-3 text-rose/10 fill-rose/10" />
            <Heart className="absolute bottom-4 left-4 w-3 h-3 text-rose/10 fill-rose/10" />
            <Heart className="absolute bottom-4 right-4 w-3 h-3 text-rose/10 fill-rose/10" />
        </div>
    );
}

/* ── Back cover ───────────────────────────────────────────── */
function BackCoverContent() {
    return (
        <div className="h-full w-full flex flex-col items-center justify-center">
            <Heart className="w-8 h-8 text-gold/60 fill-gold/30 mb-2" strokeWidth={1.5} />
            <p className="font-[family-name:var(--font-great-vibes)] text-gold/70 text-xl">The End</p>
            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent mt-2" />
        </div>
    );
}

/* ── forwardRef page wrappers (required by react-pageflip) ── */
const PageFrontCover = React.forwardRef<HTMLDivElement>((_, ref) => (
    <div ref={ref} className="page-wrapper book-cover" data-density="hard">
        <CoverPage />
    </div>
));
PageFrontCover.displayName = "PageFrontCover";

const PageLeft = React.forwardRef<HTMLDivElement>((_, ref) => (
    <div ref={ref} className="page-wrapper page-paper">
        <LeftPageContent />
    </div>
));
PageLeft.displayName = "PageLeft";

const PageProposal = React.forwardRef<HTMLDivElement>((_, ref) => (
    <div ref={ref} className="page-wrapper page-paper">
        <div className="page-inner">
            <ProposalPage />
        </div>
    </div>
));
PageProposal.displayName = "PageProposal";

const PageDateSetup = React.forwardRef<HTMLDivElement>((_, ref) => (
    <div ref={ref} className="page-wrapper page-paper">
        <div className="page-inner">
            <DateSetupPage />
        </div>
    </div>
));
PageDateSetup.displayName = "PageDateSetup";

const PageReceipt = React.forwardRef<HTMLDivElement>((_, ref) => (
    <div ref={ref} className="page-wrapper page-paper">
        <div className="page-inner">
            <ReceiptPage />
        </div>
    </div>
));
PageReceipt.displayName = "PageReceipt";

const PageBackCover = React.forwardRef<HTMLDivElement>((_, ref) => (
    <div ref={ref} className="page-wrapper book-cover" data-density="hard">
        <BackCoverContent />
    </div>
));
PageBackCover.displayName = "PageBackCover";

function StaticCover() {
    return (
        <div className="wood-background min-h-screen flex items-center justify-center p-4 md:p-8">
            <div
                className="book-cover rounded-lg w-full max-w-[340px] border-[3px] border-[#5a1020]/40 shadow-[0_10px_30px_rgba(0,0,0,0.35)]"
                style={{ height: "min(75vh, 520px)" }}
            >
                <CoverPage />
            </div>
        </div>
    );
}

/* ── Main Book component ──────────────────────────────────── */
export default function Book() {
    const { currentPage } = useValentine();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const bookRef = useRef<any>(null);
    const prevPage = useRef(0);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [FlipBook, setFlipBook] = useState<React.ComponentType<any> | null>(null);

    useEffect(() => {
        import("react-pageflip").then((mod) => {
            setFlipBook(() => mod.default);
        });
    }, []);

    /* Flip to the correct page when context changes */
    useEffect(() => {
        if (!bookRef.current || currentPage === prevPage.current) return;
        const flipBook = bookRef.current.pageFlip();

        // Pages: Cover(0) Left(1) Proposal(2) Left(3) DateSetup(4) Left(5) Receipt(6) BackCover(7)
        const targetPage = currentPage * 2;
        try {
            flipBook.flip(targetPage);
        } catch {
            flipBook.turnToPage(targetPage);
        }
        prevPage.current = currentPage;
    }, [currentPage]);

    const handleFlip = useCallback(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (e: any) => {
            const landedPage = e.data as number;            // Only skip decorative pages in portrait (single-page) mode.
            // In landscape, the spread already shows [left, content] together.
            const orientation = bookRef.current?.pageFlip()?.getOrientation();
            if (orientation !== "portrait") return;

            if (landedPage === 1 || landedPage === 3 || landedPage === 5) {
                bookRef.current?.pageFlip().turnToPage(landedPage + 1);
            }
        },
        []
    );

    if (!FlipBook) return <StaticCover />;

    return (
        <div className="wood-background min-h-screen flex items-center justify-center p-4 md:p-8">
            <div className="relative w-full max-w-[380px] md:max-w-[720px] mx-auto">
                {/* Shadow */}
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-[85%] h-6 bg-black/20 rounded-[50%] blur-lg z-0" />

                <FlipBook
                    ref={bookRef}
                    width={340}
                    height={480}
                    size="stretch"
                    minWidth={280}
                    maxWidth={350}
                    minHeight={400}
                    maxHeight={520}
                    showCover={true}
                    usePortrait={true}
                    flippingTime={800}
                    drawShadow={true}
                    maxShadowOpacity={0.5}
                    useMouseEvents={false}
                    clickEventForward={true}
                    mobileScrollSupport={true}
                    startZIndex={10}
                    className="flipbook-container"
                    onFlip={handleFlip}
                >
                    <PageFrontCover key="cover" />
                    <PageLeft key="left1" />
                    <PageProposal key="proposal" />
                    <PageLeft key="left2" />
                    <PageDateSetup key="datesetup" />
                    <PageLeft key="left3" />
                    <PageReceipt key="receipt" />
                    <PageBackCover key="back" />
                </FlipBook>
            </div>
        </div>
    );
}
