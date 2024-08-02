// This is the root layout component for your Next.js app.
// Learn more: https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#root-layout-required
import { Inter, Manrope } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
              <Image
                src="/logo.png"
                alt="AiHub.sh"
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <Link href="/">
                <span className="text-2xl font-bold">AIfocus.sh</span>
              </Link>
            </div>
            <nav className="flex items-center space-x-4">
              <Link
                href="https://github.com/aifocus-sh/aifocus-sh-ui/"
                target="_blank"
                className="flex items-center gap-2 border border-muted-foreground rounded-lg px-4 py-2"
              >
                <svg
                  data-testid="geist-icon"
                  height="20"
                  width="20"
                  strokeLinejoin="round"
                  viewBox="0 0 16 16"
                >
                  <g>
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M8 0C3.58 0 0 3.57879 0 7.99729C0 11.5361 2.29 14.5251 5.47 15.5847C5.87 15.6547 6.02 15.4148 6.02 15.2049C6.02 15.0149 6.01 14.3851 6.01 13.7154C4 14.0852 3.48 13.2255 3.32 12.7757C3.23 12.5458 2.84 11.836 2.5 11.6461C2.22 11.4961 1.82 11.1262 2.49 11.1162C3.12 11.1062 3.57 11.696 3.72 11.936C4.44 13.1455 5.59 12.8057 6.05 12.5957C6.12 12.0759 6.33 11.726 6.56 11.5261C4.78 11.3262 2.92 10.6364 2.92 7.57743C2.92 6.70773 3.23 5.98797 3.74 5.42816C3.66 5.22823 3.38 4.40851 3.82 3.30888C3.82 3.30888 4.49 3.09895 6.02 4.1286C6.66 3.94866 7.34 3.85869 8.02 3.85869C8.7 3.85869 9.38 3.94866 10.02 4.1286C11.55 3.08895 12.22 3.30888 12.22 3.30888C12.66 4.40851 12.38 5.22823 12.3 5.42816C12.81 5.98797 13.12 6.69773 13.12 7.57743C13.12 10.6464 11.25 11.3262 9.47 11.5261C9.76 11.776 10.01 12.2558 10.01 13.0056C10.01 14.0752 10 14.9349 10 15.2049C10 15.4148 10.15 15.6647 10.55 15.5847C12.1381 15.0488 13.5182 14.0284 14.4958 12.6673C15.4735 11.3062 15.9996 9.67293 16 7.99729C16 3.57879 12.42 0 8 0Z"
                      fill="currentColor"
                    ></path>
                  </g>
                </svg>
                <span className="font-bold">GitHub</span>
              </Link>
              <Button className="bg-[#009E5B] hover:bg-[#009e5ce0] text-white disabled cursor-not-allowed">
                Login
              </Button>
            </nav>
          </header>
          {children}
        </div>
        <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        style={{ fontSize: '1.5rem !important' }}
      />
      </body>
    </html>
  );
}
