"use client";

import Table from "@/components/ui/Table";
import { useOrg } from "@/contexts/OrgContext";
import useFetch from "@/hooks/useFetch";
import Loader from "@/components/ui/Loader";

export default function BatchesPage() {
  const { collegeId, loading: orgLoading } = useOrg();

  const { data: programsData } = useFetch(
    collegeId
      ? `/programs?fields=id,name&limit=100&conditions=${JSON.stringify({ collegeId })}`
      : "",
    { now: !!collegeId }
  ) as any;

  const programs = programsData?.rows || (Array.isArray(programsData) ? programsData : []);
  const programMap = Object.fromEntries(programs.map((p: any) => [p.id, p.name]));
  const programIds = programs.map((p: any) => p.id);

  if (orgLoading) return <Loader />;
  if (!programIds.length) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p className="text-lg font-medium">No programs found</p>
        <p className="text-sm mt-1">Create a program first to manage batches.</p>
      </div>
    );
  }

  return (
    <Table
      title="Batches"
      dataApiUrl={`/batches?conditions=${JSON.stringify({ programId: programIds })}`}
      headers={["Name", "Program", "Year", "Description"]}
      dataKeys={["name", "programId", "year", "description"]}
      searchKeys={["name", "year"]}
      viewLink={(id) => `/org/batches/${id}/edit`}
      createLink="/org/batches/new"
      dataTransformer={(data) =>
        data.map((item: any) => ({
          ...item,
          programId: programMap[item.programId] || item.programId,
        }))
      }
    />
  );
}
