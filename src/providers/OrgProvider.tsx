"use client";

import { useState, useEffect, useCallback } from "react";
import { OrgContext, ModulePermission } from "@/contexts/OrgContext";
import { useAuth } from "@/hooks/useAuth";
import fetchApi from "@/lib/axios";

export default function OrgProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userData, isFinished } = useAuth();

  const college = userData?.college || null;
  const collegeId = college?.id || userData?.organizationEmployee?.collegeId || null;
  const collegeName = college?.name || null;

  const [permissions, setPermissions] = useState<Record<string, ModulePermission>>({});
  const [isAdmin, setIsAdmin] = useState(false);
  const [permissionsLoaded, setPermissionsLoaded] = useState(false);

  const fetchPermissions = useCallback(async () => {
    if (!isFinished || !userData) return;
    try {
      const res = await fetchApi("/my-permissions");
      const data = res?.data;
      if (data) {
        setPermissions(data.permissions || {});
        setIsAdmin(!!data.isAdmin);
      }
    } catch {
      // Silently fail — default to no permissions for non-college users
    } finally {
      setPermissionsLoaded(true);
    }
  }, [isFinished, userData]);

  useEffect(() => {
    if (isFinished && userData) {
      fetchPermissions();
    }
  }, [isFinished, userData, fetchPermissions]);

  return (
    <OrgContext.Provider
      value={{
        collegeId,
        collegeName,
        collegeData: college,
        loading: !isFinished,
        refetch: fetchPermissions,
        permissions,
        isAdmin,
        permissionsLoaded,
      }}
    >
      {children}
    </OrgContext.Provider>
  );
}
