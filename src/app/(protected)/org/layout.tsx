/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { usePathname, useRouter } from "next/navigation";
import OrgProvider from "@/providers/OrgProvider";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { LogOut, User, Menu, Settings } from "lucide-react";
import { Drawer } from "antd";
import { useAuth } from "@/hooks/useAuth";
import { useOrg } from "@/contexts/OrgContext";
import LogoutModal from "@/components/modals/LogoutModal";
import { primaryOrgSidebarItems } from "@/components/org/common/items";
import { footerLinks } from "@/data/contact";

function OrgDesktopSidebar({ pathname }: { pathname: string }) {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const { collegeName, permissions, isAdmin, permissionsLoaded } = useOrg();

  const visibleItems = primaryOrgSidebarItems.filter((item) => {
    if (!permissionsLoaded || isAdmin) return true;
    const perm = permissions[item.id];
    return perm?.canView !== false;
  });

  return (
    <nav className="hidden lg:flex w-full h-full overflow-y-auto bg-[#fdfdfd] py-2 lg:py-4 px-2 lg:px-4 flex-col border-r border-[#E5E9EB]">
      <div className="flex items-center mb-8 gap-3">
        <Image src="/logo.png" alt="logo" width={30} height={30} />
        <p className="text-lg font-medium text-gray-900 truncate">
          {collegeName || "College Portal"}
        </p>
      </div>

      <div className="flex flex-col gap-1.5">
        {visibleItems.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className={`flex items-center gap-2 py-2.5 px-4 rounded-lg duration-200 transition text-sm ${
              pathname.startsWith(item.href)
                ? "bg-primary-light text-primary font-medium"
                : "text-[#838383] hover:bg-primary-light hover:text-primary"
            }`}
          >
            {item.icon && <item.icon className="w-5 h-5" />}
            {item.label}
          </Link>
        ))}
      </div>

      <div className="flex flex-col space-y-2 mt-7">
        <Link
          href={"#"}
          onClick={() => setIsLogoutModalOpen(true)}
          className="flex items-center gap-2 py-2.5 px-4 rounded-lg duration-200 transition-all text-sm text-[#838383] hover:bg-red-100 hover:text-red-500 cursor-pointer"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </Link>
      </div>

      <LogoutModal
        isOpen={isLogoutModalOpen}
        closeModal={() => setIsLogoutModalOpen(false)}
      />
    </nav>
  );
}

function OrgMobileSidebar({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);
  const { collegeName, permissions, isAdmin, permissionsLoaded } = useOrg();

  const visibleItems = primaryOrgSidebarItems.filter((item) => {
    if (!permissionsLoaded || isAdmin) return true;
    const perm = permissions[item.id];
    return perm?.canView !== false;
  });

  useEffect(() => {
    setTimeout(() => setOpen(false), 0);
  }, [pathname]);

  return (
    <aside className="lg:hidden group">
      <div className="w-full p-2 bg-white border-b border-gray-100 flex items-center gap-3">
        <Menu
          size={24}
          onClick={() => setOpen(true)}
          className="cursor-pointer"
        />
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="logo" width={28} height={28} />
          <p className="text-lg font-medium text-gray-900">
            {collegeName || "College Portal"}
          </p>
        </div>
      </div>

      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        placement="left"
        size={280}
        getContainer={false}
        classNames={{ body: "flex flex-col gap-8" }}
      >
        <div className="overflow-y-auto grow scrollbar space-y-2">
          <div className="flex flex-col gap-1.5">
            {visibleItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className={`flex items-center gap-2 py-2.5 px-4 rounded-lg duration-200 transition-all! text-sm ${
                  pathname.includes(item.href)
                    ? "bg-white! text-primary! font-medium hover:text-primary-dark"
                    : "text-[#838383]! hover:bg-white! hover:text-primary!"
                }`}
              >
                {item.icon && <item.icon className="w-5 h-5" />}
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex flex-col space-y-2 mt-7">
            <Link
              href="/auth"
              className="flex items-center gap-2 py-2.5 px-4 rounded-lg duration-200 transition-all! text-sm text-[#838383]! hover:bg-red-100! hover:text-red-500!"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </Link>
          </div>
        </div>
      </Drawer>
    </aside>
  );
}

function OrgNavbar({ pathname }: { pathname: string }) {
  const [showUser, setShowUser] = useState(false);
  const userRef = useRef<HTMLDivElement>(null);
  const { userData } = useAuth();

  const allItems = primaryOrgSidebarItems;
  const title = pathname.startsWith("/org/profile")
    ? "Profile & Settings"
    : allItems.find((item) => pathname.includes(item.href))?.label || "";

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userRef.current && !userRef.current.contains(event.target as Node)) {
        setShowUser(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-white border-b border-[#E5E9EB] p-3 lg:px-8 sticky to-0 z-10">
      <div className="flex flex-row justify-between items-center">
        <p className="text-lg font-medium text-[#252C32]">{title}</p>
        <div className="flex flex-row items-center gap-4 text-[#5B6871] select-none">
          <User
            className="inline cursor-pointer"
            color="#5B6871"
            size={18}
            onClick={() => setShowUser((prev) => !prev)}
          />
        </div>
      </div>
      {showUser && (
        <div
          ref={userRef}
          className="m-4 text-[#838383] absolute top-8 right-0 w-64 bg-white border border-[#E5E9EB] p-4 flex flex-col space-y-2 mt-4 gap-2 py-2.5 px-4 rounded-lg duration-200 transition-all text-sm"
        >
          <div>
            <p className="text-[#252C32] font-medium">
              {userData?.firstName} {userData?.lastName}
            </p>
            <p className="text-xs text-[#5B6871] text-ellipsis overflow-hidden whitespace-nowrap">
              {userData?.email}
            </p>
          </div>
          <hr className="text-[#E1E1E1]" />
          <Link href="/org/profile">Edit Profile</Link>
        </div>
      )}
    </header>
  );
}

function OrgFooter() {
  return (
    <footer className="bg-[#F8F8F8] text-[#838383] py-2 w-full text-xs">
      <div className="container mx-auto px-4 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="flex flex-wrap justify-center gap-4">
          {footerLinks.map((item: any) => (
            <Link
              key={item.id}
              href={item.href}
              className="hover:text-gray-700 transition-all p-2"
            >
              {item.label}
            </Link>
          ))}
        </div>
        <span>
          &copy; {new Date()?.getFullYear() || 2026} Scholar. All rights
          reserved.
        </span>
      </div>
    </footer>
  );
}

function OrgLayoutInner({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { permissions, isAdmin, permissionsLoaded } = useOrg();

  /* Redirect to dashboard if user has no canView permission for this page */
  useEffect(() => {
    if (!permissionsLoaded || isAdmin) return;

    const matched = primaryOrgSidebarItems.find(
      (item) => item.id !== "dashboard" && pathname.startsWith(item.href),
    );
    if (!matched) return;

    const perm = permissions[matched.id];
    if (perm && perm.canView === false) {
      router.replace("/org/dashboard");
    }
  }, [pathname, permissions, isAdmin, permissionsLoaded, router]);

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-5 xl:grid-cols-6 h-dvh overflow-hidden">
      <OrgDesktopSidebar pathname={pathname} />
      <OrgMobileSidebar pathname={pathname} />
      <div className="lg:col-span-4 xl:col-span-5 w-full h-dvh overflow-hidden flex flex-col">
        <OrgNavbar pathname={pathname} />
        <div className="w-full h-dvh bg-white overflow-y-auto flex-1">
          <div className="min-h-dvh p-2 md:p-4 lg:p-5">{children}</div>
          <OrgFooter />
        </div>
      </div>
    </div>
  );
}

export default function OrgLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <OrgProvider>
      <OrgLayoutInner>{children}</OrgLayoutInner>
    </OrgProvider>
  );
}
