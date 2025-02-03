
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const clerkKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

  return (
    <ClerkProvider
      publishableKey={
        clerkKey || "pk_test_YmVsb3ZlZC1oeWVuYS03OC5jbGVyay5hY2NvdW50cy5kZXYk"
      }
    >
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} ${roboto.variable} antialiased`}
        >
          <Suspense
            fallback={
              <Loader2 className="w-10 h-10 animate-spin text-primary" />
            }
          >
            <QueryProvider>
              <main>
                <Header />
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
