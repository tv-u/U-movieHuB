import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { SUPPORTED_LANGUAGES } from '../data/movies';

interface LanguageSelectorProps {
  currentLanguage: string;
  onLanguageChange: (language: string) => void;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  currentLanguage,
  onLanguageChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentLangObj = SUPPORTED_LANGUAGES.find(l => l.name === currentLanguage) || {
    name: 'All Languages',
    code: 'all',
    flag: '🌐',
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#141620] hover:bg-[#1d202e] border border-[#232738] text-xs font-medium text-slate-200 transition-colors whitespace-nowrap shrink-0"
        aria-label="Select Language"
        aria-expanded={isOpen}
      >
        <Globe className="w-3.5 h-3.5 text-[#ff003c]" />
        <span className="hidden sm:inline">{currentLangObj.flag}</span>
        <span className="max-w-[85px] truncate">{currentLanguage === 'All' ? 'Language' : currentLanguage}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 py-1.5 bg-[#12141c] border border-[#232738] rounded-xl shadow-2xl z-50 backdrop-blur-md">
          <div className="px-3 py-1.5 border-b border-[#1f2230] text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Select Language
          </div>
          <button
            onClick={() => {
              onLanguageChange('All');
              setIsOpen(false);
            }}
            className="w-full flex items-center justify-between px-3 py-2 text-xs text-left hover:bg-[#1b1e2b] transition-colors"
          >
            <span className="flex items-center gap-2 text-slate-200">
              <span>🌐</span> All Languages
            </span>
            {currentLanguage === 'All' && <Check className="w-3.5 h-3.5 text-[#ff003c]" />}
          </button>
          <div className="max-h-60 overflow-y-auto no-scrollbar">
            {SUPPORTED_LANGUAGES.map((lang) => {
              const isSelected = currentLanguage === lang.name;
              return (
                <button
                  key={lang.code}
                  onClick={() => {
                    onLanguageChange(lang.name);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 text-xs text-left hover:bg-[#1b1e2b] transition-colors ${
                    isSelected ? 'text-[#ff003c] font-medium bg-[#ff003c]/10' : 'text-slate-300'
                  }`}
                >
                  <span className="flex items-center gap-2 truncate">
                    <span>{lang.flag}</span>
                    <span>{lang.name}</span>
                  </span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-[#ff003c] shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
