"use client";
import { createContext, useContext } from "react";

interface OrgContextType {
  collegeId: string | null;
  collegeName: string | null;
  collegeData: any;
  loading: boolean;
}

export const OrgContext = createContext<OrgContextType>({
  collegeId: null,
  collegeName: null,
  collegeData: null,
  loading: true,
});

export const useOrg = () => {
  const context = useContext(OrgContext);
  if (!context) {
    throw new Error("useOrg must be used within an OrgProvider");
  }
  return context;
};
