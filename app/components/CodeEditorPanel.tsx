'use client';

import dynamic from 'next/dynamic';

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), {
  ssr: false
});

type CodeEditorPanelProps = {
  code: string;
  onCodeChange: (value: string) => void;
  onAnalyze: () => void;
  loading: boolean;
};

export default function CodeEditorPanel({ code, onCodeChange, onAnalyze, loading }: CodeEditorPanelProps) {
  return (
    <section className="flex-1 flex flex-col min-w-0 rounded-3xl overflow-hidden glass card-hover">
      {/* Header */}
      <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse" />
          <h2 className="text-sm font-semibold text-blue-400 uppercase tracking-wider">
            Your Code
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-500/50" />
          <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
          <div className="w-2 h-2 rounded-full bg-green-500/50" />
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 min-h-[320px] p-4">
        <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#08080c] h-full shadow-inner">
          <MonacoEditor
            height="100%"
            language="javascript"
            value={code}
            onChange={(value) => onCodeChange(value ?? '')}
            theme="vs-dark"
            options={{
              minimap: { enabled: false },
              padding: { top: 16 },
              fontSize: 14,
              fontFamily: 'var(--font-jetbrains-mono), monospace',
              scrollBeyondLastLine: false,
              renderLineHighlight: 'all',
              cursorBlinking: 'smooth',
              smoothScrolling: true,
            }}
          />
        </div>
      </div>

      {/* Footer with Button */}
      <div className="px-6 py-5 border-t border-white/5">
        <button
          onClick={onAnalyze}
          disabled={loading || !code.trim()}
          className={`group relative w-full sm:w-auto px-8 py-4 rounded-2xl text-sm font-semibold text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden ${
            loading || !code.trim() ? 'bg-blue-500/30' : 'bg-blue-500 hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/25'
          }`}
        >
          <span className="relative flex items-center justify-center gap-3">
            {loading ? (
              <>
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Analyzing…
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Analyze & Suggest
              </>
            )}
          </span>
        </button>
      </div>
    </section>
  );
}
