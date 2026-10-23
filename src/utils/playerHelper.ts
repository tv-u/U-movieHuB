import { Movie } from '../types/movie';
import { STREAMING_SERVERS } from '../services/streamingServers';

// Singleton reference to the clean standalone pop-up window
let activePopWindowInstance: Window | null = null;

/**
 * Utility to open or update the movie in a 100% standalone, sandbox-free top-level window.
 * This completely bypasses any iframe sandbox restrictions from parent containers.
 * Reuses the existing window if already open, smoothly switching servers without multiple popups.
 */
export function openSandboxFreePlayer(
  movie: Movie,
  serverId: string = 'vidsrc',
  season: number = 1,
  episode: number = 1
): Window | null {
  const width = Math.min(1240, window.screen.availWidth ? window.screen.availWidth - 40 : 1150);
  const height = Math.min(760, window.screen.availHeight ? window.screen.availHeight - 80 : 700);
  const left = Math.max(0, Math.floor((window.screen.width - width) / 2));
  const top = Math.max(0, Math.floor((window.screen.height - height) / 2));

  const tmdbId = movie.tmdbId || movie.id;
  const params = new URLSearchParams({
    id: String(tmdbId),
    title: movie.title,
    server: serverId,
    year: String(movie.year),
    quality: movie.quality || '4K ULTRA HD',
    type: movie.type || 'movie',
    s: String(season),
    e: String(episode)
  });

  const url = `/player.html?${params.toString()}`;
  const windowFeatures = `width=${width},height=${height},top=${top},left=${left},menubar=no,toolbar=no,location=no,status=no,resizable=yes,scrollbars=no`;

  try {
    // If the clean pop window is already open and valid, seamlessly reuse and switch server!
    if (activePopWindowInstance && !activePopWindowInstance.closed) {
      try {
        // Fast direct message switch if supported
        activePopWindowInstance.postMessage({
          type: 'SWITCH_SERVER',
          serverId: serverId,
          movieId: String(tmdbId)
        }, '*');

        // Also update location to ensure server matches URL params
        activePopWindowInstance.location.replace(url);
      } catch {
        activePopWindowInstance.location.href = url;
      }
      activePopWindowInstance.focus();
      return activePopWindowInstance;
    }

    // Open new clean pop window
    const popWindow = window.open(url, 'UMovieCleanPlayerWindow', windowFeatures);
    if (popWindow) {
      activePopWindowInstance = popWindow;
      popWindow.focus();
      return popWindow;
    }
  } catch (err) {
    console.warn('Popup window auto-launch note:', err);
  }

  // Fallback: If browser aggressively blocked popups, open in a fresh tab
  try {
    const fallbackWin = window.open(url, '_blank');
    if (fallbackWin) {
      activePopWindowInstance = fallbackWin;
      return fallbackWin;
    }
  } catch {
    // ignore
  }

  return null;
}

/**
 * Close the clean popup window if needed
 */
export function closeSandboxFreePlayer(): void {
  if (activePopWindowInstance && !activePopWindowInstance.closed) {
    try {
      activePopWindowInstance.close();
    } catch {
      // ignore
    }
    activePopWindowInstance = null;
  }
}

/**
 * Check if the user has preferred auto-launching in the clean standalone window
 */
export function getAutoPopWindowPreference(): boolean {
  try {
    const pref = localStorage.getItem('umovie_auto_pop_window');
    return pref === null ? true : pref === 'true'; // Default to true for auto pop window!
  } catch {
    return true;
  }
}

export function setAutoPopWindowPreference(enabled: boolean): void {
  try {
    localStorage.setItem('umovie_auto_pop_window', enabled ? 'true' : 'false');
  } catch {
    // Ignore localStorage errors
  }
}
