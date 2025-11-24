"use client";

import Navbar from "@/components/user/common/Navbar";
import Footer from "@/components/user/common/Footer";
import DesktopSidebar from "@/components/user/common/DesktopSidebar";
import MobileSidebar from "@/components/user/common/MobileSidebar";
import { usePathname } from "next/navigation";

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-5 xl:grid-cols-6 h-dvh overflow-hidden">
      <DesktopSidebar pathname={pathname} />
      <MobileSidebar pathname={pathname} />
      <div className="lg:col-span-4 xl:col-span-5 w-full h-dvh overflow-hidden flex flex-col">
        <Navbar pathname={pathname} />
        <div className="w-full h-dvh bg-white overflow-y-auto flex-1">
          <div className="min-h-dvh p-2 md:p-4 lg:p-5">{children}</div>
          <Footer />
        </div>
      </div>
    </div>
  );
}
