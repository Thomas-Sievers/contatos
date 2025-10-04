// utils/cache.js
const CACHE_KEY = 'contacts_cache';
const CACHE_EXPIRY = 5 * 60 * 1000; // 5 minutos

export const cacheService = {
  // Salvar dados no cache
  set: (data) => {
    const cacheData = {
      data,
      timestamp: Date.now(),
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
  },

  // Recuperar dados do cache
  get: () => {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (!cached) return null;

      const { data, timestamp } = JSON.parse(cached);
      const isExpired = Date.now() - timestamp > CACHE_EXPIRY;
      
      return isExpired ? null : data;
    } catch {
      return null;
    }
  },

  // Limpar cache
  clear: () => {
    localStorage.removeItem(CACHE_KEY);
  },

  // Verificar se cache existe e é válido
  isValid: () => {
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) return false;

    try {
      const { timestamp } = JSON.parse(cached);
      return Date.now() - timestamp <= CACHE_EXPIRY;
    } catch {
      return false;
    }
  }
};