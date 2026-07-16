"use client";

import {
    TrendingDown,
    ShoppingCart,
    Trophy,
    SearchX,
    type LucideIcon,
} from "lucide-react";
import { useFadeIn } from "@/components/animation/useFadeIn";

type Problem = {
    icon: LucideIcon;
    title: string;
    description: string;
};

const PROBLEMS: Problem[] = [
    {
        icon: TrendingDown,
        title: "Ads Spend Money, Not Make It",
        description:
            "Boosting posts, running campaigns — and seeing nothing back. No system, no strategy, just wasted budget.",
    },
    {
        icon: ShoppingCart,
        title: "Traffic Comes In, Nobody Buys",
        description:
            "People visit your page and vanish. No lead capture, no follow-up, no funnel. You're losing potential customers daily.",
    },
    {
        icon: Trophy,
        title: "Competitors Look Better Online",
        description:
            "They have a polished presence, consistent content, and great reviews. You look like you don't exist.",
    },
    {
        icon: SearchX,
        title: "No Data, No Idea What Works",
        description:
            "You're posting and hoping. With no tracking or insight, you can't tell what's working and what's just wasting your time.",
    },
];

export default function ProblemSection() {
    const { ref: headingRef, isVisible: headingVisible } = useFadeIn<HTMLDivElement>();
    const { ref: listRef, isVisible: listVisible } = useFadeIn<HTMLDivElement>(0.05);

    return (
        <section className="sec pain-sec relative overflow-hidden bg-[#0b0714] px-6 py-10 md:py-28">
            {/* Coral ambient background — signals "problem" against the violet "solution" sections */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,107,107,0.14),_transparent_60%)]" />
            <div className="pointer-events-none absolute -bottom-10 left-1/2 h-96 w-[36rem] -translate-x-1/2 rounded-full bg-[#ff6b6b]/10 blur-[120px]" />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <div className="inn relative z-10 mx-auto max-w-3xl">
                {/* Eyebrow + heading */}
                <div
                    ref={headingRef}
                    className={`ctr fade-in-section text-center${headingVisible ? " visible" : ""}`}
                >
                    <div
                        className={`fade-in-section delay-0 mb-6 inline-flex items-center gap-2 rounded-full border border-[#ff6b6b]/30 bg-[#ff6b6b]/10 px-4 py-1.5 backdrop-blur-sm${headingVisible ? " visible" : ""}`}
                    >
                        <span className="text-xs font-bold uppercase tracking-wide text-[#ff8a8a]">
                            Sound familiar?
                        </span>
                    </div>

                    <h2 className="font-display text-3xl font-extrabold leading-[1.15] text-white sm:text-4xl md:text-5xl">
                        The Problems Killing Your{" "}
                        <span className="text-[#ff6b6b]">Business Growth</span>
                    </h2>
                    <p
                        className={`fade-in-section delay-2 mx-auto mt-5 max-w-xl text-lg leading-relaxed text-white/60${headingVisible ? " visible" : ""}`}
                    >
                        If any of these feel too real — you&apos;re in the right place.
                    </p>
                </div>

                {/* Pain point list */}
                <div ref={listRef} className="pgrid mt-1 grid grid-cols-1 gap-0">
                    {PROBLEMS.map(({ icon: Icon, title, description }, index) => (
                        <div
                            key={title}
                            className={`pc fade-in-section group flex items-start gap-5 border-t border-[#ff6b6b]/[0.18] py-8 transition-all duration-500 first:border-t-0 hover:bg-[#ff6b6b]/[0.05]${listVisible ? " visible" : ""}`}
                            style={{ transitionDelay: listVisible ? `${index * 80}ms` : "0ms" }}
                        >
                            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#ff6b6b] to-[#ff4d4d] text-white shadow-[0_0_20px_-4px_rgba(255,107,107,0.6)] transition-transform duration-500 group-hover:scale-110">
                                <Icon className="h-5 w-5" strokeWidth={2.25} />
                            </span>

                            <div>
                                <p className="font-display text-lg font-bold text-[#ff6b6b]">
                                    {title}
                                </p>
                                <p className="mt-2 text-sm leading-relaxed text-white/55">
                                    {description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}