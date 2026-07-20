"use client";

import {
  Sparkles,
  MessageCircle,
  CalendarCheck,
  Zap,
  TrendingUp,
  PhoneCall,
  Mail,
  UserPlus,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useFadeIn } from "@/components/animation/useFadeIn";
import { HeroCTAButton } from "@/components/Home/CTAButtons";

// Both of these touch canvas / window under the hood — must be client-only
// or you'll get a server/client hydration mismatch.
const DotLottieReact = dynamic(
  () => import("@lottiefiles/dotlottie-react").then((mod) => mod.DotLottieReact),
  { ssr: false }
);

const SideRays = dynamic(
  () => import("@/components/animation/Siderays"),
  { ssr: false }
);

// Pool of possible "events" the live feed rotates through. Add more here
// any time — the bigger the pool, the less repetitive a long visit feels.
const NOTIFICATION_POOL = [
  { label: "Lead captured from landing page", icon: TrendingUp, accent: true },
  { label: "WhatsApp follow-up sent", icon: MessageCircle },
  { label: "Appointment booked", icon: CalendarCheck },
  { label: "Automation triggered", icon: Zap },
  { label: "New call request received", icon: PhoneCall },
  { label: "Follow-up email opened", icon: Mail },
  { label: "New contact added to CRM", icon: UserPlus },
];

type ActivityItem = {
  id: number;
  label: string;
  icon: (typeof NOTIFICATION_POOL)[number]["icon"];
  accent?: boolean;
};

// Cosmetic "time ago" labels by position — index 0 (newest) is always
// "Just now", regardless of which real event is showing there.
const TIME_LABELS = ["Just now", "1m ago", "4m ago", "9m ago", "14m ago"];

// Drives the rotating feed: every `intervalMs`, pulls the next item from
// NOTIFICATION_POOL and pushes it to the top, capping the list at
// `maxItems`. Runs only client-side (inside useEffect), so the server-
// rendered list and the client's first paint match exactly — no
// hydration mismatch, it just starts animating after mount.
function useLiveActivityFeed(maxItems = 4, intervalMs = 3200) {
  const [items, setItems] = useState<ActivityItem[]>(() =>
    NOTIFICATION_POOL.slice(0, maxItems).map((n, i) => ({ ...n, id: i }))
  );
  const idRef = useRef(maxItems);
  const poolIndexRef = useRef(maxItems % NOTIFICATION_POOL.length);

  useEffect(() => {
    const timer = setInterval(() => {
      const next = NOTIFICATION_POOL[poolIndexRef.current];
      poolIndexRef.current = (poolIndexRef.current + 1) % NOTIFICATION_POOL.length;
      const id = idRef.current++;

      setItems((prev) => [{ ...next, id }, ...prev].slice(0, maxItems));
    }, intervalMs);

    return () => clearInterval(timer);
  }, [maxItems, intervalMs]);

  return items;
}

export default function Hero() {
  const { ref: headingRef, isVisible: headingVisible } = useFadeIn<HTMLDivElement>(0.1, "0px");
  const { ref: dashRef, isVisible: dashVisible } = useFadeIn<HTMLDivElement>(0.08, "0px");
  const [lottieFailed, setLottieFailed] = useState(false);
  const activity = useLiveActivityFeed();

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

      <div className="pointer-events-none absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-fuchsia-400/20 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full bg-violet-500/15 blur-[100px]" />
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative mx-auto max-w-7xl">
        <div
          ref={headingRef}
          className={`fade-in-section mx-auto max-w-3xl text-center${headingVisible ? " visible" : ""}`}
        >
          <div className="mb-5 z-1000 inline-flex w-fit items-center gap-2 rounded-full border border-amber-600/30 bg-amber-950/90 px-4 py-1 backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5 text-amber-300" />
            <span className="text-xs font-medium tracking-wide text-amber-400">
              <span className="font-bold">DONE-FOR-YOU</span>
              <span className="font-bold"> SALES FUNNEL SYSTEMS</span>
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
          className={`fade-in-section delay-2 relative mx-auto mt-10 max-w-4xl${dashVisible ? " visible" : ""}`}
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
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-2 pb-0">
                <div className="mb-6 flex items-center justify-between">
                  <span className="font-display text-sm font-semibold text-white/80">
                    Funnel performance
                  </span>
                  <span className="flex items-center gap-1 rounded-full bg-emerald-400/10 px-2.5 py-1 text-[11px] font-medium text-emerald-400 ring-1 ring-emerald-400/20">
                    <TrendingUp className="h-5 w-5" />
                    +240%
                  </span>
                </div>

                <div className="relative flex h-50 w-70 items-start justify-center overflow-hidden sm:h-72 md:h-80">
                  {!lottieFailed ? (
                    <DotLottieReact
                      src="/lottie/Growth.lottie"
                      loop
                      autoplay
                      style={{
                        width: "100%",
                        height: "100%",
                        transform: "scale(1.1)",
                        transformOrigin: "top center",
                      }}
                      onError={() => setLottieFailed(true)}
                    />
                  ) : (
                    // Fallback so the card never renders blank if the
                    // .lottie asset is missing or fails to load.
                    <div className="flex h-80 w-full items-end gap-2 px-2">
                      {[40, 65, 50, 80, 60, 95].map((h, i) => (
                        <span
                          key={i}
                          className="animate-bar-pulse flex-1 rounded-t-md bg-gradient-to-t from-violet-500/70 to-fuchsia-400/70"
                          style={{ height: `${h}%`, animationDelay: `${i * 0.12}s` }}
                        />
                      ))}
                    </div>
                  )}
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
                <ul className="mt-3 divide-y divide-white/10">
                  {activity.map(({ id, label, icon: Icon, accent }, i) => (
                    <li
                      key={id}
                      className="notify-in flex items-center gap-2.5 py-2.5 first:pt-0 last:pb-0"
                    >
                      <span
                        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-white ${i === 0 && accent
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
                        {TIME_LABELS[i] ?? `${(i + 1) * 5}m ago`}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex items-center justify-center border-t border-white/10 bg-white/[0.03] px-6 py-4">
              <div className="flex items-center justify-center gap-2">
                <span className="relative flex h-2.5 w-2.5 items-center justify-center">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
                </span>
                <span className="text-sm text-white/100 leading-none font-bold">
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
      </div >

      <style jsx>{`
        @keyframes notify-in {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .notify-in {
          animation: notify-in 420ms ease-out;
        }
        @media (prefers-reduced-motion: reduce) {
          .notify-in {
            animation: none;
          }
        }
      `}</style>
    </section >
  );
}