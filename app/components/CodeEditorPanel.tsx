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
            onChange={(value) => onCodeChange(value ?? '')}
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
          onClick={onAnalyze}
          disabled={loading}
          className="rounded-2xl px-6 py-2.5 text-sm font-semibold bg-gradient-to-r from-[#7c3aed] to-[#be123c] text-white shadow-md hover:opacity-90 disabled:opacity-50 transition-opacity"
        >
          {loading ? 'Analyzing…' : 'Analyze & Suggest'}
        </button>
      </div>
    </section>
  );
}
