import { create } from 'zustand';

interface TokenPrice {
  price: number;
  timestamp: number;
  currency: string;
}

interface TokenPriceCache {
  [tokenId: string]: {
    [currency: string]: TokenPrice;
  };
}

interface TokenPriceState {
  cache: TokenPriceCache;
  loading: Record<string, boolean>;
  errors: Record<string, string | null>;
  cacheExpiry: number; // in milliseconds
  
  // Actions
  getPrice: (tokenId: string, currency?: string) => Promise<number | null>;
  setPrice: (tokenId: string, currency: string, price: number) => void;
  clearCache: (tokenId?: string) => void;
  setCacheExpiry: (expiry: number) => void;
  isLoading: (tokenId: string, currency?: string) => boolean;
  getError: (tokenId: string, currency?: string) => string | null;
}

const DEFAULT_CACHE_EXPIRY = 600 * 1000; // 60 seconds

const useTokenPriceStore = create<TokenPriceState>()((set, get) => ({
  cache: {},
  loading: {},
  errors: {},
  cacheExpiry: DEFAULT_CACHE_EXPIRY,

  getPrice: async (tokenId: string, currency: string = 'usd') => {
    const state = get();
    const cacheKey = `${tokenId}-${currency}`;
    
    // Check if data exists in cache and is still valid
    const cachedData = state.cache[tokenId]?.[currency];
    if (cachedData) {
      const isExpired = Date.now() - cachedData.timestamp > state.cacheExpiry;
      if (!isExpired) {
        return cachedData.price;
      }
    }

    // Check if already loading
    if (state.loading[cacheKey]) {
      // Wait for the existing request to complete
      return new Promise((resolve) => {
        const checkInterval = setInterval(() => {
          const currentState = get();
          if (!currentState.loading[cacheKey]) {
            clearInterval(checkInterval);
            const price = currentState.cache[tokenId]?.[currency]?.price ?? null;
            resolve(price);
          }
        }, 100);
      });
    }

    // Set loading state
    set((state) => ({
      loading: { ...state.loading, [cacheKey]: true },
      errors: { ...state.errors, [cacheKey]: null },
    }));

    try {
      const response = await fetch(
        `/api/token-price?id=${tokenId}&vs_currency=${currency}`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch price for ${tokenId}`);
      }

      const data = await response.json();
      const price = data[tokenId]?.[currency];

      if (price === undefined) {
        throw new Error(`Price not found for ${tokenId}`);
      }

      // Update cache
      set((state) => ({
        cache: {
          ...state.cache,
          [tokenId]: {
            ...state.cache[tokenId],
            [currency]: {
              price,
              timestamp: Date.now(),
              currency,
            },
          },
        },
        loading: { ...state.loading, [cacheKey]: false },
      }));

      return price;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      
      set((state) => ({
        loading: { ...state.loading, [cacheKey]: false },
        errors: { ...state.errors, [cacheKey]: errorMessage },
      }));

      console.error(`Error fetching price for ${tokenId}:`, error);
      return null;
    }
  },

  setPrice: (tokenId: string, currency: string, price: number) => {
    set((state) => ({
      cache: {
        ...state.cache,
        [tokenId]: {
          ...state.cache[tokenId],
          [currency]: {
            price,
            timestamp: Date.now(),
            currency,
          },
        },
      },
    }));
  },

  clearCache: (tokenId?: string) => {
    if (tokenId) {
      set((state) => {
        const newCache = { ...state.cache };
        delete newCache[tokenId];
        return { cache: newCache };
      });
    } else {
      set({ cache: {} });
    }
  },

  setCacheExpiry: (expiry: number) => {
    set({ cacheExpiry: expiry });
  },

  isLoading: (tokenId: string, currency: string = 'usd') => {
    const cacheKey = `${tokenId}-${currency}`;
    return get().loading[cacheKey] || false;
  },

  getError: (tokenId: string, currency: string = 'usd') => {
    const cacheKey = `${tokenId}-${currency}`;
    return get().errors[cacheKey] || null;
  },
}));

export default useTokenPriceStore;
