import gsap from "gsap";

/**
 * Reusable GSAP animation helpers for the eBook frontend.
 * Use with useRef and useEffect for performance.
 */

export const fadeSlideUp = (ref, options = {}) => {
  if (!ref?.current) return;
  const { duration = 0.45, ease = "power2.out", y = 16 } = options;
  gsap.fromTo(
    ref.current,
    { opacity: 0, y },
    { opacity: 1, y: 0, duration, ease }
  );
};

export const slideFromLeft = (ref, options = {}) => {
  if (!ref?.current) return;
  const { duration = 0.4, ease = "power2.out", x = -24 } = options;
  gsap.fromTo(
    ref.current,
    { x, opacity: 0 },
    { x: 0, opacity: 1, duration, ease }
  );
};

export const fadeScaleIn = (ref, options = {}) => {
  if (!ref?.current) return;
  const { duration = 0.35, ease = "power2.out", scale = 0.98 } = options;
  gsap.fromTo(
    ref.current,
    { opacity: 0, scale },
    { opacity: 1, scale: 1, duration, ease }
  );
};

export const modalEnter = (overlayRef, contentRef) => {
  if (!overlayRef?.current || !contentRef?.current) return;
  gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.25, ease: "power2.out" });
  gsap.fromTo(
    contentRef.current,
    { opacity: 0, scale: 0.92 },
    { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" }
  );
};

export const modalExit = (overlayRef, contentRef, onComplete) => {
  if (!overlayRef?.current || !contentRef?.current) {
    onComplete?.();
    return;
  }
  gsap.to(overlayRef.current, { opacity: 0, duration: 0.2 });
  gsap.to(contentRef.current, {
    opacity: 0,
    scale: 0.92,
    duration: 0.25,
    ease: "power2.in",
    onComplete,
  });
};

export const hoverScale = (ref, options = {}) => {
  if (!ref?.current) return () => {};
  const { scaleUp = 1.03, scaleDown = 1, duration = 0.2 } = options;
  const el = ref.current;
  const onEnter = () => gsap.to(el, { scale: scaleUp, duration, ease: "power2.out" });
  const onLeave = () => gsap.to(el, { scale: scaleDown, duration, ease: "power2.out" });
  el.addEventListener("mouseenter", onEnter);
  el.addEventListener("mouseleave", onLeave);
  return () => {
    el.removeEventListener("mouseenter", onEnter);
    el.removeEventListener("mouseleave", onLeave);
  };
};

export default {
  fadeSlideUp,
  slideFromLeft,
  fadeScaleIn,
  modalEnter,
  modalExit,
  hoverScale,
};
