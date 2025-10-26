import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "../styles/globals.css";
import NextTopLoader from "nextjs-toploader";
import AntdProvider from "@/providers/AntdProvider";

export const metadata: Metadata = {
  title: "Scholar | Your partner for managing the school | By Fleebug Inc.",
  description:
    "Scholar | Your partner for managing the school | By Fleebug Inc.",
};

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.className} bg-[#F1F1F1]`}>
        <AntdProvider>
          <NextTopLoader
            color="#0074d9"
            initialPosition={0.08}
            crawlSpeed={100}
            height={3}
            crawl={true}
            showSpinner={false}
            easing="linear"
            speed={100}
            shadow="0 0 10px #0074d9,0 0 5px #0074d9"
            template='<div class="bar" role="bar"><div class="peg"></div></div> 
         <div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
            zIndex={1600}
            showAtBottom={false}
          />
          {children}
        </AntdProvider>
      </body>
    </html>
  );
}
