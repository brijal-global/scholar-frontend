"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import Cover from "@/components/auth/Cover";
import Loader from "@/components/ui/Loader";

const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { loading, signedInStatus, userData } = useAuth();
  const router = useRouter();

  if (loading || (signedInStatus !== true && signedInStatus !== false))
    return <Loader />;

  if (userData) {
    if (userData?.role?.name === "organizationEmployee") {
      router.push("/dashboard");
    } else {
      router.push("/scholar/dashboard");
    }
  } else {
    return (
      <section className="grid grid-cols-1 lg:grid-cols-2 h-screen items-center">
        <Cover />
        {children}
      </section>
    );
  }
};

export default AuthLayout;
