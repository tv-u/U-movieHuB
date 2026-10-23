import React, { useState } from 'react';
import { Search, Film, Bookmark, Share2, Menu, X, Compass, Tv, HelpCircle, ArrowLeft } from 'lucide-react';
import { LanguageSelector } from './LanguageSelector';

interface HeaderProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  currentLanguage: string;
  onLanguageChange: (language: string) => void;
  onOpenSearch: () => void;
  watchlistCount: number;
  onShare: () => void;
  canGoBack?: boolean;
  onBack?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onTabChange,
  currentLanguage,
  onLanguageChange,
  onOpenSearch,
  watchlistCount,
  onShare,
  canGoBack = false,
  onBack,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Film },
    { id: 'categories', label: '100 Categories', icon: Compass },
    { id: 'movies', label: 'Movies Archive', icon: Film },
    { id: 'tv', label: 'TV Series', icon: Tv },
    { id: 'discover', label: 'Search Results', icon: Compass },
    { id: 'watchlist', label: 'Watchlist', icon: Bookmark, badge: watchlistCount },
    { id: 'faq', label: 'FAQ', icon: HelpCircle },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0a0a0a]/95 backdrop-blur-md border-b border-[#23252c] transition-all">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-3">
        {/* Brand / Logo + Universal Back Button */}
        <div className="flex items-center gap-3 sm:gap-6">
          {canGoBack && onBack && (
            <button
              onClick={onBack}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#ff003c]/20 hover:bg-[#ff003c] text-white border border-[#ff003c]/50 text-xs font-bold transition-all shadow-md group shrink-0"
              title="Go back to previous page"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              <span className="hidden xs:inline">Back</span>
            </button>
          )}

          <button
            onClick={() => {
              onTabChange('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 group text-left shrink-0"
          >
            <div className="flex items-center text-lg sm:text-2xl font-black tracking-widest text-white uppercase select-none">
              <span>U</span>
              <span className="text-[#E50914] mx-1 font-bold">▶</span>
              <span className="text-white">MOVIE</span>
              <span className="text-[#E50914] ml-1">HUB</span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1.5">
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`relative px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                    isActive
                      ? 'text-white bg-[#1a1b1f] border border-[#2e303b]'
                      : 'text-slate-300 hover:text-white hover:bg-[#141414]'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    {item.label}
                    {item.badge !== undefined && item.badge > 0 && (
                      <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-[#E50914] text-white font-mono">
                        {item.badge}
                      </span>
                    )}
                  </span>
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#E50914] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Right Action Controls */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Search Trigger */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-3 sm:px-3.5 py-2 rounded-full bg-[#181818] hover:bg-[#222222] border border-[#3d3d3d] text-xs text-slate-300 hover:text-white transition-all shadow-sm group"
            title="Search movies and series"
          >
            <Search className="w-3.5 h-3.5 text-[#E50914] group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline text-slate-300">Search movies & TV series...</span>
            <span className="hidden xl:inline text-[10px] bg-[#2a2a2a] px-1.5 py-0.5 rounded text-slate-400 font-mono">
              /
            </span>
          </button>

          {/* Language Selector */}
          <LanguageSelector
            currentLanguage={currentLanguage}
            onLanguageChange={onLanguageChange}
          />

          {/* Share Button */}
          <button
            onClick={onShare}
            className="p-2 rounded-full bg-[#181818] hover:bg-[#222222] border border-[#3d3d3d] text-slate-300 hover:text-white transition-colors"
            title="Share U-MOVIE HUB"
          >
            <Share2 className="w-4 h-4" />
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-[#181818] border border-[#3d3d3d] text-slate-300 hover:text-white"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#23252c] bg-[#101010] px-4 pt-3 pb-5 space-y-1 shadow-2xl animate-in slide-in-from-top-2 duration-150">
          {canGoBack && onBack && (
            <button
              onClick={() => {
                onBack();
                setMobileMenuOpen(false);
              }}
              className="w-full mb-2 flex items-center gap-2.5 px-3 py-2.5 rounded-lg bg-[#ff003c]/20 text-[#ff003c] font-bold text-sm border border-[#ff003c]/40"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Previous Page</span>
            </button>
          )}

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onTabChange(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-[#E50914]/15 text-[#E50914] font-semibold'
                    : 'text-slate-300 hover:bg-[#181818] hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-[#E50914] text-white font-mono">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
