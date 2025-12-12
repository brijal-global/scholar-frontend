import EditInquiryPage from "@/components/scholar/common/EditInquiryPage";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <EditInquiryPage id={id} />;
}

