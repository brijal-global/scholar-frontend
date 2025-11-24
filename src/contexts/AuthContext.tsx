/* eslint-disable @typescript-eslint/no-explicit-any */

import { createContext } from "react";

export interface AuthContextType {
  signedInStatus: boolean | null;
  setSignedInStatus: (value: boolean) => void;
  signOut: () => Promise<boolean>;
  signIn: (data: any) => Promise<any>;
  userData: any;
  refetch: () => void;
  isFinished: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
