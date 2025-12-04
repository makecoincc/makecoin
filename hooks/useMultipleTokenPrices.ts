import { useState, useEffect } from 'react';
import useTokenPriceStore from '@/store/useTokenPriceStore';

interface UseMultipleTokenPricesOptions {
  tokenIds: string[];
  vsCurrency?: string;
  refreshInterval?: number;
  enabled?: boolean;
}

interface TokenPriceResult {
  [tokenId: string]: number | null;
}

export function useMultipleTokenPrices({
  tokenIds,
  vsCurrency = 'usd',
  refreshInterval,
  enabled = true,
}: UseMultipleTokenPricesOptions) {
  const { getPrice, isLoading, getError } = useTokenPriceStore();
  const [prices, setPrices] = useState<TokenPriceResult>({});
  const [loading, setLoading] = useState<boolean>(true);

  const fetchPrices = async () => {
    setLoading(true);
    const results: TokenPriceResult = {};

    await Promise.all(
      tokenIds.map(async (tokenId) => {
        const price = await getPrice(tokenId, vsCurrency);
        results[tokenId] = price;
      })
    );

    setPrices(results);
    setLoading(false);
  };

  useEffect(() => {
    if (!enabled || tokenIds.length === 0) return;

    fetchPrices();

    if (refreshInterval) {
      const interval = setInterval(fetchPrices, refreshInterval);
      return () => clearInterval(interval);
    }
  }, [JSON.stringify(tokenIds), vsCurrency, refreshInterval, enabled]);

  const errors = tokenIds.reduce((acc, tokenId) => {
    const error = getError(tokenId, vsCurrency);
    if (error) {
      acc[tokenId] = error;
    }
    return acc;
  }, {} as Record<string, string>);

  const isAnyLoading = tokenIds.some((tokenId) => isLoading(tokenId, vsCurrency));

  return {
    prices,
    loading: loading || isAnyLoading,
    errors,
    refetch: fetchPrices,
  };
}
