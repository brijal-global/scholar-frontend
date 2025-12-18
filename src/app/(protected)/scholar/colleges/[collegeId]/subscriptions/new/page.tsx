import NewCollegeSubscription from "./NewCollegeSubscription";

export default async function Page({
  params,
}: {
  params: Promise<{ collegeId: string }>;
}) {
  const { collegeId } = await params;

  return <NewCollegeSubscription collegeId={collegeId} />;
}
