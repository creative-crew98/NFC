"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useFadeIn } from "@/components/animation/useFadeIn";

type FAQ = {
  question: string;
  answer: string;
};

const FAQS: FAQ[] = [
  {
    question: "How long does development take?",
    answer:
      "Most funnels go from kickoff to launch in 2–4 weeks, depending on scope. Simpler landing-page-plus-CRM setups can be ready in as little as 10 days, while fully custom automation builds take a bit longer.",
  },
  {
    question: "Can it integrate with my CRM?",
    answer:
      "Yes. We connect directly with the CRM you already use, or set one up for you if you don't have one yet. Leads, follow-ups, and appointment data all sync automatically — no manual exporting or double entry.",
  },
  {
    question: "Do you build custom funnels?",
    answer:
      "Every funnel is designed around your specific offer, audience, and sales process — not a generic template. We map your customer journey first, then build the pages, automation, and follow-ups to match it.",
  },
  {
    question: "Will I own the funnel?",
    answer:
      "Yes, completely. Once it's built and handed over, the funnel, its pages, and all connected accounts belong to you. There's no lock-in — you're free to host, edit, or move it however you like.",
  },
  {
    question: "Can you integrate WhatsApp?",
    answer:
      "Yes. WhatsApp automation is one of our most-used integrations — instant lead replies, appointment reminders, and follow-up sequences can all run through it alongside email and SMS.",
  },
  {
    question: "Can you redesign my existing funnel?",
    answer:
      "Absolutely. We can audit what you already have, identify where leads are dropping off, and rebuild or optimize the existing funnel instead of starting from scratch — whichever makes more sense for your situation.",
  },
];

function FAQItem({
  faq,
  isOpen,
  onToggle,
}: {
  faq: FAQ;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm transition-colors duration-300 hover:border-violet-300/30">
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="font-display text-base font-semibold text-white sm:text-lg">
          {faq.question}
        </span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-violet-300 transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      {/* Smooth height animation via CSS grid trick (0fr -> 1fr), no JS measuring needed */}
      <div
        className={`grid transition-all duration-300 ease-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="px-6 pb-6 text-sm leading-relaxed text-white/60 sm:text-base">
            {faq.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { ref: headingRef, isVisible: headingVisible } = useFadeIn<HTMLDivElement>();
  const { ref: accordionRef, isVisible: accordionVisible } = useFadeIn<HTMLDivElement>(0.05);

  return (
    <section className="section-dark relative overflow-hidden px-6 py-24 md:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(168,85,247,0.15),_transparent_60%)]" />

      <div className="relative mx-auto max-w-3xl">
        {/* Heading */}
        <div
          ref={headingRef}
          className={`fade-in-section mx-auto max-w-2xl text-center${headingVisible ? " visible" : ""}`}
        >
          <h2 className="text-3xl font-extrabold leading-tight text-white sm:text-4xl md:text-5xl">
            Frequently Asked{" "}
            <span className="text-gradient-luxury">Questions</span>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-white/60">
            Everything you need to know before getting started.
          </p>
        </div>

        {/* Accordion */}
        <div
          ref={accordionRef}
          className={`fade-in-section mt-14 flex flex-col gap-4${accordionVisible ? " visible" : ""}`}
          style={{ transitionDelay: accordionVisible ? "150ms" : "0ms" }}
        >
          {FAQS.map((faq, index) => (
            <FAQItem
              key={faq.question}
              faq={faq}
              isOpen={openIndex === index}
              onToggle={() =>
                setOpenIndex((current) => (current === index ? null : index))
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}