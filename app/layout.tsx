import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Providers from "./providers";
import "@rainbow-me/rainbowkit/styles.css";
import "./globals.css";
//import { type ReactNode } from '@rainbow-me/rainbowkit/node_modules/@types/react';
import { type ReactNode } from 'react';

interface RootLayoutProps {
  children: ReactNode
}

export const metadata: Metadata = {
  title: 'Mememachu',
  description: 'Mememachu minting app'
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
