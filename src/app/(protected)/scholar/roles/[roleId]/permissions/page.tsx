import Permissions from "./Permissions";

export default async function Page({
  params,
}: {
  params: Promise<{ roleId: string }>;
}) {
  const { roleId } = await params;

  return <Permissions roleId={roleId} />;
}
