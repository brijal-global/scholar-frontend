"use client";
import { createContext, useContext } from "react";

interface StudentContextType {
  studentId: string | null;
  studentData: any;
  groupId: string | null;
  programId: string | null;
  loading: boolean;
}

export const StudentContext = createContext<StudentContextType>({
  studentId: null,
  studentData: null,
  groupId: null,
  programId: null,
  loading: true,
});

export const useStudent = () => {
  const context = useContext(StudentContext);
  if (!context) throw new Error("useStudent must be used within StudentProvider");
  return context;
};
