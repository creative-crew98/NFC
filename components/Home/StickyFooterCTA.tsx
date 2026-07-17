"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { HeroCTAButton } from "@/components/Home/CTAButtons";

const SHOW_THRESHOLD_RATIO = 0.8;

type StickyFooterCTAProps = {
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
  /** CSS selector for an element (e.g. your page <Footer />) that should
   * cause the bar to hide once it scrolls into view, so it doesn't cover
   * footer content. Defaults to "footer". */
  hideWhenSelectorVisible?: string;
};

export default function StickyFooterCTA({
  title = "Ready to stop losing leads?",
  subtitle = "Book a free consultation and see the funnel in action.",
  ctaLabel = "Book A Free Consultation",
  hideWhenSelectorVisible = "footer",
}: StickyFooterCTAProps) {
  const [hasScrolledPast, setHasScrolledPast] = useState(false);
  const [footerInView, setFooterInView] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const tickingRef = useRef(false);

  // Scroll-position visibility (rAF-throttled to avoid layout thrash)
  useEffect(() => {
    function evaluateScroll() {
      setHasScrolledPast(window.scrollY > window.innerHeight * SHOW_THRESHOLD_RATIO);
      tickingRef.current = false;
    }
    function handleScroll() {
      if (tickingRef.current) return;
      tickingRef.current = true;
      requestAnimationFrame(evaluateScroll);
    }
    evaluateScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Hide once the real page footer is visible, so the bar never overlaps it
  useEffect(() => {
    const target = document.querySelector(hideWhenSelectorVisible);
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => setFooterInView(entry.isIntersecting),
      { rootMargin: "0px 0px -10% 0px" }
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, [hideWhenSelectorVisible]);

  const isVisible = hasScrolledPast && !footerInView;

  if (isDismissed) return null;

  return (
    <div
      role="complementary"
      aria-label="Sticky call to action"
      aria-hidden={!isVisible}
      className={`fixed inset-x-0 bottom-0 z-50 transition-all duration-500 ease-out motion-reduce:transition-none ${isVisible
        ? "translate-y-0 opacity-100"
        : "pointer-events-none translate-y-full opacity-0"
        }`}
    >
      <div className="border-t border-white/10 bg-[#0b0714]/90 shadow-[0_-8px_30px_-12px_rgba(0,0,0,0.5)] backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-2 px-3 py-2.5 sm:gap-4 sm:px-6 sm:py-3">
          <div className="min-w-0">
            <p className="truncate text-xs font-semibold text-white sm:text-base">
              {title}
            </p>
            <p className="hidden truncate text-xs text-white/50 sm:block">
              {subtitle}
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-1 sm:gap-2">
            <div className="origin-right scale-[0.72] sm:scale-100">
              <HeroCTAButton label={ctaLabel} />
            </div>
            <button
              type="button"
              onClick={() => setIsDismissed(true)}
              aria-label="Dismiss this banner"
              tabIndex={isVisible ? 0 : -1}
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-white/40 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-400 sm:h-8 sm:w-8"
            >
              <X className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}