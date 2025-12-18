import EditCollegeSubscriptionPage from "@/components/scholar/common/EditCollegeSubscriptionPage";

export default async function Page({
  params,
}: {
  params: Promise<{ collegeId: string; subId: string }>;
}) {
  const { collegeId, subId } = await params;

  return (
    <EditCollegeSubscriptionPage collegeId={collegeId} subscriptionId={subId} />
  );
}
