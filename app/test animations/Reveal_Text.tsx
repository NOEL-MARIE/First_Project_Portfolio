"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function AnimatedName() {
  // On précise ici que la ref pointe vers un élément HTMLDivElement
  const fullNameRef = useRef<HTMLDivElement | null>(null);

  const letters = [..."De-Gonzague"];

  useEffect(() => {
    const el = fullNameRef.current;
    if (!el) return;

    const chars = el.querySelectorAll("span");
    const container = el.parentElement;

    if (!container) return;

    // Effet quand la souris entre
    const onEnter = () => {
      gsap.to(chars, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.05,
      });
      gsap.to(el, { opacity: 1, duration: 0.3 });
    };

    // Effet quand la souris quitte
    const onLeave = () => {
      gsap.to(chars, {
        y: -20,
        opacity: 0,
        duration: 0.5,
        ease: "power2.in",
        stagger: 0.03,
      });
      gsap.to(el, { opacity: 0, duration: 0.3 });
    };

    container.addEventListener("mouseenter", onEnter);
    container.addEventListener("mouseleave", onLeave);

    return () => {
      container.removeEventListener("mouseenter", onEnter);
      container.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div className="     inline-block overflow-hidden group cursor-pointer   ">
      {/* Initiales visibles par défaut */}
      <span className="block font-bold text-2xl text-white transition-opacity duration-300 group-hover:opacity-0">
        N M
      </span>

      {/* Nom complet (lettres animées) */}
      <div
        ref={fullNameRef}
        className=" top-0 left-0 flex font-bold text-2xl text-white opacity-0"
      >
        {letters.map((letter, i) => (
          <span
            key={i}
            className="inline-block translate-y-8 opacity-0"
          >
            {letter === " " ? "\u00A0" : letter}
          </span>
        ))}
      </div>
    </div>
  );
}
