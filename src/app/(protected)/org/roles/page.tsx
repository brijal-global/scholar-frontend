"use client";

import Table from "@/components/ui/Table";
import { useOrg } from "@/contexts/OrgContext";
import Loader from "@/components/ui/Loader";

export default function RoleGroupsPage() {
  const { collegeId, loading } = useOrg();

  if (loading) return <Loader />;

  const conditions = JSON.stringify({ collegeId });

  return (
    <Table
      title="Role Groups"
      dataApiUrl={`/college-custom-role-groups?conditions=${conditions}`}
      headers={["Name", "Description"]}
      dataKeys={["name", "description"]}
      searchKeys={["name"]}
      viewLink={(id) => `/org/roles/${id}/edit`}
      createLink="/org/roles/new"
    />
  );
}
