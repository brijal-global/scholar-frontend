import EditPage from "@/components/scholar/common/EditPage";

export default async function Page({
  params,
}: {
  params: Promise<{ roleId: string }>;
}) {
  const { roleId } = await params;

  return <EditPage roleId={roleId} />;
}
