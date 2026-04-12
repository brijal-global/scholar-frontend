"use client";

import Table from "@/components/ui/Table";
import { useOrg } from "@/contexts/OrgContext";
import Loader from "@/components/ui/Loader";

export default function EmployeesPage() {
  const { collegeId, loading } = useOrg();

  if (loading) return <Loader />;

  const conditions = JSON.stringify({ collegeId });

  return (
    <Table
      title="Employees"
      dataApiUrl={`/organization-employees?conditions=${conditions}`}
      headers={["User ID", "Designation", "Role Group", "Module"]}
      dataKeys={[
        "userId",
        "designation",
        "collegeCustomRoleGroupId",
        "associatedModuleId",
      ]}
      searchKeys={["userId", "designation"]}
      viewLink={(id) => `/org/employees/${id}/edit`}
      createLink="/org/employees/new"
    />
  );
}
