import React from 'react';
import { Bookmark, Film, Play, Trash2, ArrowRight } from 'lucide-react';
import { Movie } from '../types/movie';
import { useWatchlist } from '../context/WatchlistContext';
import { MovieCard } from '../components/MovieCard';

interface WatchlistPageProps {
  onSelectMovie: (movie: Movie) => void;
  onNavigateHome: () => void;
}

export const WatchlistPage: React.FC<WatchlistPageProps> = ({
  onSelectMovie,
  onNavigateHome,
}) => {
  const { watchlist, removeFromWatchlist } = useWatchlist();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1b1e2c]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
            <Bookmark className="w-6 h-6 text-[#ff003c] fill-[#ff003c]" />
            <span>My Watchlist</span>
            <span className="text-xs px-2.5 py-1 rounded-full bg-[#ff003c]/15 text-[#ff003c] font-mono font-bold">
              {watchlist.length} {watchlist.length === 1 ? 'Title' : 'Titles'}
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Personal list of movies and TV shows saved in your browser storage
          </p>
        </div>

        {watchlist.length > 0 && (
          <button
            onClick={() => {
              if (confirm('Are you sure you want to clear your entire watchlist?')) {
                watchlist.forEach(m => removeFromWatchlist(m.id));
              }
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#191b26] hover:bg-rose-950/40 border border-[#262a3d] hover:border-rose-800 text-slate-400 hover:text-rose-400 text-xs font-medium transition-colors w-fit"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Watchlist</span>
          </button>
        )}
      </div>

      {/* Grid or Empty State */}
      {watchlist.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3.5 sm:gap-4 lg:gap-5">
          {watchlist.map((movie) => (
            <div key={movie.id} className="relative group/item">
              <MovieCard
                movie={movie}
                onClick={onSelectMovie}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="py-20 text-center space-y-4 rounded-2xl bg-[#11131c] border border-[#1f2230] p-6 max-w-lg mx-auto">
          <div className="w-14 h-14 rounded-2xl bg-[#181a26] border border-[#252838] flex items-center justify-center mx-auto text-[#ff003c]">
            <Bookmark className="w-7 h-7" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-white">Your Watchlist is Empty</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Save movies or TV series while browsing by clicking the bookmark icon on any poster or detail page.
            </p>
          </div>
          <button
            onClick={onNavigateHome}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#ff003c] hover:bg-[#e00035] text-white text-xs font-bold transition-all shadow-md shadow-[#ff003c]/20"
          >
            <span>Explore Movies</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
