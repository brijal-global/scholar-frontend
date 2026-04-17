/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import Table from "@/components/ui/Table";
import { Modal } from "antd";
import fetchApi from "@/lib/axios";
import { toast } from "react-toastify";
import { collegeTypes } from "@/data/enums";
import { useRouter } from "next/navigation";

const EMPTY_FORM = {
  name: "",
  collegeType: "private",
  country: "",
  city: "",
  streetAddress: "",
  isAttendanceClassBased: false,
  logo: null as File | null,
  coverImage: null as File | null,
};

function Detail({ label, value }: { label: string; value?: any }) {
  return (
    <div>
      <p className="text-xs text-gray-500 font-medium uppercase mb-0.5">
        {label}
      </p>
      <p className="text-sm text-gray-800">{value ?? "—"}</p>
    </div>
  );
}

export default function CollegesPage() {
  const router = useRouter();
  const [viewItem, setViewItem] = useState<any>(null);
  const [editItem, setEditItem] = useState<any>(null);
  const [createOpen, setCreateOpen] = useState(false);
  const [formData, setFormData] = useState<typeof EMPTY_FORM>(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [tableKey, setTableKey] = useState(0);

  useEffect(() => {
    if (editItem) {
      setTimeout(() => {
        setFormData({
          name: editItem.name || "",
          collegeType: editItem.collegeType || "private",
          country: editItem.country || "",
          city: editItem.city || "",
          streetAddress: editItem.streetAddress || "",
          isAttendanceClassBased: editItem.isAttendanceClassBased ?? false,
          logo: null,
          coverImage: null,
        });
      }, 0);
    } else if (createOpen) {
      setTimeout(() => {
        setFormData(EMPTY_FORM);
      }, 0);
    }
  }, [editItem, createOpen]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, type } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else if (type === "file") {
      const file = (e.target as HTMLInputElement).files?.[0] || null;
      if (file && file.size > 2 * 1024 * 1024) {
        toast.error("File is too large. Max 2 MB.");
        return;
      }
      setFormData((prev) => ({ ...prev, [name]: file }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: e.target.value }));
    }
  };

  const handleSave = async () => {
    if (
      !formData.name.trim() ||
      !formData.country.trim() ||
      !formData.city.trim() ||
      !formData.streetAddress.trim()
    ) {
      toast.error("Please fill all required fields.");
      return;
    }
    setSubmitting(true);
    try {
      const body: any = {
        name: formData.name,
        collegeType: formData.collegeType,
        country: formData.country,
        city: formData.city,
        streetAddress: formData.streetAddress,
        isAttendanceClassBased: formData.isAttendanceClassBased,
      };
      if (formData.logo) body.logo = formData.logo;
      if (formData.coverImage) body.coverImage = formData.coverImage;

      const url = editItem ? `/colleges/${editItem.id}` : "/colleges";
      const method = editItem ? "PUT" : "POST";
      const res = await fetchApi(url, { method, body });
      if (res?.success) {
        toast.success(editItem ? "College updated." : "College created.");
        setEditItem(null);
        setCreateOpen(false);
        setTableKey((k) => k + 1);
      } else {
        toast.error(res?.message || "Failed to save.");
      }
    } catch (e: any) {
      toast.error(e?.message || "Failed to save.");
    }
    setSubmitting(false);
  };

  return (
    <>
      <Table
        key={tableKey}
        title="Colleges"
        dataApiUrl="/colleges?fields=id,name,collegeType,country,city,streetAddress,isAttendanceClassBased,createdAt,isActive,logo"
        headers={["Name", "Type", "Country", "City", "Address", "Created"]}
        dataKeys={[
          "name",
          "collegeType",
          "country",
          "city",
          "streetAddress",
          "createdAt",
        ]}
        searchKeys={["name", "city", "country"]}
        groups={[
          { label: "Active", dataKey: "isActive", values: [true] },
          { label: "Inactive", dataKey: "isActive", values: [false] },
          { label: "All", dataKey: "isActive", values: [true, false] },
        ]}
        onRowClick={(item) => setViewItem(item)}
        // onCreateClick={() => setCreateOpen(true)}
      />

      {/* View Modal */}
      <Modal
        open={!!viewItem}
        onCancel={() => setViewItem(null)}
        footer={[
          <button
            key="subs"
            onClick={() => {
              router.push(`/scholar/colleges/${viewItem?.id}/subscriptions`);
              setViewItem(null);
            }}
            className="border border-gray-300 text-gray-600 text-sm py-2 px-4 rounded-md hover:bg-gray-50 transition mr-2"
          >
            View Subscriptions
          </button>,
          <button
            key="edit"
            onClick={() => {
              setEditItem(viewItem);
              setViewItem(null);
            }}
            className="bg-primary text-white text-sm py-2 px-4 rounded-md hover:bg-primary-dark transition"
          >
            Edit
          </button>,
        ]}
        title="College Details"
        width={640}
      >
        {viewItem && (
          <div className="space-y-4 py-2">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <Detail label="Name" value={viewItem.name} />
              <Detail label="Type" value={viewItem.collegeType} />
              <Detail label="Country" value={viewItem.country} />
              <Detail label="City" value={viewItem.city} />
              <Detail label="Street Address" value={viewItem.streetAddress} />
              <Detail
                label="Status"
                value={
                  <span
                    className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${
                      viewItem.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {viewItem.isActive ? "Active" : "Inactive"}
                  </span>
                }
              />
              <Detail
                label="Created"
                value={
                  viewItem.createdAt
                    ? new Date(viewItem.createdAt).toLocaleDateString()
                    : "—"
                }
              />
            </div>
            {viewItem.logo && (
              <div>
                <p className="text-xs text-gray-500 font-medium uppercase mb-1">
                  Logo
                </p>
                <p className="text-sm text-gray-600">{viewItem.logo}</p>
              </div>
            )}
          </div>
        )}
      </Modal>

      {/* Create / Edit Modal */}
      <Modal
        open={createOpen || !!editItem}
        onCancel={() => {
          setCreateOpen(false);
          setEditItem(null);
        }}
        footer={[
          <button
            key="cancel"
            onClick={() => {
              setCreateOpen(false);
              setEditItem(null);
            }}
            className="border border-gray-300 text-gray-600 text-sm py-2 px-4 rounded-md hover:bg-gray-50 transition mr-2"
          >
            Cancel
          </button>,
          <button
            key="save"
            onClick={handleSave}
            disabled={submitting}
            className="bg-primary text-white text-sm py-2 px-4 rounded-md hover:bg-primary-dark transition disabled:opacity-60"
          >
            {submitting
              ? "Saving..."
              : editItem
                ? "Update College"
                : "Create College"}
          </button>,
        ]}
        title={editItem ? "Edit College" : "Create College"}
        width={680}
      >
        <div className="grid grid-cols-2 gap-4 py-3 text-sm">
          <div>
            <label className="block mb-1 font-medium">
              College Name <span className="text-red-500">*</span>
            </label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="py-2.5 px-4 rounded-md border border-gray-200 w-full"
              placeholder="e.g. Oxford University"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">
              College Type <span className="text-red-500">*</span>
            </label>
            <select
              name="collegeType"
              value={formData.collegeType}
              onChange={handleChange}
              className="py-2.5 px-4 rounded-md border border-gray-200 w-full bg-white"
            >
              {Object.entries(collegeTypes).map(([k, v]) => (
                <option key={k} value={v}>
                  {k}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-1 font-medium">
              Country <span className="text-red-500">*</span>
            </label>
            <input
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="py-2.5 px-4 rounded-md border border-gray-200 w-full"
              placeholder="e.g. Nepal"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">
              City <span className="text-red-500">*</span>
            </label>
            <input
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="py-2.5 px-4 rounded-md border border-gray-200 w-full"
              placeholder="e.g. Kathmandu"
            />
          </div>
          <div className="col-span-2">
            <label className="block mb-1 font-medium">
              Street Address <span className="text-red-500">*</span>
            </label>
            <input
              name="streetAddress"
              value={formData.streetAddress}
              onChange={handleChange}
              className="py-2.5 px-4 rounded-md border border-gray-200 w-full"
              placeholder="Full street address"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Logo</label>
            <input
              type="file"
              name="logo"
              accept="image/*"
              onChange={handleChange}
              className="py-2 px-3 rounded-md border border-gray-200 w-full text-sm file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:text-sm file:bg-primary file:text-white hover:file:bg-primary-dark file:cursor-pointer"
            />
            {editItem?.logo && (
              <p className="text-xs text-gray-400 mt-1">
                Current: {editItem.logo}
              </p>
            )}
          </div>
          <div>
            <label className="block mb-1 font-medium">Cover Image</label>
            <input
              type="file"
              name="coverImage"
              accept="image/*"
              onChange={handleChange}
              className="py-2 px-3 rounded-md border border-gray-200 w-full text-sm file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:text-sm file:bg-primary file:text-white hover:file:bg-primary-dark file:cursor-pointer"
            />
          </div>
        </div>
      </Modal>
    </>
  );
}
