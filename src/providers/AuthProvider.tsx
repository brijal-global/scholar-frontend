/* eslint-disable @typescript-eslint/no-explicit-any */

import { type ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/contexts/AuthContext";
import useFetch from "@/hooks/useFetch";
import fetchApi from "@/lib/axios";
import { authEndpoints } from "@/configs/api-endpoints.config";

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  const [signedInStatus, setSignedInStatus] = useState<boolean | null>(null);

  const signOut = async () => {
    try {
      const res = await fetchApi(authEndpoints.signOut);
      if (res?.success) {
        setSignedInStatus(false);
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
      const res = await fetchApi(authEndpoints.signIn, {
        method: "POST",
        body: data,
      });
      if (res?.success) {
        setSignedInStatus(true);
        refetch();
      }
      return res;
    } catch (error) {
      return error;
    }
  };

  const {
    data: userData,
    fetchData: refetch,
    isFinished,
  } = useFetch(authEndpoints.me) as any;

  useEffect(() => {
    if (isFinished) {
      setTimeout(() => {
        setSignedInStatus(!!userData);
      }, 10);
    }
  }, [userData, isFinished]);

  return (
    <AuthContext.Provider
      value={{
        signedInStatus,
        isFinished,
        setSignedInStatus,
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
