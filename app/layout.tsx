import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavLink from "@/components/NavLink";
import DiscordLoginButton from "@/components/DiscordLoginButton";
import { verifyAdmin } from "@/helpers/auth";
import CRTSearchBar from "@/components/CRTSearchBar";
import prisma from "@/client";
import { getCRTDisplayName } from "@/helpers/crt";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CRT Community Wiki",
  description: "The CRT Community Wiki",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isAdmin = await verifyAdmin();
  const crts = await prisma.cRT.findMany({
    where: {
      verified: true
    }
  })
  const crtEntries = crts.map((crt) => ({
    id: crt.id,
    name: getCRTDisplayName(crt)
  }))

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <nav className="flex items-center gap-4 px-6 py-4 bg-gray-100 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
          <NavLink href="/">
            Home
          </NavLink>
          <NavLink href="/crt">
            CRTs
          </NavLink>
          {isAdmin && (
            <NavLink href="/dashboard">
              Dashboard
            </NavLink>
          )}
          <a
            className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
            href="https://github.com/ash-hammond/crt-wiki"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a
            className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
            href="https://discord.gg/FGwpEpQGKD"
            target="_blank"
            rel="noopener noreferrer"
          >
            Discord
          </a>
          <CRTSearchBar crtEntries={crtEntries} />
          <div className="ml-auto">
            <DiscordLoginButton />
          </div>
        </nav>
        <main className="p-6">
          {children}
        </main>
      </body>
    </html>
  );
}
