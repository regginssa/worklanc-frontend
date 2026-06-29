import "@/styles/globals.css";
import "@/lib/appkit/init";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import MainLayout from "@/components/layouts/MainLayout";
import AppKitProvider from "@/components/providers/AppKitProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppKitProvider>
      <MainLayout>
        <div className={`${inter.variable} font-sans`}>
          <Component {...pageProps} />
        </div>
      </MainLayout>
    </AppKitProvider>
  );
}
