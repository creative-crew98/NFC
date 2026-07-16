"use client";

import { XCircle, CheckCircle2 } from "lucide-react";
import dynamic from "next/dynamic";
import { useFadeIn } from "@/components/animation/useFadeIn";

const DotLottieReact = dynamic(
  () => import("@lottiefiles/dotlottie-react").then((mod) => mod.DotLottieReact),
  { ssr: false }
);

const WITHOUT_NCF = [
  "Leads Lost",
  "No Follow-up",
  "Manual Work",
  "Confused Customers",
  "Low ROI",
];

const WITH_NCF = [
  "Automated Funnel",
  "Instant Follow-up",
  "CRM Organized",
  "More Appointments",
  "Higher Revenue",
];

export default function BeforeAfterSection() {
  const { ref: headingRef, isVisible: headingVisible } = useFadeIn<HTMLDivElement>();
  const { ref: cardsRef, isVisible: cardsVisible } = useFadeIn<HTMLDivElement>(0.05);

  return (
    <section className="relative isolate overflow-hidden bg-white  px-6 py-20 pb-5 md:py-28">
      {/* Decorative animation stays outside the card container and behind content. */}
      {/* Decorative animation stays outside the card container and behind content. */}
      {/* Decorative animation stays outside the card container and behind content. */}
      {/* Decorative animation stays outside the card container and behind content. */}
      {/* Decorative animation stays outside the card container and behind content. */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 z-20 h-[350px] w-[350px] -translate-x-1/2 translate-y-0 opacity-100 sm:bottom-20 sm:h-[1300px] sm:w-[1300px] sm:translate-y-1/4 sm:opacity-100">
        <DotLottieReact
          src="https://lottie.host/585572a5-6e07-4185-866d-8fbcef82daf4/i1XHazyI6F.lottie"
          loop
          autoplay
          className="h-full w-full"
          renderConfig={{
            devicePixelRatio: typeof window !== "undefined" ? window.devicePixelRatio : 1,
            autoResize: true,
          }}
        /></div>

      <div className="relative z-10 mx-auto max-w-4xl">
        {/* Heading */}
        <div
          ref={headingRef}
          className={`fade-in-section${headingVisible ? " visible" : ""}`}
        >
        <h2 className="text-center font-display text-3xl font-extrabold leading-[1.15] text-black sm:text-4xl md:text-5xl">
          Before <span className="text-slate-400">vs</span>{" "}
          <span className="bg-gradient-to-r from-violet-600 to-violet-500 bg-clip-text text-transparent">
            After
          </span>
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-center text-lg leading-relaxed text-slate-600">
          This is the difference a structured funnel makes to your business.
        </p>
        </div>

        {/* Outer container — both cards now live inside one unified,
            elevated container instead of floating separately */}
        <div
          ref={cardsRef}
          className={`fade-in-section delay-1 relative mt-10 mb-16 md:mb-24 rounded-[2rem] border border-slate-200 bg-slate-50/60 p-3 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.15)] sm:p-6${cardsVisible ? " visible" : ""}`}
          style={{ transitionDelay: cardsVisible ? "100ms" : "0ms" }}
        >
          <div className="relative grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
            {/* Center VS badge, desktop only */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 z-20 hidden -translate-x-1/2 -translate-y-1/2 md:block">
              <span className="flex h-16 w-16 items-center justify-center rounded-full border border-slate-200 bg-white font-display text-sm font-bold text-slate-500 shadow-[0_8px_30px_-8px_rgba(0,0,0,0.2)]">
                VS
              </span>
            </div>

            {/* Without NCF */}
            {/* Without NCF */}
            <div className="relative rounded-[1.5rem] border border-rose-200 bg-rose-50 p-8">
              <p className="font-display text-size-50px font-bold uppercase tracking-wide text-rose-600 ">
                Without NCF
              </p>
              <ul className="mt-6 flex flex-col gap-1">
                {WITHOUT_NCF.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <XCircle className="h-6 w-6 shrink-0 text-rose-500" />
                    <span className="text-lg font-semibold text-slate-700">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* With NCF */}
            <div className="relative overflow-hidden rounded-[1.5rem] border border-emerald-300 bg-emerald-50 p-8 shadow-[0_20px_50px_-20px_rgba(16,185,129,0.35)]">
              <p className="font-display text-size-50px font-bold uppercase tracking-wide text-emerald-700">
                With NCF
              </p>
              <ul className="mt-6 flex flex-col gap-4">
                {WITH_NCF.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />
                    <span className="text-base font-bold text-[#1a0b2e]">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}