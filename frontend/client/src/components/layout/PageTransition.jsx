import React, { useRef, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import gsap from "gsap";

const PageTransition = ({ children }) => {
  const location = useLocation();
  const containerRef = useRef(null);
  const [displayedLocation, setDisplayedLocation] = useState(location);
  const isFirstMount = useRef(true);

  useEffect(() => {
    if (isFirstMount.current) {
      setDisplayedLocation(location);
      isFirstMount.current = false;
      return;
    }
    if (displayedLocation.key === location.key) return;
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 0.2,
        ease: "power2.in",
        onComplete: () => {
          setDisplayedLocation(location);
          gsap.to(containerRef.current, {
            opacity: 1,
            duration: 0.3,
            ease: "power2.out",
          });
        },
      });
    });
    return () => ctx.revert();
  }, [location]);

  return (
    <div ref={containerRef} style={{ minHeight: "100%" }}>
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child, { location: displayedLocation })
          : child
      )}
    </div>
  );
};

export default PageTransition;
