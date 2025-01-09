"use client";

import * as React from 'react';
import type { ReactNode } from 'react';
//import type { ReactNode } from '@rainbow-me/rainbowkit/node_modules/@types/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { mainnet, sepolia } from 'wagmi/chains';

const config = getDefaultConfig({
  appName: 'Mememachu',
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID || '',
  chains: [mainnet, sepolia],
});

interface ProvidersProps {
  children: React.ReactNode;
}

const queryClient = new QueryClient();
export function Providers({ children }: { children: ProvidersProps }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider modalSize="compact">
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default Providers;