import React, { useState, useEffect } from 'react';
import { Search, Filter, SlidersHorizontal, Film, Tv, Sparkles, X, ChevronRight, ArrowLeft } from 'lucide-react';
import { Movie } from '../types/movie';
import { MovieCard } from '../components/MovieCard';
import { MovieService } from '../services/tmdb';
import { GENRE_LIST, SUPPORTED_LANGUAGES } from '../data/movies';
import { AdsterraBanner } from '../components/AdsterraBanner';

interface DiscoverPageProps {
  onSelectMovie: (movie: Movie) => void;
  initialType?: string;
  initialGenre?: string;
  onBack?: () => void;
}

export const DiscoverPage: React.FC<DiscoverPageProps> = ({
  onSelectMovie,
  initialType = 'All',
  initialGenre = 'All',
  onBack,
}) => {
  const [query, setQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>(initialType);
  const [selectedGenre, setSelectedGenre] = useState<string>(initialGenre);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'rating' | 'year' | 'title'>('rating');
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    async function filterCatalog() {
      let results = await MovieService.searchMovies(query, selectedGenre, selectedLanguage, selectedType);
      
      // Sort results
      if (sortBy === 'rating') {
        results.sort((a, b) => b.rating - a.rating);
      } else if (sortBy === 'year') {
        results.sort((a, b) => b.year - a.year);
      } else if (sortBy === 'title') {
        results.sort((a, b) => a.title.localeCompare(b.title));
      }

      setMovies(results);
    }
    filterCatalog();
  }, [query, selectedType, selectedGenre, selectedLanguage, sortBy]);

  const clearFilters = () => {
    setQuery('');
    setSelectedType('All');
    setSelectedGenre('All');
    setSelectedLanguage('All');
    setSortBy('rating');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Page Title & Back Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            {onBack && (
              <button
                onClick={onBack}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#141622] hover:bg-[#ff003c] border border-[#232738] text-white text-xs font-bold transition-all shadow-md group shrink-0"
                title="Go back"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                <span>Back</span>
              </button>
            )}
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
              <span>Discover Entertainment</span>
              <span className="text-xs px-2.5 py-1 rounded-full bg-[#ff003c]/15 text-[#ff003c] font-mono font-bold">
                {movies.length} {movies.length === 1 ? 'Title' : 'Titles'}
              </span>
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Search and filter by category, language, release year, and TMDB rating
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search titles or cast..."
            className="w-full bg-[#13151f] border border-[#232738] rounded-xl pl-9 pr-8 py-2 text-xs text-white placeholder-slate-400 outline-none focus:border-[#ff003c]"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Filter Control Bar */}
      <div className="p-4 rounded-2xl bg-[#11131c] border border-[#1f2230] space-y-4 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#1b1e2c]">
          {/* Content Type Selector */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#171924] border border-[#252838]">
            {['All', 'Movies', 'Series'].map((t) => (
              <button
                key={t}
                onClick={() => setSelectedType(t)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedType === t
                    ? 'bg-[#ff003c] text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Sort:</span>
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-[#171924] border border-[#252838] text-xs text-white rounded-lg px-2.5 py-1.5 outline-none cursor-pointer"
            >
              <option value="rating">Highest Rated</option>
              <option value="year">Newest Release</option>
              <option value="title">Alphabetical (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Genre Chips */}
        <div className="space-y-1.5">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Genre:
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
            {GENRE_LIST.map((genre) => (
              <button
                key={genre}
                onClick={() => setSelectedGenre(genre)}
                className={`text-xs px-2.5 py-1 rounded-lg whitespace-nowrap transition-colors ${
                  selectedGenre === genre
                    ? 'bg-[#ff003c] text-white font-medium'
                    : 'bg-[#181a26] text-slate-300 hover:bg-[#202434]'
                }`}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>

        {/* Language Filter Chips */}
        <div className="space-y-1.5">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Language:
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
            <button
              onClick={() => setSelectedLanguage('All')}
              className={`text-xs px-2.5 py-1 rounded-lg whitespace-nowrap transition-colors ${
                selectedLanguage === 'All'
                  ? 'bg-[#ff003c] text-white font-medium'
                  : 'bg-[#181a26] text-slate-300 hover:bg-[#202434]'
              }`}
            >
              All
            </button>
            {SUPPORTED_LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setSelectedLanguage(lang.name)}
                className={`text-xs px-2.5 py-1 rounded-lg whitespace-nowrap transition-colors flex items-center gap-1 ${
                  selectedLanguage === lang.name
                    ? 'bg-[#ff003c] text-white font-medium'
                    : 'bg-[#181a26] text-slate-300 hover:bg-[#202434]'
                }`}
              >
                <span>{lang.flag}</span>
                <span>{lang.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Sponsored Adsterra Banner */}
      <AdsterraBanner
        variant="compact"
        customTitle="⚡ Fast Cloud 4K Download Server & Buffer-Free Direct Streams"
      />

      {/* Results Grid */}
      {movies.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3.5 sm:gap-4 lg:gap-5">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onClick={onSelectMovie}
            />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center space-y-3 rounded-2xl bg-[#11131c] border border-[#1f2230]">
          <Film className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-base font-bold text-white">No Movies or Shows Match Your Filters</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Try adjusting your search criteria or reset filters to browse the full catalog.
          </p>
          <button
            onClick={clearFilters}
            className="px-4 py-2 rounded-xl bg-[#ff003c] text-white text-xs font-bold hover:bg-[#e00035] transition-all"
          >
            Reset All Filters
          </button>
        </div>
      )}
    </div>
  );
};
