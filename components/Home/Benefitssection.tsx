"use client";

import {
  TrendingUp,
  Workflow,
  Cpu,
  Target,
  BarChart3,
  Smile,
  Rocket,
  type LucideIcon,
} from "lucide-react";
import { useFadeIn } from "@/components/animation/useFadeIn";

type Benefit = {
  title: string;
  icon: LucideIcon;
};

const BENEFITS: Benefit[] = [
  { title: "Increase Qualified Leads", icon: TrendingUp },
  { title: "Automate Sales Process", icon: Workflow },
  { title: "Reduce Manual Work", icon: Cpu },
  { title: "Improve Conversion Rate", icon: Target },
  { title: "Track Everything", icon: BarChart3 },
  { title: "Better Customer Experience", icon: Smile },
  { title: "Scale With Confidence", icon: Rocket },
];

// Points for the growth-graph illustration's SVG path (simple upward curve)
const GRAPH_POINTS = "0,150 40,130 80,140 120,95 160,105 200,60 240,70 280,20";

export default function BenefitsSection() {
  const { ref: headingRef, isVisible: headingVisible } = useFadeIn<HTMLHeadingElement>();
  const { ref: gridRef, isVisible: gridVisible } = useFadeIn<HTMLDivElement>(0.05);
  const { ref: growthRef, isVisible: growthVisible } = useFadeIn<HTMLDivElement>();

  return (
    <section className="relative overflow-hidden bg-[#0b0714] px-6 py-15 md:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(150,13,242,0.14),_transparent_60%)]" />

      <div className="relative mx-auto max-w-7xl">
        {/* Heading */}
        <h2
          ref={headingRef}
          className={`fade-in-section font-display text-3xl font-extrabold leading-[1.15] text-white sm:text-4xl md:text-5xl text-center${headingVisible ? " visible" : ""}`}
        >
          Why Businesses Choose{" "}
          <span className="text-gradient-luxury">NCF Funnel</span>
        </h2>

        {/* Bento grid */}
        <div className="mt-16 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {/* Left: benefit card mosaic */}
          <div
            ref={gridRef}
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:col-span-2"
          >
            {BENEFITS.map(({ title, icon: Icon }, index) => (
              <div
                key={title}
                className={`fade-in-section hover-lift flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors duration-300 hover:border-violet-400/30 hover:bg-white/[0.06]${gridVisible ? " visible" : ""}`}
                style={{ transitionDelay: gridVisible ? `${index * 60}ms` : "0ms" }}
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-400 to-violet-500 text-white shadow-[0_0_16px_-4px_rgba(150,13,242,0.6)]">
                  <Icon className="h-5 w-5" />
                </span>
                <p className="font-display text-base font-semibold text-white">
                  {title}
                </p>
              </div>
            ))}
          </div>

          {/* Right: growth graph illustration card */}
          <div
            ref={growthRef}
            className={`fade-in-section delay-3 reveal relative flex flex-col justify-between overflow-hidden rounded-2xl border border-violet-400/20 bg-gradient-to-b from-[#1a0b2e] to-[#0b0714] p-7${growthVisible ? " visible" : ""}`}
          >
            {/* Ambient glow behind the graph */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/20 blur-[80px]" />

            <div className="relative">
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-white/100
              ">
                Growth Overview
              </span>
              <p className="mt-4 font-display text-4xl font-extrabold text-white">
                +240%
              </p>
              <p className="mt-1 text-sm text-white/55">
                Average lead growth within 90 days
              </p>
            </div>

            {/* Graph */}
            <div className="relative mt-8">
              <svg
                viewBox="0 0 280 160"
                className="h-40 w-full"
                fill="none"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="graphFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#C06EF7" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#C06EF7" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="graphLine" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#780AC2" />
                    <stop offset="100%" stopColor="#EACFFC" />
                  </linearGradient>
                </defs>
                <polygon
                  points={`${GRAPH_POINTS} 280,160 0,160`}
                  fill="url(#graphFill)"
                />
                <polyline
                  points={GRAPH_POINTS}
                  stroke="url(#graphLine)"
                  strokeWidth={2.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx={280} cy={20} r={4.5} fill="#EACFFC" />
              </svg>
            </div>

            <p className="relative mt-6 text-center text-xs text-white/100">
              Consistent growth across every stage of the funnel
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}