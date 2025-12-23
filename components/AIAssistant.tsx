import React, { useState } from 'react';
import { Sparkles, ArrowUp, Loader2 } from 'lucide-react';
import { AppStatus } from '../types';

interface AIAssistantProps {
  status: AppStatus;
  onGenerate: (prompt: string) => void;
}

export const AIAssistant: React.FC<AIAssistantProps> = ({ status, onGenerate }) => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && status !== AppStatus.GENERATING) {
      onGenerate(prompt);
      setPrompt('');
    }
  };

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 w-full max-w-2xl px-4 z-50">
      <form 
        onSubmit={handleSubmit}
        className="relative group"
      >
        <div className={`absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-xl blur opacity-30 group-hover:opacity-60 transition duration-1000 ${status === AppStatus.GENERATING ? 'animate-pulse' : ''}`}></div>
        
        <div className="relative flex items-center bg-gray-900 rounded-xl border border-gray-700 shadow-2xl overflow-hidden">
          <div className="pl-4 text-purple-400">
            {status === AppStatus.GENERATING ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <Sparkles size={20} />
            )}
          </div>
          
          <input
            type="text"
            className="w-full bg-transparent text-white p-4 focus:outline-none placeholder-gray-500 font-medium"
            placeholder={status === AppStatus.GENERATING ? "Dreaming up code..." : "Describe an app to build (e.g., 'A pomodoro timer with cyberpunk style')"}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={status === AppStatus.GENERATING}
          />
          
          <button 
            type="submit"
            disabled={!prompt.trim() || status === AppStatus.GENERATING}
            className="mr-2 p-2 rounded-lg bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <ArrowUp size={20} />
          </button>
        </div>
      </form>
    </div>
  );
};
