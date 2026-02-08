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
        <pre className="bg-[#1a0f24] border border-[var(--bubble-border)] rounded-xl p-4 overflow-x-auto my-3">
          <code className={`font-mono text-sm text-[#e9d5ff] ${className || ''}`} {...props}>
            {children}
          </code>
        </pre>
      );
    }
    return (
      <code className="bg-[#1a0f24] px-1.5 py-0.5 rounded font-mono text-sm text-[#e9d5ff]" {...props}>
        {children}
      </code>
    );
  },
};

export default function SuggestionsPanel({ suggestions }: SuggestionsPanelProps) {
  return (
    <section className="flex-1 flex flex-col min-w-0 rounded-[2rem] bg-[var(--bubble-bg)] border border-[var(--bubble-border)] shadow-xl overflow-hidden">
      <div className="px-5 py-3 border-b border-[var(--bubble-border)]">
        <h2 className="text-sm font-semibold text-[var(--accent-red)] uppercase tracking-wider">
          AI Suggestions
        </h2>
      </div>
      <div className="flex-1 min-h-[320px] p-3 overflow-hidden">
        <div className="h-full rounded-2xl border border-[var(--bubble-border)] bg-[#0d0812] p-4 overflow-auto prose prose-invert prose-sm max-w-none prose-pre:bg-[#1a0f24] prose-pre:border prose-pre:border-[var(--bubble-border)] prose-pre:rounded-xl prose-pre:p-4 prose-code:text-[#e9d5ff] prose-code:before:content-none prose-code:after:content-none prose-code:bg-[#1a0f24] prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:font-mono prose-code:text-sm [&>*:not(pre)]:overflow-hidden">
          {suggestions ? (
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
              {suggestions}
            </ReactMarkdown>
          ) : (
            <span className="text-white/40">Suggestions will appear here.</span>
          )}
        </div>
      </div>
    </section>
  );
}
