import { Movie, StreamingServer } from '../types/movie';

/**
 * 10 Streaming Servers configuration as specified in U-MOVIE HUB blueprint.
 * Each server provides standard embed resolution logic based on TMDB ID or Movie ID.
 * Strict no-sandbox compliance ensures all video decoders and audio streams play smoothly.
 */
export const STREAMING_SERVERS: StreamingServer[] = [
  {
    id: 'vidsrc',
    name: 'VidSrc',
    label: 'Server 1 (VidSrc)',
    badge: 'HQ 4K',
    speed: 'Ultra Fast',
    supportsSubtitles: true,
    getEmbedUrl: (movie, season = 1, episode = 1) => {
      const tmdbId = movie.tmdbId || movie.id;
      if (movie.type === 'tv') {
        return `https://vidsrc.sh/embed/tv/${tmdbId}/${season}/${episode}`;
      }
      return `https://vidsrc.sh/embed/movie/${tmdbId}`;
    },
  },
  {
    id: 'vidsrc2',
    name: 'VidSrc 2',
    label: 'Server 2 (VidSrc 2)',
    badge: 'Fast',
    speed: 'Ultra Fast',
    supportsSubtitles: true,
    getEmbedUrl: (movie, season = 1, episode = 1) => {
      const tmdbId = movie.tmdbId || movie.id;
      if (movie.type === 'tv') {
        return `https://vidsrc.me/embed/tv?tmdb=${tmdbId}&season=${season}&episode=${episode}`;
      }
      return `https://vidsrc.me/embed/movie?tmdb=${tmdbId}`;
    },
  },
  {
    id: 'embedsu',
    name: 'EmbedSU',
    label: 'Server 3 (EmbedSU)',
    badge: 'Multi-Sub',
    speed: 'Fast',
    supportsSubtitles: true,
    getEmbedUrl: (movie, season = 1, episode = 1) => {
      const tmdbId = movie.tmdbId || movie.id;
      if (movie.type === 'tv') {
        return `https://embed.su/embed/tv/${tmdbId}/${season}/${episode}`;
      }
      return `https://embed.su/embed/movie/${tmdbId}`;
    },
  },
  {
    id: 'autoembed',
    name: 'AutoEmbed',
    label: 'Server 4 (AutoEmbed)',
    badge: '1080p',
    speed: 'Ultra Fast',
    supportsSubtitles: true,
    getEmbedUrl: (movie, season = 1, episode = 1) => {
      const tmdbId = movie.tmdbId || movie.id;
      if (movie.type === 'tv') {
        return `https://player.autoembed.cc/embed/tv/${tmdbId}/${season}/${episode}`;
      }
      return `https://player.autoembed.cc/embed/movie/${tmdbId}`;
    },
  },
  {
    id: 'vidlink',
    name: 'VidLink',
    label: 'Server 5 (VidLink)',
    badge: 'Stable',
    speed: 'Fast',
    supportsSubtitles: true,
    getEmbedUrl: (movie, season = 1, episode = 1) => {
      const tmdbId = movie.tmdbId || movie.id;
      if (movie.type === 'tv') {
        return `https://vidlink.pro/tv/${tmdbId}/${season}/${episode}`;
      }
      return `https://vidlink.pro/movie/${tmdbId}`;
    },
  },
  {
    id: 'moviesapi',
    name: 'MoviesAPI',
    label: 'Server 6 (MoviesAPI)',
    badge: 'HD',
    speed: 'Standard',
    supportsSubtitles: false,
    getEmbedUrl: (movie, season = 1, episode = 1) => {
      const tmdbId = movie.tmdbId || movie.id;
      if (movie.type === 'tv') {
        return `https://moviesapi.club/tv/${tmdbId}-${season}-${episode}`;
      }
      return `https://moviesapi.club/movie/${tmdbId}`;
    },
  },
  {
    id: '2embed',
    name: '2Embed',
    label: 'Server 7 (2Embed)',
    badge: 'Global',
    speed: 'Standard',
    supportsSubtitles: true,
    getEmbedUrl: (movie, season = 1, episode = 1) => {
      const tmdbId = movie.tmdbId || movie.id;
      if (movie.type === 'tv') {
        return `https://www.2embed.cc/embedtv/${tmdbId}&s=${season}&e=${episode}`;
      }
      return `https://www.2embed.cc/embed/${tmdbId}`;
    },
  },
  {
    id: 'smashystream',
    name: 'SmashyStream',
    label: 'Server 8 (SmashyStream)',
    badge: 'Fast',
    speed: 'Fast',
    supportsSubtitles: true,
    getEmbedUrl: (movie, season = 1, episode = 1) => {
      const tmdbId = movie.tmdbId || movie.id;
      if (movie.type === 'tv') {
        return `https://embed.smashystream.com/playere.php?tmdb=${tmdbId}&season=${season}&episode=${episode}`;
      }
      return `https://embed.smashystream.com/playere.php?tmdb=${tmdbId}`;
    },
  },
  {
    id: 'multiembed',
    name: 'MultiEmbed',
    label: 'Server 9 (MultiEmbed)',
    badge: 'Multi-Lang',
    speed: 'Fast',
    supportsSubtitles: true,
    getEmbedUrl: (movie, season = 1, episode = 1) => {
      const tmdbId = movie.tmdbId || movie.id;
      if (movie.type === 'tv') {
        return `https://multiembed.mov/?video_id=${tmdbId}&tmdb=1&s=${season}&e=${episode}`;
      }
      return `https://multiembed.mov/?video_id=${tmdbId}&tmdb=1`;
    },
  },
  {
    id: 'vidsrccc',
    name: 'VidSrc CC',
    label: 'Server 10 (VidSrc CC)',
    badge: 'Backup',
    speed: 'Standard',
    supportsSubtitles: true,
    getEmbedUrl: (movie, season = 1, episode = 1) => {
      const tmdbId = movie.tmdbId || movie.id;
      if (movie.type === 'tv') {
        return `https://vidsrc.cc/v2/embed/tv/${tmdbId}/${season}/${episode}`;
      }
      return `https://vidsrc.cc/v2/embed/movie/${tmdbId}`;
    },
  },
];
