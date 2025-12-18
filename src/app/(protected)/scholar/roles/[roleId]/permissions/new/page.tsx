import NewPermissions from "./NewPermission";

export default async function Page({
  params,
}: {
  params: Promise<{ roleId: string }>;
}) {
  const { roleId } = await params;

  return <NewPermissions roleId={roleId} />;
}
