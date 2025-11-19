import { lamportsToSol } from "gill";
import { useBalance } from "@gillsdk/react";
 
export function WalletBalance({ address }: { address: string }) {
  const { balance, isLoading, isError, error } = useBalance({ address });
 
  if (isLoading) return <div className="mt-2">Loading...</div>;
  if (isError) return <div className="mt-2">Error: {error?.toString()}</div>;
 
  return (
    <div>
      <p className="mt-2">Balance: {lamportsToSol(balance)} SOL</p>
    </div>
  );
}