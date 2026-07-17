"use client";

import {
  Sparkles,
  MessageCircle,
  CalendarCheck,
  Zap,
  TrendingUp,
} from "lucide-react";
import SideRays from "@/components/animation/Siderays";
import { useFadeIn } from "@/components/animation/useFadeIn";
import { HeroCTAButton } from "@/components/Home/CTAButtons";

const ACTIVITY_FEED = [
  { label: "Lead captured from landing page", time: "Just now", icon: TrendingUp },
  { label: "WhatsApp follow-up sent", time: "2m ago", icon: MessageCircle },
  { label: "Appointment booked", time: "6m ago", icon: CalendarCheck },
  { label: "Automation triggered", time: "11m ago", icon: Zap },
];

const CHART_BARS = [38, 55, 46, 68, 60, 82, 74, 94];

export default function Hero() {
  const { ref: headingRef, isVisible: headingVisible } = useFadeIn<HTMLDivElement>(0.1, "0px");
  const { ref: dashRef, isVisible: dashVisible } = useFadeIn<HTMLDivElement>(0.08, "0px");

  return (
    <section
      aria-label="Hero"
      className="relative overflow-hidden px-6 pt-16 pb-15 md:pt-20 md:pb-36"
      style={{
        background: "linear-gradient(160deg, #0F0E14 0%, #0F0E14 55%, #0F0E14 100%)",
      }}
    >
      <div className="absolute inset-0 bg-grid-luxury opacity-50" />

      <div className="absolute inset-0">
        <SideRays
          speed={2.5}
          rayColor1="#000000"
          rayColor2="#C06EF7"
          intensity={1.6}
          spread={2}
          origin="top-right"
          tilt={0}
          saturation={1.4}
          blend={0.65}
          falloff={1.8}
          opacity={0.8}
        />
      </div>

      {/* Ambient glows -- both now violet-family so nothing reads as a
            leftover blue/green accent against the new background. */}
      <div className="pointer-events-none absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-fuchsia-400/20 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full bg-violet-500/15 blur-[100px]" />
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative mx-auto max-w-7xl">
        <div
          ref={headingRef}
          className={`fade-in-section mx-auto max-w-3xl text-center${headingVisible ? " visible" : ""}`}
        >
          <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-amber-600/30 bg-amber-950/90 px-4 py-1 backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5 text-amber-300" />
            <span className="text-xs font-medium tracking-wide text-amber-400">
              <span className="font-bold">DONED-FOR-YOU</span> SALES FUNNEL SYSTEMS
            </span>
          </div>

          <h1 className="font-display text-3xl font-extrabold leading-[1.15] text-white sm:text-4xl md:text-6xl">
            Turn More Visitors Into{" "}
            <span className="text-gradient-luxury">Paying Customers</span>{" "}
            With A <span className="text-yellow-400">COMPLETE SYSTEM</span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-lg leading-normal text-white/100">
            Stop losing leads because of poor system and broken customer
            journeys. We build high-converting funnels that capture leads,
            automate follow-ups, and increase your sales — without increasing
            your ad spend.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <HeroCTAButton label="Book A Free Consultation" />
          </div>
        </div>

        <div
          ref={dashRef}
          className={`fade-in-section delay-2 relative mx-auto mt-20 max-w-4xl${dashVisible ? " visible" : ""}`}
          style={{ transitionDelay: dashVisible ? "200ms" : "0ms" }}
        >
          <span className="hover-lift absolute -left-3 top-8 z-20 hidden -rotate-6 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-display text-[10px] font-semibold tracking-wide text-white/60 backdrop-blur-sm sm:block lg:-left-10">
            CRM
          </span>
          <span className="hover-lift absolute -right-3 top-6 z-0 hidden rotate-6 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-display text-[10px] font-semibold tracking-wide text-white/60 backdrop-blur-sm sm:block lg:-right-12">
            AUTOMATION
          </span>
          <span className="hover-lift absolute -left-5 bottom-14 z-20 hidden -rotate-3 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-display text-[10px] font-semibold tracking-wide text-white/60 backdrop-blur-sm sm:block lg:-left-16">
            BOOKING
          </span>

          <div className="glass-panel overflow-hidden rounded-2xl border border-white/10">
            <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-5 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-300/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
              <span className="ml-4 rounded-md bg-white/5 px-3 py-1 text-xs text-white/40">
                app.yourfunnel.io/dashboard
              </span>
            </div>

            <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-[1.2fr_1fr] md:p-8">
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                <div className="mb-6 flex items-center justify-between">
                  <span className="font-display text-sm font-semibold text-white/80">
                    Funnel performance
                  </span>
                  <span className="flex items-center gap-1 rounded-full bg-emerald-400/10 px-2.5 py-1 text-[11px] font-medium text-emerald-400 ring-1 ring-emerald-400/20">
                    <TrendingUp className="h-3 w-3" />
                    +240%
                  </span>
                </div>
                <div className="flex h-32 items-end gap-2">
                  {CHART_BARS.map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-t-md bg-gradient-to-t from-violet-500 to-violet-300 transition-all duration-500 hover:from-violet-400 hover:to-violet-100 animate-bar-pulse"
                      style={{ height: `${h}%`, animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                <div className="mb-1 flex items-center gap-2">
                  <span className="font-display text-sm font-semibold text-white/80">
                    Live activity
                  </span>
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  </span>
                </div>
                <ul className="mt-3 divide-y divide-white/[10]">
                  {ACTIVITY_FEED.map(({ label, time, icon: Icon }, i) => (
                    <li
                      key={label}
                      className="flex items-center gap-2.5 py-2.5 first:pt-0 last:pb-0"
                    >
                      <span
                        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-white ${i === 0
                          ? "bg-gradient-to-br from-violet-400 to-violet-500"
                          : "bg-white/[0.06] text-white/100"
                          }`}
                      >
                        <Icon className="h-3 w-3" />
                      </span>
                      <span className="flex-1 truncate text-[13px] text-white/100">
                        {label}
                      </span>
                      <span className="shrink-0 text-[11px] text-white/100">
                        {time}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-white/10 bg-white/[0.03] px-6 py-4">
              <div className="flex items-center gap-2">
                {/* <div className="flex -space-x-2">
                  <span className="h-6 w-6 rounded-full border-2 border-[#2E1152] bg-violet-300" />
                  <span className="h-6 w-6 rounded-full border-2 border-[#2E1152] bg-violet-400" />
                  <span className="h-6 w-6 rounded-full border-2 border-[#2E1152] bg-violet-500" />
                </div> */}
                <span className="text-xs text-white/100">
                  Trusted by 200+ Coaches
                </span>
              </div>
            </div>
          </div>

          <div className="glass-panel float-slow absolute -left-4 -top-6 hidden w-32 px-3 py-2 sm:block lg:-left-12">
            <p className="text-[10px] text-white/60">Conversion rate</p>
            <p className="font-display text-base font-bold text-emerald-400">
              +240%
            </p>
          </div>

          <div className="glass-panel float-slower absolute -right-4 -bottom-6 hidden w-36 px-3 py-2 sm:block lg:-right-12">
            <p className="text-[10px] text-white/60">Leads captured</p>
            <p className="font-display text-base font-bold text-violet-200">
              1,842
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes bar-move {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-bar-pulse {
          animation: bar-move 1.4s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}