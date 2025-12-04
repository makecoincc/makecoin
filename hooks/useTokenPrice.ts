import { useState, useEffect } from 'react';
import useTokenPriceStore from '@/store/useTokenPriceStore';

interface UseTokenPriceOptions {
  tokenId?: string;
  vsCurrency?: string;
  refreshInterval?: number; // in milliseconds
  enabled?: boolean; // whether to fetch automatically
}

export function useTokenPrice({
  tokenId = 'solana',
  vsCurrency = 'usd',
  refreshInterval,
  enabled = true,
}: UseTokenPriceOptions = {}) {
  const { getPrice, isLoading, getError } = useTokenPriceStore();
  const [price, setPrice] = useState<number | null>(null);

  const fetchPrice = async () => {
    const result = await getPrice(tokenId, vsCurrency);
    setPrice(result);
  };

  useEffect(() => {
    if (!enabled) return;

    fetchPrice();

    if (refreshInterval) {
      const interval = setInterval(fetchPrice, refreshInterval);
      return () => clearInterval(interval);
    }
  }, [tokenId, vsCurrency, refreshInterval, enabled]);

  return {
    price,
    loading: isLoading(tokenId, vsCurrency),
    error: getError(tokenId, vsCurrency),
    refetch: fetchPrice,
  };
}
