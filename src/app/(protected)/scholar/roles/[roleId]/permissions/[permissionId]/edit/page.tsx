import EditPermissionPage from "@/components/scholar/common/EditPermissionPage";

export default async function Page({
  params,
}: {
  params: Promise<{ permissionId: string; roleId: string }>;
}) {
  const { permissionId, roleId } = await params;

  return <EditPermissionPage permissionId={permissionId} roleId={roleId} />;
}
