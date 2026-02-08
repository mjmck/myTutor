'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type SuggestionsPanelProps = {
  suggestions: string;
};

const markdownComponents = {
  code({ className, children, ...props }: React.ComponentProps<'code'>) {
    const match = /language-(\w+)/.exec(className || '');
    const isBlock = match || String(children).includes('\n');
    if (isBlock) {
      return (
        <pre className="bg-[#0d0d12] border border-white/10 rounded-xl p-4 overflow-x-auto my-3">
          <code className={`font-mono text-sm text-blue-300 ${className || ''}`} {...props}>
            {children}
          </code>
        </pre>
      );
    }
    return (
      <code className="bg-[#0d0d12] px-2 py-1 rounded-md font-mono text-sm text-blue-300 border border-white/5" {...props}>
        {children}
      </code>
    );
  },
};

export default function SuggestionsPanel({ suggestions }: SuggestionsPanelProps) {
  return (
    <section className="flex-1 flex flex-col min-w-0 rounded-3xl overflow-hidden glass card-hover">
      {/* Header */}
      <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-orange-500 animate-pulse" />
          <h2 className="text-sm font-semibold text-orange-400 uppercase tracking-wider">
            AI Suggestions
          </h2>
        </div>
        {suggestions && (
          <div className="flex items-center gap-2 text-xs text-white/40">
            <span className="w-2 h-2 rounded-full bg-green-500/50" />
            Ready
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-h-[320px] p-4 overflow-hidden">
        <div className="h-full rounded-2xl border border-white/5 bg-[#08080c] p-5 overflow-auto">
          {suggestions ? (
            <div className="prose prose-invert prose-sm max-w-none prose-headings:text-white prose-p:text-white/70 prose-strong:text-white prose-ul:text-white/70 prose-ol:text-white/70 prose-li:text-white/70 prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline prose-pre:bg-[#0d0d12] prose-pre:border prose-pre:border-white/10 prose-pre:rounded-xl prose-pre:p-4 prose-code:text-blue-300 prose-code:before:content-none prose-code:after:content-none prose-code:bg-[#0d0d12] prose-code:px-2 prose-code:py-1 prose-code:rounded-md prose-code:font-mono prose-code:text-sm prose-code:border prose-code:border-white/5">
              <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
                {suggestions}
              </ReactMarkdown>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-8">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-blue-500/10 rounded-full blur-2xl" />
                <svg className="relative w-16 h-16 text-white/20 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white/60 mb-2">No suggestions yet</h3>
              <p className="text-sm text-white/40 max-w-xs">
                Paste your code and click "Analyze & Suggest" to get AI-powered recommendations.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
