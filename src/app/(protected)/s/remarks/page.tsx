"use client";

import { useStudent } from "@/contexts/StudentContext";
import useFetch from "@/hooks/useFetch";
import Loader from "@/components/ui/Loader";
import { MessageSquare } from "lucide-react";
import { formatDate } from "@/utils/dateFormatters";

const remarkTypeStyles: Record<string, string> = {
  positive: "bg-green-50 text-green-700",
  appreciation: "bg-green-50 text-green-700",
  negative: "bg-red-50 text-red-700",
  warning: "bg-amber-50 text-amber-700",
  general: "bg-gray-100 text-gray-700",
};

function getRemarkBadgeStyle(type: string) {
  const key = type?.toLowerCase() || "general";
  return remarkTypeStyles[key] || remarkTypeStyles.general;
}

export default function RemarksPage() {
  const { studentId, loading: ctxLoading } = useStudent();

  const { data: remarksData, loading: remarksLoading } = useFetch(
    studentId
      ? `/student-remarks?conditions=${JSON.stringify({ studentId })}&fields=id,remarkType,subject,message,createdAt&limit=100`
      : "",
    { now: !!studentId }
  ) as any;

  const remarks =
    remarksData?.rows || (Array.isArray(remarksData) ? remarksData : []);

  if (ctxLoading || remarksLoading) return <Loader />;

  if (!studentId) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-500">
        <MessageSquare className="w-12 h-12 mb-4 text-gray-300" />
        <p className="text-lg font-medium">Student record not found</p>
        <p className="text-sm mt-1">Contact your administrator for assistance.</p>
      </div>
    );
  }

  if (remarks.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Remarks</h1>
          <p className="text-sm text-gray-500 mt-1">Remarks from your teachers</p>
        </div>
        <div className="flex flex-col items-center justify-center py-20 text-gray-500">
          <MessageSquare className="w-12 h-12 mb-4 text-gray-300" />
          <p className="text-lg font-medium">No remarks yet</p>
          <p className="text-sm mt-1">Remarks from teachers will appear here.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Remarks</h1>
        <p className="text-sm text-gray-500 mt-1">
          {remarks.length} remark{remarks.length !== 1 ? "s" : ""} received
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {remarks.map((remark: any) => (
          <div
            key={remark.id}
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
          >
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-base font-medium text-gray-900 flex-1 mr-3">
                {remark.subject || "Untitled"}
              </h3>
              <span
                className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap ${getRemarkBadgeStyle(remark.remarkType)}`}
              >
                {remark.remarkType || "General"}
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-4 whitespace-pre-line">
              {remark.message || "No message provided."}
            </p>
            {remark.createdAt && (
              <p className="text-xs text-gray-400">
                {formatDate(remark.createdAt, "long")}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
