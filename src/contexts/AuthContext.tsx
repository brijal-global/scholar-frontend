/* eslint-disable @typescript-eslint/no-explicit-any */

import { createContext } from "react";

export interface AuthContextType {
  isSignedIn: boolean;
  setIsSignedIn: (value: boolean) => void;
  signOut: () => Promise<boolean>;
  signIn: (data: any) => Promise<any>;
  userData: any;
  loading: boolean;
  refetch: () => void;
  isFinished: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
