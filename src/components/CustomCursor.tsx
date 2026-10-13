"use client";

import { useEffect, useRef } from "react";

const INTERACTIVE_SELECTOR =
  "a, button, [role='button'], [data-cursor-hover], input, textarea, select, [tabindex]:not([tabindex='-1'])";

export default function CustomCursor() {
  const lensRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only enable custom cursor on fine pointer devices (mouse/trackpad)
    const isFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!isFinePointer || !lensRef.current || !dotRef.current) return;

    const lens = lensRef.current;
    const dot = dotRef.current;
    lens.style.display = "block";
    dot.style.display = "block";

    let mouseX = -100;
    let mouseY = -100;
    let lensX = -100;
    let lensY = -100;
    let dotX = -100;
    let dotY = -100;

    let targetScale = 1;
    let currentScale = 1;
    let isPressed = false;
    let hasMoved = false;
    let animationFrameId: number;
    let lastTime = performance.now();
    let unhoverGraceTimer: ReturnType<typeof setTimeout> | null = null;

    const evaluateTarget = (target: HTMLElement | null) => {
      if (!target) return false;
      return Boolean(
        target.closest(INTERACTIVE_SELECTOR) ||
        target.closest("[role='tablist']") ||
        target.closest("[role='group']")
      );
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!hasMoved) {
        lensX = mouseX;
        lensY = mouseY;
        dotX = mouseX;
        dotY = mouseY;
        hasMoved = true;
        lens.style.opacity = "1";
        dot.style.opacity = "1";
      }

      const target = e.target as HTMLElement | null;
      const isInteractive = evaluateTarget(target);

      if (isInteractive) {
        if (unhoverGraceTimer) {
          clearTimeout(unhoverGraceTimer);
          unhoverGraceTimer = null;
        }
        targetScale = 1.85;
      } else {
        // Small grace period prevents jitter when traversing gaps between adjacent tabs or pills
        if (!unhoverGraceTimer && targetScale > 1) {
          unhoverGraceTimer = setTimeout(() => {
            targetScale = 1;
            unhoverGraceTimer = null;
          }, 45);
        }
      }
    };

    const handlePointerDown = () => {
      isPressed = true;
    };

    const handlePointerUp = () => {
      isPressed = false;
    };

    const handleMouseLeave = () => {
      lens.style.opacity = "0";
      dot.style.opacity = "0";
      targetScale = 1;
      if (unhoverGraceTimer) {
        clearTimeout(unhoverGraceTimer);
        unhoverGraceTimer = null;
      }
    };

    const handleMouseEnter = () => {
      lens.style.opacity = "1";
      dot.style.opacity = "1";
    };

    const updateCursor = (time: number) => {
      const dt = Math.min(Math.max((time - lastTime) / 1000, 0.001), 0.035);
      lastTime = time;

      // Ultra-responsive precision dot (near zero perceptible lag)
      const dotLerp = 1 - Math.exp(-48 * dt);
      dotX += (mouseX - dotX) * dotLerp;
      dotY += (mouseY - dotY) * dotLerp;

      // Fluid outer optical lens tracking with smooth organic inertia
      const lensLerp = 1 - Math.exp(-32 * dt);
      lensX += (mouseX - lensX) * lensLerp;
      lensY += (mouseY - lensY) * lensLerp;

      // Organic critically-damped bloom without any bouncing or fluttering
      const effectiveTarget = isPressed ? targetScale * 0.82 : targetScale;
      const scaleLerp = 1 - Math.exp(-18 * dt);
      currentScale += (effectiveTarget - currentScale) * scaleLerp;

      dot.style.transform = `translate3d(${dotX.toFixed(2)}px, ${dotY.toFixed(2)}px, 0) translate(-50%, -50%)`;
      lens.style.transform = `translate3d(${lensX.toFixed(2)}px, ${lensY.toFixed(2)}px, 0) translate(-50%, -50%) scale(${currentScale.toFixed(4)})`;

      animationFrameId = requestAnimationFrame(updateCursor);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    window.addEventListener("pointerup", handlePointerUp, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    animationFrameId = requestAnimationFrame(updateCursor);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      if (unhoverGraceTimer) clearTimeout(unhoverGraceTimer);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <div ref={lensRef} className="custom-cursor-lens" aria-hidden="true" />
      <div ref={dotRef} className="custom-cursor-dot" aria-hidden="true" />
    </>
  );
}
