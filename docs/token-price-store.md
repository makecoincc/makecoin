# Token Price Store 使用文档

## 概述

`useTokenPriceStore` 是一个基于 Zustand 的状态管理 store，用于缓存和管理代币价格数据。它提供了自动缓存、过期管理和防止重复请求等功能。

## 特性

- ✅ 自动缓存代币价格
- ✅ 可配置的缓存过期时间
- ✅ 支持多个代币和多种货币
- ✅ 防止重复请求（请求去重）
- ✅ 自动错误处理
- ✅ Loading 状态管理

## 基本使用

### 方法 1: 使用 Hook（推荐）

```tsx
import { useTokenPrice } from '@/hooks/useTokenPrice';

function MyComponent() {
  const { price, loading, error, refetch } = useTokenPrice({
    tokenId: 'solana',
    vsCurrency: 'usd',
    refreshInterval: 30000, // 每30秒自动刷新
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return <div>Solana: ${price}</div>;
}
```

### 方法 2: 直接使用 Store

```tsx
import useTokenPriceStore from '@/store/useTokenPriceStore';
import { useEffect, useState } from 'react';

function MyComponent() {
  const { getPrice, isLoading, getError } = useTokenPriceStore();
  const [price, setPrice] = useState<number | null>(null);

  useEffect(() => {
    getPrice('solana', 'usd').then(setPrice);
  }, []);

  const loading = isLoading('solana', 'usd');
  const error = getError('solana', 'usd');

  return <div>Solana: ${price}</div>;
}
```

### 方法 3: 获取多个代币价格

```tsx
import { useMultipleTokenPrices } from '@/hooks/useMultipleTokenPrices';

function MyComponent() {
  const { prices, loading, errors } = useMultipleTokenPrices({
    tokenIds: ['solana', 'bitcoin', 'ethereum'],
    vsCurrency: 'usd',
    refreshInterval: 60000,
  });

  return (
    <div>
      <div>Solana: ${prices.solana}</div>
      <div>Bitcoin: ${prices.bitcoin}</div>
      <div>Ethereum: ${prices.ethereum}</div>
    </div>
  );
}
```

## Store API

### State

```typescript
interface TokenPriceState {
  cache: TokenPriceCache;           // 价格缓存
  loading: Record<string, boolean>; // Loading 状态
  errors: Record<string, string>;   // 错误信息
  cacheExpiry: number;              // 缓存过期时间（毫秒）
}
```

### Actions

#### `getPrice(tokenId: string, currency?: string): Promise<number | null>`

获取代币价格。如果缓存中存在且未过期，直接返回缓存数据；否则从 API 获取。

```tsx
const price = await getPrice('solana', 'usd');
```

#### `setPrice(tokenId: string, currency: string, price: number): void`

手动设置代币价格到缓存。

```tsx
setPrice('solana', 'usd', 144.02);
```

#### `clearCache(tokenId?: string): void`

清除缓存。如果提供 `tokenId`，只清除该代币的缓存；否则清除所有缓存。

```tsx
clearCache('solana'); // 清除 Solana 的缓存
clearCache();         // 清除所有缓存
```

#### `setCacheExpiry(expiry: number): void`

设置缓存过期时间（毫秒）。

```tsx
setCacheExpiry(120000); // 设置为 2 分钟
```

#### `isLoading(tokenId: string, currency?: string): boolean`

检查是否正在加载某个代币的价格。

```tsx
const loading = isLoading('solana', 'usd');
```

#### `getError(tokenId: string, currency?: string): string | null`

获取某个代币的错误信息。

```tsx
const error = getError('solana', 'usd');
```

## 使用组件

### TokenPriceBadge

简单的价格徽章组件。

```tsx
import TokenPriceBadge from '@/components/token-price-badge';

<TokenPriceBadge tokenId="solana" vsCurrency="usd" />
```

### TokenPriceList

显示多个代币价格的列表组件。

```tsx
import TokenPriceList from '@/components/token-price-list';

<TokenPriceList 
  tokenIds={['solana', 'bitcoin', 'ethereum']}
  vsCurrency="usd"
  refreshInterval={30000}
/>
```

### TokenPriceDisplay

完整的价格显示组件（带错误处理和重试）。

```tsx
import TokenPriceDisplay from '@/components/token-price-display';

<TokenPriceDisplay 
  tokenId="solana" 
  vsCurrency="usd"
  refreshInterval={30000}
/>
```

## 高级用法

### 自定义缓存过期时间

```tsx
import useTokenPriceStore from '@/store/useTokenPriceStore';

function MyComponent() {
  const { setCacheExpiry, getPrice } = useTokenPriceStore();

  useEffect(() => {
    // 设置缓存 5 分钟过期
    setCacheExpiry(5 * 60 * 1000);
  }, []);

  // ... 使用 getPrice
}
```

### 手动刷新价格

```tsx
import useTokenPriceStore from '@/store/useTokenPriceStore';

function MyComponent() {
  const { clearCache, getPrice } = useTokenPriceStore();

  const forceRefresh = async () => {
    clearCache('solana'); // 清除缓存
    await getPrice('solana', 'usd'); // 重新获取
  };

  return <button onClick={forceRefresh}>刷新价格</button>;
}
```

### 预加载价格

```tsx
import useTokenPriceStore from '@/store/useTokenPriceStore';

function MyApp() {
  const { getPrice } = useTokenPriceStore();

  useEffect(() => {
    // 预加载常用代币价格
    const preloadPrices = async () => {
      await Promise.all([
        getPrice('solana', 'usd'),
        getPrice('bitcoin', 'usd'),
        getPrice('ethereum', 'usd'),
      ]);
    };

    preloadPrices();
  }, []);

  return <div>...</div>;
}
```

### 条件获取

```tsx
import { useTokenPrice } from '@/hooks/useTokenPrice';

function MyComponent({ shouldFetch }: { shouldFetch: boolean }) {
  const { price } = useTokenPrice({
    tokenId: 'solana',
    enabled: shouldFetch, // 只在 shouldFetch 为 true 时获取
  });

  return <div>{price}</div>;
}
```

## 缓存机制

1. **首次请求**: 从 API 获取数据并存入缓存
2. **后续请求**: 
   - 如果缓存未过期，直接返回缓存数据
   - 如果缓存已过期，重新从 API 获取
3. **并发请求**: 如果同一个代币正在请求中，后续请求会等待第一个请求完成

## 性能优化建议

1. **设置合理的缓存时间**: 根据你的需求设置缓存过期时间
   ```tsx
   setCacheExpiry(60000); // 1 分钟
   ```

2. **使用 refreshInterval**: 对于需要实时更新的场景
   ```tsx
   useTokenPrice({ tokenId: 'solana', refreshInterval: 30000 });
   ```

3. **批量获取**: 使用 `useMultipleTokenPrices` 而不是多个 `useTokenPrice`
   ```tsx
   // ✅ 好
   useMultipleTokenPrices({ tokenIds: ['solana', 'bitcoin'] });
   
   // ❌ 不推荐
   useTokenPrice({ tokenId: 'solana' });
   useTokenPrice({ tokenId: 'bitcoin' });
   ```

4. **预加载**: 在应用启动时预加载常用代币价格

## 注意事项

- 缓存存储在内存中，刷新页面会清空
- 默认缓存过期时间为 60 秒
- API 请求会自动去重，避免重复请求
- 错误会被缓存，需要手动清除或等待过期后重试
