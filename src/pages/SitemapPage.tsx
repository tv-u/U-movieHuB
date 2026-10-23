import React from 'react';
import { INITIAL_MOVIES } from '../data/movies';
import { ENTERTAINMENT_CATEGORIES } from '../data/categories';
import { Movie } from '../types/movie';
import { Globe, Film, Layers, CheckCircle2, ExternalLink, ArrowLeft } from 'lucide-react';

interface SitemapPageProps {
  onSelectMovie: (movie: Movie) => void;
  onNavigateTab: (tab: string) => void;
  onBack?: () => void;
}

export const SitemapPage: React.FC<SitemapPageProps> = ({ onSelectMovie, onNavigateTab, onBack }) => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {onBack && (
        <div className="flex items-center">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#141622] hover:bg-[#ff003c] border border-[#232738] text-white text-xs font-bold transition-all shadow-md group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            <span>Back to Home</span>
          </button>
        </div>
      )}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Google & Search Engine Sitemaps</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white">
          U-MOVIE HUB XML & HTML Sitemaps
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
          Complete index of all movies, TV shows, and 100 entertainment categories for search engine crawling and fast Google indexing.
        </p>
        <div className="pt-2">
          <a
            href="/sitemap.xml"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1a1c26] hover:bg-[#ff003c] text-slate-300 hover:text-white border border-[#262a3c] text-xs font-semibold transition-all"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>View Raw XML Sitemap (/sitemap.xml)</span>
            <ExternalLink className="w-3 h-3 ml-1" />
          </a>
        </div>
      </div>

      {/* Movies Sitemap Grid */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2 border-b border-[#232534] pb-2">
          <Film className="w-4 h-4 text-[#ff003c]" />
          <span>Index of All Movies ({INITIAL_MOVIES.length} Verified Records)</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5">
          {INITIAL_MOVIES.map((movie) => (
            <div
              key={movie.id}
              onClick={() => onSelectMovie(movie)}
              className="p-3 rounded-xl bg-[#12141c] hover:bg-[#1a1d2a] border border-[#1e2233] hover:border-[#ff003c]/40 cursor-pointer transition-all flex items-center justify-between"
            >
              <div className="min-w-0 pr-2">
                <h4 className="text-xs font-bold text-white truncate hover:text-[#ff003c]">
                  {movie.title}
                </h4>
                <div className="text-[10px] text-slate-400">
                  {movie.year} · {movie.language} · TMDB #{movie.id}
                </div>
              </div>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#1e2233] text-slate-400 font-mono shrink-0">
                /movie/{movie.id}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 100 Categories Sitemap */}
      <div className="space-y-4 pt-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2 border-b border-[#232534] pb-2">
          <Layers className="w-4 h-4 text-[#ff003c]" />
          <span>Index of 100 Entertainment Categories & Genres</span>
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
          {ENTERTAINMENT_CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onNavigateTab('categories')}
              className="p-2.5 rounded-lg bg-[#12141c] hover:bg-[#1a1d2a] border border-[#1e2233] hover:border-[#ff003c]/40 cursor-pointer transition-all flex items-center gap-2"
            >
              <span className="text-base">{cat.icon}</span>
              <span className="text-xs text-slate-300 font-medium truncate">{cat.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
