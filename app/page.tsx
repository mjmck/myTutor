"use client";

import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import type { Resource } from './types';
import NavBar from './components/NavBar';
import HeroSection from './components/HeroSection';
import CodeEditorPanel from './components/CodeEditorPanel';
import SuggestionsPanel from './components/SuggestionsPanel';
import ResourcesSection from './components/ResourcesSection';
import Footer from './components/Footer';

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
    <div className="min-h-screen">
      <NavBar title="myTutor" />

      {/* Hero Section */}
      <HeroSection />

      {/* Editor Section */}
      <section id="editor-section" className="relative py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              <span className="text-blue-400">Try It Now</span>
            </h2>
            <p className="text-white/50 max-w-xl mx-auto">
              Paste your code below and get instant AI-powered analysis and suggestions.
            </p>
          </div>

          {/* Editor Panels */}
          <div className="flex flex-col lg:flex-row gap-6">
            <CodeEditorPanel
              code={code}
              onCodeChange={setCode}
              onAnalyze={handleAnalyzeCode}
              loading={loading}
            />
            <SuggestionsPanel suggestions={suggestions} />
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <ResourcesSection ref={resourcesSectionRef} resources={resources} />

      {/* Footer */}
      <Footer />
    </div>
  );
}
