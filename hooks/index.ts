'use client';
import { useEffect, useState } from 'react';

export function use100vh(): number | null {
  const [height, setHeight] = useState<number | null>(null);

  useEffect(() => {
    const setRealHeight = () => {
      const vh = window.innerHeight;
      setHeight(vh);
    };

    setRealHeight(); // 初始设置
    window.addEventListener('resize', setRealHeight);

    return () => {
      window.removeEventListener('resize', setRealHeight);
    };
  }, []);

  return height;
}

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const media = window.matchMedia(query);
    const updateMatch = () => setMatches(media.matches);

    updateMatch(); // 初始匹配
    media.addEventListener('change', updateMatch);

    return () => media.removeEventListener('change', updateMatch);
  }, [query]);

  return matches;
}