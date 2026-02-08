'use client';

import { forwardRef } from 'react';
import type { Resource } from '../types';

type ResourcesSectionProps = {
  resources: Resource[];
};

const ResourcesSection = forwardRef<HTMLDivElement, ResourcesSectionProps>(
  function ResourcesSection({ resources }, ref) {
    if (resources.length === 0) return null;

    return (
      <section
        ref={ref}
        className="shrink-0 w-full px-4 sm:px-6 pb-12 pt-4"
        aria-label="Helpful resources"
      >
        <div className="max-w-4xl mx-auto rounded-3xl glass p-6 sm:p-8 glow-border">
          <div className="flex items-start gap-4 mb-6">
            <div className="relative flex-shrink-0">
              <div className="absolute inset-0 bg-blue-500/10 rounded-full blur-xl" />
              <div className="relative w-12 h-12 rounded-2xl bg-blue-500 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white mb-2">Helpful Resources</h2>
              <p className="text-sm text-white/50">
                Curated links to help you understand the concepts behind the suggestions above.
              </p>
            </div>
          </div>
          <ul className="space-y-3">
            {resources.map((r, i) => (
              <li key={i}>
                <a
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-blue-500/30 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>
                  <span className="flex-1 text-sm text-white/80 group-hover:text-white transition-colors">
                    {r.title}
                  </span>
                  <svg className="w-4 h-4 text-white/30 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  }
);

export default ResourcesSection;
