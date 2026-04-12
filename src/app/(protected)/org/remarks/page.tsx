"use client";

import Table from "@/components/ui/Table";
import { useOrg } from "@/contexts/OrgContext";
import Loader from "@/components/ui/Loader";

export default function RemarksPage() {
  const { collegeId, loading } = useOrg();

  if (loading) return <Loader />;

  return (
    <Table
      title="Student Remarks"
      dataApiUrl="/student-remarks"
      headers={["Student ID", "Remark Type", "Subject", "Message"]}
      dataKeys={["studentId", "remarkType", "subject", "message"]}
      searchKeys={["subject", "remarkType", "studentId"]}
      viewLink={(id) => `/org/remarks/${id}/edit`}
      createLink="/org/remarks/new"
    />
  );
}
