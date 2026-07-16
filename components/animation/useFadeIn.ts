"use client";

import { useEffect, useRef, useState } from "react";

/**
 * useFadeIn — attach the returned `ref` to any element you want to
 * fade + rise in the first time it scrolls into view.
 *
 * @param threshold  How much of the element must be visible before it triggers (0–1).
 * @param rootMargin Extra offset so the animation fires slightly before the element reaches the viewport.
 */
export function useFadeIn<T extends HTMLElement>(
  threshold = 0.15,
  rootMargin = "0px 0px -40px 0px"
) {
  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // animate in once only
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return { ref, isVisible };
}
