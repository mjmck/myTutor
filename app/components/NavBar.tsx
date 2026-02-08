"use client";

import { useState, useEffect } from "react";
import AuthButton from "./AuthButton";

type NavBarProps = {
  title?: string;
  subtitle?: string;
};

export default function NavBar({ title = "myTutor" }: NavBarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-md border-b border-white/10`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-3 min-w-0">
          <h1 className="text-xl font-bold text-white tracking-tight">
            {title}
          </h1>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <a
            href="#"
            className="text-sm text-white/60 hover:text-white transition-colors"
          >
            Home
          </a>
          <a
            href="#editor-section"
            className="text-sm text-white/60 hover:text-white transition-colors"
          >
            Try It
          </a>
        </div>

        {/* Auth Button */}
        <div className="shrink-0">
          <AuthButton />
        </div>
      </div>
    </nav>
  );
}
