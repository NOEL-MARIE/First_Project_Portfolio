"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Anim_Logo from "../Animations/Anim_Logo";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  const menus = {
    Articles: ["Vie communautaire", "Spiritualité", "Développement personnel"],
    Ressources: ["Textes fondateurs", "Documents PDF", "Formations"],
    Informations: ["Contact", "Événements", "À propos"],
  } as const;

  type MenuKey = keyof typeof menus;
  const [openMenu, setOpenMenu] = useState<MenuKey | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Effet de scroll (apparition/disparition)
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleMouseEnter = (key: MenuKey) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu(key);
  };

  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => setOpenMenu(null), 150);
  };

  return (
    <nav
      className={`fixed top-6 left-1/2 z-50 -translate-x-1/2 transition-all duration-700 ease-in-out flex items-center justify-between px-8 h-[10%] max-w-9xl
        ${isScrolled ? "w-[35%] backdrop-blur-md shadow-lg rounded-full" : "w-full"}
        ${isVisible ? "translate-y-0 opacity-100" : "-translate-y-24 opacity-0"}
      `}
    >
      {/* ✅ Logo + Réseaux sociaux */}
      <div className="flex items-center gap-6">
        <Link
          href="/"
          className="flex items-center gap-2 transition-all duration-700 ease-in-out"
        >
          <Anim_Logo className="text-2xl font-Sacramento text-white" />
        </Link>

        {/* 🔗 Icônes sociales */}
        <div className="hidden md:flex space-x-4 text-gray-300 text-xl">
          <a href="#" className="hover:text-white transition">
            <i className="ri-instagram-line" />
          </a>
          <a href="#" className="hover:text-white transition">
            <i className="ri-pinterest-line" />
          </a>
          <a href="#" className="hover:text-white transition">
            <i className="ri-twitter-line" />
          </a>
        </div>
      </div>

      {/* Bouton Burger (mobile) */}
      <button
        className="md:hidden text-white focus:outline-none"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X size={26} /> : <Menu size={26} />}
      </button>

      {/* Menu Mobile déroulant */}
      <div
        className={`absolute top-[100%] left-0 w-full bg-black/90 text-white flex flex-col items-center gap-4 py-6 transition-all duration-500 md:hidden
          ${
            mobileOpen
              ? "translate-y-0 opacity-100"
              : "-translate-y-10 opacity-0 pointer-events-none"
          }
        `}
      >
        {["Principes", "Articles", "Jardin", "Ressources", "Informations"].map(
          (item) => {
            const typedKey = item as MenuKey;
            const hasSubMenu = menus[typedKey] !== undefined;

            return (
              <div key={item} className="w-full text-center">
                <button
                  onClick={() =>
                    setOpenMenu(openMenu === typedKey ? null : typedKey)
                  }
                  className="w-full py-2 text-lg hover:text-gray-300 transition"
                >
                  {item}
                </button>

                {/* Sous-menu mobile */}
                {hasSubMenu && openMenu === typedKey && (
                  <ul className="flex flex-col gap-2 py-2 bg-white/10">
                    {menus[typedKey].map((subItem, i) => (
                      <li key={i}>
                        <Link
                          href="#"
                          className="block py-2 text-sm text-gray-200 hover:text-white transition"
                          onClick={() => setMobileOpen(false)}
                        >
                          {subItem}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          }
        )}
      </div>
    </nav>
  );
}
