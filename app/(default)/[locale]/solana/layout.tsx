import {SolanaProvider} from '@/app/provider/solana-provider';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SolanaProvider>
      {children}
    </SolanaProvider>
  );
}