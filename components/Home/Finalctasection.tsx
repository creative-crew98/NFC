"use client";

import Aurora from "@/components/animation/Aurora";
import { useFadeIn } from "@/components/animation/useFadeIn";
import { FinalCTAButton } from "@/components/Home/CTAButtons";

export default function FinalCTASection() {
  const { ref: contentRef, isVisible: contentVisible } = useFadeIn<HTMLDivElement>(0.1, "0px");

  return (
    <section className="section-dark relative isolate overflow-hidden px-6 py-32 md:py-40">
      {/* Aurora WebGL background, tinted to match the site's violet palette */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <Aurora
          colorStops={["#5a0891", "#960df2", "#c06ef7"]}
          blend={0.6}
          amplitude={1.2}
          speed={1}
        />
      </div>

      {/* Extra ambient glow so it still reads well even where the aurora is faint */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_rgba(150,13,242,0.18),_transparent_65%)]" />

      <div
        ref={contentRef}
        className={`fade-in-section relative z-10 mx-auto max-w-3xl text-center${contentVisible ? " visible" : ""}`}
      >
        <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white/90 backdrop-blur-sm">
          Ready to start?
        </p>

        <h2 className="mt-6 text-4xl font-extrabold leading-[1.1] text-white sm:text-5xl md:text-6xl">
          Ready To Build A{" "}
          <span className="text-gradient-luxury">Funnel That Actually Converts?</span>
        </h2>

        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/70">
          Let&apos;s create a sales system that generates leads, nurtures
          prospects, and helps your business grow consistently.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <FinalCTAButton variant="primary" label="Book A Free Consultation" />
          <FinalCTAButton variant="secondary" label="Schedule Demo" />
        </div>
      </div>
    </section>
  );
}