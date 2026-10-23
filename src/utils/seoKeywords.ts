import { Movie } from '../types/movie';

/**
 * Generate automated zero-competition & long-tail SEO keywords for any movie.
 * Designed to rank for high-intent search queries.
 */
export function generateMovieSeoKeywords(movie: Movie): string[] {
  const title = movie.title;
  const year = movie.year;
  const lang = movie.language;
  const genres = movie.genres.join(', ');

  return [
    `watch ${title} full movie online free`,
    `${title} ${year} stream hd 1080p`,
    `${title} download in hindi dubbed english dual audio`,
    `${title} full movie 4k uhd no buffer`,
    `stream ${title} free 10 servers no sign up`,
    `${title} watch free online u-movie hub`,
    `${title} torrent magnet alternative direct download`,
    `download ${title} (${year}) 480p 720p 1080p x264 x265 web-dl`,
    `${title} movie in ${lang} english subtitles`,
    `${title} release date runtime rating cast overview`,
    `watch ${title} online on netflix yomovies alternative`,
    `${title} hd stream with multi audio tracks`,
    `buddy ${title} free movie playback without sandbox`,
    `${title} box office collection reviews synopsis trailer`
  ];
}

/**
 * Updates browser document metadata (Title, Meta Description, OG tags, Schema.org)
 * for Search Engine Google & Social Indexing.
 */
export function applyMovieSeoMetadata(movie: Movie): void {
  if (typeof document === 'undefined') return;

  const pageTitle = `${movie.title} (${movie.year}) — Watch Online Free Full Movie in HD | U-MOVIE HUB`;
  const metaDesc = `Watch ${movie.title} (${movie.year}) online free in full HD 1080p / 4K UHD with 10 fast streaming servers. ${movie.overview.slice(0, 130)}...`;
  const canonicalUrl = `${window.location.origin}/#/movie/${movie.id}`;

  // Update document title
  document.title = pageTitle;

  // Helper to set or create meta tags
  const setMeta = (nameOrProperty: string, content: string, isProperty = false) => {
    const attr = isProperty ? 'property' : 'name';
    let el = document.querySelector(`meta[${attr}="${nameOrProperty}"]`);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attr, nameOrProperty);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  };

  // Standard SEO
  setMeta('description', metaDesc);
  setMeta('keywords', generateMovieSeoKeywords(movie).join(', '));
  setMeta('robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');

  // OpenGraph
  setMeta('og:title', pageTitle, true);
  setMeta('og:description', metaDesc, true);
  setMeta('og:image', movie.backdropUrl || movie.posterUrl, true);
  setMeta('og:url', canonicalUrl, true);
  setMeta('og:type', 'video.movie', true);
  setMeta('og:site_name', 'U-MOVIE HUB', true);

  // Twitter Card
  setMeta('twitter:card', 'summary_large_image');
  setMeta('twitter:title', pageTitle);
  setMeta('twitter:description', metaDesc);
  setMeta('twitter:image', movie.backdropUrl || movie.posterUrl);

  // Canonical link
  let linkCanonical = document.querySelector('link[rel="canonical"]');
  if (!linkCanonical) {
    linkCanonical = document.createElement('link');
    linkCanonical.setAttribute('rel', 'canonical');
    document.head.appendChild(linkCanonical);
  }
  linkCanonical.setAttribute('href', canonicalUrl);

  // Schema.org Movie JSON-LD structured data
  let schemaScript = document.getElementById('movie-structured-data');
  if (!schemaScript) {
    schemaScript = document.createElement('script');
    schemaScript.id = 'movie-structured-data';
    schemaScript.setAttribute('type', 'application/ld+json');
    document.head.appendChild(schemaScript);
  }

  const movieSchema = {
    '@context': 'https://schema.org',
    '@type': 'Movie',
    'name': movie.title,
    'alternateName': movie.originalTitle || movie.title,
    'image': movie.posterUrl,
    'description': movie.overview,
    'datePublished': movie.releaseDate || `${movie.year}-01-01`,
    'inLanguage': movie.languageCode || 'en',
    'genre': movie.genres,
    'duration': movie.runtime,
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': movie.rating,
      'bestRating': '10',
      'worstRating': '1',
      'ratingCount': movie.voteCount || 1250
    },
    'trailer': {
      '@type': 'VideoObject',
      'name': `${movie.title} Official Trailer`,
      'embedUrl': `https://www.youtube-nocookie.com/embed/${movie.trailerYoutubeId}`,
      'thumbnailUrl': movie.backdropUrl || movie.posterUrl,
      'description': `Official trailer for ${movie.title}`
    },
    'actor': movie.cast.map(c => ({
      '@type': 'Person',
      'name': c.name
    }))
  };

  schemaScript.textContent = JSON.stringify(movieSchema, null, 2);
}
