import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavLink from "@/components/NavLink";
import DiscordLoginButton from "@/components/DiscordLoginButton";
import { verifyAdmin } from "@/helpers/auth";
import CRTSearchBar from "@/components/CRTSearchBar";
import prisma from "@/client";
import { getCRTDisplayName } from "@/helpers/crt";
import MobileMenu from "@/components/MobileMenu";

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
        className={`antialiased bg-stone-950 text-white`}
      >
        <nav className="flex items-center gap-4 px-6 py-4 border-b border-stone-800">
          <MobileMenu isAdmin={isAdmin} />
          <NavLink className="hidden sm:block" href="/">
            Home
          </NavLink>
          <NavLink className="hidden sm:block" href="/crt">
            CRTs
          </NavLink>
          {isAdmin && (
            <NavLink className="hidden sm:block" href="/dashboard">
              Dashboard
            </NavLink>
          )}
          <CRTSearchBar crtEntries={crtEntries} />
          <div className="ml-auto hidden sm:block">
            <DiscordLoginButton />
          </div>
        </nav>
        <main className="p-6">
          {children}
        </main>
        <footer>
          <a
            className="hover:underline font-medium"
            href="https://github.com/ash-hammond/crt-wiki"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a
            className="hover:underline font-medium"
            href="https://discord.gg/FGwpEpQGKD"
            target="_blank"
            rel="noopener noreferrer"
          >
            Discord
          </a>
        </footer>
      </body>
    </html>
  );
}
