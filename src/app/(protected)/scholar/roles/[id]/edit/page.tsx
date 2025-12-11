import EditPage from "@/components/scholar/common/EditPage";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <EditPage id={id} />;
}
