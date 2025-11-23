"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Loader from "@/components/ui/Loader";

const AuthPage = () => {
  const router = useRouter();

  useEffect(() => {
    if (!router) return;
    router.push("/auth/sign-in");
  }, [router]);

  return <Loader />;
};

export default AuthPage;
