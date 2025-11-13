"use client";

import { useRef } from "react";
import gsap from "gsap";

interface AnimatedNameProps {
  className?: string;
}

export default function AnimatedName({ className = "" }: AnimatedNameProps) {
  // Refs pour les lettres animées
  const eRef = useRef<HTMLSpanElement[]>([]);
  const restRef = useRef<HTMLSpanElement[]>([]);

  const handleMouseEnter = () => {
    // Anime la lettre E
    gsap.to(eRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.5,
      ease: "power3.out",
    });

    // Anime chaque lettre de ONZAGUE avec stagger
    gsap.to(restRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.5,
      stagger: 0.05,
      ease: "power3.out",
    });
  };

  const handleMouseLeave = () => {
    // Réinitialise 
    gsap.to(eRef.current, {
      y: 20,
      opacity: 0,
      duration: 0.3,
      ease: "power3.in",
    });

    // Réinitialise chaque lettre de ONZAGUE
    gsap.to(restRef.current, {
      y: 20,
      opacity: 0,
      duration: 0.3,
      stagger: 0.03,
      ease: "power3.in",
    });
  };

  const onzague = "ONZAGUE";

  return (
    <p
      className={`flex gap-1 items-center cursor-pointer font-Sacramento ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* D statique */}
      <span>D</span>

      {/* E animé */}
      {["E"].map((letter, i) => (
        <span
          key={i}
          ref={(el) => {
            if (el) eRef.current[i] = el;
          }}
          className="inline-block opacity-0 transform translate-y-5"
        >
          {letter}
        </span>
      ))}

      &nbsp;

      {/* G statique */}
      <span>G</span>

      {/* ONZAGUE animé lettre par lettre */}
      {onzague.split("").map((letter, i) => (
        <span
          key={i}
          ref={(el) => {
            if (el) restRef.current[i] = el;
          }}
          className="inline-block opacity-0 transform translate-y-5"
        >
          {letter}
        </span>
      ))}
    </p>
  );
}
