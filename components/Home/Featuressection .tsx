"use client";

import {
  Sparkles,
  LayoutTemplate,
  ClipboardList,
  Database,
  Mail,
  CalendarCheck,
  LifeBuoy,
  type LucideIcon,
} from "lucide-react";
import { useFadeIn } from "@/components/animation/useFadeIn";

type Feature = {
  title: string;
  description: string;
  icon: LucideIcon;
  preview: React.ReactNode;
};

/**
 * Each preview is a tiny illustrative mockup of the feature in action,
 * drawn in the same dark / violet palette as the rest of the page.
 * Swap any of these for a real product screenshot later — just replace
 * the <Preview... /> node with an <img src="..." /> of the same size.
 */

function PreviewFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative h-28 w-full overflow-hidden rounded-xl border border-white/10 bg-[#100a1c]">
      {children}
    </div>
  );
}

function PreviewLandingPage() {
  return (
    <PreviewFrame>
      <div className="flex items-center gap-1.5 border-b border-white/10 bg-white/[0.03] px-2.5 py-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
        <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
        <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
      </div>
      <div className="flex h-full flex-col items-center justify-center gap-1.5 px-4 pb-3 pt-2">
        <div className="h-1.5 w-16 rounded-full bg-white/25" />
        <div className="h-1.5 w-10 rounded-full bg-white/15" />
        <div className="mt-1.5 h-4 w-14 rounded-md bg-gradient-to-r from-violet-400 to-violet-500" />
      </div>
    </PreviewFrame>
  );
}

function PreviewLeadForm() {
  return (
    <PreviewFrame>
      <div className="flex h-full flex-col justify-center gap-2 px-4">
        {["w-full", "w-full", "w-2/3"].map((w, i) => (
          <div key={i} className={`h-2.5 ${w} rounded-md border border-white/10 bg-white/[0.04]`} />
        ))}
        <div className="mt-0.5 h-4 w-16 rounded-md bg-gradient-to-r from-violet-400 to-violet-500" />
      </div>
    </PreviewFrame>
  );
}

function PreviewCRM() {
  return (
    <PreviewFrame>
      <div className="flex h-full flex-col justify-center gap-1.5 px-4">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.03] px-2 py-1"
          >
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-violet-400" />
            <span className="h-1.5 flex-1 rounded-full bg-white/15" />
            <span className="h-1.5 w-3 rounded-full bg-white/10" />
          </div>
        ))}
      </div>
    </PreviewFrame>
  );
}

function PreviewWhatsApp() {
  return (
    <PreviewFrame>
      <div className="flex h-full flex-col justify-center gap-1.5 px-4">
        <div className="max-w-[70%] rounded-lg rounded-bl-sm bg-white/[0.06] px-2.5 py-1.5">
          <div className="h-1.5 w-14 rounded-full bg-white/25" />
        </div>
        <div className="ml-auto max-w-[70%] rounded-lg rounded-br-sm bg-gradient-to-r from-violet-400/90 to-violet-500/90 px-2.5 py-1.5">
          <div className="h-1.5 w-10 rounded-full bg-white/70" />
        </div>
      </div>
    </PreviewFrame>
  );
}

function PreviewEmail() {
  return (
    <PreviewFrame>
      <div className="flex h-full flex-col justify-center gap-1.5 px-4">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded bg-violet-400/20">
              <Mail className="h-2 w-2 text-violet-300" />
            </span>
            <span className={`h-1.5 rounded-full bg-white/15 ${i === 1 ? "w-16" : "w-20"}`} />
          </div>
        ))}
      </div>
    </PreviewFrame>
  );
}

function PreviewCalendar() {
  const filled = new Set([2, 5, 9, 12, 15]);
  return (
    <PreviewFrame>
      <div className="grid h-full grid-cols-7 place-items-center gap-1 px-4 py-3">
        {Array.from({ length: 21 }).map((_, i) => (
          <span
            key={i}
            className={`h-2 w-2 rounded-[2px] ${filled.has(i) ? "bg-gradient-to-br from-violet-400 to-violet-500" : "bg-white/10"
              }`}
          />
        ))}
      </div>
    </PreviewFrame>
  );
}

function PreviewAnalytics() {
  const bars = [40, 65, 30, 80, 55, 90];
  return (
    <PreviewFrame>
      <div className="flex h-full items-end justify-center gap-2 px-5 pb-3 pt-4">
        {bars.map((h, i) => (
          <div
            key={i}
            style={{ height: `${h}%` }}
            className="w-2.5 rounded-t-sm bg-gradient-to-t from-violet-500 to-violet-300"
          />
        ))}
      </div>
    </PreviewFrame>
  );
}

function PreviewSupport() {
  return (
    <PreviewFrame>
      <div className="flex h-full flex-col items-center justify-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-violet-400 to-violet-500 shadow-[0_0_20px_-4px_rgba(150,13,242,0.6)]">
          <LifeBuoy className="h-4 w-4 text-white" />
        </span>
        <div className="h-1.5 w-16 rounded-full bg-white/15" />
      </div>
    </PreviewFrame>
  );
}

const FEATURES: Feature[] = [
  {
    title: "High-Converting Landing Pages",
    description:
      "A page designed to turn visitors into leads, not just look pretty. Built for speed, clarity, and conversions.",
    icon: LayoutTemplate,
    preview: <PreviewLandingPage />,
  },
  {
    title: "Advanced Learning mangment System",
    description:
      "A powerful LMS designed to deliver seamless learning experiences with course management, progress tracking, assessments, and student engagement tools.",
    icon: ClipboardList,
    preview: <PreviewLeadForm />,
  },
  {
    title: "Copy Writing & Scripting",
    description:
      "Persuasive copy and high-converting scripts crafted to capture attention, build trust, and turn viewers into customers.",
    icon: Database,
    preview: <PreviewCRM />,
  },
  {
    title: "Advanced Learning Management System",
    description:
      "A powerful LMS designed to deliver seamless learning experiences with course management, progress tracking, assessments, and student engagement tools.",
    icon: ClipboardList,
    preview: <PreviewWhatsApp />,
  },
  {
    title: "High Converting Creatives",
    description:
      "Scroll-stopping visuals and compelling creatives designed to capture attention, increase engagement, and drive more conversions.",
    icon: Mail,
    preview: <PreviewEmail />,
  },
  {
    title: "Email Automation & Technical Support",
    description:
      "Automate email campaigns, follow-ups, and customer journeys while our technical team ensures everything runs smoothly.",
    icon: CalendarCheck,
    preview: <PreviewCalendar />,
  },
];

export default function FeaturesSection() {
  const { ref: headingRef, isVisible: headingVisible } = useFadeIn<HTMLDivElement>();
  const { ref: gridRef, isVisible: gridVisible } = useFadeIn<HTMLDivElement>(0.05);

  return (
    <section className="relative overflow-hidden bg-[#0b0714] px-6 py-24 md:py-28">
      {/* Violet ambient background, matching the tone used elsewhere on the page */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(150,13,242,0.16),_transparent_60%)]" />
      <div className="pointer-events-none absolute -bottom-32 left-1/2 h-96 w-[36rem] -translate-x-1/2 rounded-full bg-violet-500/10 blur-[120px]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Eyebrow + heading */}
        <div
          ref={headingRef}
          className={`fade-in-section mx-auto max-w-3xl text-center${headingVisible ? " visible" : ""}`}
        >
          <div className={`fade-in-section delay-0 mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-sm${headingVisible ? " visible" : ""}`}>
            <Sparkles className="h-3.5 w-3.5 text-violet-300" />
            <span className="text-xs font-medium tracking-wide text-white/70">
              What&apos;s included
            </span>
          </div>

          <h2 className="font-display text-3xl font-extrabold leading-[1.15] text-white sm:text-4xl md:text-5xl ">
            Everything You Need To{" "}
            <span className="text-gradient-luxury">Generate More Leads</span>
          </h2>
          <p className={`fade-in-section delay-2 mx-auto mt-5 max-w-xl text-lg leading-relaxed text-white/60${headingVisible ? " visible" : ""}`}>
            One system, fully built and connected — no piecing together tools
            or hiring five different freelancers.
          </p>
        </div>

        {/* Card grid */}
        <div
          ref={gridRef}
          className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {FEATURES.map(({ title, description, preview }, index) => (
            <div
              key={title}
              className={`fade-in-section group relative flex flex-col items-start gap-5 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all duration-500 hover:-translate-y-1 hover:border-violet-400/30 hover:bg-white/[0.05] hover:shadow-[0_0_40px_-12px_rgba(150,13,242,0.5)]${gridVisible ? " visible" : ""}`}
              style={{ transitionDelay: gridVisible ? `${index * 80}ms` : "0ms" }}
            >
              {/* Corner glow accent, appears on hover */}
              <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-violet-400/0 blur-2xl transition-colors duration-500 group-hover:bg-violet-400/20" />

              {/* Example / preview mockup */}
              <div className="relative w-full transition-transform duration-500 group-hover:scale-[1.02]">
                {preview}
              </div>

              <div className="relative">
                <p className="font-display text-lg font-bold text-white">
                  {title}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-white/55">
                  {description}
                </p>
              </div>

              {/* Bottom hairline that lights up on hover */}
              <div className="absolute bottom-0 left-5 right-5 h-px bg-gradient-to-r from-transparent via-violet-400/0 to-transparent transition-colors duration-500 group-hover:via-violet-400/60" />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
      `}</style>
    </section>
  );
}