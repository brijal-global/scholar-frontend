import EditPermissionPage from "@/components/scholar/common/EditPermissionPage";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <EditPermissionPage id={id} />;
}

