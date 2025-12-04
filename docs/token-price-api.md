# Token Price API 使用文档

## API 端点

### GET /api/token-price

获取指定代币的价格信息。

#### 查询参数

- `id` (可选): 代币 ID，默认为 `solana`
  - 示例: `solana`, `bitcoin`, `ethereum`, `cardano` 等
- `vs_currency` (可选): 目标货币，默认为 `usd`
  - 示例: `usd`, `eur`, `cny`, `jpy` 等

#### 示例请求

```bash
# 获取 Solana 价格（USD）
curl http://localhost:3000/api/token-price?id=solana

# 获取 Bitcoin 价格（USD）
curl http://localhost:3000/api/token-price?id=bitcoin

# 获取 Ethereum 价格（EUR）
curl http://localhost:3000/api/token-price?id=ethereum&vs_currency=eur

# 获取多个代币价格
curl http://localhost:3000/api/token-price?id=solana,bitcoin,ethereum
```

#### 响应示例

```json
{
  "solana": {
    "usd": 144.02
  }
}
```

## 前端使用

### 使用 Hook

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

  return <div>Solana Price: ${price}</div>;
}
```

### 使用组件

```tsx
import TokenPriceDisplay from '@/components/token-price-display';

function MyPage() {
  return (
    <div>
      <TokenPriceDisplay tokenId="solana" vsCurrency="usd" />
      <TokenPriceDisplay tokenId="bitcoin" vsCurrency="usd" />
      <TokenPriceDisplay tokenId="ethereum" vsCurrency="eur" />
    </div>
  );
}
```

### 直接调用 API

```tsx
async function fetchTokenPrice(tokenId: string) {
  const response = await fetch(`/api/token-price?id=${tokenId}`);
  const data = await response.json();
  return data[tokenId].usd;
}

// 使用
const price = await fetchTokenPrice('solana');
console.log(`Solana price: $${price}`);
```

## 配置

在 `.env.local` 文件中添加你的 CoinGecko API Key：

```env
COINGECKO_API_KEY=your_api_key_here
```

## 支持的代币

CoinGecko 支持数千种代币，常见的包括：

- `bitcoin` - Bitcoin
- `ethereum` - Ethereum
- `solana` - Solana
- `cardano` - Cardano
- `polkadot` - Polkadot
- `dogecoin` - Dogecoin
- `ripple` - XRP
- `binancecoin` - BNB

完整列表请访问: https://api.coingecko.com/api/v3/coins/list

## 缓存

API 响应会缓存 60 秒，以减少对 CoinGecko API 的请求次数。

## 错误处理

API 会返回以下错误状态码：

- `500` - API key 未配置或内部服务器错误
- `4xx/5xx` - CoinGecko API 返回的错误
