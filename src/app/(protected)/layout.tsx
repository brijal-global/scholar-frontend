"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import AuthProvider from "@/providers/AuthProvider";
import { useAuth } from "@/hooks/useAuth";
import Loader from "@/components/ui/Loader";
import { ToastContainer } from "react-toastify";
import { Bounce } from "react-toastify";

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

  if (
    !isFinished ||
    (signedInStatus !== true && signedInStatus !== false) ||
    (signedInStatus === false && !pathname?.startsWith("/auth/"))
  ) {
    return <Loader />;
  }

  return (
    <>
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
    </>
  );
}
