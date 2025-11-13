"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";

export default function ContactPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    birth: "",
  });

  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const formRef = useRef(null);
  const sideTextLeftRef = useRef(null);
  const sideTextRightRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 1 } });
    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: -30 },
      { opacity: 1, y: 0 }
    )
      .fromTo(
        imageRef.current,
        { opacity: 0, x: -40 },
        { opacity: 1, x: 0 },
        "-=0.5"
      )
      .fromTo(
        formRef.current,
        { opacity: 0, x: 40 },
        { opacity: 1, x: 0 },
        "-=0.6"
      )
      .fromTo(
        [sideTextLeftRef.current, sideTextRightRef.current],
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.2 },
        "-=0.7"
      );
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <section
      ref={containerRef}
      className="h-full pt-24 pb-14 bg-[#181818] text-white flex flex-col items-center justify-center px-6 relative overflow-hidden"
    >


      {/* MAIN TITLE */}
      <h1
        ref={titleRef}
        className="text-center text-2xl md:text-3xl font-semibold tracking-[0.35em] mb-10 mt-16"
      >
        THIS IS HOW TO REACH ME
      </h1>

      <div className="flex flex-col md:flex-row items-center justify-center gap-16 md:gap-28">
        {/* LEFT IMAGE */}
        <div
          ref={imageRef}
          className="w-[260px] h-[520px] relative grayscale overflow-hidden"
        >
          <Image
            src="/assets/Contact/contact_img.png"
            alt="contact"
            fill
            className="object-cover rounded-sm"
          />
        </div>

        {/* FORM SECTION */}
        <div ref={formRef} className="flex flex-col items-center w-full max-w-md">
          <h2 className="text-lg font-light mb-9">Personal data</h2>

          {/* STEP INDICATOR */}
          <div className="flex absolute  p-4 transform  items-cente z-10 inset-0 justify-center space-x-6   mb-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full  ${
                  i <= step ? "bg-gray-300 " : "bg-gray-600"
                } `}
              />
            ))}
          </div>
          <div className="flex z-50 relative items-center justify-center space-x-6   mb-4 h-1 w-24 bg-gray-300">

          </div>

          <p className="text-center text-gray-400 text-sm mb-6">
            Please enter your details for any kind of enquiry or starting a foto
            session
          </p>

          {/* FORM INPUTS */}
          <form className="w-full flex flex-col gap-3">
            <div className="flex gap-3">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className="w-1/2 bg-transparent border border-gray-500 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-gray-300"
              />
              <input
                type="text"
                name="surname"
                placeholder="Surname"
                value={formData.surname}
                onChange={handleChange}
                className="w-1/2 bg-transparent border border-gray-500 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-gray-300"
              />
            </div>

            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-transparent border border-gray-500 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-gray-300"
            />

            <input
              type="date"
              name="birth"
              placeholder="Birth date"
              value={formData.birth}
              onChange={handleChange}
              className="w-full bg-transparent border border-gray-500 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-gray-300"
            />
          </form>

          {/* BUTTONS */}
          <div className="flex justify-between w-full mt-6">
            <button
              onClick={prevStep}
              className="border border-gray-400 text-gray-200 rounded-full px-6 py-2 text-sm hover:bg-gray-700 transition"
            >
              BACK
            </button>
            <button
              onClick={nextStep}
              className="border border-gray-400 text-gray-200 rounded-full px-6 py-2 text-sm hover:bg-gray-700 transition"
            >
              NEXT
            </button>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="absolute bottom-6 text-gray-400 text-sm tracking-wide">
        www.nkthehustler/portfolio.com
      </div>

      {/* SIDE TEXTS */}
      <div
        ref={sideTextLeftRef}
        className="absolute hidden md:flex left-6 md:left-10 top-1/2 -rotate-90 text-gray-600 tracking-[0.4em] text-sm"
      >
        LET’S START
      </div>
      <div
        ref={sideTextRightRef}
        className="absolute right-6 hidden md:flex md:right-10 top-1/2 rotate-90 text-gray-600 tracking-[0.4em] text-sm"
      >
        FOTO SESSION
      </div>
    </section>
  );
}
