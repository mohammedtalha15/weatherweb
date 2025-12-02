import type { Metadata } from "next";
import { Lora, Nunito } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Physics-Shift Weather Simulator",
  description: "Interactive atmospheric physics simulation. Explore how gravity, pressure, and sunlight shape planetary climates.",
  keywords: ["weather simulation", "physics", "climate", "education", "interactive", "3d globe"],
  openGraph: {
    title: "Physics-Shift Weather Simulator",
    description: "Explore how gravity, pressure, and sunlight shape planetary climates.",
    type: "website",
  },
};

import { ToastProvider } from "@/components/ui/toast";

// ...

import ErrorBoundary from "@/components/ErrorBoundary";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🌍</text></svg>" />
      </head>
      <body className={`${lora.variable} ${nunito.variable} font-sans antialiased min-h-screen bg-[#FDFBF7] flex flex-col`}>

        <ToastProvider>
          <ErrorBoundary>
            <NavBar />
            <main className="pt-20 pb-10 flex-grow">
              {children}
            </main>
            <Footer />
          </ErrorBoundary>
        </ToastProvider>
      </body>
    </html>
  );
}
