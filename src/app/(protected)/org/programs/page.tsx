"use client";

import Table from "@/components/ui/Table";
import { useOrg } from "@/contexts/OrgContext";
import Loader from "@/components/ui/Loader";

export default function ProgramsPage() {
  const { collegeId, loading } = useOrg();

  if (loading) return <Loader />;

  const conditions = JSON.stringify({ collegeId });

  return (
    <Table
      title="Programs"
      dataApiUrl={`/programs?conditions=${conditions}`}
      headers={["Name", "Code", "Level", "University", "Credits"]}
      dataKeys={["name", "code", "level", "universityName", "totalCredits"]}
      searchKeys={["name", "code", "universityName"]}
      viewLink={(id) => `/org/programs/${id}/edit`}
      createLink="/org/programs/new"
    />
  );
}
