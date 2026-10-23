export interface CastMember {
  name: string;
  character: string;
  avatarUrl: string;
}

export interface ReviewItem {
  id: string;
  userName: string;
  rating: number;
  date: string;
  comment: string;
}

export interface Movie {
  id: string | number;
  tmdbId?: number;
  imdbId?: string;
  title: string;
  originalTitle?: string;
  type: 'movie' | 'tv';
  year: number;
  releaseDate: string;
  rating: number; // 0 to 10
  voteCount: number;
  runtime: string; // e.g. "2h 46m"
  quality: '4K UHD' | '1080p HD' | '720p HD' | 'CAM';
  language: string;
  languageCode: string; // 'en', 'hi', 'zh', 'es', 'ar', 'fr', 'bn', 'pt', 'ru', 'id', 'ja', 'ko'
  genres: string[];
  overview: string;
  posterUrl: string;
  backdropUrl: string;
  trailerYoutubeId: string;
  cast: CastMember[];
  director?: string;
  seasonsCount?: number;
  episodesCount?: number;
  isTrending?: boolean;
  isPopular?: boolean;
  isTopRated?: boolean;
  isNowPlaying?: boolean;
  featured?: boolean;
}

export interface StreamingServer {
  id: string;
  name: string;
  label: string;
  badge?: string;
  speed: 'Ultra Fast' | 'Fast' | 'Standard';
  supportsSubtitles: boolean;
  getEmbedUrl: (movie: Movie, season?: number, episode?: number) => string;
}

export type SupportedLanguage = 
  | 'English'
  | 'Mandarin'
  | 'Hindi'
  | 'Spanish'
  | 'Arabic'
  | 'French'
  | 'Bengali'
  | 'Portuguese'
  | 'Russian'
  | 'Indonesian';
