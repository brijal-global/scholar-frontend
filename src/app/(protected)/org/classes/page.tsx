"use client";

import Table from "@/components/ui/Table";
import { useOrg } from "@/contexts/OrgContext";
import useFetch from "@/hooks/useFetch";
import Loader from "@/components/ui/Loader";

export default function ClassesPage() {
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

  const { data: modulesData } = useFetch(
    programIds.length
      ? `/modules?fields=id,name&limit=200&conditions=${JSON.stringify({ programId: programIds })}`
      : "",
    { now: programIds.length > 0 }
  ) as any;
  const modules =
    modulesData?.rows || (Array.isArray(modulesData) ? modulesData : []);
  const moduleMap = Object.fromEntries(
    modules.map((m: any) => [m.id, m.name])
  );
  const moduleIds = modules.map((m: any) => m.id);

  if (orgLoading) return <Loader />;
  if (!moduleIds.length) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p className="text-lg font-medium">No course modules found</p>
        <p className="text-sm mt-1">
          Create course modules first to manage classes.
        </p>
      </div>
    );
  }

  return (
    <Table
      title="Classes"
      dataApiUrl={`/classes?conditions=${JSON.stringify({ moduleId: moduleIds })}`}
      headers={["Module", "Date", "Start Time", "End Time", "Weekly"]}
      dataKeys={["moduleId", "date", "startTime", "endTime", "isWeekly"]}
      searchKeys={["date"]}
      viewLink={(id) => `/org/classes/${id}/edit`}
      createLink="/org/classes/new"
      dataTransformer={(data) =>
        data.map((item: any) => ({
          ...item,
          moduleId: moduleMap[item.moduleId] || item.moduleId,
          isWeekly: item.isWeekly ? "Yes" : "No",
        }))
      }
    />
  );
}
