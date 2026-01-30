import React, { useRef, useEffect, useLayoutEffect, useState } from "react";
import { X } from "lucide-react";
import gsap from "gsap";

const Modal = ({ isOpen, onClose, children, size }) => {
  const overlayRef = useRef(null);
  const contentRef = useRef(null);
  const onCloseRef = useRef(onClose);
  const [isExiting, setIsExiting] = useState(false);
  const wasOpenRef = useRef(false);
  onCloseRef.current = onClose;

  useLayoutEffect(() => {
    if (!isOpen && wasOpenRef.current) setIsExiting(true);
    if (isOpen) wasOpenRef.current = true;
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || isExiting) return;
    if (!overlayRef.current || !contentRef.current) return;
    gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.25, ease: "power2.out" });
    gsap.fromTo(
      contentRef.current,
      { opacity: 0, scale: 0.92 },
      { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" }
    );
  }, [isOpen, isExiting]);

  useEffect(() => {
    if (!isExiting || !overlayRef.current || !contentRef.current) return;
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.2 });
    gsap.to(contentRef.current, {
      opacity: 0,
      scale: 0.92,
      duration: 0.25,
      ease: "power2.in",
      onComplete: () => {
        wasOpenRef.current = false;
        onCloseRef.current();
        setIsExiting(false);
      },
    });
  }, [isExiting]);

  const handleClose = () => {
    if (!overlayRef.current || !contentRef.current) {
      onClose();
      return;
    }
    setIsExiting(true);
  };

  if (!isOpen && !isExiting) return null;

  const sizeClass = size === "lg" ? "max-w-2xl" : "max-w-lg";

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={(e) => e.target === e.currentTarget && handleClose()}
    >
      <div
        ref={contentRef}
        className={`bg-white rounded-lg w-full ${sizeClass} p-6 relative`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
        >
          <X size={18} />
        </button>

        {children}
      </div>
    </div>
  );
};

export default Modal;   //THIS LINE IS REQUIRED
