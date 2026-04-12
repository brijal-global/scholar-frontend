"use client";

import Table from "@/components/ui/Table";
import { useOrg } from "@/contexts/OrgContext";
import useFetch from "@/hooks/useFetch";
import Loader from "@/components/ui/Loader";

export default function GroupsPage() {
  const { collegeId, loading: orgLoading } = useOrg();

  const { data: programsData } = useFetch(
    collegeId
      ? `/programs?fields=id,name&limit=100&conditions=${JSON.stringify({ collegeId })}`
      : "",
    { now: !!collegeId }
  ) as any;

  const programs =
    programsData?.rows || (Array.isArray(programsData) ? programsData : []);
  const programIds = programs.map((p: any) => p.id);

  const { data: batchesData } = useFetch(
    programIds.length
      ? `/batches?fields=id,name&limit=100&conditions=${JSON.stringify({ programId: programIds })}`
      : "",
    { now: programIds.length > 0 }
  ) as any;

  const batches =
    batchesData?.rows || (Array.isArray(batchesData) ? batchesData : []);
  const batchMap = Object.fromEntries(
    batches.map((b: any) => [b.id, b.name])
  );
  const batchIds = batches.map((b: any) => b.id);

  if (orgLoading) return <Loader />;
  if (!batchIds.length) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p className="text-lg font-medium">No batches found</p>
        <p className="text-sm mt-1">
          Create programs and batches first to manage groups.
        </p>
      </div>
    );
  }

  return (
    <Table
      title="Groups"
      dataApiUrl={`/groups?conditions=${JSON.stringify({ batchId: batchIds })}`}
      headers={["Name", "Batch", "Year", "Description"]}
      dataKeys={["name", "batchId", "year", "description"]}
      searchKeys={["name"]}
      viewLink={(id) => `/org/groups/${id}/edit`}
      createLink="/org/groups/new"
      dataTransformer={(data) =>
        data.map((item: any) => ({
          ...item,
          batchId: batchMap[item.batchId] || item.batchId,
        }))
      }
    />
  );
}
