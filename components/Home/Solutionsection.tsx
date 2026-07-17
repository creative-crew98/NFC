"use client";

import { useEffect, useRef, useState } from "react";
import { SolutionCTAButton } from "@/components/Home/CTAButtons";
import {
  Target,
  ShieldCheck,
  Repeat,
  CalendarCheck,
  TrendingUp,
  DollarSign,
  type LucideIcon,
} from "lucide-react";

type Benefit = {
  label: string;
  detail: string;
  icon: LucideIcon;
};

const BENEFITS: Benefit[] = [
  {
    label: "Capture Qualified Leads",
    detail: "Forms & chat that only pass on real buyers",
    icon: Target,
  },
  {
    label: "Build Customer Trust",
    detail: "Reviews, proof, and fast replies on autopilot",
    icon: ShieldCheck,
  },
  {
    label: "Automate Appointment Bookings & Course Selling",
    detail: "No lead goes cold waiting on a reply",
    icon: Repeat,
  },
  {
    label: "Convert More Customers",
    detail: "Nudges that turn interest into a decision",
    icon: TrendingUp,
  },
  {
    label: "Increase Revenue",
    detail: "More booked calls, more closed deals",
    icon: DollarSign,
  },
  {
    label: "Everything Is On The Track",
    detail: "Track your leads and conversions in one place",
    icon: CalendarCheck,
  },
];

function FunnelConnector({ delayMs = 0 }: { delayMs?: number }) {
  return (
    <div
      aria-hidden="true"
      className="relative flex h-8 w-px items-stretch justify-center"
    >
      <div className="h-full w-px bg-gradient-to-b from-white/30 to-purple-400/50" />
      <span
        className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-fuchsia-300 shadow-[0_0_6px_1px_rgba(232,121,249,0.7)] motion-reduce:hidden"
        style={{
          animation: "funnel-flow 1.8s ease-in infinite",
          animationDelay: `${delayMs}ms`,
        }}
      />
      <style jsx>{`
        @keyframes funnel-flow {
          0% {
            top: 0%;
            opacity: 0;
          }
          15% {
            opacity: 1;
          }
          85% {
            opacity: 1;
          }
          100% {
            top: 100%;
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}

function FunnelStage({
  label,
  width,
  tone = "neutral",
  visible,
  delayMs = 0,
}: {
  label: string;
  width: string;
  tone?: "neutral" | "accent" | "solid";
  visible: boolean;
  delayMs?: number;
}) {
  const toneClasses =
    tone === "solid"
      ? "border-fuchsia-400/30 bg-fuchsia-500/15 text-white"
      : tone === "accent"
        ? "border-purple-400/20 bg-purple-500/10 text-purple-200"
        : "border-white/10 bg-white/5 text-white/80";

  return (
    <span
      style={{ width, transitionDelay: visible ? `${delayMs}ms` : "0ms" }}
      className={`rounded-full border px-5 py-2 sm:px-4 sm:py-1.5 text-center text-sm sm:text-xs font-semibold uppercase tracking-wide backdrop-blur-sm transition-all duration-500 ease-out motion-reduce:transition-none ${toneClasses} ${visible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
        }`}
    >
      {label}
    </span>
  );
}
function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

type Point = { x: number; y: number };

// Converts a sequence of points into a smooth cubic-bezier path using a
// Catmull-Rom spline. This keeps the line passing through every point
// (so it still visits each card) but replaces the sharp elbows of
// straight `L` segments with a continuous, gently-curving line.
//
// `bounds`, if given, clamps the bezier CONTROL points (not just the
// anchor points) to a horizontal range. Without this, a control point's
// position is derived from neighboring anchors and can overshoot well
// past every anchor's own clamp -- which is what caused the curve to
// balloon out past the card grid and get abruptly flat-cut by the
// container's overflow-hidden edge.
function smoothPath(
  points: Point[],
  tension = 0.9,
  bounds?: { minX: number; maxX: number }
): string {
  const clamp = (x: number) =>
    bounds ? Math.min(Math.max(x, bounds.minX), bounds.maxX) : x;

  if (points.length < 2) return "";
  if (points.length === 2) {
    return `M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)} L ${points[1].x.toFixed(1)} ${points[1].y.toFixed(1)}`;
  }

  const d: string[] = [`M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`];

  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;

    const cp1x = clamp(p1.x + ((p2.x - p0.x) / 6) * tension);
    const cp1y = p1.y + ((p2.y - p0.y) / 6) * tension;
    const cp2x = clamp(p2.x - ((p3.x - p1.x) / 6) * tension);
    const cp2y = p2.y - ((p3.y - p1.y) / 6) * tension;

    d.push(
      `C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`
    );
  }

  return d.join(" ");
}

// Gutter kept between the line and the edge of the measurement container,
// and how far outside a card's own edge the line should ride.
const CONTAINER_MARGIN = 34;
const CARD_OFFSET = 24;

// Measures the Visitors badge, each of the 6 benefit cards, and the Leads
// badge, then builds a single smooth SVG path connecting them in order --
// starting exactly at Visitors, ending exactly at Leads, nothing before
// or after.
//
// Rather than passing straight through each card's center (which cuts the
// line across card content, since a 2-column grid alternates left/right),
// the path is anchored to a point just outside each card's OUTER edge --
// left cards get a point to their left, right cards get a point to their
// right. That keeps the line traveling in the visible gutter around the
// grid, and it's clamped to stay inside the container so it never bows
// out past the rounded frame.
function useFunnelPath(
  visible: boolean,
  containerRef: React.RefObject<HTMLDivElement | null>,
  visitorRef: React.RefObject<HTMLDivElement | null>,
  leadsRef: React.RefObject<HTMLDivElement | null>,
  cardRefs: React.MutableRefObject<(HTMLLIElement | null)[]>
) {
  const [pathD, setPathD] = useState("");
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    function measure() {
      const container = containerRef.current;
      if (!container) return;
      const containerRect = container.getBoundingClientRect();
      setSize({ width: containerRect.width, height: containerRect.height });

      const clampX = (x: number) =>
        Math.min(Math.max(x, CONTAINER_MARGIN), containerRect.width - CONTAINER_MARGIN);

      const points: Point[] = [];

      const addCenterPoint = (el: HTMLElement | null) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        points.push({
          x: clampX(r.left + r.width / 2 - containerRect.left),
          y: r.top + r.height / 2 - containerRect.top,
        });
      };

      // Single-column layout (mobile, < sm breakpoint): every card is full
      // width, so there's no "outer edge" to hug -- fall back to centers.
      const isSingleColumn =
        cardRefs.current.length >= 2 &&
        cardRefs.current[0] &&
        cardRefs.current[1] &&
        Math.abs(
          cardRefs.current[0]!.getBoundingClientRect().left -
          cardRefs.current[1]!.getBoundingClientRect().left
        ) < 1;

      const addCardPoint = (el: HTMLLIElement | null, index: number) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const y = r.top + r.height / 2 - containerRect.top;
        if (isSingleColumn) {
          // Full-width mobile cards have no "outer edge" pair like the
          // 2-column grid does -- a point at the card's horizontal center
          // used to put the line directly UNDER the opaque card (z-0 line,
          // z-10 card), making it fully invisible on mobile. Instead, hug
          // the card's own left edge, offset outward into the visible
          // gutter, so the line runs alongside the cards instead of hidden
          // beneath them.
          const x = r.left - containerRect.left - CARD_OFFSET;
          points.push({ x: clampX(x), y });
          return;
        }
        const isLeftColumn = index % 2 === 0;
        const x = isLeftColumn
          ? r.left - containerRect.left - CARD_OFFSET
          : r.right - containerRect.left + CARD_OFFSET;
        points.push({ x: clampX(x), y });
      };
      // First point is Visitors, last point is Leads -- the path starts
      // and ends exactly there, nothing extends before or after.
      addCenterPoint(visitorRef.current);
      cardRefs.current.forEach((el, i) => addCardPoint(el, i));
      addCenterPoint(leadsRef.current);

      if (points.length < 2) return;
      setPathD(
        smoothPath(points, 2, {
          minX: CONTAINER_MARGIN,
          maxX: containerRect.width - CONTAINER_MARGIN,
        })
      );
    }

    // Delay the first measurement until the entrance animations (staggered
    // up to ~900ms delay + 500ms duration) have settled, so we don't
    // capture the path mid-transition.
    const settleTimer = setTimeout(measure, 1500);
    window.addEventListener("resize", measure);
    return () => {
      clearTimeout(settleTimer);
      window.removeEventListener("resize", measure);
    };
  }, [visible, containerRef, visitorRef, leadsRef, cardRefs]);

  return { pathD, size };
}

export default function SolutionSection() {
  const { ref: funnelRef, visible } = useInView<HTMLDivElement>();
  const contentRef = useRef<HTMLDivElement>(null);
  const visitorRef = useRef<HTMLDivElement>(null);
  const leadsRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLLIElement | null)[]>([]);

  const { pathD, size } = useFunnelPath(
    visible,
    contentRef,
    visitorRef,
    leadsRef,
    cardRefs
  );

  return (
    <section className="relative overflow-hidden bg-[#0b0714] px-3 pt-15 pb-24 sm:px-6 md:pt-14 md:pb-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(168,85,247,0.12),_transparent_60%)]" />

      <div className="relative z-10 mx-auto max-w-5xl">
        <div
          className={`fade-in-section mx-auto max-w-3xl text-center${visible ? " visible" : ""}`}
        >
          <h2 className="text-3xl font-extrabold leading-tight text-white sm:text-4xl md:text-5xl">
            Introducing the{" "}
            <span className="bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
              NCF Funnel System (Done For You)
            </span>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-white/60">
            A complete automated sales system that converts visitors into
            paying customers.
          </p>
        </div>

        <div
          className={`fade-in-section delay-2 relative mt-10 w-full rounded-3xl bg-gradient-to-br from-purple-400/40 via-fuchsia-400/20 to-purple-500/40 p-px shadow-[0_0_60px_-15px_rgba(192,132,252,0.35)]${visible ? " visible" : ""}`}
          style={{ transitionDelay: visible ? "200ms" : "0ms" }}
        >
          <div
            ref={funnelRef}
            className="relative w-full overflow-hidden rounded-3xl bg-[#0b0714]/95 backdrop-blur-sm"
          >
            {/* contentRef is the measurement frame -- every point on the
                path is computed relative to this container's own box. */}
            <div
              ref={contentRef}
              className="relative flex flex-col items-center gap-6 px-6 py-14 sm:px-12"
            >
              {/* The traveling line rides the gutter just outside each
                  card's outer edge (see useFunnelPath), starts exactly at
                  the Visitors badge and ends exactly at the Leads badge --
                  no extension past either end. It sits at z-0, BEHIND all
                  the cards (z-10), so it runs in the background of every
                  card -- including "Capture qualified leads" and the rest
                  of the grid -- rather than floating on top of them. A
                  soft blurred underlay gives the curve a glow, a dashed
                  stroke animates via stroke-dashoffset for a marching-ants
                  feel, and a comet-style dot (bright core + soft trailing
                  glow) rides the same smooth path with SVG's
                  animateMotion. */}
              {pathD && (
                <svg
                  className="pointer-events-none absolute left-0 top-0 z-0 overflow-visible"
                  width={size.width}
                  height={size.height}
                  aria-hidden="true"
                >
                  <defs>
                    <linearGradient id="funnel-line-gradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#c084fc" stopOpacity="0.85" />
                      <stop offset="100%" stopColor="#e879f9" stopOpacity="0.85" />
                    </linearGradient>
                    <radialGradient id="funnel-dot-glow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#f5d0fe" stopOpacity="0.95" />
                      <stop offset="100%" stopColor="#f5d0fe" stopOpacity="0" />
                    </radialGradient>
                  </defs>

                  {/* soft glow underlay, traces the curve faintly */}
                  <path
                    d={pathD}
                    fill="none"
                    stroke="#d8b4fe"
                    strokeOpacity="0.25"
                    strokeWidth="7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="motion-reduce:hidden"
                  />

                  <path
                    d={pathD}
                    fill="none"
                    stroke="url(#funnel-line-gradient)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray="7 7"
                    className="motion-reduce:hidden funnel-dash"
                  />

                  {/* comet glow trailing the bright core dot -- starts at
                      Visitors, ends at Leads, then loops back to Visitors */}
                  <circle r="10" fill="url(#funnel-dot-glow)" className="motion-reduce:hidden">
                    <animateMotion
                      dur="5s"
                      repeatCount="indefinite"
                      path={pathD}
                      rotate="auto"
                      calcMode="spline"
                      keyTimes="0;1"
                      keySplines="0.42 0 0.58 1"
                    />
                  </circle>
                  <circle r="4" fill="#f5d0fe" className="motion-reduce:hidden">
                    <animateMotion
                      dur="5s"
                      repeatCount="indefinite"
                      path={pathD}
                      rotate="auto"
                      calcMode="spline"
                      keyTimes="0;1"
                      keySplines="0.42 0 0.58 1"
                    />
                  </circle>
                </svg>
              )}

              <div ref={visitorRef} className="relative z-10">
                <FunnelStage label="Visitors" width="12rem" visible={visible} delayMs={0} />
              </div>

              <div className="relative z-10">
                <FunnelConnector delayMs={0} />
              </div>

              <ul className="relative z-10 grid w-full max-w-3xl grid-cols-1 gap-4 sm:grid-cols-2">
                {BENEFITS.map(({ label, detail, icon: Icon }, i) => (
                  <li
                    key={label}
                    ref={(el) => {
                      cardRefs.current[i] = el;
                    }}
                    style={{ transitionDelay: visible ? `${150 + i * 90}ms` : "0ms" }}
                    className={`group relative z-10 flex items-start gap-4 overflow-hidden rounded-xl border border-white/[0.08] bg-black/50 p-4 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)] backdrop-blur-md transition-all duration-500 ease-out motion-reduce:transition-none hover:-translate-y-0.5 hover:border-purple-400/40 hover:bg-black/60 hover:shadow-[0_0_24px_-8px_rgba(192,132,252,0.5)] ${visible
                      ? "translate-y-0 opacity-100"
                      : "translate-y-4 opacity-0"
                      }`}
                  >
                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-0 top-0 h-0.5 origin-left bg-gradient-to-r from-purple-400/0 via-purple-400/80 to-fuchsia-400/0 transition-transform duration-700 ease-out motion-reduce:transition-none ${visible ? "scale-x-100" : "scale-x-0"
                        }`}
                      style={{ transitionDelay: visible ? `${250 + i * 90}ms` : "0ms" }}
                    />

                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-purple-500/15 text-purple-300 ring-1 ring-purple-400/30 transition-colors duration-300 group-hover:bg-purple-500/25 group-hover:text-purple-200">
                      <Icon className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
                    </span>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-base font-semibold text-white sm:text-base">
                        {label}
                      </span>
                      <span className="text-sm leading-snug text-white/50 sm:text-sm">
                        {detail}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="relative z-10">
                <FunnelConnector delayMs={600} />
              </div>

              <div ref={leadsRef} className="relative z-10">
                <FunnelStage
                  label="Leads"
                  width="10rem"
                  tone="accent"
                  visible={visible}
                  delayMs={750}
                />
              </div>

              <div className="relative z-10 mt-4 flex flex-col items-center gap-5">
                <SolutionCTAButton />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .funnel-dash {
          animation: funnel-dash-travel 2.5s linear infinite;
        }
        @keyframes funnel-dash-travel {
          to {
            stroke-dashoffset: -28;
          }
        }
      `}</style>
    </section>
  );
}