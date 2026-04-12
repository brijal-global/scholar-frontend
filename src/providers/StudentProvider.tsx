"use client";
import { StudentContext } from "@/contexts/StudentContext";
import { useAuth } from "@/hooks/useAuth";

export default function StudentProvider({ children }: { children: React.ReactNode }) {
  const { userData, isFinished } = useAuth();

  const student = userData?.student || null;
  const studentId = student?.id || null;
  const groupId = student?.groupId || null;
  const programId = student?.group?.batch?.programId || null;

  return (
    <StudentContext.Provider value={{
      studentId,
      studentData: student,
      groupId,
      programId,
      loading: !isFinished,
    }}>
      {children}
    </StudentContext.Provider>
  );
}
