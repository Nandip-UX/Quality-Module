import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import PageLoader from "@/components/ui/page-loader";
import { Providers } from "@/components/providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "QualityModule — Digital Quality Enforcement for Field Teams",
  description:
    "Replace paper checklists with a structured, multi-role digital approval workflow. Built for construction and manufacturing teams.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-white text-stone-900 antialiased font-[family-name:var(--font-inter)]">
        <Providers>
          <PageLoader />
          {children}
        </Providers>
      </body>
    </html>
  );
}
