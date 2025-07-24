export {};

declare global {
  interface Window {
    solana?: {
      connect: () => Promise<any>;
      publicKey?: {
        toBase58: () => string;
      };
      signMessage?: (message: Uint8Array) => Promise<Uint8Array>;
      // 你可以根据需要添加更多属性
    };
  }
}