"use client";
import { OrgContext } from "@/contexts/OrgContext";
import { useAuth } from "@/hooks/useAuth";

export default function OrgProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userData, isFinished } = useAuth();

  const college = userData?.college || null;
  const collegeId = college?.id || userData?.organizationEmployee?.collegeId || null;
  const collegeName = college?.name || null;

  return (
    <OrgContext.Provider
      value={{
        collegeId,
        collegeName,
        collegeData: college,
        loading: !isFinished,
      }}
    >
      {children}
    </OrgContext.Provider>
  );
}
