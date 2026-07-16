"use client";

import { forwardRef, useEffect, useRef, useState } from "react";
import { X, User, Phone, Mail, Loader2 } from "lucide-react";

// 👇 Paste your Google Apps Script Web App URL here (ends in /exec)
const SHEET_ENDPOINT = "https://script.google.com/macros/s/AKfycbzmiYDNrxSl7gF_cFt1Dh6kP1LMgDj6mAN4jHQu90qpThrOC6dIXFUWPOazkHVBdVk8/exec";

type FormState = {
    name: string;
    phone: string;
    email: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

function validate(values: FormState): FormErrors {
    const errors: FormErrors = {};
    if (!values.name.trim()) errors.name = "Name is required";
    if (!values.phone.trim()) {
        errors.phone = "Phone is required";
    } else if (!/^[+()\d\s-]{7,}$/.test(values.phone.trim())) {
        errors.phone = "Enter a valid phone number";
    }
    if (!values.email.trim()) {
        errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
        errors.email = "Enter a valid email";
    }
    return errors;
}

const FormField = forwardRef<
    HTMLInputElement,
    {
        label: string;
        icon: React.ElementType;
        error?: string;
    } & React.InputHTMLAttributes<HTMLInputElement>
>(function FormField({ label, icon: Icon, error, ...inputProps }, ref) {
    return (
        <label className="block text-left">
            <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-white/50">
                {label}
            </span>
            <div className="relative">
                <Icon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                <input
                    ref={ref}
                    {...inputProps}
                    className={`w-full rounded-xl border bg-white/5 py-3 pl-10 pr-4 text-sm text-white placeholder:text-white/30 backdrop-blur-sm transition-colors duration-200 focus:outline-none focus:ring-2 ${error
                        ? "border-rose-400/40 focus:border-rose-400/60 focus:ring-rose-400/20"
                        : "border-white/10 focus:border-purple-400/50 focus:ring-purple-400/20"
                        }`}
                />
            </div>
            {error && (
                <span className="mt-1.5 block text-xs text-rose-300">{error}</span>
            )}
        </label>
    );
});

export function LeadCaptureModal({
    open,
    onClose,
}: {
    open: boolean;
    onClose: () => void;
}) {
    const [values, setValues] = useState<FormState>({
        name: "",
        phone: "",
        email: "",
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [status, setStatus] = useState<"idle" | "submitting" | "success">(
        "idle"
    );
    const dialogRef = useRef<HTMLDivElement>(null);
    const firstFieldRef = useRef<HTMLInputElement>(null);

    // Close on Escape, focus the first field on open, reset on close so a
    // reopened modal never shows a stale submitted state.
    useEffect(() => {
        if (!open) return;
        firstFieldRef.current?.focus();
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", onKeyDown);
        return () => document.removeEventListener("keydown", onKeyDown);
    }, [open, onClose]);

    useEffect(() => {
        if (!open) {
            const t = setTimeout(() => {
                setValues({ name: "", phone: "", email: "" });
                setErrors({});
                setStatus("idle");
            }, 200);
            return () => clearTimeout(t);
        }
    }, [open]);

    if (!open) return null;

    const handleChange =
        (field: keyof FormState) =>
            (e: React.ChangeEvent<HTMLInputElement>) => {
                setValues((v) => ({ ...v, [field]: e.target.value }));
                if (errors[field]) setErrors((er) => ({ ...er, [field]: undefined }));
            };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const nextErrors = validate(values);
        setErrors(nextErrors);
        if (Object.keys(nextErrors).length > 0) return;

        setStatus("submitting");

        try {
            await fetch(SHEET_ENDPOINT, {
                method: "POST",
                // text/plain avoids a CORS preflight that Apps Script web apps
                // don't handle; Code.gs still parses this as JSON server-side.
                headers: { "Content-Type": "text/plain;charset=utf-8" },
                body: JSON.stringify({
                    name: values.name,
                    phone: values.phone,
                    email: values.email,
                    source: typeof window !== "undefined" ? window.location.href : "",
                }),
            });
            setStatus("success");
        } catch (err) {
            console.error("Lead submit failed:", err);
            setStatus("idle");
            setErrors({ email: "Something went wrong — please try again." });
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8"
            role="dialog"
            aria-modal="true"
            aria-labelledby="lead-modal-title"
        >
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Gradient border wrapper -- same technique as the funnel panel */}
            <div className="relative w-full max-w-md rounded-3xl bg-gradient-to-br from-purple-400/40 via-fuchsia-400/20 to-purple-500/40 p-px shadow-[0_0_60px_-15px_rgba(192,132,252,0.45)]">
                <div
                    ref={dialogRef}
                    className="relative w-full rounded-3xl bg-[#0b0714] px-6 py-8 sm:px-8 sm:py-9"
                >
                    <div className="pointer-events-none absolute inset-0 rounded-3xl bg-[radial-gradient(ellipse_at_top,_rgba(168,85,247,0.15),_transparent_60%)]" />

                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close"
                        className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 transition-colors duration-200 hover:border-white/20 hover:bg-white/10 hover:text-white"
                    >
                        <X className="h-4 w-4" />
                    </button>

                    <div className="relative z-10">
                        {status === "success" ? (
                            <div className="flex flex-col items-center gap-3 py-6 text-center">
                                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-400/15 ring-1 ring-emerald-400/30">
                                    <svg
                                        viewBox="0 0 24 24"
                                        className="h-6 w-6 text-emerald-400"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2.5"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                </span>
                                <h3 className="font-display text-lg font-semibold text-white">
                                    You&apos;re all set
                                </h3>
                                <p className="max-w-xs text-sm text-white/60">
                                    We&apos;ve got your details — expect a call from our team shortly.
                                </p>
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="mt-2 rounded-full border border-white/15 px-5 py-2 text-sm font-semibold text-white/80 transition-colors duration-200 hover:bg-white/5"
                                >
                                    Close
                                </button>
                            </div>
                        ) : (
                            <>
                                <span className="mb-3 inline-block rounded-full border border-purple-400/20 bg-purple-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-purple-200">
                                    Free strategy call
                                </span>
                                <h3
                                    id="lead-modal-title"
                                    className="font-display text-xl font-bold leading-snug text-white sm:text-2xl"
                                >
                                    Let&apos;s make your{" "}
                                    <span className="bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
                                        Coaching business more profitable
                                    </span>
                                </h3>
                                <p className="mt-1.5 text-sm text-white/50">
                                    Drop your details and we&apos;ll reach out within 24 hours.
                                </p>

                                <form onSubmit={handleSubmit} noValidate className="mt-6 flex flex-col gap-4">
                                    <FormField
                                        ref={firstFieldRef}
                                        label="Name"
                                        icon={User}
                                        placeholder="Jane Cooper"
                                        value={values.name}
                                        onChange={handleChange("name")}
                                        error={errors.name}
                                        autoComplete="name"
                                    />
                                    <FormField
                                        label="Phone"
                                        icon={Phone}
                                        type="tel"
                                        placeholder="+91 0123456789"
                                        value={values.phone}
                                        onChange={handleChange("phone")}
                                        error={errors.phone}
                                        autoComplete="tel"
                                    />
                                    <FormField
                                        label="Email [Optional]"
                                        icon={Mail}
                                        type="email"
                                        placeholder="jane@company.com"
                                        value={values.email}
                                        onChange={handleChange("email")}
                                        error={errors.email}
                                        autoComplete="email"
                                    />

                                    <button
                                        type="submit"
                                        disabled={status === "submitting"}
                                        className="mt-2 flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-purple-900/40 transition-transform duration-300 hover:scale-[1.02] hover:shadow-purple-700/40 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:scale-100"
                                    >
                                        {status === "submitting" ? (
                                            <>
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                                Submitting...
                                            </>
                                        ) : (
                                            "Book my free call"
                                        )}
                                    </button>

                                    <p className="text-center text-[11px] text-white/35">
                                        No spam, ever. Your info stays private.
                                    </p>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

// Demo wiring -- replace this trigger with whichever button in your page
// should open the modal (e.g. the "Book Free Strategy Call" CTA).
export default function LeadCaptureModalDemo() {
    const [open, setOpen] = useState(false);

    return (
        <div className="flex min-h-[50vh] items-center justify-center bg-[#0b0714] p-10">
            <button
                type="button"
                onClick={() => setOpen(true)}
                className="rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-500 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-purple-900/40 transition-transform duration-300 hover:scale-[1.03] hover:shadow-purple-700/40"
            >
                Book Free Strategy Call
            </button>

            <LeadCaptureModal open={open} onClose={() => setOpen(false)} />
        </div>
    );
}