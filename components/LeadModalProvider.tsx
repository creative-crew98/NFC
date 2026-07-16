"use client";

import { LeadCaptureModal } from "@/components/Form";
import { ModalProvider, useModal } from "@/components/ModalContext";

function ModalRenderer() {
    const { isOpen, closeModal } = useModal();
    return <LeadCaptureModal open={isOpen} onClose={closeModal} />;
}

/**
 * Wrap your app with this so any CTA button can call `useModal().openModal()`
 * and open the lead capture form.
 */
export function LeadModalProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ModalProvider>
            {children}
            <ModalRenderer />
        </ModalProvider>
    );
}

