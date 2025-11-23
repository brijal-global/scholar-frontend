"use client";

import Navbar from "@/components/admin/common/Navbar";
import Footer from "@/components/admin/common/Footer";
import DesktopSidebar from "@/components/admin/common/DesktopSIdebar";
import MobileSidebar from "@/components/admin/common/MobileSIdebar";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import Loader from "@/components/ui/Loader";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const router = useRouter();

  const { loading, signedInStatus, userData } = useAuth();

  if (loading || (signedInStatus !== true && signedInStatus !== false)) {
    return <Loader />;
  }

  if (userData?.role?.name === "organizationEmployee") {
    router.push("/auth/sign-in");
  }

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
