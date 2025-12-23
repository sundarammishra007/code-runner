import React from 'react';
import { X, Download, ExternalLink, Rocket } from 'lucide-react';
import { DEPLOYMENT_OPTIONS } from '../constants';

interface DeployModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDownload: () => void;
}

export const DeployModal: React.FC<DeployModalProps> = ({ isOpen, onClose, onDownload }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      
      <div className="relative bg-gray-900 border border-gray-700 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="p-6 border-b border-gray-800 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-500/20 rounded-lg text-purple-400">
              <Rocket size={20} />
            </div>
            <h2 className="text-xl font-bold text-white">Deploy Your App</h2>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="space-y-4">
            <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Step 1: Get the Code</h3>
              <button
                onClick={onDownload}
                className="w-full flex items-center justify-center gap-2 bg-white text-black font-bold py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <Download size={18} />
                Download index.html
              </button>
              <p className="text-xs text-gray-500 mt-2 text-center">
                This file contains your entire application (HTML, CSS, & JS).
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Step 2: Choose a Free Host</h3>
              
              <div className="grid gap-3">
                {DEPLOYMENT_OPTIONS.map((option) => (
                  <div key={option.name} className="bg-gray-800 rounded-xl p-4 border border-gray-700 hover:border-purple-500/50 transition-colors group">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-white">{option.name}</h4>
                      <a 
                        href={option.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-purple-400 hover:text-purple-300"
                      >
                        <ExternalLink size={16} />
                      </a>
                    </div>
                    <p className="text-sm text-gray-400 mb-3">{option.description}</p>
                    <ol className="text-xs text-gray-500 space-y-1 list-decimal list-inside">
                      {option.steps.map((step, idx) => (
                        <li key={idx}>{step}</li>
                      ))}
                    </ol>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
