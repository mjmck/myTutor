"use client";

import { useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), {
  ssr: false
});

type Resource = { title: string; url: string };

export default function Home() {
  const [code, setCode] = useState('');
  const [suggestions, setSuggestions] = useState('');
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(false);
  const resourcesSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (resources.length > 0 && resourcesSectionRef.current) {
      requestAnimationFrame(() => {
        resourcesSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  }, [resources]);

  const handleAnalyzeCode = async () => {
    setLoading(true);
    setSuggestions('');
    setResources([]);
    try {
      const res = await axios.post('/api/analyzeCode', { code });
      const data = res.data;
      if (data && typeof data === 'object' && 'suggestions' in data && Array.isArray(data.resources)) {
        setSuggestions(data.suggestions ?? '');
        setResources(data.resources ?? []);
      } else {
        setSuggestions(typeof data === 'string' ? data : JSON.stringify(data, null, 2));
      }
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error) && error.response?.data) {
        const d = error.response.data;
        const msg = d.error ?? 'Error analyzing code.';
        const details = d.details ? `\n\nDetails: ${typeof d.details === 'string' ? d.details : JSON.stringify(d.details)}` : '';
        setSuggestions(`${msg}${details}`);
      } else {
        setSuggestions('Error analyzing code. Check the console for details.');
      }
      setResources([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      {/* Nav bar with purple/red gradient and title */}
      <nav className="shrink-0 w-full px-6 py-4 bg-gradient-to-r from-[#6b21a8] via-[#7c3aed] to-[#be123c] shadow-lg">
        <h1 className="text-2xl font-bold text-white tracking-tight font-sans drop-shadow-sm">
          AI Code Refactor
        </h1>
        <p className="text-sm text-white/80 mt-0.5">
          Paste code • Get suggestions
        </p>
      </nav>

      {/* Main two-column layout: LHS input, RHS suggestions */}
      <main className="flex-1 p-6 flex gap-6 overflow-hidden">
        {/* LHS: User input (bubble panel) */}
        <section className="flex-1 flex flex-col min-w-0 rounded-[2rem] bg-[var(--bubble-bg)] border border-[var(--bubble-border)] shadow-xl overflow-hidden">
          <div className="px-5 py-3 border-b border-[var(--bubble-border)]">
            <h2 className="text-sm font-semibold text-[var(--accent-purple)] uppercase tracking-wider">
              Your code
            </h2>
          </div>
          <div className="flex-1 min-h-[320px] p-3">
            <div className="rounded-2xl overflow-hidden border border-[var(--bubble-border)] bg-[#0d0812] h-full">
              <MonacoEditor
                height="100%"
                language="javascript"
                value={code}
                onChange={(value) => setCode(value ?? '')}
                theme="vs-dark"
                options={{
                  minimap: { enabled: false },
                  padding: { top: 12 },
                  fontSize: 14,
                  fontFamily: 'var(--font-jetbrains-mono), monospace',
                }}
              />
            </div>
          </div>
          <div className="px-5 py-4 border-t border-[var(--bubble-border)]">
            <button
              onClick={handleAnalyzeCode}
              disabled={loading}
              className="rounded-2xl px-6 py-2.5 text-sm font-semibold bg-gradient-to-r from-[#7c3aed] to-[#be123c] text-white shadow-md hover:opacity-90 disabled:opacity-50 transition-opacity"
            >
              {loading ? 'Analyzing…' : 'Analyze & Suggest'}
            </button>
          </div>
        </section>

        {/* RHS: AI Suggestions (bubble panel) */}
        <section className="flex-1 flex flex-col min-w-0 rounded-[2rem] bg-[var(--bubble-bg)] border border-[var(--bubble-border)] shadow-xl overflow-hidden">
          <div className="px-5 py-3 border-b border-[var(--bubble-border)]">
            <h2 className="text-sm font-semibold text-[var(--accent-red)] uppercase tracking-wider">
              AI Suggestions
            </h2>
          </div>
          <div className="flex-1 min-h-[320px] p-3 overflow-hidden">
            <div className="h-full rounded-2xl border border-[var(--bubble-border)] bg-[#0d0812] p-4 overflow-auto prose prose-invert prose-sm max-w-none prose-pre:bg-[#1a0f24] prose-pre:border prose-pre:border-[var(--bubble-border)] prose-pre:rounded-xl prose-pre:p-4 prose-code:text-[#e9d5ff] prose-code:before:content-none prose-code:after:content-none prose-code:bg-[#1a0f24] prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:font-mono prose-code:text-sm [&>*:not(pre)]:overflow-hidden">
              {suggestions ? (
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    code({ className, children, ...props }) {
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
                  }}
                >
                  {suggestions}
                </ReactMarkdown>
              ) : (
                <span className="text-white/40">Suggestions will appear here after you run analysis.</span>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Helpful resources – scroll into view after suggestions load */}
      {resources.length > 0 && (
        <section
          ref={resourcesSectionRef}
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
      )}
    </div>
  );
}
