'use client';

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "@/constants";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useDisconnect, useWriteContract, useSimulateContract } from 'wagmi';

const WalletSection = () => {
  const { address, isConnected } = useAccount();

  const { data: simulateData } = useSimulateContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'mint',
    value: BigInt(0),
  });

  const { writeContract, isPending, isSuccess } = useWriteContract();

  const handleMint = () => {
    if (simulateData?.request) {
      writeContract(simulateData.request);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-sm">
      {isConnected ? (
        <>
          <Button 
            onClick={handleMint}
            disabled={!simulateData?.request || isPending}
            className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-3"
          >
            {isPending ? 'Minting...' : isSuccess ? 'Minted 1 MEMEMACHU for 0 ETH!' : 'Mint MEMEMACHU for 0 ETH'}
          </Button>

          <ConnectButton />
        </>
      ) : (
        <div className="w-full flex justify-center">
          <ConnectButton />
        </div>
      )}
    </div>
  );
};

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: `url('/background.jpg')`,
      }}
    >
      <div className="absolute inset-0 bg-black/50" />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="flex flex-col items-center max-w-2xl mx-auto">
          <a href="https://imgflip.com/i/53qlhw" 
             target="_blank" 
             rel="noopener noreferrer"
             className="mb-6 transform hover:scale-105 transition-transform"
          >
            <Image 
              src="/mememachu.png" 
              alt="Mememachu Logo" 
              width={120} 
              height={120} 
              className="shadow-lg"
            />
          </a>
          
          <h1 className="text-5xl font-bold mb-12 text-white text-center">
            Mememachu
          </h1>

          <div className="w-full max-w-md bg-yellow-400/90 rounded-2xl shadow-xl p-8">
            <WalletSection />
          </div>
        </div>
      </div>
    </main>
  );
}
