"use client";

import { useModal } from "@/components/ModalContext";

export function HeroCTAButton({ label }: { label: string }) {
    const { openModal } = useModal();
    return (
        <button className="btn-luxury" onClick={openModal} type="button">
            {label}
        </button>
    );
}

export function SolutionCTAButton() {
    const { openModal } = useModal();
    return (
        <button
            type="button"
            onClick={openModal}
            className="rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 px-8 py-4 text-base font-semibold text-[#0f172a] shadow-lg shadow-yellow-500/40 transition-transform duration-300 hover:scale-[1.03] hover:shadow-yellow-400/40"
        >
            Book A Free Strategy Call
        </button>
    );
}

export function FinalCTAButton({
    variant,
    label,
}: {
    variant: "primary" | "secondary";
    label: string;
}) {
    const { openModal } = useModal();

    if (variant === "secondary") {
        return (
            <button
                type="button"
                onClick={openModal}
                className="hover-lift inline-flex items-center gap-2 rounded-full border border-white/15 px-8 py-[0.95rem] font-display text-lg font-semibold text-white/90 backdrop-blur-sm transition hover:border-white/35 hover:bg-white/5"
            >
                {label}
            </button>
        );
    }

    return (
        <button type="button" onClick={openModal} className="btn-luxury text-lg">
            {label}
        </button>
    );
}

