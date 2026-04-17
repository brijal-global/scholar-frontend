/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { createContext, useContext } from "react";

export interface ModulePermission {
  canView: boolean;
  canCreate: boolean;
  canEdit: boolean;
  canDelete: boolean;
}

interface OrgContextType {
  collegeId: string | null;
  collegeName: string | null;
  collegeData: any;
  loading: boolean;
  refetch?: () => void;
  /* Permissions */
  permissions: Record<string, ModulePermission>;
  isAdmin: boolean;
  permissionsLoaded: boolean;
}

export const OrgContext = createContext<OrgContextType>({
  collegeId: null,
  collegeName: null,
  collegeData: null,
  loading: true,
  permissions: {},
  isAdmin: false,
  permissionsLoaded: false,
});

export const useOrg = () => {
  const context = useContext(OrgContext);
  if (!context) {
    throw new Error("useOrg must be used within an OrgProvider");
  }
  return context;
};

/**
 * Hook to check permission for a given module code.
 * Falls back to full access when permissionsLoaded is false or user isAdmin.
 */
export const usePermission = (moduleCode: string): ModulePermission => {
  const { permissions, isAdmin, permissionsLoaded } = useOrg();

  if (!permissionsLoaded || isAdmin) {
    return { canView: true, canCreate: true, canEdit: true, canDelete: true };
  }

  return (
    permissions[moduleCode] || {
      canView: false,
      canCreate: false,
      canEdit: false,
      canDelete: false,
    }
  );
};
