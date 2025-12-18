import CollegeSubscriptions from "./CollegeSubscriptions";

export default async function Page({
  params,
}: {
  params: Promise<{ collegeId: string }>;
}) {
  const { collegeId } = await params;

  return <CollegeSubscriptions collegeId={collegeId} />;
}
