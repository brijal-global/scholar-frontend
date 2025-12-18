import EditCollegePage from "@/components/scholar/common/EditCollegePage";

export default async function Page({
  params,
}: {
  params: Promise<{ collegeId: string }>;
}) {
  const { collegeId } = await params;

  return <EditCollegePage collegeId={collegeId} />;
}
