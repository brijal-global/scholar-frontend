"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import AuthProvider from "@/providers/AuthProvider";
import { useAuth } from "@/hooks/useAuth";
import Loader from "@/components/ui/Loader";

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <ProtectedLayoutWrapper>{children}</ProtectedLayoutWrapper>
    </AuthProvider>
  );
}

export function ProtectedLayoutWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isFinished, signedInStatus, userData } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!pathname || !router) return;

    if (signedInStatus === false) {
      router.replace("/auth/sign-in");
      return;
    }

    if (signedInStatus === true) {
      if (userData?.role?.name === "organizationEmployee") {
        if (!pathname.startsWith("/org/")) {
          router.replace("/org/dashboard");
        }
      } else if (userData?.role?.name === "student") {
        if (!pathname.startsWith("/s/")) {
          router.replace("/s/dashboard");
        }
      } else {
        if (!pathname.startsWith("/scholar/")) {
          router.replace("/scholar/dashboard");
        }
      }
    }
  }, [signedInStatus, pathname, userData, router]);

  console.log(
    !isFinished,
    signedInStatus !== true && signedInStatus !== false,
    "......",
    isFinished,
    signedInStatus
  );

  if (
    !isFinished ||
    (signedInStatus !== true && signedInStatus !== false) ||
    (signedInStatus === false && !pathname?.startsWith("/auth/"))
  ) {
    return <Loader />;
  }

  return <>{children}</>;
}
