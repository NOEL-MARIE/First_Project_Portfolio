"use client";

import { Link } from "lucide-react";
import Linka from "next/link";

export default function HeroSection() {
  return (
    <section
      className="flex flex-col items-center justify-center min-h-screen pt-32 text-center w-full px-6 md:px-12 fonr"
    >
      {/* ✅ Titre principal */}
      <h1 className="mb-6 text-4xl md:text-6xl font-bold font-Ultravision leading-tight text-white">
        Bienvenue sur{" "}
        <span className="text-HoverEffect">Mon Portfolio</span>
      </h1>

      {/* ✅ Sous-texte */}
      <p className="max-w-2xl text-base md:text-lg text-gray-400 mt-4 flex font-Ultravision gap-3 group ">
        <Link className="hidden group-hover:flex "/> Mon CV et mes projets personnels sont ici.
      </p>

      {/* ✅ Bouton d'appel à l’action (optionnel, stylé et responsive) */}
      <div className="mt-10 gap-5 flex">
        <a
          href="#projects"
          className="px-6 py-3 hover:cursor-pointer backdrop-blur-sm bg-HoverEffect text-white font-semibold text-sm md:text-base hover:bg-opacity-10 rounded-md transition font-Horix"
        >
          Découvrir mes projets
        </a>
        <a
          href="/CV-IDA_Noel.pdf"
          download="CV-IDA_Noel.pdf"
          className="px-6 py-3 hover:cursor-pointer backdrop-blur-sm bg-HoverEffect text-white font-semibold text-sm md:text-base hover:bg-opacity-10 rounded-md transition font-Horix"
        >
          Découvrir mon CV
        </a>
      </div>
    </section>
  );
}
