import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Latest Blogs - Discover Amazing Content",
  description: "Explore the latest blog posts on technology, programming, and more. Read insightful articles with detailed guides and tutorials.",
  keywords: "blog, articles, programming, technology, tutorials, guides",
  authors: [{ name: "Blog Author" }],
  creator: "Blog Team",
  publisher: "Blog Site",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "http://localhost:3000",
    title: "Latest Blogs - Discover Amazing Content",
    description: "Explore the latest blog posts on technology, programming, and more.",
    siteName: "Latest Blogs",
  },
  twitter: {
    card: "summary_large_image",
    title: "Latest Blogs - Discover Amazing Content",
    description: "Explore the latest blog posts on technology, programming, and more.",
    creator: "@yourtwitterhandle",
  },
};

export const viewport = "width=device-width, initial-scale=1";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-neutral-50`}
      >
        <div className="w-full min-h-screen">{children}</div>
      </body>
    </html>
  );
}
