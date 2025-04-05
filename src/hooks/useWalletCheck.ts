// hooks/useWalletDisconnectRedirect.ts
'use client';

import { useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useRouter } from 'next/navigation';

export const useWalletDisconnectRedirect = () => {
  const { wallet, connected } = useWallet();
  const router = useRouter();

  useEffect(() => {
    if (!wallet?.adapter) return;

    const handleDisconnect = () => {
      router.push('/register/signin');
    };

    wallet.adapter.on('disconnect', handleDisconnect);

    // Clean up listener
    return () => {
      wallet.adapter.off('disconnect', handleDisconnect);
    };
  }, [wallet?.adapter]);
};
