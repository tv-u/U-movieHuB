import React, { useState } from 'react';
import { ENTERTAINMENT_CATEGORIES, CategoryItem } from '../data/categories';
import { Search, Film, Sparkles, Filter, ArrowRight, Grid, Flame, ArrowLeft } from 'lucide-react';
import { Movie } from '../types/movie';

interface CategoriesPageProps {
  onSelectCategory: (category: CategoryItem) => void;
  onBack?: () => void;
}

export const CategoriesPage: React.FC<CategoriesPageProps> = ({ onSelectCategory, onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCategories = ENTERTAINMENT_CATEGORIES.filter(cat => 
    cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cat.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cat.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Back button bar */}
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

      {/* Header Banner */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ff003c]/15 border border-[#ff003c]/30 text-[#ff003c] text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>100 Global Entertainment Categories</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Explore Cinema by Genre & Micro-Themes
        </h1>
        <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
          From mainstream Hollywood and Bollywood mass cinema to zero-competition niche genres like Cyberpunk, Nordic Noir, Dual Audio 5.1, and IMAX Enhanced.
        </p>

        {/* Search Categories Input */}
        <div className="max-w-md mx-auto pt-4 relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search 100 categories (e.g. Hindi, Cyberpunk, 4K)..."
            className="w-full pl-12 pr-4 py-3 bg-[#13151f] border border-[#232738] focus:border-[#ff003c] rounded-full text-white placeholder-slate-500 text-sm outline-none shadow-xl transition-all"
          />
        </div>
      </div>

      {/* Categories Stats Bar */}
      <div className="flex items-center justify-between border-b border-[#1f2233] pb-3 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <Grid className="w-4 h-4 text-[#ff003c]" />
          <span>Showing <strong>{filteredCategories.length}</strong> of 100 Categories</span>
        </div>
        <span className="hidden sm:inline">Click any category to browse catalog</span>
      </div>

      {/* 100 Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5">
        {filteredCategories.map((cat, index) => (
          <div
            key={cat.id}
            onClick={() => onSelectCategory(cat)}
            className="group p-4 rounded-2xl bg-[#12141c] hover:bg-[#1a1c28] border border-[#202334] hover:border-[#ff003c]/50 cursor-pointer transition-all duration-200 shadow-md hover:shadow-xl hover:-translate-y-0.5 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="text-2xl" role="img" aria-label={cat.name}>
                  {cat.icon}
                </span>
                <span className="text-[10px] font-mono text-slate-500 group-hover:text-[#ff003c] bg-[#1a1c26] px-2 py-0.5 rounded-full">
                  #{index + 1}
                </span>
              </div>
              <h3 className="font-bold text-sm text-white group-hover:text-[#ff003c] transition-colors line-clamp-1">
                {cat.name}
              </h3>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                {cat.description}
              </p>
            </div>

            <div className="flex items-center justify-between pt-3 mt-2 border-t border-[#1a1d2a] text-[11px]">
              <span className="text-slate-500">{cat.count.toLocaleString()} titles</span>
              <span className="text-[#ff003c] font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Explore <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
