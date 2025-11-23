/* eslint-disable @typescript-eslint/no-explicit-any */

import { type ReactNode, useEffect, useState } from "react";
import useFetch from "@/hooks/useFetch";
import fetchApi from "@/lib/axios";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/contexts/AuthContext";

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);

  const signOut = async () => {
    try {
      const res = await fetchApi("/auth/signout");
      if (res?.success) {
        setIsSignedIn(false);
        refetch();
        router.push("/auth/sign-in");
      }

      return res?.success;
    } catch (error) {
      console.error("Error during logout: ", error);
    }
  };

  const signIn = async (data: any) => {
    try {
      const res = await fetchApi("/auth/signin", {
        method: "POST",
        body: data,
      });
      if (res?.success) {
        setIsSignedIn(true);
        refetch();
      }
      return res;
    } catch (error) {
      console.error("Error during login: ", error);
    }
  };

  const {
    data: userData,
    fetchData: refetch,
    loading,
    isFinished,
  } = useFetch("/auth/me") as any;

  useEffect(() => {
    if (userData) setIsSignedIn(!!userData);
  }, [userData]);

  return (
    <AuthContext.Provider
      value={{
        isSignedIn,
        loading,
        isFinished,
        setIsSignedIn,
        userData,
        signOut,
        signIn,
        refetch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
