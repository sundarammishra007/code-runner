import React, { useState, useEffect } from 'react';
import { Rocket, Code2, MonitorPlay, Check, AlertCircle, Save, FolderOpen } from 'lucide-react';
import { CodeEditor } from './components/CodeEditor';
import { LivePreview } from './components/LivePreview';
import { AIAssistant } from './components/AIAssistant';
import { DeployModal } from './components/DeployModal';
import { generateCode } from './services/geminiService';
import { INITIAL_CODE } from './constants';
import { AppStatus } from './types';

function App() {
  const [code, setCode] = useState<string>(INITIAL_CODE);
  const [status, setStatus] = useState<AppStatus>(AppStatus.IDLE);
  const [isDeployModalOpen, setIsDeployModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
  const [notification, setNotification] = useState<string | null>(null);
  
  // Mobile check
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 2500);
  };

  const handleGenerate = async (prompt: string) => {
    setStatus(AppStatus.GENERATING);
    try {
      const generatedCode = await generateCode(prompt, code);
      setCode(generatedCode);
      setStatus(AppStatus.SUCCESS);
      if (isMobile) {
        setActiveTab('preview');
      }
      setTimeout(() => setStatus(AppStatus.IDLE), 2000);
    } catch (error) {
      console.error(error);
      setStatus(AppStatus.ERROR);
      setTimeout(() => setStatus(AppStatus.IDLE), 3000);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([code], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'index.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleSave = () => {
    localStorage.setItem('gemini_runner_saved_code', code);
    showNotification('Code saved locally');
  };

  const handleLoad = () => {
    const savedCode = localStorage.getItem('gemini_runner_saved_code');
    if (savedCode) {
      if (window.confirm('This will overwrite your current code with the saved version. Continue?')) {
        setCode(savedCode);
        showNotification('Saved code loaded');
      }
    } else {
      showNotification('No saved code found');
    }
  };

  return (
    <div className="h-screen w-screen bg-[#0d1117] text-white flex flex-col overflow-hidden">
      {/* Header */}
      <header className="h-16 border-b border-gray-800 bg-[#0d1117] flex items-center justify-between px-6 z-20 shrink-0">
        <div className="flex items-center gap-2">
          <div className="bg-purple-600 p-1.5 rounded-lg">
            <Code2 size={20} className="text-white" />
          </div>
          <span className="font-bold text-lg tracking-tight">Gemini<span className="text-purple-400">Runner</span></span>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
           {/* Status / Notification Area */}
           <div className="mr-2 hidden sm:flex items-center h-full min-w-[100px] justify-end">
             {notification ? (
               <span className="flex items-center gap-1 text-blue-400 text-sm animate-in fade-in duration-300">
                 <Check size={14} /> {notification}
               </span>
             ) : (
               <>
                 {status === AppStatus.SUCCESS && (
                   <span className="flex items-center gap-1 text-green-400 text-sm animate-in fade-in duration-300">
                     <Check size={14} /> Generated
                   </span>
                 )}
                 {status === AppStatus.ERROR && (
                   <span className="flex items-center gap-1 text-red-400 text-sm animate-in fade-in duration-300">
                     <AlertCircle size={14} /> Error
                   </span>
                 )}
               </>
             )}
           </div>

          <button
            onClick={handleLoad}
            className="flex items-center gap-2 text-gray-400 hover:text-white px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors text-sm"
            title="Load from Local Storage"
          >
            <FolderOpen size={18} />
            <span className="hidden sm:inline">Load</span>
          </button>

          <button
            onClick={handleSave}
            className="flex items-center gap-2 text-gray-400 hover:text-white px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors text-sm"
            title="Save to Local Storage"
          >
            <Save size={18} />
            <span className="hidden sm:inline">Save</span>
          </button>
          
          <div className="h-6 w-px bg-gray-800 mx-1 hidden sm:block"></div>

          <button
            onClick={() => setIsDeployModalOpen(true)}
            className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-lg font-bold hover:bg-gray-200 transition-colors text-sm"
          >
            <Rocket size={16} />
            <span className="hidden sm:inline">Deploy</span>
            <span className="sm:hidden">Deploy</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex overflow-hidden relative">
        {/* Mobile Tabs */}
        {isMobile && (
          <div className="absolute top-0 left-0 right-0 h-10 bg-gray-900 border-b border-gray-800 flex z-20">
            <button 
              className={`flex-1 flex items-center justify-center gap-2 text-sm font-medium ${activeTab === 'editor' ? 'text-white bg-gray-800' : 'text-gray-500'}`}
              onClick={() => setActiveTab('editor')}
            >
              <Code2 size={14} /> Editor
            </button>
            <button 
              className={`flex-1 flex items-center justify-center gap-2 text-sm font-medium ${activeTab === 'preview' ? 'text-white bg-gray-800' : 'text-gray-500'}`}
              onClick={() => setActiveTab('preview')}
            >
              <MonitorPlay size={14} /> Preview
            </button>
          </div>
        )}

        {/* Editor Pane */}
        <div 
          className={`
            ${isMobile ? (activeTab === 'editor' ? 'flex' : 'hidden') : 'flex w-1/2'} 
            ${isMobile ? 'pt-10' : ''}
            flex-col border-r border-gray-800 h-full transition-all duration-300
          `}
        >
          <CodeEditor code={code} onChange={setCode} />
        </div>

        {/* Preview Pane */}
        <div 
          className={`
            ${isMobile ? (activeTab === 'preview' ? 'flex' : 'hidden') : 'flex w-1/2'}
            ${isMobile ? 'pt-10' : ''}
            flex-col bg-black h-full transition-all duration-300
          `}
        >
          <LivePreview code={code} />
        </div>
      </main>

      {/* AI Assistant Bar */}
      <AIAssistant status={status} onGenerate={handleGenerate} />

      {/* Modals */}
      <DeployModal 
        isOpen={isDeployModalOpen} 
        onClose={() => setIsDeployModalOpen(false)}
        onDownload={handleDownload}
      />
    </div>
  );
}

export default App;