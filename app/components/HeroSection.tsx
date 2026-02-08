"use client";

import { useRef } from "react";

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);

  const scrollToEditor = () => {
    const editorSection = document.getElementById("editor-section");
    editorSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-[85vh] flex items-center justify-center overflow-hidden"
    >
      {/* Animated Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-float delay-300" />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      {/* Floating Code Snippets */}
      <div className="absolute top-20 left-10 opacity-20 animate-float delay-200 hidden lg:block">
        <pre className="text-xs text-blue-400 font-mono">
          {`const analyze = async (code) => {
  const result = await ai
    .review(code);
  return result;
}`}
        </pre>
      </div>
      <div className="absolute bottom-32 right-10 opacity-20 animate-float delay-400 hidden lg:block">
        <pre className="text-xs text-blue-400 font-mono">
          {`// Optimize detected
function refactor() {
  return cleaner();
}`}
        </pre>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 text-center">
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 animate-fade-in-up mt-12"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
          </span>
          <span className="text-sm text-white/80">
            AI-Powered Code Analysis
          </span>
        </div>

        {/* Main Headline */}
        <h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 animate-fade-in-up delay-100"
        >
          <span className="text-blue-400">Code Smarter.</span>
          <br />
          <span className="text-white">Ship Better.</span>
        </h1>

        {/* Subtitle */}
        <p
          className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up delay-200"
        >
          Transform your code with intelligent AI analysis. Get instant
          refactoring suggestions, detect bugs, and learn best practices—all in
          real-time.
        </p>

        {/* CTA Button */}
        <div
          className="animate-fade-in-up delay-300"
        >
          <button
            onClick={scrollToEditor}
            className="group relative px-8 py-4 bg-blue-500 rounded-2xl font-semibold text-white shadow-lg hover:bg-blue-600 hover:shadow-blue-500/25 transition-all duration-300"
          >
            <span className="relative z-10 flex items-center gap-2">
              Start Analyzing
              <svg
                className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </span>
          </button>
        </div>

        {/* Stats */}
        <div
          className="grid grid-cols-3 gap-8 max-w-lg mx-auto mt-16 animate-fade-in-up delay-400"
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-400">10x</div>
            <div className="text-sm text-white/50 mt-1">Faster Reviews</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-400">24/7</div>
            <div className="text-sm text-white/50 mt-1">Availability</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-400">Free</div>
            <div className="text-sm text-white/50 mt-1">To Get Started</div>
          </div>
        </div>
      </div>
    </section>
  );
}
