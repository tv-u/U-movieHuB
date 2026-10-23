import React, { useState, useEffect, useRef } from 'react';
import { Play, Info, Star, Calendar, Clock, Globe, ChevronLeft, ChevronRight, Bookmark, Search, X, Film, Tv, Sparkles, Zap } from 'lucide-react';
import { Movie } from '../types/movie';
import { useWatchlist } from '../context/WatchlistContext';
import { MovieService } from '../services/tmdb';
import { openSandboxFreePlayer } from '../utils/playerHelper';

interface HeroSectionProps {
  featuredMovies: Movie[];
  onWatchNow: (movie: Movie) => void;
  onViewDetails: (movie: Movie) => void;
  onSearchSelect?: (movie: Movie) => void;
  onExploreClick?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  featuredMovies,
  onWatchNow,
  onViewDetails,
  onSearchSelect,
  onExploreClick,
}) => {
  const [heroMode, setHeroMode] = useState<'portal' | 'cinematic'>('portal');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const searchDropdownRef = useRef<HTMLDivElement>(null);
  const { isInWatchlist, toggleWatchlist } = useWatchlist();

  // Auto-advance hero slides in cinematic mode
  useEffect(() => {
    if (heroMode !== 'cinematic' || featuredMovies.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredMovies.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [featuredMovies.length, heroMode]);

  // Live search in hero
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    const timer = setTimeout(async () => {
      setIsSearching(true);
      const results = await MovieService.searchMovies(searchQuery);
      setSearchResults(results.slice(0, 5));
      setIsSearching(false);
    }, 200);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Click outside to close hero search dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchDropdownRef.current && !searchDropdownRef.current.contains(e.target as Node)) {
        setSearchResults([]);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!featuredMovies.length) return null;

  const currentMovie = featuredMovies[currentIndex] || featuredMovies[0];
  const isBookmarked = isInWatchlist(currentMovie.id);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? featuredMovies.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredMovies.length);
  };

  return (
    <div className="relative w-full overflow-hidden select-none">
      {heroMode === 'portal' ? (
        /* Reference YoMovies / U-Movie Hub Classic Radial Hero */
        <div className="ym-hero py-16 sm:py-24 px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            {/* Wordmark with Red Play Icon */}
            <p className="ym-wordmark flex items-center justify-center">
              <span>U</span>
              <span className="text-[#E50914] mx-2">▶</span>
              <span>MOVIE HUB</span>
            </p>

            {/* Main Headline */}
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              Watch Movies & TV Shows Online Free in HD
            </h1>

            {/* Tagline */}
            <p className="ym-tagline text-sm sm:text-base text-slate-300">
              Stream thousands of movies and TV shows with no sign-up, multi-server playback, updated daily.
            </p>

            {/* Live Search Bar in Hero */}
            <div className="relative max-w-2xl mx-auto pt-2" ref={searchDropdownRef}>
              <div className="flex items-center bg-[#181818] border border-[#3d3d3d] focus-within:border-[#E50914] rounded-full overflow-hidden shadow-2xl transition-all">
                <Search className="w-5 h-5 text-slate-400 ml-5 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search movies or TV series..."
                  className="w-full h-14 bg-transparent text-white px-4 text-base placeholder-slate-500 outline-none"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="p-2 text-slate-400 hover:text-white mr-2"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Instant Search Results Dropdown */}
              {searchResults.length > 0 && (
                <div className="absolute left-0 right-0 top-full mt-2 bg-[#141414] border border-[#262626] rounded-2xl shadow-2xl p-2 z-50 text-left space-y-1 backdrop-blur-md">
                  {searchResults.map((m) => (
                    <div
                      key={m.id}
                      onClick={() => {
                        if (onSearchSelect) onSearchSelect(m);
                        else onWatchNow(m);
                        setSearchQuery('');
                        setSearchResults([]);
                      }}
                      className="flex items-center justify-between p-2 rounded-xl hover:bg-[#1f1f1f] cursor-pointer transition-colors group"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={m.posterUrl}
                          alt={m.title}
                          referrerPolicy="no-referrer"
                          className="w-9 h-13 object-cover rounded-md shrink-0 bg-slate-800"
                        />
                        <div className="min-w-0">
                          <h4 className="text-sm font-semibold text-white group-hover:text-[#E50914] truncate transition-colors">
                            {m.title}
                          </h4>
                          <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                            <span>{m.year}</span>
                            <span>·</span>
                            <span className="text-amber-400 font-bold flex items-center gap-0.5">
                              ★ {m.rating}
                            </span>
                            <span>·</span>
                            <span>{m.language}</span>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onWatchNow(m);
                          setSearchQuery('');
                          setSearchResults([]);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-[#E50914] text-white text-xs font-bold flex items-center gap-1 shrink-0 ml-2"
                      >
                        <Play className="w-3 h-3 fill-white" />
                        <span>Play</span>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Action Buttons Row */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
              <button
                onClick={() => {
                  if (onExploreClick) onExploreClick();
                  else onWatchNow(currentMovie);
                }}
                className="px-8 py-3.5 rounded-full bg-[#E50914] hover:bg-[#B2070F] text-white font-bold text-sm tracking-wide shadow-lg shadow-[#E50914]/25 hover:scale-105 active:scale-95 transition-all"
              >
                View Full Site →
              </button>

              <button
                onClick={() => setHeroMode('cinematic')}
                className="px-6 py-3.5 rounded-full bg-[#181818] hover:bg-[#252525] border border-[#3d3d3d] text-white font-semibold text-sm hover:scale-105 active:scale-95 transition-all"
              >
                Featured Blockbuster Showcase
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Cinematic Backdrop Hero Mode */
        <div className="relative w-full h-[540px] sm:h-[620px] lg:h-[680px] bg-black">
          {/* Background Backdrop Image */}
          <div className="absolute inset-0 z-0">
            <img
              key={currentMovie.id}
              src={currentMovie.backdropUrl}
              alt={currentMovie.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center transform scale-105 transition-all duration-1000 ease-out"
            />
            {/* Cinematic gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/85 to-transparent w-full md:w-3/4 z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent z-10" />
            <div className="absolute inset-0 bg-black/30 z-10" />
          </div>

          {/* Toggle back to Portal view */}
          <div className="absolute top-4 right-4 z-30">
            <button
              onClick={() => setHeroMode('portal')}
              className="px-3.5 py-1.5 rounded-full bg-black/70 hover:bg-[#E50914] border border-white/10 text-white text-xs font-semibold backdrop-blur-md transition-all shadow-md"
            >
              ← Search Portal View
            </button>
          </div>

          {/* Hero Content Container */}
          <div className="relative z-20 max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-12 sm:pb-16 lg:pb-20">
            <div className="max-w-2xl space-y-4">
              {/* Metadata badges row */}
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
                <span className="px-2.5 py-0.5 rounded-full bg-[#E50914] text-white uppercase tracking-wider text-[11px] font-bold">
                  Featured Blockbuster
                </span>
                <span className="px-2 py-0.5 rounded bg-[#1f2334]/90 border border-[#2e344d] text-slate-200">
                  {currentMovie.quality}
                </span>
                <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-amber-500/20 border border-amber-500/30 text-amber-300">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  {currentMovie.rating} TMDB
                </span>
                <span className="flex items-center gap-1 text-slate-300">
                  <Calendar className="w-3 h-3 text-slate-400" />
                  {currentMovie.year}
                </span>
                <span className="text-slate-500">·</span>
                <span className="flex items-center gap-1 text-slate-300">
                  <Clock className="w-3 h-3 text-slate-400" />
                  {currentMovie.runtime}
                </span>
                <span className="text-slate-500">·</span>
                <span className="flex items-center gap-1 text-slate-300">
                  <Globe className="w-3 h-3 text-slate-400" />
                  {currentMovie.language}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight drop-shadow-md">
                {currentMovie.title}
              </h1>

              {/* Genres */}
              <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-300 font-medium">
                {currentMovie.genres.map((genre) => (
                  <span
                    key={genre}
                    className="px-2.5 py-0.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/10"
                  >
                    {genre}
                  </span>
                ))}
              </div>

              {/* Synopsis */}
              <p className="text-sm sm:text-base text-slate-300 line-clamp-3 sm:line-clamp-4 leading-relaxed max-w-xl text-shadow">
                {currentMovie.overview}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => onWatchNow(currentMovie)}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#E50914] hover:bg-[#B2070F] text-white font-bold text-sm tracking-wide shadow-lg shadow-[#E50914]/30 hover:scale-105 active:scale-95 transition-all"
                >
                  <Play className="w-4 h-4 fill-white" />
                  Watch Now
                </button>

                <button
                  onClick={() => openSandboxFreePlayer(currentMovie)}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#191c28]/90 hover:bg-[#232738] border border-emerald-500/40 text-emerald-300 font-bold text-sm hover:scale-105 active:scale-95 transition-all backdrop-blur-sm"
                  title="Play in 100% Sandbox-Free Pop Window"
                >
                  <Zap className="w-4 h-4 fill-emerald-400 text-emerald-400" />
                  <span>Pop Window</span>
                </button>

                <button
                  onClick={() => onViewDetails(currentMovie)}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#191c28]/90 hover:bg-[#232738] border border-[#2e344d] text-white font-semibold text-sm hover:scale-105 active:scale-95 transition-all backdrop-blur-sm"
                >
                  <Info className="w-4 h-4 text-slate-300" />
                  Details
                </button>

                <button
                  onClick={() => toggleWatchlist(currentMovie)}
                  className={`p-3 rounded-xl border transition-all ${
                    isBookmarked
                      ? 'bg-[#E50914]/20 border-[#E50914] text-[#E50914]'
                      : 'bg-[#191c28]/90 hover:bg-[#232738] border-[#2e344d] text-slate-300 hover:text-white'
                  }`}
                  title={isBookmarked ? 'Remove from Watchlist' : 'Add to Watchlist'}
                >
                  <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>
          </div>

          {/* Slide Navigation Controls */}
          <div className="absolute right-4 sm:right-8 bottom-8 sm:bottom-12 z-20 hidden sm:flex items-center gap-2">
            <button
              onClick={prevSlide}
              className="p-2 rounded-lg bg-black/60 hover:bg-[#E50914] border border-white/10 text-white backdrop-blur-md transition-all"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-1.5 px-2">
              {featuredMovies.map((movie, idx) => (
                <button
                  key={movie.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-1.5 rounded-full transition-all ${
                    currentIndex === idx ? 'w-6 bg-[#E50914]' : 'w-2 bg-white/30 hover:bg-white/60'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="p-2 rounded-lg bg-black/60 hover:bg-[#E50914] border border-white/10 text-white backdrop-blur-md transition-all"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
