// This is the root layout component for your Next.js app.
// Learn more: https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#root-layout-required
import { Inter, Manrope } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const fontHeading = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
});

const fontBody = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

const fontText = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-text",
});

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "antialiased",
          fontHeading.variable,
          fontBody.variable,
          fontText.variable
        )}
      >
        <div className="min-h-screen max-w-7xl mx-auto p-4">
          <header className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-2">
              <img src="/logo.png" alt="AiHub.sh" className="w-8 h-8" />
              <Link href="/">
                <span className="text-2xl font-bold">AIhub.sh</span>
              </Link>
            </div>
            <nav className="flex space-x-4">
              <Button className="bg-[#009E5B] hover:bg-[#009e5ce0] text-white disabled cursor-not-allowed">
                Login
              </Button>
            </nav>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
