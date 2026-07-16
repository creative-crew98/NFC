"use client";

import { useEffect, useRef, useState } from "react";
import { useFadeIn } from "@/components/animation/useFadeIn";

type Stat = {
  value: number;
  suffix: string;
  label: string;
  decimals?: number;
};

const STATS: Stat[] = [
  { value: 95, suffix: "%", label: "Lead Response Automation" },
  { value: 3, suffix: "x", label: "Higher Conversion" },
  { value: 24, suffix: "/7", label: "Automated Follow-up" },
  { value: 100, suffix: "%", label: "Customized Funnel" },
];

/**
 * Counts up from 0 to `target` once the element scrolls into view.
 * Returns a ref to attach and the current displayed number.
 */
function useCountUp(target: number, duration = 1800) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [value, setValue] = useState(0);
  const hasRun = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasRun.current) {
          hasRun.current = true;

          const start = performance.now();

          const tick = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // ease-out cubic, so it starts fast and settles gently
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(Math.round(eased * target));

            if (progress < 1) {
              requestAnimationFrame(tick);
            } else {
              setValue(target);
            }
          };

          requestAnimationFrame(tick);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [target, duration]);

  return { ref, value };
}

function StatCard({ stat, index }: { stat: Stat; index: number }) {
  const { ref, value } = useCountUp(stat.value);

  return (
    <div
      ref={ref}
      className="reveal is-visible flex flex-col items-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 py-10 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-purple-200 hover:shadow-lg hover:shadow-purple-100"
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <p className="text-gradient-luxury-light font-display text-5xl font-extrabold tabular-nums sm:text-6xl">
        {value}
        {stat.suffix}
      </p>
      <p className="mt-2 text-sm font-semibold text-slate-600 sm:text-base">
        {stat.label}
      </p>
    </div>
  );
}

export default function StatisticsSection() {
  const { ref: headingRef, isVisible: headingVisible } = useFadeIn<HTMLDivElement>();

  return (
    <section className="section-light relative overflow-hidden px-6 py-24 md:py-28">
      <div className="mx-auto max-w-6xl">
        {/* Heading */}
        <div
          ref={headingRef}
          className={`fade-in-section mx-auto max-w-2xl text-center${headingVisible ? " visible" : ""}`}
        >
          <h2 className="text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl md:text-5xl">
            Numbers That{" "}
            <span className="text-gradient-luxury-light">Speak For Themselves</span>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-slate-500">
            Real results from businesses that switched to an automated
            funnel system.
          </p>
        </div>

        {/* Stat grid */}
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat, index) => (
            <StatCard key={stat.label} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}