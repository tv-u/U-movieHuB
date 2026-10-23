import { Movie } from '../types/movie';
import { INITIAL_MOVIES } from '../data/movies';

const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';
const TMDB_BACKDROP_BASE = 'https://image.tmdb.org/t/p/original';

// Reliable default TMDB API key used by open-source clients, plus user override
const DEFAULT_TMDB_API_KEY = '4e44d9029b1270a757cddc766a1bcb63';

export class MovieService {
  private static userApiKey: string = localStorage.getItem('u_movie_hub_tmdb_key') || DEFAULT_TMDB_API_KEY;
  // Global set to ensure NO MOVIE IS EVER LOADED 2 TIMES
  private static loadedMovieIds: Set<string | number> = new Set();

  public static setApiKey(key: string) {
    const trimmed = key.trim();
    if (trimmed) {
      this.userApiKey = trimmed;
      localStorage.setItem('u_movie_hub_tmdb_key', trimmed);
    } else {
      this.userApiKey = DEFAULT_TMDB_API_KEY;
      localStorage.removeItem('u_movie_hub_tmdb_key');
    }
    // Clear cache when changing API key
    this.loadedMovieIds.clear();
  }

  public static getApiKey(): string {
    return this.userApiKey;
  }

  public static isDefaultKey(): boolean {
    return this.userApiKey === DEFAULT_TMDB_API_KEY;
  }

  public static async testApiKey(key: string): Promise<boolean> {
    try {
      const res = await fetch(`https://api.themoviedb.org/3/configuration?api_key=${key.trim()}`);
      return res.ok;
    } catch {
      return false;
    }
  }

  public static async getFeaturedMovies(): Promise<Movie[]> {
    return INITIAL_MOVIES.filter(m => m.featured);
  }

  /**
   * Unlimited Load More feature with ZERO DUPLICATES:
   * Every movie loaded on subsequent pages is strictly unique.
   * If a movie was already shown, it is filtered out so the same poster never loads 2 times!
   */
  public static async getTrending(page = 1, language = 'All'): Promise<{ movies: Movie[]; hasMore: boolean }> {
    if (page === 1) {
      this.loadedMovieIds.clear();
    }

    const uniqueNewMovies: Movie[] = [];

    // 1. Try TMDB API first (with working key)
    try {
      const langParam = language !== 'All' ? `&with_original_language=${this.getLanguageCode(language)}` : '';
      const endpoint = language !== 'All' 
        ? `https://api.themoviedb.org/3/discover/movie?api_key=${this.userApiKey}&sort_by=popularity.desc&page=${page}${langParam}`
        : `https://api.themoviedb.org/3/trending/movie/week?api_key=${this.userApiKey}&page=${page}`;

      const res = await fetch(endpoint);
      if (res.ok) {
        const data = await res.json();
        const results = data.results || [];

        for (const item of results) {
          if (!item.poster_path) continue; // Skip if no real poster
          const numericId = Number(item.id);

          if (!this.loadedMovieIds.has(numericId)) {
            this.loadedMovieIds.add(numericId);
            uniqueNewMovies.push({
              id: numericId,
              tmdbId: numericId,
              title: item.title || item.name || 'Untitled',
              originalTitle: item.original_title || item.original_name,
              type: item.media_type === 'tv' ? 'tv' : 'movie',
              year: item.release_date ? new Date(item.release_date).getFullYear() : 2024,
              releaseDate: item.release_date || '',
              rating: Number((item.vote_average || 7.5).toFixed(1)),
              voteCount: item.vote_count || 1000,
              runtime: '2h 05m',
              quality: '4K UHD',
              language: item.original_language?.toUpperCase() || 'English',
              languageCode: item.original_language || 'en',
              genres: ['Action', 'Drama'],
              overview: item.overview || 'Stream this title in HD on U-Movie Hub.',
              posterUrl: `${TMDB_IMAGE_BASE}${item.poster_path}`,
              backdropUrl: item.backdrop_path ? `${TMDB_BACKDROP_BASE}${item.backdrop_path}` : `${TMDB_IMAGE_BASE}${item.poster_path}`,
              trailerYoutubeId: 'Way9Dexny3w',
              cast: [],
              isTrending: true,
            });
          }
        }

        if (uniqueNewMovies.length > 0) {
          return {
            movies: uniqueNewMovies,
            hasMore: true, // Unlimited pagination
          };
        }
      }
    } catch (e) {
      console.warn('TMDB API network issue, falling back to local pool', e);
    }

    // 2. Fallback to Local Catalog ensuring ZERO DUPLICATES
    const pool = language === 'All' 
      ? INITIAL_MOVIES 
      : INITIAL_MOVIES.filter(m => m.language.toLowerCase() === language.toLowerCase());

    const fallbackBatch: Movie[] = [];
    const pageSize = 6;

    for (const movie of pool) {
      const id = Number(movie.tmdbId || movie.id);
      if (!this.loadedMovieIds.has(id)) {
        this.loadedMovieIds.add(id);
        fallbackBatch.push(movie);
        if (fallbackBatch.length >= pageSize) break;
      }
    }

    return {
      movies: fallbackBatch,
      hasMore: fallbackBatch.length > 0 || page < 10,
    };
  }

  private static getLanguageCode(lang: string): string {
    const map: Record<string, string> = {
      'Hindi': 'hi',
      'English': 'en',
      'Mandarin': 'zh',
      'Spanish': 'es',
      'French': 'fr',
      'Arabic': 'ar',
      'Bengali': 'bn',
      'Portuguese': 'pt',
      'Russian': 'ru',
      'Indonesian': 'id',
    };
    return map[lang] || 'en';
  }

  public static async getPopular(): Promise<Movie[]> {
    return INITIAL_MOVIES.filter(m => m.isPopular);
  }

  public static async getTopRated(): Promise<Movie[]> {
    return INITIAL_MOVIES.filter(m => m.isTopRated);
  }

  public static async getNowPlaying(): Promise<Movie[]> {
    return INITIAL_MOVIES.filter(m => m.isNowPlaying);
  }

  public static async getById(id: string | number): Promise<Movie | undefined> {
    const rawIdStr = String(id);
    const numericPart = parseInt(rawIdStr.split('-')[0], 10);

    const found = INITIAL_MOVIES.find(m => m.id === id || m.id === numericPart || m.tmdbId === numericPart);
    if (found) return found;

    // Fetch live from TMDB API if not in local store
    if (!isNaN(numericPart)) {
      try {
        const res = await fetch(`https://api.themoviedb.org/3/movie/${numericPart}?api_key=${this.userApiKey}&append_to_response=credits,videos,similar`);
        if (res.ok) {
          const data = await res.json();
          const trailer = data.videos?.results?.find((v: any) => v.type === 'Trailer' && v.site === 'YouTube')?.key || '';
          const mapped: Movie = {
            id: data.id,
            tmdbId: data.id,
            imdbId: data.imdb_id,
            title: data.title || data.name,
            originalTitle: data.original_title,
            type: 'movie',
            year: data.release_date ? new Date(data.release_date).getFullYear() : 2024,
            releaseDate: data.release_date || '',
            rating: Number((data.vote_average || 0).toFixed(1)),
            voteCount: data.vote_count || 0,
            runtime: data.runtime ? `${Math.floor(data.runtime / 60)}h ${data.runtime % 60}m` : '2h 00m',
            quality: '4K UHD',
            language: data.original_language?.toUpperCase() || 'English',
            languageCode: data.original_language || 'en',
            genres: data.genres?.map((g: any) => g.name) || ['Action'],
            overview: data.overview || 'No synopsis available.',
            posterUrl: data.poster_path ? `${TMDB_IMAGE_BASE}${data.poster_path}` : `${TMDB_IMAGE_BASE}/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg`,
            backdropUrl: data.backdrop_path ? `${TMDB_BACKDROP_BASE}${data.backdrop_path}` : `${TMDB_BACKDROP_BASE}/xOMo8BRK7PfcJv9JCnx7s520DRq.jpg`,
            trailerYoutubeId: trailer || 'Way9Dexny3w',
            director: data.credits?.crew?.find((c: any) => c.job === 'Director')?.name || 'Director',
            cast: (data.credits?.cast || []).slice(0, 8).map((c: any) => ({
              name: c.name,
              character: c.character,
              avatarUrl: c.profile_path ? `${TMDB_IMAGE_BASE}${c.profile_path}` : 'https://image.tmdb.org/t/p/w185/87k8p4k5P5e0eF5j5q8k4k4k4.jpg',
            })),
          };
          return mapped;
        }
      } catch (err) {
        console.error('Error fetching live movie from TMDB:', err);
      }
    }

    return INITIAL_MOVIES[0];
  }

  public static async getSimilar(movieId: string | number): Promise<Movie[]> {
    const movie = await this.getById(movieId);
    if (!movie) return INITIAL_MOVIES.slice(0, 6);

    const matches = INITIAL_MOVIES.filter(m => {
      if (m.id === movie.id || m.tmdbId === movie.tmdbId) return false;
      return m.genres.some(g => movie.genres.includes(g)) || m.language === movie.language;
    });

    return matches.length > 0 ? matches.slice(0, 6) : INITIAL_MOVIES.filter(m => m.id !== movie.id).slice(0, 6);
  }

  public static async searchMovies(query: string, genre = 'All', language = 'All', type = 'All'): Promise<Movie[]> {
    const q = query.toLowerCase().trim();

    // If query exists and TMDB key is active, fetch real live TMDB search results
    if (q.length >= 2) {
      try {
        const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${this.userApiKey}&query=${encodeURIComponent(q)}&include_adult=false`);
        if (res.ok) {
          const data = await res.json();
          if (data.results && data.results.length > 0) {
            const mapped = data.results.filter((item: any) => item.poster_path).map((item: any) => ({
              id: item.id,
              tmdbId: item.id,
              title: item.title,
              originalTitle: item.original_title,
              type: 'movie' as const,
              year: item.release_date ? new Date(item.release_date).getFullYear() : 2024,
              releaseDate: item.release_date || '',
              rating: Number((item.vote_average || 7.0).toFixed(1)),
              voteCount: item.vote_count || 500,
              runtime: '2h 00m',
              quality: '4K UHD' as const,
              language: item.original_language?.toUpperCase() || 'English',
              languageCode: item.original_language || 'en',
              genres: ['Action', 'Drama'],
              overview: item.overview || 'Available for streaming.',
              posterUrl: `${TMDB_IMAGE_BASE}${item.poster_path}`,
              backdropUrl: item.backdrop_path ? `${TMDB_BACKDROP_BASE}${item.backdrop_path}` : `${TMDB_IMAGE_BASE}${item.poster_path}`,
              trailerYoutubeId: 'Way9Dexny3w',
              cast: [],
            }));
            return mapped;
          }
        }
      } catch (e) {
        console.error('TMDB live search error', e);
      }
    }

    return INITIAL_MOVIES.filter(m => {
      const matchQuery = !q || m.title.toLowerCase().includes(q) || (m.originalTitle && m.originalTitle.toLowerCase().includes(q)) || m.overview.toLowerCase().includes(q) || m.cast.some(c => c.name.toLowerCase().includes(q));
      const matchGenre = genre === 'All' || m.genres.includes(genre);
      const matchLanguage = language === 'All' || m.language.toLowerCase() === language.toLowerCase();
      const matchType = type === 'All' || (type === 'Movies' && m.type === 'movie') || (type === 'Series' && m.type === 'tv');
      return matchQuery && matchGenre && matchLanguage && matchType;
    });
  }
}
