import type { Metadata } from "next";
import localFont from "next/font/local";
import { cn } from "@/lib/utils";
import "./globals.css";

const pretendard = localFont({
  src: "../fonts/PretendardStdVariable.woff2",
  variable: "--font-pretendard",
  weight: "100 900",
  display: "swap",
  adjustFontFallback: false,
});

const dmSans = localFont({
  src: "../fonts/DMSans-VariableFont_opsz,wght.woff2",
  variable: "--font-dm-sans",
  weight: "100 700",
  display: "swap",
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: "Quiz App",
  description: "퀴즈 앱",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={cn(
        "dark h-full antialiased",
        pretendard.variable,
        dmSans.variable
      )}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
