import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Star, Film, Tv, Play } from 'lucide-react';
import { Movie } from '../types/movie';
import { MovieService } from '../services/tmdb';
import { GENRE_LIST } from '../data/movies';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectMovie: (movie: Movie) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectMovie,
}) => {
  const [query, setQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [results, setResults] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setSelectedGenre('All');
      setResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const timer = setTimeout(async () => {
      setIsLoading(true);
      try {
        const found = await MovieService.searchMovies(query, selectedGenre);
        setResults(found);
      } catch (err) {
        console.error('Search error', err);
      } finally {
        setIsLoading(false);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [query, selectedGenre, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-2xl bg-[#0f1118] border border-[#232738] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[#1f2230] bg-[#141622]">
          <Search className="w-5 h-5 text-[#ff003c] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search movies, TV series, actors or directors..."
            className="flex-1 bg-transparent text-sm sm:text-base text-white placeholder-slate-400 outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 hover:bg-[#202434] rounded-lg text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs px-2.5 py-1 rounded-lg bg-[#202434] hover:bg-[#2a3045] text-slate-300 font-medium ml-1"
          >
            Esc
          </button>
        </div>

        {/* Quick Genre Filters */}
        <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-[#1c1f2c] overflow-x-auto no-scrollbar bg-[#0f1118]">
          {GENRE_LIST.slice(0, 8).map((genre) => (
            <button
              key={genre}
              onClick={() => setSelectedGenre(genre)}
              className={`text-xs px-3 py-1 rounded-full whitespace-nowrap transition-colors ${
                selectedGenre === genre
                  ? 'bg-[#ff003c] text-white font-medium'
                  : 'bg-[#181a24] text-slate-300 hover:bg-[#202332]'
              }`}
            >
              {genre}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {isLoading ? (
            <div className="py-12 text-center text-sm text-slate-400 flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-[#ff003c] border-t-transparent rounded-full animate-spin" />
              Searching catalog...
            </div>
          ) : results.length > 0 ? (
            results.map((movie) => (
              <div
                key={movie.id}
                onClick={() => {
                  onSelectMovie(movie);
                  onClose();
                }}
                className="group flex items-center justify-between p-2.5 rounded-xl hover:bg-[#181b28] border border-transparent hover:border-[#262b3d] cursor-pointer transition-all"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-12 h-16 rounded-lg overflow-hidden bg-slate-800 shrink-0 relative">
                    <img
                      src={movie.posterUrl}
                      alt={movie.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm text-white group-hover:text-[#ff003c] truncate transition-colors">
                        {movie.title}
                      </span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#1e2233] text-slate-300 uppercase font-mono">
                        {movie.quality}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-1 text-xs text-slate-400">
                      <span>{movie.year}</span>
                      <span>·</span>
                      <span className="flex items-center gap-1 text-amber-400 font-medium">
                        <Star className="w-3 h-3 fill-amber-400" />
                        {movie.rating}
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        {movie.type === 'movie' ? <Film className="w-3 h-3" /> : <Tv className="w-3 h-3" />}
                        {movie.language}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500 truncate mt-0.5 max-w-md">
                      {movie.genres.join(', ')}
                    </div>
                  </div>
                </div>

                <div className="shrink-0 pl-2">
                  <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg bg-[#ff003c]/15 text-[#ff003c] group-hover:bg-[#ff003c] group-hover:text-white transition-all font-medium">
                    <Play className="w-3 h-3 fill-current" />
                    <span className="hidden sm:inline">Watch</span>
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="py-14 text-center">
              <p className="text-slate-300 font-medium text-sm">No movies or shows found</p>
              <p className="text-xs text-slate-500 mt-1">Try a different search term or clear the genre filter</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
