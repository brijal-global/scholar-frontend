"use client";

import Table from "@/components/ui/Table";
import { useOrg } from "@/contexts/OrgContext";
import useFetch from "@/hooks/useFetch";
import Loader from "@/components/ui/Loader";

export default function StudentsPage() {
  const { collegeId, loading: orgLoading } = useOrg();

  const { data: programsData } = useFetch(
    collegeId
      ? `/programs?fields=id&limit=100&conditions=${JSON.stringify({ collegeId })}`
      : "",
    { now: !!collegeId }
  ) as any;
  const programs =
    programsData?.rows || (Array.isArray(programsData) ? programsData : []);
  const programIds = programs.map((p: any) => p.id);

  const { data: batchesData } = useFetch(
    programIds.length
      ? `/batches?fields=id&limit=100&conditions=${JSON.stringify({ programId: programIds })}`
      : "",
    { now: programIds.length > 0 }
  ) as any;
  const batches =
    batchesData?.rows || (Array.isArray(batchesData) ? batchesData : []);
  const batchIds = batches.map((b: any) => b.id);

  const { data: groupsData } = useFetch(
    batchIds.length
      ? `/groups?fields=id,name&limit=200&conditions=${JSON.stringify({ batchId: batchIds })}`
      : "",
    { now: batchIds.length > 0 }
  ) as any;
  const groups =
    groupsData?.rows || (Array.isArray(groupsData) ? groupsData : []);
  const groupMap = Object.fromEntries(
    groups.map((g: any) => [g.id, g.name])
  );
  const groupIds = groups.map((g: any) => g.id);

  if (orgLoading) return <Loader />;
  if (!groupIds.length) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p className="text-lg font-medium">No groups found</p>
        <p className="text-sm mt-1">
          Create programs, batches, and groups first to manage students.
        </p>
      </div>
    );
  }

  return (
    <Table
      title="Students"
      dataApiUrl={`/student-details?fields=id,userId,groupId,dob,createdAt,isActive&conditions=${JSON.stringify({ groupId: groupIds })}`}
      headers={["Student ID", "Group", "Date of Birth", "Enrolled"]}
      dataKeys={["userId", "groupName", "dob", "createdAt"]}
      searchKeys={["userId", "groupName"]}
      viewLink={(id) => `/org/students/${id}/edit`}
      createLink="/org/students/new"
      showActiveToggle={false}
      dataTransformer={(data) =>
        data.map((item: any) => ({
          ...item,
          groupName: groupMap[item.groupId] || item.groupId,
        }))
      }
    />
  );
}
