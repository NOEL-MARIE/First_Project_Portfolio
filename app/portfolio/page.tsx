"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";

// Tes images pour chaque catégorie
const items = [
  {
    id: 1,
    title: "STREET",
    image: "/assets/Portfolio Img/First_img.png",
    bgColor: "bg-yellow-500",
  }, // Remplace par tes chemins d'images réels
  {
    id: 2,
    title: "PORTRAIT",
    image: "/assets/Portfolio Img/Second_img.png",
    bgColor: "bg-gray-700",
  },
  {
    id: 3,
    title: "EVENT",
    image: "/assets/Portfolio Img/Third_img.png",
    bgColor: "bg-green-500",
  },
  {
    id: 4,
    title: "FOOD",
    image: "/assets/Portfolio Img/Forth_img.png",
    bgColor: "bg-white",
  },
  {
    id: 5,
    title: "PRODUCT",
    image: "/assets/Portfolio Img/Fith_img.png",
    bgColor: "bg-green-600",
  },
  {
    id: 6,
    title: "NATURE",
    image: "/assets/Portfolio Img/Last_img.png",
    bgColor: "bg-pink-800",
  },
];

const PortfolioSection = () => {
  const containerRef = useRef(null);

  // Initialisation GSAP pour les animations de survol
  useGSAP(
    () => {
      // Les animations sont gérées directement par les gestionnaires d'événements
      // car elles sont liées à l'interaction de survol (hover).
      // GSAP est initialisé ici pour s'assurer qu'il est prêt.

      // Nous pourrions initialiser un effet de fondu en entrée (fade-in) des éléments au chargement ici si tu le souhaites.
      // Exemple d'animation initiale :
      gsap.from(".grid-item", {
        opacity: 0,
        y: 50,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
      });
    },
    { scope: containerRef }
  ); // Scope pour optimiser les sélecteurs GSAP

  const handleMouseEnter = (itemId: number) => {
    // Animation au survol: L'image prend de l'ampleur et l'opacité diminue légèrement.
    gsap.to(`.item-image-${itemId}`, {
      scale: 1.05,
      duration: 0.4,
      ease: "power2.out",
    });
    // Animation du titre : Décalage vers le haut
    gsap.to(`.item-title-${itemId}`, {
      y: -5,
      duration: 0.3,
      ease: "power1.out",
      color: "#fff", // Changer la couleur du texte sur le survol (selon ton design)
    });
  };

  const handleMouseLeave = (itemId: number) => {
    // Animation au retrait du survol: Retour à l'état initial.
    gsap.to(`.item-image-${itemId}`, {
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
    });
    // Animation du titre : Retour à la position initiale
    gsap.to(`.item-title-${itemId}`, {
      y: 0,
      duration: 0.2,
      ease: "power1.out",
      color: "#a0a0a0", // Retour à la couleur initiale
    });
  };

  return (
    <section
      className="bg-[#1d1d1d] pb-14 sm:pb-0 md:pt-32 h-full w-screen flex items-center justify-center flex-col overflow-scroll md:overflow-hidden pt-36  xl:pt-0"
      ref={containerRef}
    >
      {/* Ligne de texte supérieure */}
      <h1 className="text-white text-center md:text-2xl font-light mb-16  uppercase tracking-widest">
        cause evey picture tells a story!
      </h1>
      {/* bouton apparaissant sur mobile - debut */}
      <div className=" md:hidden items-center flex gap-4 justify-center mb-10   flex-row">
        <Link
          href="/contact"
          className="text-[#333333] group transform  origin-center  uppercase"
        >
          CONTACT{" "}
        </Link>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="24"
            viewBox="0 0 40 24"
            fill="none"
          >
            <rect
              x="12"
              y="6"
              width="16"
              height="12"
              rx="2"
              fill="#7E869E"
            fill-opacity="0.25"

            />
            <path
              d="M12 16V9.24271C12 9.1312 12.1173 9.05867 12.2171 9.10854L18.6584 12.3292C19.5029 12.7515 20.4971 12.7515 21.3416 12.3292L27.7829 9.10854C27.8827 9.05867 28 9.1312 28 9.24271V16C28 17.1046 27.1046 18 26 18H14C12.8954 18 12 17.1046 12 16Z"
              fill="#222222"
            />
            <path
              d="M33.7224 20.5C35.2145 17.9157 36 14.9841 36 12C36 9.01588 35.2145 6.08433 33.7224 3.5"
              stroke="#33363F"
              stroke-linecap="round"
            />
            <path
              d="M30.3923 18C31.4455 16.1758 32 14.1064 32 12C32 9.89356 31.4455 7.82423 30.3923 6"
              stroke="#33363F"
              stroke-linecap="round"
            />
            <path
              d="M6.27757 20.5C4.78551 17.9157 4 14.9841 4 12C4 9.01588 4.78551 6.08433 6.27757 3.5"
              stroke="#33363F"
              stroke-linecap="round"
            />
            <path
              d="M9.6077 18C8.55448 16.1758 8 14.1064 8 12C8 9.89356 8.55448 7.82423 9.6077 6"
              stroke="#33363F"
              stroke-linecap="round"
            />
          </svg>
      </div>

      <button
        className="bg-[#8559C5] md:hidden text-white px-6 py-3 rounded-lg shadow-md hover:bg-[#6b3db0] transition-all"
        onClick={() =>
          (window.location.href =
            "mailto:noelmarie@example.com?subject=Proposition%20de%20rencontre&body=Bonjour%20Noël-Marie,%0A%0AJ’espère%20que%20vous%20allez%20bien.%0AJe%20me%20permets%20de%20vous%20contacter%20afin%20de%20savoir%20s’il%20vous%20serait%20possible%20que%20nous%20nous%20rencontrions%20pour%20échanger%20au%20sujet%20de%20mon%20projet.%0A%0AJe%20reste%20bien%20entendu%20disponible%20pour%20convenir%20d’une%20date%20et%20d’une%20heure%20qui%20vous%20conviendraient.%0A%0ABien%20cordialement,%0A%0AGonzague%20Noël-Marie%20François")
        }
      >
        Me contacter
      </button>
      {/* bouton apparaissant sur mobile - fin */}

      <div className="flex justify-center items-center ">
        <div className="max-w-7xl w-full h-screen md:h-full flex">
          {/* Colonne de gauche pour le texte vertical */}
          <div className="hidden lg:flex w-20 items-center justify-center ">
            <Link
              href="/portfolio"
              className="text-[#333333] transform mr-14 -rotate-90 origin-center text-6xl tracking-widest uppercase"
            >
              PORTFOLIO
            </Link>
          </div>

          {/* Grille principale */}
          <div className="md:flex-1 grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-24 p-4 lg:p-0 ">
            {items.map((item, index) => (
              <div
                key={item.id}
                className={`relative md:aspect-[4/4]  cursor-pointer group grid-item`}
                onMouseEnter={() => handleMouseEnter(item.id)}
                onMouseLeave={() => handleMouseLeave(item.id)}
              >
                {/* Conteneur de l'image avec les bordures et l'inclinaison */}
                <div className="absolute inset-0 p-4 transform w-[205px] h-[205px] gap-8 bg-white shadow-xl ">
                  {/* Le div blanc avec l'inclinaison */}
                  <div className={`       transition-none`}>
                    <p
                      className={`item-title-${item.id} text-black font-RobotoSlab   transform mr-80 mt-40 -rotate-90  text-lg  uppercase`}
                    >
                      {item.title}
                    </p>
                  </div>
                </div>
                {/* Titre en bas à gauche */}

                {/* Conteneur de l'image (légèrement au-dessus) */}
                <div
                  className="relative  left-3 top-3 "
                  // Recréer l'effet de forme
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className={`item-image-${item.id} w-[205px] mt-4 ml-4 rounded-tr-3xl rounded-bl-3xl h-[205px] object-cover transition-none`} // Retirer transition-transform de Tailwind pour GSAP
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Colonne de droite pour le texte vertical */}
          <div className="hidden lg:flex w-20 items-center ml-14 justify-center ">
            <Link
              href="/contact"
              className="text-[#333333] transform rotate-90 origin-center text-6xl tracking-widest uppercase"
            >
              CONTACT
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
