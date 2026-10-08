import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { HashRouter } from "@/components/hash-router";
import { CmsProvider } from "@/components/cms-provider";
import { ThemeProvider } from "@/components/theme-provider";

const poppins = Poppins({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Gifar Aulia Rahman - Product Development Engineer",
  description:
    "Gifar Aulia Rahman — Product Development Engineer | NPD & Packaging Specialist. 4+ years in automotive, electronics & F&B. CAD, APQP, PPAP, FMEA. Bekasi, Indonesia.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="id" className={`${poppins.variable} antialiased`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{
          __html: `(function(){try{var t=localStorage.getItem('theme');if(!t)t=window.matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light';document.documentElement.classList.add(t);document.documentElement.style.colorScheme=t}catch(e){}})()`,
        }} />
      </head>
      <body className="min-h-screen">
        <ThemeProvider>
          <CmsProvider>
            <HashRouter />
            {children}
          </CmsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
