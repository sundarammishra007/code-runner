import React, { useEffect, useRef } from 'react';
import { RefreshCw } from 'lucide-react';

interface LivePreviewProps {
  code: string;
}

export const LivePreview: React.FC<LivePreviewProps> = ({ code }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (iframeRef.current) {
      const doc = iframeRef.current.contentDocument;
      if (doc) {
        doc.open();
        doc.write(code);
        doc.close();
      }
    }
  }, [code]);

  return (
    <div className="w-full h-full bg-white flex flex-col relative group">
       <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
         <button 
           className="bg-gray-900 text-white p-2 rounded-full shadow-lg hover:bg-black transition-colors"
           onClick={() => {
             if (iframeRef.current) {
               // Force refresh by re-writing code
                const doc = iframeRef.current.contentDocument;
                if (doc) {
                    doc.open();
                    doc.write(code);
                    doc.close();
                }
             }
           }}
           title="Reload Frame"
         >
           <RefreshCw size={14} />
         </button>
       </div>
      <iframe
        ref={iframeRef}
        title="Live Preview"
        className="w-full h-full border-none bg-white"
        sandbox="allow-scripts allow-modals allow-forms allow-popups allow-same-origin allow-downloads"
      />
    </div>
  );
};
