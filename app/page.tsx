'use client';

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { ethers } from "ethers";

declare global {
  interface Window {
    ethereum?: any;
  }
} 

export default function Home() {
  
  const connectWallet = async () => {

    let signer = null

    let provider

    if (window.ethereum == null){
      console.log("There is no metamask wallet installed")
    }

    provider = new ethers.BrowserProvider(window.ethereum)
    signer = await provider.getSigner()

    const address = signer.getAddress()
    console.log(address)

  }
  
  return (

    <>
      <div 
        className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/background.jpg')`,
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 flex flex-col items-center">
          <a href="https://www.facebook.com/share/p/1P2nDZsaax/" target="_blank" rel="noopener noreferrer">
            <Image src="/mememachu.png" alt="Mememachu Logo" width={100} height={100} className="mb-4" />
          </a>
          <h1 className="text-4xl font-bold mb-8 text-white">Mememachu</h1>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            <div className="px-8 py-12 bg-yellow-400 rounded-xl flex items-center justify-center text-lg font-medium">
              <div className="flex flex-col items-center justify-center space-y-4">
                <Input placeholder="Enter the amount to mint" autoComplete="off" className="px-3 py-2.5 text-lg font-bold rounded-lg border focus:outline focus:outline-2 focus:outline-offset-2 bg-[#ffffff] text-[#444444] focus:outline-[#aaaaaa] border-[#cccccc]" />
                <Button className="bg-red-500 hover:bg-red-700 text-white font-bold">
                  Mint NFT
                </Button>
              </div>
            </div>
            <div className="px-8 py-12 bg-yellow-400 rounded-xl flex items-center justify-center text-lg font-medium">
              <Button onClick={connectWallet} className="bg-red-500 hover:bg-red-700 text-white font-bold">
                Connect Wallet
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
