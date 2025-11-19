"use client";
 
import { createSolanaClient } from "gill";
import { SolanaProvider } from "@gillsdk/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
 
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
    },
  },
});
 
const solanaClient = createSolanaClient({
  urlOrMoniker: `${process.env.NEXT_PUBLIC_DEV_RPC_URL}?api-key=${process.env.NEXT_PUBLIC_HELIUS_KEY}` || "devnet",
});
 
export function GillProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <SolanaProvider client={solanaClient}>{children}</SolanaProvider>
    </QueryClientProvider>
  );
}