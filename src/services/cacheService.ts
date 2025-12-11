// src/services/cacheService.ts
// Cache simple en mémoire avec TTL (Time-To-Live)

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

const cache = new Map<string, CacheEntry<unknown>>();
const DEFAULT_TTL = 5 * 60 * 1000; // 5 minutes en millisecondes

/**
 * Récupère une valeur du cache si elle existe et n'est pas expirée
 */
export function getFromCache<T>(key: string): T | null {
  const entry = cache.get(key) as CacheEntry<T> | undefined;

  if (!entry) return null;

  const isExpired = Date.now() - entry.timestamp > DEFAULT_TTL;
  if (isExpired) {
    cache.delete(key);
    return null;
  }

  return entry.data;
}

/**
 * Stocke une valeur dans le cache
 */
export function setInCache<T>(key: string, data: T): void {
  cache.set(key, {
    data,
    timestamp: Date.now(),
  });
}

/**
 * Invalide une entrée spécifique du cache
 */
export function invalidateCache(key: string): void {
  cache.delete(key);
}

/**
 * Invalide toutes les entrées commençant par un préfixe
 */
export function invalidateCacheByPrefix(prefix: string): void {
  for (const key of cache.keys()) {
    if (key.startsWith(prefix)) {
      cache.delete(key);
    }
  }
}

/**
 * Vide tout le cache
 */
export function clearCache(): void {
  cache.clear();
}

// Clés de cache prédéfinies
export const CACHE_KEYS = {
  ARTISTS: 'artists_all',
  DJS: 'djs_all',
  EXPERIENCES: 'experiences_all',
  ARTIST_BY_ID: (id: string) => `artist_${id}`,
  DJ_BY_ID: (id: string) => `dj_${id}`,
  EXPERIENCE_BY_ID: (id: string) => `experience_${id}`,
} as const;
