import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Studio",
  description: "E-commerce",
};

// RootLayout component
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
