import React from 'react';
import { LucideIcon, ChevronRight } from 'lucide-react';
import { Movie } from '../types/movie';
import { MovieCard } from './MovieCard';

interface MovieRowProps {
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
  movies: Movie[];
  onMovieClick: (movie: Movie) => void;
  onPlayClick?: (movie: Movie) => void;
  onViewAll?: () => void;
}

export const MovieRow: React.FC<MovieRowProps> = ({
  title,
  subtitle,
  icon: Icon,
  movies,
  onMovieClick,
  onPlayClick,
  onViewAll,
}) => {
  if (!movies.length) return null;

  return (
    <section className="py-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          {Icon && (
            <div className="p-1.5 rounded-lg bg-[#ff003c]/10 text-[#ff003c]">
              <Icon className="w-5 h-5" />
            </div>
          )}
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              {title}
            </h2>
            {subtitle && (
              <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>
            )}
          </div>
        </div>

        {onViewAll && (
          <button
            onClick={onViewAll}
            className="flex items-center gap-1 text-xs font-semibold text-[#ff003c] hover:text-[#ff3864] transition-colors"
          >
            <span>View All</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3.5 sm:gap-4 lg:gap-5">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onClick={onMovieClick}
            onPlayClick={onPlayClick}
          />
        ))}
      </div>
    </section>
  );
};
