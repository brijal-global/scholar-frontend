"use client";

import { useState } from "react";
import Table from "@/components/ui/Table";
import { useOrg } from "@/contexts/OrgContext";
import useFetch from "@/hooks/useFetch";
import Loader from "@/components/ui/Loader";

export default function CoursesPage() {
  const { collegeId, loading: orgLoading } = useOrg();
  const [selectedProgramId, setSelectedProgramId] = useState("");

  const { data: programsData } = useFetch(
    collegeId
      ? `/programs?fields=id,name&limit=100&conditions=${JSON.stringify({ collegeId })}`
      : "",
    { now: !!collegeId }
  ) as any;

  const programs =
    programsData?.rows || (Array.isArray(programsData) ? programsData : []);

  if (orgLoading) return <Loader />;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div>
          <label className="block mb-1 text-sm font-medium">
            Select Program
          </label>
          <select
            value={selectedProgramId}
            onChange={(e) => setSelectedProgramId(e.target.value)}
            className="py-3 px-5 text-sm rounded-md w-full min-w-[250px]"
          >
            <option value="">-- Select a Program --</option>
            {programs.map((p: any) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {selectedProgramId ? (
        <Table
          title="Course Modules"
          dataApiUrl={`/modules?conditions=${JSON.stringify({ programId: selectedProgramId })}`}
          headers={["Name", "Code", "Credits", "Description"]}
          dataKeys={["name", "code", "credits", "description"]}
          searchKeys={["name", "code"]}
          viewLink={(id) => `/org/courses/${id}/edit`}
          createLink="/org/courses/new"
        />
      ) : (
        <div className="text-center py-12 text-gray-500">
          <p className="text-lg font-medium">Select a program</p>
          <p className="text-sm mt-1">
            Choose a program above to view its course modules.
          </p>
        </div>
      )}
    </div>
  );
}
