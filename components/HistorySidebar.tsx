
import React from 'react';
import { Calculation } from '../types';

interface HistorySidebarProps {
  history: Calculation[];
  onClear: () => void;
  onClose: () => void;
}

const HistorySidebar: React.FC<HistorySidebarProps> = ({ history, onClear, onClose }) => {
  return (
    <div className="flex flex-col w-full h-full glass rounded-3xl md:rounded-none md:bg-transparent md:border-none p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <i className="fa-solid fa-clock-rotate-left text-blue-400"></i>
          History
        </h2>
        <div className="flex gap-2">
          <button 
            onClick={onClear}
            className="text-xs text-slate-500 hover:text-red-400 transition-colors uppercase tracking-wider font-bold"
          >
            Clear
          </button>
          <button 
            onClick={onClose}
            className="md:hidden text-slate-400 hover:text-white"
          >
            <i className="fa-solid fa-xmark text-lg"></i>
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 pr-2">
        {history.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-slate-600 opacity-50">
            <i className="fa-solid fa-calculator text-4xl mb-4"></i>
            <p className="text-sm">No recent calculations</p>
          </div>
        ) : (
          history.map((item) => (
            <div 
              key={item.id} 
              className="p-3 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group cursor-pointer"
            >
              <div className="text-slate-500 text-xs mb-1 mono">
                {item.expression} =
              </div>
              <div className="text-white text-lg font-medium mono">
                {item.result}
              </div>
              <div className="text-[10px] text-slate-700 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-6 pt-4 border-t border-white/5 text-[10px] text-slate-600 uppercase tracking-widest text-center">
        NovaCalc v1.0
      </div>
    </div>
  );
};

export default HistorySidebar;
