import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import ParticleBackground from "@/components/ParticleBackground";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Physics-Shift Weather Simulator | AI Interactive Climate Engine",
  description: "Manipulate fundamental physics parameters and observe real-time simulated weather outcomes with AI-powered explanations. A futuristic interactive climate simulation.",
  keywords: ["weather", "physics", "simulation", "climate", "AI", "interactive"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <ParticleBackground />
        <NavBar />
        <main className="pt-24">
          {children}
        </main>
      </body>
    </html>
  );
}
