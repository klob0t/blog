import type { Metadata } from "next";
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { Instrument_Serif } from 'next/font/google'
import "./globals.css";


const InstrumentSerif = Instrument_Serif({
  subsets: ['latin-ext'],
  weight: '400',
  variable: '--font-serif',
  style: ['italic', 'normal']
})

export const metadata: Metadata = {
  title: "klob0t",
  description: "hello",
};

export default function RootLayout({ children
}: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${GeistSans.variable} ${InstrumentSerif.variable} ${GeistMono.variable}`}>
        {children}
      </body>
    </html>
  )
}
