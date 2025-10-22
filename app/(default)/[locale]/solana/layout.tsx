import {SolanaProvider} from '@/app/provider/Solana';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SolanaProvider>
      {children}
    </SolanaProvider>
  );
}