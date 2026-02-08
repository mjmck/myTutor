"use client";

import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import type { Resource } from './types';
import NavBar from './components/NavBar';
import CodeEditorPanel from './components/CodeEditorPanel';
import SuggestionsPanel from './components/SuggestionsPanel';
import ResourcesSection from './components/ResourcesSection';

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
      <NavBar title="myTutor" />

      <main className="flex-1 p-6 flex gap-6 overflow-hidden">
        <CodeEditorPanel
          code={code}
          onCodeChange={setCode}
          onAnalyze={handleAnalyzeCode}
          loading={loading}
        />
        <SuggestionsPanel suggestions={suggestions} />
      </main>

      <ResourcesSection ref={resourcesSectionRef} resources={resources} />
    </div>
  );
}
