/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { useOrg, usePermission } from "@/contexts/OrgContext";
import fetchApi from "@/lib/axios";
import { toast } from "react-toastify";
import Loader from "@/components/ui/Loader";
import { Modal } from "antd";

const COLLEGE_TYPES = [
  { value: "private", label: "Private" },
  { value: "public", label: "Public" },
  { value: "community", label: "Community" },
];

interface CollegeForm {
  name: string;
  type: string;
  country: string;
  city: string;
  streetAddress: string;
  description: string;
}

function validate(f: CollegeForm) {
  if (!f.name.trim() || f.name.trim().length < 2)
    return "College name must be at least 2 characters.";
  if (!f.country.trim()) return "Country is required.";
  if (!f.city.trim()) return "City is required.";
  return null;
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-5">
      <h2 className="text-base font-semibold text-gray-800 border-b pb-3">
        {title}
      </h2>
      {children}
    </div>
  );
}

export default function CollegeProfilePage() {
  const { collegeId, collegeData, refetch: refetchOrg } = useOrg();
  const { canEdit } = usePermission("college-profile");
  const [form, setForm] = useState<CollegeForm>({
    name: "",
    type: "private",
    country: "",
    city: "",
    streetAddress: "",
    description: "",
  });
  const [saving, setSaving] = useState(false);
  const [loadingDummy, setLoadingDummy] = useState(false);
  const [dummyResult, setDummyResult] = useState<any>(null);

  useEffect(() => {
    if (collegeData) {
      setTimeout(() => {
        setForm({
          name: collegeData.name || "",
          type:
            (collegeData as any).type ||
            (collegeData as any).collegeType ||
            "private",
          country: (collegeData as any).country || "",
          city: (collegeData as any).city || "",
          streetAddress: (collegeData as any).streetAddress || "",
          description: (collegeData as any).description || "",
        });
      }, 0);
    }
  }, [collegeData]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleLoadDummyData = async () => {
    Modal.confirm({
      title: "Load Dummy Data",
      content:
        "This will generate 25 programs, 50 batches, 100 groups, 1000 students, attendance records, exams, module marks, and remarks into your college. This may take a minute. Continue?",
      okText: "Yes, Load Data",
      cancelText: "Cancel",
      onOk: async () => {
        setLoadingDummy(true);
        try {
          const res = await fetchApi("/load-dummy-data", {
            method: "GET",
            timeout: 300000,
            showErrorToast: true,
          });
          if (res?.success !== false && res?.data) {
            setDummyResult(res.data);
          }
        } catch {
          toast.error("Failed to load dummy data");
        } finally {
          setLoadingDummy(false);
        }
      },
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!collegeId) return toast.error("College not found");
    const err = validate(form);
    if (err) return toast.error(err);
    setSaving(true);
    try {
      await fetchApi(`/colleges/${collegeId}`, {
        method: "PUT",
        body: form,
      });
      toast.success("College profile updated successfully");
      if (refetchOrg) refetchOrg();
    } catch {
      toast.error("Failed to update college profile");
    } finally {
      setSaving(false);
    }
  };

  if (!collegeId) return <Loader />;

  const inputCls =
    "py-2.5 px-4 rounded-md border border-gray-200 w-full text-sm focus:outline-none focus:ring-2 focus:ring-primary/30";
  const labelCls = "block mb-1 text-sm font-medium text-gray-700";

  return (
    <div className="max-w-3xl space-y-6">
      {/* Dummy Data Section */}
      <Section title="Developer Tools">
        <div className="flex items-start gap-4">
          <div className="flex-1">
            <p className="text-sm text-gray-600">
              Populate your college with realistic dummy data for testing and
              demonstration purposes. This generates programs, batches, groups,
              students, attendance records, exams, results, and remarks.
            </p>
            <p className="text-xs text-amber-600 mt-1 font-medium">
              Warning: This action cannot be undone and may take up to 2 minutes
              to complete.
            </p>
          </div>
          <button
            type="button"
            onClick={handleLoadDummyData}
            disabled={loadingDummy}
            className="shrink-0 flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white text-sm py-2.5 px-5 rounded-lg transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loadingDummy ? (
              <>
                <svg
                  className="animate-spin h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  />
                </svg>
                Loading...
              </>
            ) : (
              "Load Dummy Data"
            )}
          </button>
        </div>
      </Section>

      {/* Dummy Data Result Modal */}
      <Modal
        open={!!dummyResult}
        onCancel={() => setDummyResult(null)}
        footer={
          <button
            onClick={() => setDummyResult(null)}
            className="bg-primary text-white text-sm py-2 px-5 rounded-lg"
          >
            Close
          </button>
        }
        title="Dummy Data Loaded Successfully"
        width={480}
      >
        {dummyResult && (
          <div className="space-y-3 py-2">
            <p className="text-sm text-gray-600">
              The following records were created for your college:
            </p>
            <div className="grid grid-cols-2 gap-2">
              {[
                ["Programs", dummyResult.programs],
                ["Batches", dummyResult.batches],
                ["Groups", dummyResult.groups],
                ["Modules", dummyResult.modules],
                ["Students", dummyResult.students],
                ["Attendance Records", dummyResult.attendanceRecords],
                ["Exams", dummyResult.exams],
                ["Exam Modules", dummyResult.examModules],
                ["Module Marks", dummyResult.moduleMarks],
                ["Student Remarks", dummyResult.studentRemarks],
              ].map(([label, count]) => (
                <div
                  key={label as string}
                  className="flex justify-between items-center bg-gray-50 rounded-lg px-3 py-2"
                >
                  <span className="text-xs text-gray-600">{label}</span>
                  <span className="text-sm font-semibold text-primary">
                    {(count as number)?.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </Modal>

      <Section title="College Profile">
        <form onSubmit={handleSave}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>
                College Name <span className="text-red-500">*</span>
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className={inputCls}
                placeholder="College name"
              />
            </div>
            <div>
              <label className={labelCls}>Type</label>
              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                className={inputCls}
              >
                {COLLEGE_TYPES.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelCls}>
                Country <span className="text-red-500">*</span>
              </label>
              <input
                name="country"
                value={form.country}
                onChange={handleChange}
                className={inputCls}
                placeholder="e.g. United States"
              />
            </div>
            <div>
              <label className={labelCls}>
                City <span className="text-red-500">*</span>
              </label>
              <input
                name="city"
                value={form.city}
                onChange={handleChange}
                className={inputCls}
                placeholder="e.g. New York"
              />
            </div>
            <div className="sm:col-span-2">
              <label className={labelCls}>Street Address</label>
              <input
                name="streetAddress"
                value={form.streetAddress}
                onChange={handleChange}
                className={inputCls}
                placeholder="Street address"
              />
            </div>
          </div>
          {canEdit && (
            <div className="mt-5 flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="bg-primary text-white text-sm py-2.5 px-6 rounded-lg hover:bg-primary-dark transition disabled:opacity-60"
              >
                {saving ? "Saving..." : "Update College Profile"}
              </button>
            </div>
          )}
        </form>
      </Section>
    </div>
  );
}
