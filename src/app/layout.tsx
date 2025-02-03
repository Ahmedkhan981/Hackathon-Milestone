// app/layout.tsx
import { ClerkProvider } from "@clerk/nextjs";
import { Geist, Geist_Mono, Roboto } from "next/font/google";
import "./Style/globals.css";
import { QueryProvider } from "./custom/ReactQuery";
import { Suspense } from "react";
import Header from "./components/layout/Header";
import { SanityLive } from "../sanity/lib/live";
import { Loader2 } from "lucide-react";


const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "700"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} ${roboto.variable} antialiased`}
        >
          <Suspense
            fallback={
              <div className="flex items-center justify-center h-screen">
                <Loader2 className="w-10 h-10 animate-spin text-primary" />
              </div>
            }
          >
            <QueryProvider>
              <main>
                <Header />
                {/* Render children or NotFound */}
                {children}
              </main>
              <SanityLive />
            </QueryProvider>
          </Suspense>
        </body>
      </html>
    </ClerkProvider>
  );
}

































