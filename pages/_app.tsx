import { ThemeProvider } from "next-themes";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { SessionProvider } from "next-auth/react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <ThemeProvider attribute="class" forcedTheme="light">
        <div className={`${inter.variable} font-sans`}>
          <Component {...pageProps} />
        </div>
        <Toaster />
      </ThemeProvider>
    </SessionProvider>
  );
}
