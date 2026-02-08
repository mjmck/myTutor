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
        className="shrink-0 w-full px-6 pb-8 pt-2"
        aria-label="Helpful resources"
      >
        <div className="max-w-4xl mx-auto rounded-2xl bg-[var(--bubble-bg)] border border-[var(--bubble-border)] shadow-lg p-5">
          <h2 className="text-sm font-semibold text-[var(--accent-purple)] uppercase tracking-wider mb-3">
            Helpful resources
          </h2>
          <p className="text-sm text-[var(--foreground)]/70 mb-4">
            Links that may help you understand the concepts behind the suggestions above.
          </p>
          <ul className="space-y-2">
            {resources.map((r, i) => (
              <li key={i}>
                <a
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[var(--accent-purple)] hover:text-[var(--accent-red)] underline underline-offset-2 transition-colors"
                >
                  {r.title}
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
