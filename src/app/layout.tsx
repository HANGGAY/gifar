import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Gifar Aulia - UI/UX Designer Portfolio",
  description:
    "Portfolio of Gifar Aulia - UI/UX Designer specializing in creating beautiful and functional digital experiences.",
};

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html lang="id" className={`${poppins.variable} antialiased`}>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
