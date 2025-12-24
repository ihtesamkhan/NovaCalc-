
import React, { useState } from 'react';
import Calculator from './components/Calculator';
import HistorySidebar from './components/HistorySidebar';
import { Calculation } from './types';

const App: React.FC = () => {
  const [history, setHistory] = useState<Calculation[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  const addToHistory = (calc: Calculation) => {
    setHistory(prev => [calc, ...prev].slice(0, 50));
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-[#0f172a] overflow-hidden">
      {/* Dynamic Background Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />

      <main className="relative z-10 w-full max-w-5xl px-4 flex flex-col md:flex-row items-stretch justify-center gap-6 h-[90vh]">
        
        {/* Mobile Sidebar Toggle */}
        <div className="md:hidden flex justify-end mb-2">
          <button 
            onClick={() => setIsHistoryOpen(!isHistoryOpen)}
            className="p-3 glass rounded-2xl text-white hover:bg-white/10 transition-colors"
          >
            <i className={`fa-solid ${isHistoryOpen ? 'fa-xmark' : 'fa-history'}`}></i>
          </button>
        </div>

        {/* Left/Overlay: History Sidebar */}
        <div className={`
          ${isHistoryOpen ? 'flex' : 'hidden md:flex'} 
          fixed inset-0 z-50 md:relative md:inset-auto h-full w-full md:w-80 
          bg-[#0f172a]/95 md:bg-transparent transition-all duration-300
        `}>
          <HistorySidebar 
            history={history} 
            onClear={clearHistory} 
            onClose={() => setIsHistoryOpen(false)}
          />
        </div>

        {/* Center: Main Calculator */}
        <div className="flex-1 flex items-center justify-center">
          <Calculator onCalculate={addToHistory} />
        </div>

        {/* Right side spacer for balance on desktop */}
        <div className="hidden lg:block w-80"></div>
      </main>
    </div>
  );
};

export default App;
