"use client";

import { useState } from "react";
import { PrimaryButton } from "@/components/ui/Buttons";
import fetchApi from "@/lib/axios";
import useFetch from "@/hooks/useFetch";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useOrg } from "@/contexts/OrgContext";
import Loader from "@/components/ui/Loader";
import { genders } from "@/data/enums";

export default function NewStudentPage() {
  const router = useRouter();
  const { collegeId, loading: orgLoading } = useOrg();
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    gender: "male",
    address: "",
    groupId: "",
    dob: "",
  });

  const { data: programsData } = useFetch(
    collegeId
      ? `/programs?fields=id&limit=100&conditions=${JSON.stringify({ collegeId })}`
      : "",
    { now: !!collegeId }
  ) as any;
  const programs =
    programsData?.rows || (Array.isArray(programsData) ? programsData : []);
  const programIds = programs.map((p: any) => p.id);

  const { data: batchesData } = useFetch(
    programIds.length
      ? `/batches?fields=id&limit=100&conditions=${JSON.stringify({ programId: programIds })}`
      : "",
    { now: programIds.length > 0 }
  ) as any;
  const batches =
    batchesData?.rows || (Array.isArray(batchesData) ? batchesData : []);
  const batchIds = batches.map((b: any) => b.id);

  const { data: groupsData } = useFetch(
    batchIds.length
      ? `/groups?fields=id,name&limit=200&conditions=${JSON.stringify({ batchId: batchIds })}`
      : "",
    { now: batchIds.length > 0 }
  ) as any;
  const groups =
    groupsData?.rows || (Array.isArray(groupsData) ? groupsData : []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      return toast.error("Name, email and password are required");
    }
    if (!formData.groupId || !formData.dob) {
      return toast.error("Group and date of birth are required");
    }

    setSubmitting(true);
    try {
      const res = await fetchApi("/register-student", {
        method: "POST",
        body: formData,
        showSuccessToast: true,
      });

      if (res?.success) {
        router.push("/org/students");
      }
    } catch {
      toast.error("Failed to register student");
    } finally {
      setSubmitting(false);
    }
  };

  if (orgLoading) return <Loader />;

  return (
    <div className="max-w-5xl">
      <h1 className="text-xl font-semibold mb-2">Register New Student</h1>
      <p className="text-sm text-gray-500 mb-6">
        Create a user account and enroll the student in a group.
      </p>

      <form onSubmit={handleSubmit}>
        <h3 className="text-sm font-semibold text-gray-700 mb-3">
          Personal Information
        </h3>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 text-sm">
          <div>
            <label className="block mb-1 text-gray-500">
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="py-3 px-5 text-sm rounded-md w-full"
              placeholder="First name"
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-500">
              Last Name <span className="text-red-500">*</span>
            </label>
            <input
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="py-3 px-5 text-sm rounded-md w-full"
              placeholder="Last name"
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-500">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="py-3 px-5 text-sm rounded-md w-full"
              placeholder="student@email.com"
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-500">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="py-3 px-5 text-sm rounded-md w-full"
              placeholder="Temporary password"
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-500">Phone</label>
            <input
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              className="py-3 px-5 text-sm rounded-md w-full"
              placeholder="+1 (555) 000-0000"
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-500">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="py-3 px-5 text-sm rounded-md w-full"
            >
              {Object.entries(genders).map(([key, value]) => (
                <option key={key} value={value}>
                  {key}
                </option>
              ))}
            </select>
          </div>
          <div className="md:col-span-2 xl:col-span-3">
            <label className="block mb-1 text-gray-500">Address</label>
            <input
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="py-3 px-5 text-sm rounded-md w-full"
              placeholder="Address"
            />
          </div>
        </div>

        <hr className="my-6 border-gray-200" />

        <h3 className="text-sm font-semibold text-gray-700 mb-3">
          Academic Information
        </h3>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 text-sm">
          <div>
            <label className="block mb-1 text-gray-500">
              Group <span className="text-red-500">*</span>
            </label>
            <select
              name="groupId"
              value={formData.groupId}
              onChange={handleChange}
              required
              className="py-3 px-5 text-sm rounded-md w-full"
            >
              <option value="">Select Group</option>
              {groups.map((g: any) => (
                <option key={g.id} value={g.id}>
                  {g.name}
                </option>
              ))}
            </select>
            {groups.length === 0 && (
              <p className="text-xs text-amber-600 mt-1">
                No groups found. Create programs, batches, and groups first.
              </p>
            )}
          </div>
          <div>
            <label className="block mb-1 text-gray-500">
              Date of Birth <span className="text-red-500">*</span>
            </label>
            <input
              name="dob"
              type="date"
              value={formData.dob}
              onChange={handleChange}
              required
              className="py-3 px-5 text-sm rounded-md w-full"
            />
          </div>
        </div>

        <hr className="my-6 border-gray-200" />

        <div className="flex justify-end">
          <PrimaryButton
            type="submit"
            title={submitting ? "Registering..." : "Register Student"}
            disabled={submitting}
          />
        </div>
      </form>
    </div>
  );
}
