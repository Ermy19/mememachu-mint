'use client';

import Image from "next/image";
import { Button } from "@/components/ui/button";
//import { Input } from "@/components/ui/input"
import { ethers } from "ethers";
import { useState } from "react";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "@/constants";

export default function Home() {
  const [address, setAddress] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  
  const connectWallet = async () => {
    try {
      if (window.ethereum == null) {
        alert("Please install MetaMask!");
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      setAddress(address);
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  const disconnectWallet = () => {
    setAddress("");
  };

  const mintNFT = async () => {
    try {
      setLoading(true);
      if (!address) {
        alert("Please connect your wallet first!");
        return;
      }

      if (!window.ethereum) throw new Error("No ethereum provider found");
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      const mintPrice = await contract.MINT_PRICE();
      const tx = await contract.mint({ value: mintPrice });
      await tx.wait();
      
      alert("NFT minted successfully!");
    } catch (error) {
      console.error("Error minting NFT:", error);
      alert("Error minting NFT. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
          <a href="https://imgflip.com/i/53qlhw" target="_blank" rel="noopener noreferrer">
            <Image src="/mememachu.png" alt="Mememachu Logo" width={100} height={100} className="mb-4" />
          </a>
          <h1 className="text-4xl font-bold mb-8 text-white">Mememachu</h1>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            <div className="px-8 py-12 bg-yellow-400 rounded-xl flex items-center justify-center text-lg font-medium">
              <div className="flex flex-col items-center justify-center space-y-4">
                <Button 
                  onClick={mintNFT} 
                  disabled={!address || loading}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold"
                >
                  {loading ? "Minting..." : "Mint NFT (0.01 ETH)"}
                </Button>
              </div>
            </div>
            <div className="px-8 py-12 bg-yellow-400 rounded-xl flex items-center justify-center text-lg font-medium">
              <div className="flex flex-col space-y-4">
                {address ? (
                  <>
                    <p className="text-center text-sm">
                      {`${address.slice(0,6)}...${address.slice(-4)}`}
                    </p>
                    <Button 
                      onClick={disconnectWallet}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold"
                    >
                      Disconnect Wallet
                    </Button>
                  </>
                ) : (
                  <Button 
                    onClick={connectWallet}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold"
                  >
                    Connect Wallet
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
