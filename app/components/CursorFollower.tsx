"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CursorFollower() {
  const [isVisible, setIsVisible] = useState(true);
  const [isHover, setIsHover] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: { clientX: number; clientY: number; }) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mouseleave", handleMouseLeave);

    // Éléments interactifs sur lesquels le curseur grossit
    const hoverElements = document.querySelectorAll(".cursor-hover");

    hoverElements.forEach((el) => {
      el.addEventListener("mouseenter", () => setIsHover(true));
      el.addEventListener("mouseleave", () => setIsHover(false));
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[999999] 
                 rounded-full border border-white/20 backdrop-blur-sm"
      style={{
        x: springX,
        y: springY,
        translateX: "-50%", 
        translateY: "-50%",
        width: isHover ? 90 : 34,       // agrandissement sur hover
        height: isHover ? 90 : 34,
        backgroundColor: "rgba(255,255,255,0.1)", // semi-transparent
        opacity: isVisible ? 1 : 0,
        transition: "width 0.2s ease, height 0.2s ease",
        backdropFilter: "blur(10px)",   // flou intérieur
      }}
    />
  );
}
