import EditSubscriptionPage from "@/components/scholar/common/EditSubscriptionPage";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <EditSubscriptionPage id={id} />;
}

