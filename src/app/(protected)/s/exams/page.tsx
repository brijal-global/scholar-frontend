"use client";

import { useStudent } from "@/contexts/StudentContext";
import useFetch from "@/hooks/useFetch";
import Loader from "@/components/ui/Loader";
import { FileText } from "lucide-react";
import { formatDate } from "@/utils/dateFormatters";

export default function ExamsPage() {
  const { programId, loading: ctxLoading } = useStudent();

  const { data: examsData, loading: examsLoading } = useFetch(
    programId
      ? `/exams?conditions=${JSON.stringify({ programId })}&fields=id,name,type,description,createdAt&limit=100`
      : "",
    { now: !!programId }
  ) as any;

  const exams =
    examsData?.rows || (Array.isArray(examsData) ? examsData : []);

  if (ctxLoading || examsLoading) return <Loader />;

  if (!programId) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-500">
        <FileText className="w-12 h-12 mb-4 text-gray-300" />
        <p className="text-lg font-medium">Program not found</p>
        <p className="text-sm mt-1">Contact your administrator for assistance.</p>
      </div>
    );
  }

  if (exams.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-500">
        <FileText className="w-12 h-12 mb-4 text-gray-300" />
        <p className="text-lg font-medium">No exams found</p>
        <p className="text-sm mt-1">Exams for your program will appear here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Exams</h1>
        <p className="text-sm text-gray-500 mt-1">
          {exams.length} exam{exams.length !== 1 ? "s" : ""} for your program
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {exams.map((exam: any) => (
          <div
            key={exam.id}
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
          >
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-base font-medium text-gray-900">{exam.name}</h3>
              <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium bg-purple-50 text-purple-600">
                {exam.type || "General"}
              </span>
            </div>
            {exam.description && (
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                {exam.description}
              </p>
            )}
            {exam.createdAt && (
              <p className="text-xs text-gray-400">
                Added {formatDate(exam.createdAt, "long")}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
