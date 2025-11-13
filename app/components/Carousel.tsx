"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import imagesData from "../data/Images.json";
import Link from "next/link";

export default function Carousel() {
  const [current, setCurrent] = useState(0);
  const slideRef = useRef<HTMLDivElement | null>(null);
  const autoSlide = useRef<NodeJS.Timeout | null>(null);

  // 🔄 Auto Slide
  useEffect(() => {
    autoSlide.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % imagesData.length);
    }, 7000);
    return () => {
      if (autoSlide.current) clearInterval(autoSlide.current);
    };
  }, []);

  // 🎬 Animation GSAP
  useEffect(() => {
    if (!slideRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".slide-image",
        { scale: 1.1, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.2, ease: "power3.out" }
      );

      gsap.fromTo(
        ".slide-subtitle",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.2 }
      );

      gsap.fromTo(
        ".slide-title",
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.4 }
      );

      gsap.fromTo(
        ".slide-button",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.6 }
      );
    }, slideRef);

    return () => ctx.revert();
  }, [current]);

  // ⏩ Navigation manuelle
  const nextSlide = () => {
    if (autoSlide.current) clearInterval(autoSlide.current);
    setCurrent((prev) => (prev + 1) % imagesData.length);
  };
  const prevSlide = () => {
    if (autoSlide.current) clearInterval(autoSlide.current);
    setCurrent((prev) => (prev === 0 ? imagesData.length - 1 : prev - 1));
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {imagesData.map((image, index) => (
        <div
          key={image.id}
          ref={index === current ? slideRef : null}
          className={`absolute inset-0 transition-opacity duration-[1200ms] ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <Image
            src={image.src}
            alt={image.title}
            fill
            className="slide-image object-cover brightness-75 blur-sm"
            priority
          />

          {/* Contenu central */}
          <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center z-20">
            <h3 className="slide-subtitle md:tracking-[9rem] tracking-[1rem] text-sm md:text-lg font-light mb-4 uppercase  px-3 py-1 rounded">
              {image.subtitle}
            </h3>
            <h1 className="slide-title text-2xl md:text-9xl font-extrabold mb-6">
              {image.title}
            </h1>
            <Link
              href="/portfolio"
              className="slide-button border border-white px-8 py-3 rounded-full hover:bg-white hover:text-black transition-all duration-300"
            >
              {image.button}
            </Link>
          </div>
        </div>
      ))}

      {/* ✅ Flèches navigation visibles et fixes */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 backdrop-blur-md p-3 rounded-full transition mt-40 md:mt-0 z-50"
      >
        <ArrowLeft className="text-white w-8 h-8" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 backdrop-blur-md p-3 rounded-full transition mt-40 md:mt-0 z-50"
      >
        <ArrowRight className="text-white w-8 h-8" />
      </button>
    </div>
  );
}
