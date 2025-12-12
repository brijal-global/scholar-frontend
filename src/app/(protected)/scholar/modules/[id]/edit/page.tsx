import EditPlanModulePage from "@/components/scholar/common/EditPlanModulePage";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <EditPlanModulePage id={id} />;
}

