import React, { useState } from 'react';
import { Star, Play, Bookmark, Film, Tv, Zap } from 'lucide-react';
import { Movie } from '../types/movie';
import { useWatchlist } from '../context/WatchlistContext';
import { openSandboxFreePlayer } from '../utils/playerHelper';

interface MovieCardProps {
  movie: Movie;
  onClick: (movie: Movie) => void;
  onPlayClick?: (movie: Movie) => void;
}

export const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  onClick,
  onPlayClick,
}) => {
  const [imageError, setImageError] = useState(false);
  const { isInWatchlist, toggleWatchlist } = useWatchlist();
  const isBookmarked = isInWatchlist(movie.id);

  const handlePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onPlayClick) {
      onPlayClick(movie);
    } else {
      onClick(movie);
    }
  };

  const handleQuickPopOut = (e: React.MouseEvent) => {
    e.stopPropagation();
    openSandboxFreePlayer(movie);
  };

  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWatchlist(movie);
  };

  return (
    <div
      onClick={() => onClick(movie)}
      className="group relative flex flex-col cursor-pointer transition-all duration-300"
    >
      {/* Poster Image Container */}
      <div className="relative aspect-[2/3] w-full rounded-xl overflow-hidden bg-[#13151f] border border-[#212435] shadow-md group-hover:border-[#ff003c]/60 group-hover:shadow-xl group-hover:shadow-[#ff003c]/10 group-hover:-translate-y-1.5 transition-all duration-300">
        {!imageError ? (
          <img
            src={movie.posterUrl}
            alt={movie.title}
            onError={() => setImageError(true)}
            referrerPolicy="no-referrer"
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center bg-gradient-to-br from-[#12141c] to-[#1c202e]">
            <Film className="w-8 h-8 text-[#ff003c]/60 mb-2" />
            <span className="text-xs font-semibold text-slate-300">{movie.title}</span>
          </div>
        )}

        {/* Gradient dark scrim overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 opacity-60 group-hover:opacity-40 transition-opacity" />

        {/* Top Badges: Quality & Language */}
        <div className="absolute top-2 left-2 right-2 flex items-center justify-between pointer-events-none z-10">
          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-black/75 backdrop-blur-sm text-white uppercase tracking-wider border border-white/10">
            {movie.quality}
          </span>
          <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-[#ff003c] text-white uppercase tracking-wider">
            {movie.languageCode.toUpperCase()}
          </span>
        </div>

        {/* Action Buttons Top Right: Bookmark & Clean Pop Window */}
        <div className="absolute top-8 right-2 flex flex-col gap-1.5 z-20">
          <button
            onClick={handleBookmark}
            className={`p-1.5 rounded-lg backdrop-blur-md transition-all ${
              isBookmarked
                ? 'bg-[#ff003c] text-white shadow-md'
                : 'bg-black/60 text-slate-300 hover:text-white hover:bg-black/80 opacity-0 group-hover:opacity-100'
            }`}
            title={isBookmarked ? 'Remove from Watchlist' : 'Add to Watchlist'}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
          </button>

          <button
            onClick={handleQuickPopOut}
            className="p-1.5 rounded-lg bg-black/60 hover:bg-[#ff003c] text-slate-300 hover:text-white backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 shadow-md"
            title="Instant Clean Pop Window (100% Sandbox Free)"
          >
            <Zap className="w-3.5 h-3.5 text-amber-400 group-hover/btn:text-white" />
          </button>
        </div>

        {/* Hover Center Play Button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
          <button
            onClick={handlePlay}
            className="w-12 h-12 rounded-full bg-[#ff003c] text-white flex items-center justify-center shadow-lg shadow-[#ff003c]/40 hover:scale-110 active:scale-95 transition-transform"
            aria-label="Play movie"
          >
            <Play className="w-5 h-5 fill-white ml-0.5" />
          </button>
        </div>

        {/* Bottom Poster Info: Rating & Type */}
        <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-xs z-10">
          <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-black/75 backdrop-blur-sm text-amber-300 font-bold text-[11px] border border-white/10">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span>{movie.rating}</span>
          </div>
          <div className="text-[11px] text-slate-300 px-1.5 py-0.5 rounded bg-black/60 backdrop-blur-sm">
            {movie.type === 'tv' ? 'TV' : 'Movie'}
          </div>
        </div>
      </div>

      {/* Movie Title & Release Year */}
      <div className="mt-2.5 px-0.5">
        <h3 className="font-semibold text-sm text-slate-100 group-hover:text-[#ff003c] truncate transition-colors">
          {movie.title}
        </h3>
        <div className="flex items-center justify-between text-[11px] text-slate-400 mt-0.5">
          <span>{movie.year}</span>
          <span className="truncate max-w-[100px] text-slate-500">
            {movie.genres[0] || movie.language}
          </span>
        </div>
      </div>
    </div>
  );
};
