import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import AntdProvider from "@/providers/AntdProvider";
import { Bounce, ToastContainer } from "react-toastify";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "Scholar | Your partner for managing the school | By Fleebug Inc.",
  description:
    "Scholar | Your partner for managing the school | By Fleebug Inc.",
};

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} bg-[#F1F1F1]`}>
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
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Bounce}
          />
        </AntdProvider>
      </body>
    </html>
  );
}
