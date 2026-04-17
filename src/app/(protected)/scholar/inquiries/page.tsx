/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import Table from "@/components/ui/Table";
import { Modal } from "antd";
import fetchApi from "@/lib/axios";
import { toast } from "react-toastify";
import { inquiryStatuses } from "@/data/enums";
import { TrashIcon } from "lucide-react";

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  hold: "bg-blue-100 text-blue-700",
  resolved: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-600",
};

const EMPTY_FORM = {
  fullName: "",
  email: "",
  phone: "",
  organizationName: "",
  message: "",
  status: "pending",
  replyMessage: "",
};

function Detail({ label, value }: { label: string; value?: any }) {
  return (
    <div>
      <p className="text-xs text-gray-500 font-medium uppercase mb-0.5">
        {label}
      </p>
      <div className="text-sm text-gray-800">{value ?? "—"}</div>
    </div>
  );
}

export default function InquiriesPage() {
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
          fullName: editItem.fullName || "",
          email: editItem.email || "",
          phone: editItem.phone || "",
          organizationName: editItem.organizationName || "",
          message: editItem.message || "",
          status: editItem.status || "pending",
          replyMessage: editItem.replyMessage || "",
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
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    if (
      !formData.fullName.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim()
    ) {
      toast.error("Full name, email and phone are required.");
      return;
    }
    setSubmitting(true);
    try {
      const url = editItem ? `/inquiries/${editItem.id}` : "/inquiries";
      const method = editItem ? "PUT" : "POST";
      const res = await fetchApi(url, { method, body: formData });
      if (res?.success) {
        toast.success(editItem ? "Inquiry updated." : "Inquiry created.");
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
        title="Inquiries"
        dataApiUrl="/inquiries?fields=id,fullName,email,phone,organizationName,status,message,replyMessage,createdAt"
        headers={[
          "Full Name",
          "Email",
          "Phone",
          "Organization",
          "Status",
          "Created",
        ]}
        dataKeys={[
          "fullName",
          "email",
          "phone",
          "organizationName",
          "status",
          "createdAt",
        ]}
        searchKeys={["fullName", "email", "phone", "organizationName"]}
        showActiveToggle={false}
        groups={[
          { label: "Pending", dataKey: "status", values: ["pending"] },
          { label: "Hold", dataKey: "status", values: ["hold"] },
          { label: "Resolved", dataKey: "status", values: ["resolved"] },
          { label: "Rejected", dataKey: "status", values: ["rejected"] },
          {
            label: "All",
            dataKey: "status",
            values: ["pending", "hold", "resolved", "rejected"],
          },
        ]}
        onRowClick={(item) => setViewItem(item)}
        onCreateClick={() => setCreateOpen(true)}
        actions={{
          delete: {
            label: "Delete inquiry? This action cannot be undone.",
            description: "Are you sure you want to delete this inquiry?",
            icon: TrashIcon,
            deleteApiUrl: (identifier: string) => `/inquiries/${identifier}`,
            reloadAfterDelete: true,
          },
        }}
      />

      {/* View Modal */}
      <Modal
        open={!!viewItem}
        onCancel={() => setViewItem(null)}
        footer={[
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
        title="Inquiry Details"
        width={620}
      >
        {viewItem && (
          <div className="space-y-4 py-2">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <Detail label="Full Name" value={viewItem.fullName} />
              <Detail label="Email" value={viewItem.email} />
              <Detail label="Phone" value={viewItem.phone} />
              <Detail
                label="Organization"
                value={viewItem.organizationName || "—"}
              />
              <Detail
                label="Status"
                value={
                  <span
                    className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold capitalize ${
                      STATUS_COLORS[viewItem.status] ||
                      "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {viewItem.status}
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
            {viewItem.message && (
              <div>
                <p className="text-xs text-gray-500 font-medium uppercase mb-1">
                  Message
                </p>
                <p className="text-sm text-gray-700 bg-gray-50 rounded-md p-3 whitespace-pre-wrap">
                  {viewItem.message}
                </p>
              </div>
            )}
            {viewItem.replyMessage && (
              <div>
                <p className="text-xs text-gray-500 font-medium uppercase mb-1">
                  Remarks
                </p>
                <p className="text-sm text-gray-700 bg-gray-50 rounded-md p-3 whitespace-pre-wrap">
                  {viewItem.replyMessage}
                </p>
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
                ? "Update Inquiry"
                : "Create Inquiry"}
          </button>,
        ]}
        title={editItem ? "Edit Inquiry" : "Create Inquiry"}
        width={640}
      >
        <div className="grid grid-cols-2 gap-4 py-3 text-sm">
          <div>
            <label className="block mb-1 font-medium">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="py-2.5 px-4 rounded-md border border-gray-200 w-full"
              placeholder="e.g. John Doe"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="py-2.5 px-4 rounded-md border border-gray-200 w-full"
              placeholder="email@example.com"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">
              Phone <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="py-2.5 px-4 rounded-md border border-gray-200 w-full"
              placeholder="+977 98XXXXXXXX"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Organization</label>
            <input
              name="organizationName"
              value={formData.organizationName}
              onChange={handleChange}
              className="py-2.5 px-4 rounded-md border border-gray-200 w-full"
              placeholder="Organization name (optional)"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="py-2.5 px-4 rounded-md border border-gray-200 w-full bg-white"
            >
              {Object.entries(inquiryStatuses).map(([k, v]) => (
                <option key={k} value={v}>
                  {k}
                </option>
              ))}
            </select>
          </div>
          <div className="col-span-2">
            <label className="block mb-1 font-medium">Message</label>
            <textarea
              name="message"
              rows={3}
              value={formData.message}
              onChange={handleChange}
              className="py-2.5 px-4 rounded-md border border-gray-200 w-full resize-none"
              placeholder="Inquiry message (optional)"
            />
          </div>
          <div className="col-span-2">
            <label className="block mb-1 font-medium">Remarks</label>
            <textarea
              name="replyMessage"
              rows={3}
              value={formData.replyMessage}
              onChange={handleChange}
              className="py-2.5 px-4 rounded-md border border-gray-200 w-full resize-none"
              placeholder="Add remarks or reply (optional)"
            />
          </div>
        </div>
      </Modal>
    </>
  );
}
