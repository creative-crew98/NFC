"use client";

import {
  Users,
  LayoutTemplate,
  ClipboardList,
  Database,
  MessageCircle,
  CalendarCheck,
  UserCheck,
  Repeat,
  ImageIcon,
  type LucideIcon,
} from "lucide-react";
import { useFadeIn } from "@/components/animation/useFadeIn";

type JourneyStep = {
  number: string;
  label: string;
  description: string;
  icon: LucideIcon;
  /**
   * Optional path to your own illustration, e.g. "/roadmap/visitor.svg"
   * or "/roadmap/visitor.png". Drop the file into /public/roadmap/ and
   * set this field — SVG and PNG both work. Leave undefined to fall
   * back to the icon placeholder below.
   */
  image?: string;
};

const JOURNEY_STEPS: JourneyStep[] = [
  {
    number: "01",
    label: "Visitor",
    description: "Discovers your brand through ads, search, or referrals.",
    icon: Users,
    image: "/images/Dog walking-rafiki.svg",
  },
  {
    number: "02",
    label: "Landing Page",
    description: "Lands on a page built to convert, not just inform.",
    icon: LayoutTemplate,
    image: "/images/Landing page-bro.svg",
  },
  {
    number: "03",
    label: "Lead Form",
    description: "Shares contact details in exchange for real value.",
    icon: ClipboardList,
    image: "/images/Subscriber-amico.svg",
  },
  {
    number: "04",
    label: "CRM",
    description: "The lead is organized and tracked automatically.",
    icon: Database,
    image: "/images/Server status-pana.svg",
  },
  {
    number: "05",
    label: "WhatsApp",
    description: "Instant automated follow-up starts the conversation.",
    icon: MessageCircle,
    image: "/images/Social life-rafiki.svg",
  },
  {
    number: "06",
    label: "Appointment",
    description: "A call or demo gets booked without back-and-forth.",
    icon: CalendarCheck,
    image: "/images/Calendar-rafiki.svg",
  },
  {
    number: "07",
    label: "Customer",
    description: "The deal closes and they become a paying customer.",
    icon: UserCheck,
    image: "/images/Business deal-amico.svg",
  },
  {
    number: "08",
    label: "Repeat Sale",
    description: "Automated nurture brings them back for more.",
    icon: Repeat,
    image: "/images/brand loyalty-pana.svg",
  },
];

// ---- Generates a smooth vertical S-curve path connecting each step marker ----
const ROW_HEIGHT = 175;
const LEFT_X = 16;
const RIGHT_X = 84;
const TOTAL_HEIGHT = JOURNEY_STEPS.length * ROW_HEIGHT;

function buildRoadPath(): string {
  const points = JOURNEY_STEPS.map((_, i) => ({
    x: i % 2 === 0 ? LEFT_X : RIGHT_X,
    y: i * ROW_HEIGHT + ROW_HEIGHT / 2,
  }));

  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    const midY = (prev.y + curr.y) / 2;
    d += ` C ${prev.x} ${midY}, ${curr.x} ${midY}, ${curr.x} ${curr.y}`;
  }
  return d;
}

export default function CustomerJourney() {
  const roadPath = buildRoadPath();
  const { ref: headingRef, isVisible: headingVisible } = useFadeIn<HTMLDivElement>();

  return (
    <section className="relative overflow-hidden px-6 pt-12 pb-24 md:pt-16 md:pb-28">
      <div className="mx-auto max-w-5xl">
        {/* Heading */}
        <div
          ref={headingRef}
          className={`fade-in-section text-center${headingVisible ? " visible" : ""}`}
        >
        <h2 className="font-display text-3xl font-extrabold leading-[1.15] text-center text-black sm:text-4xl md:text-5xl">
          The Customer Journey We Build For You
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-center text-lg text-black/60">
          Every visitor follows the same guided path — from first click to
          repeat customer.
        </p>
        </div>

        {/* ------------------ WINDING ROADMAP ------------------ */}
        <div
          className="relative mt-20 hidden md:block"
          style={{ height: `${TOTAL_HEIGHT}px` }}
        >
          {/* The road itself */}
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox={`0 0 100 ${TOTAL_HEIGHT}`}
            preserveAspectRatio="none"
            fill="none"
          >
            <path
              d={roadPath}
              stroke="url(#road-gradient)"
              strokeWidth={1.2}
              strokeDasharray="4 5"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
            <defs>
              <linearGradient
                id="road-gradient"
                x1="0"
                y1="0"
                x2="0"
                y2={TOTAL_HEIGHT}
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="#C06EF7" stopOpacity="0.1" />
                <stop offset="15%" stopColor="#960DF2" stopOpacity="0.8" />
                <stop offset="85%" stopColor="#960DF2" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#780AC2" stopOpacity="0.1" />
              </linearGradient>
            </defs>
          </svg>

          {/* Step rows, absolutely positioned to line up with the road's points */}
          {JOURNEY_STEPS.map((step, index) => {
            const isLeft = index % 2 === 0;
            const Icon = step.icon;
            const centerY = index * ROW_HEIGHT + ROW_HEIGHT / 2;

            return (
              <div
                key={step.label}
                className="reveal is-visible absolute left-0 right-0 flex items-center"
                style={{
                  top: `${centerY}px`,
                  transform: "translateY(-50%)",
                  transitionDelay: `${index * 80}ms`,
                }}
              >
                <div
                  className={`flex w-full items-center gap-6 ${isLeft ? "flex-row" : "flex-row-reverse"
                    }`}
                >
                  {/* Image / icon slot */}
                  <div className="flex w-[40%] justify-center">
                    {step.image ? (
                      <div className="hover-lift relative flex h-48 w-48 items-center justify-center rounded-full border border-violet-200/10 bg-black/[0.025] shadow-[0_0_70px_-28px_rgba(192,110,247,0.9)] lg:h-56 lg:w-56">
                        <div className="absolute inset-6 rounded-full bg-violet-400/10 blur-2xl" />
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={step.image}
                          alt={step.label}
                          className="relative h-40 w-40 object-contain drop-shadow-[0_22px_34px_rgba(0,0,0,0.35)] lg:h-48 lg:w-48"
                        />
                      </div>
                    ) : (
                      <div className="hover-lift flex h-40 w-40 flex-col items-center justify-center gap-1 rounded-full border border-dashed border-white/15 bg-black/[0.03] text-white/30">
                        <ImageIcon className="h-6 w-6" />
                        <span className="text-[9px] uppercase tracking-wide">
                          Add image
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Marker on the road */}
                  <div className="relative flex w-[20%] shrink-0 justify-center">
                    <div className="glass-panel flex h-16 w-16 items-center justify-center rounded-full border border-violet-400/30 text-violet-200 shadow-[0_0_28px_-4px_rgba(150,13,242,0.7)]">
                      <Icon className="h-6 w-6" />
                    </div>
                  </div>

                  {/* Text card */}
                  <div className={`w-[40%] ${isLeft ? "text-left" : "text-right"}`}>
                    <span className="font-display text-xs font-semibold text-violet-300">
                      {step.number}
                    </span>
                    <p className="mt-2 font-display text-2xl font-bold text-black">
                      {step.label}
                    </p>
                    <p className="mt-3 max-w-xs text-base leading-relaxed text-black/60">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ------------------ MOBILE FALLBACK: simple vertical list ------------------ */}
        <div className="relative mt-16 space-y-12 md:hidden">
          <div className="absolute bottom-0 left-7 top-0 w-px bg-gradient-to-b from-violet-400/10 via-violet-400/60 to-violet-400/10" />
          {JOURNEY_STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.label} className="reveal is-visible relative flex gap-5 pl-0">
                <div className="glass-panel z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-violet-400/30 text-violet-200">
                  <Icon className="h-6 w-6" />
                </div>
                <div className="min-w-0 flex-1 pt-1">
                  <span className="font-display text-xs font-semibold text-violet-300">
                    {step.number}
                  </span>
                  <p className="mt-1 font-display text-lg font-bold text-black">
                    {step.label}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-black/55">
                    {step.description}
                  </p>
                  {step.image ? (
                    <div className="mt-5 flex h-36 w-full items-center justify-center rounded-lg border border-violet-200/10 bg-white/[0.025] shadow-[0_0_55px_-30px_rgba(192,110,247,0.95)]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={step.image}
                        alt={step.label}
                        className="h-32 w-32 object-contain drop-shadow-[0_18px_26px_rgba(0,0,0,0.3)]"
                      />
                    </div>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
