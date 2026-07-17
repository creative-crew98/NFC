"use client";

import { useEffect, useRef, useState } from "react";
import {
  Search,
  Target,
  PenTool,
  Zap,
  FlaskConical,
  Rocket,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { SolutionCTAButton } from "@/components/Home/CTAButtons";

type Step = {
  label: string;
  description: string;
  icon: LucideIcon;
};

const STEPS: Step[] = [
  {
    label: "Business Discovery",
    description: "We dig into your business, offer, and customers to find where the funnel is leaking.",
    icon: Search,
  },
  {
    label: "Funnel Strategy",
    description: "We map the exact path visitors should take, from first click to paying customer.",
    icon: Target,
  },
  {
    label: "Design",
    description: "Your landing pages and touchpoints are designed to build trust and drive action.",
    icon: PenTool,
  },
  {
    label: "Automation",
    description: "CRM, WhatsApp, and follow-ups are wired together so no lead falls through the cracks.",
    icon: Zap,
  },
  {
    label: "Testing",
    description: "Every step is checked end-to-end before it ever reaches a real visitor.",
    icon: FlaskConical,
  },
  {
    label: "Launch",
    description: "Your funnel goes live, capturing and converting traffic around the clock.",
    icon: Rocket,
  },
  {
    label: "Optimization",
    description: "We track performance and continuously refine the funnel to increase conversions.",
    icon: TrendingUp,
  },
];

/**
 * Fades + slides an element in the first time it scrolls into view.
 * Returns a ref to attach and a boolean for whether it's visible yet.
 */
function useRevealOnScroll<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // only animate in once
        }
      },
      { threshold: 0.25, rootMargin: "0px 0px -10% 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}

function TimelineStep({ step, index }: { step: Step; index: number }) {
  const Icon = step.icon;
  const isLeft = index % 2 === 0;
  const { ref, isVisible } = useRevealOnScroll<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`relative flex items-start gap-6 transition-all duration-700 ease-out sm:items-center sm:gap-0 ${isVisible
          ? "translate-y-0 opacity-100"
          : "translate-y-8 opacity-0"
        }`}
      style={{ transitionDelay: isVisible ? `${index * 90}ms` : "0ms" }}
    >
      {/* Left half (desktop only) */}
      <div className="hidden sm:flex sm:w-1/2 sm:justify-end sm:pr-10">
        {isLeft && (
          <div className="max-w-sm text-right">
            <p className="font-display text-lg font-semibold text-white">
              {step.label}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-white/60">
              {step.description}
            </p>
          </div>
        )}
      </div>

      {/* Center node */}
      <div
        className={`relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-violet-300/40 bg-luxury-bg shadow-[0_0_20px_-4px_rgba(216,180,254,0.7)] transition-transform duration-700 sm:mx-6 ${isVisible ? "scale-100" : "scale-50"
          }`}
        style={{ transitionDelay: isVisible ? `${index * 90 + 150}ms` : "0ms" }}
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-violet-400 to-violet-500 text-white animate-pulse-glow">
          <Icon className="h-4 w-4" strokeWidth={2} />
        </span>
        {/* Step number badge */}
        <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full border border-violet-200/30 bg-[#170528] text-[10px] font-bold text-violet-200">
          {index + 1}
        </span>
      </div>

      {/* Right half (desktop only) */}
      <div className="hidden sm:flex sm:w-1/2 sm:justify-start sm:pl-10">
        {!isLeft && (
          <div className="max-w-sm text-left">
            <p className="font-display text-lg font-semibold text-white">
              {step.label}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-white/60">
              {step.description}
            </p>
          </div>
        )}
      </div>

      {/* Mobile content */}
      <div className="flex-1 sm:hidden">
        <p className="font-display text-lg font-semibold text-white">
          {step.label}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-white/60">
          {step.description}
        </p>
      </div>
    </div>
  );
}

export default function HowWeWorkSection() {
  const { ref: headingRef, isVisible: headingVisible } =
    useRevealOnScroll<HTMLDivElement>();
  const { ref: ctaRef, isVisible: ctaVisible } =
    useRevealOnScroll<HTMLDivElement>();

  return (
    <section className="section-dark relative overflow-hidden px-6 py-24 md:py-28">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(168,85,247,0.15),_transparent_60%)]" />

      <div className="relative mx-auto max-w-4xl">
        {/* Heading */}
        <div
          ref={headingRef}
          className={`mx-auto max-w-2xl text-center transition-all duration-700 ease-out ${headingVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
        >
          <span className="mb-4 inline-block rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-white/70 backdrop-blur-sm">
            Our Process
          </span>
          <h2 className="text-3xl font-extrabold leading-tight text-white sm:text-4xl md:text-5xl">
            How We <span className="text-gradient-luxury">Work</span>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-white/60">
            A clear, proven process from first conversation to a funnel that
            keeps converting.
          </p>
        </div>

        {/* Vertical timeline */}
        <div className="relative mt-20">
          {/* Static glow line */}
          <div className="absolute left-6 top-0 h-full w-px bg-gradient-to-b from-violet-300/70 via-violet-400/40 to-transparent sm:left-1/2 sm:-translate-x-1/2" />
          <div className="absolute left-6 top-0 h-full w-px bg-gradient-to-b from-white/40 via-white/10 to-transparent blur-[1px] sm:left-1/2 sm:-translate-x-1/2" />

          {/* Traveling light — loops continuously down the full line, regardless of height */}
          <div className="beam-track absolute left-6 top-0 h-full w-px overflow-hidden sm:left-1/2 sm:-translate-x-1/2">
            <div className="beam-glow absolute left-0 w-full bg-gradient-to-b from-transparent via-white to-transparent" />
          </div>

          <div className="flex flex-col gap-12">
            {STEPS.map((step, index) => (
              <TimelineStep key={step.label} step={step} index={index} />
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div
          ref={ctaRef}
          className={`mt-20 flex justify-center transition-all duration-700 ease-out ${ctaVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
        >
          <SolutionCTAButton />
        </div>
      </div>

      <style jsx>{`
        .beam-glow {
          height: 40%;
          top: -40%;
          animation: travel-down 4s linear infinite;
        }
        @keyframes travel-down {
          0% {
            top: -40%;
            opacity: 0;
          }
          15% {
            opacity: 0.9;
          }
          85% {
            opacity: 0.9;
          }
          100% {
            top: 100%;
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
}