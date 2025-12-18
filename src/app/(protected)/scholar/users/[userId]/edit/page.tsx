import EditUserPage from "@/components/scholar/common/EditUserPage";

export default async function Page({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;

  return <EditUserPage userId={userId} />;
}
