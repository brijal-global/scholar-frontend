"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useOrg } from "@/contexts/OrgContext";
import fetchApi from "@/lib/axios";
import { toast } from "react-toastify";
import Loader from "@/components/ui/Loader";
import { genders } from "@/data/enums";

/* ─── validation helpers ─────────────────────────────── */
function validateProfile(f: ProfileForm) {
  if (!f.firstName.trim() || f.firstName.trim().length < 2)
    return "First name must be at least 2 characters.";
  if (!f.lastName.trim() || f.lastName.trim().length < 2)
    return "Last name must be at least 2 characters.";
  if (f.phone && !/^\+?[\d\s\-().]{7,15}$/.test(f.phone))
    return "Please enter a valid phone number.";
  return null;
}

function validatePassword(f: PasswordForm) {
  if (!f.currentPassword) return "Current password is required.";
  if (!f.newPassword || f.newPassword.length < 6)
    return "New password must be at least 6 characters.";
  if (f.newPassword !== f.confirmPassword) return "Passwords do not match.";
  return null;
}

function validateCollege(f: CollegeForm) {
  if (!f.name.trim() || f.name.trim().length < 2)
    return "College name must be at least 2 characters.";
  if (!f.country.trim()) return "Country is required.";
  if (!f.city.trim()) return "City is required.";
  return null;
}

interface ProfileForm {
  firstName: string;
  lastName: string;
  phone: string;
  gender: string;
  address: string;
}

interface PasswordForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface CollegeForm {
  name: string;
  type: string;
  country: string;
  city: string;
  streetAddress: string;
  description: string;
}

const COLLEGE_TYPES = [
  { value: "private", label: "Private" },
  { value: "public", label: "Public" },
  { value: "community", label: "Community" },
];

/* ─── Reusable section card ─────────────────────────── */
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

export default function OrgProfilePage() {
  const { userData, refetch } = useAuth();
  const { collegeId, collegeData } = useOrg();

  /* ── profile form ── */
  const [profileForm, setProfileForm] = useState<ProfileForm>({
    firstName: "",
    lastName: "",
    phone: "",
    gender: "male",
    address: "",
  });
  const [profileSaving, setProfileSaving] = useState(false);

  /* ── password form ── */
  const [passwordForm, setPasswordForm] = useState<PasswordForm>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [showPasswords, setShowPasswords] = useState(false);

  /* ── college form ── */
  const [collegeForm, setCollegeForm] = useState<CollegeForm>({
    name: "",
    type: "private",
    country: "",
    city: "",
    streetAddress: "",
    description: "",
  });
  const [collegeSaving, setCollegeSaving] = useState(false);

  /* seed from user data */
  useEffect(() => {
    if (userData) {
      setProfileForm({
        firstName: userData.firstName || "",
        lastName: userData.lastName || "",
        phone: userData.phone || "",
        gender: userData.gender || "male",
        address: userData.address || "",
      });
    }
  }, [userData]);

  /* seed from college data */
  useEffect(() => {
    if (collegeData) {
      setCollegeForm({
        name: collegeData.name || "",
        type: collegeData.type || "private",
        country: collegeData.country || "",
        city: collegeData.city || "",
        streetAddress: collegeData.streetAddress || "",
        description: collegeData.description || "",
      });
    }
  }, [collegeData]);

  const handleProfileChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => setProfileForm({ ...profileForm, [e.target.name]: e.target.value });

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });

  const handleCollegeChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => setCollegeForm({ ...collegeForm, [e.target.name]: e.target.value });

  const saveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    const err = validateProfile(profileForm);
    if (err) return toast.error(err);
    setProfileSaving(true);
    try {
      await fetchApi("/auth/update-my-profile", {
        method: "PUT",
        body: profileForm,
      });
      toast.success("Profile updated successfully");
      refetch();
    } catch {
      toast.error("Failed to update profile");
    } finally {
      setProfileSaving(false);
    }
  };

  const savePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const err = validatePassword(passwordForm);
    if (err) return toast.error(err);
    setPasswordSaving(true);
    try {
      await fetchApi("/auth/change-my-password", {
        method: "PUT",
        body: {
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword,
          confirmPassword: passwordForm.confirmPassword,
        },
      });
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch {
      toast.error("Failed to change password. Check your current password.");
    } finally {
      setPasswordSaving(false);
    }
  };

  const saveCollege = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!collegeId) return toast.error("College not found");
    const err = validateCollege(collegeForm);
    if (err) return toast.error(err);
    setCollegeSaving(true);
    try {
      await fetchApi(`/colleges/${collegeId}`, {
        method: "PUT",
        body: collegeForm,
      });
      toast.success("College profile updated");
    } catch {
      toast.error("Failed to update college profile");
    } finally {
      setCollegeSaving(false);
    }
  };

  if (!userData) return <Loader />;

  const inputCls =
    "py-2.5 px-4 rounded-md border border-gray-200 w-full text-sm focus:outline-none focus:ring-2 focus:ring-primary/30";
  const labelCls = "block mb-1 text-sm font-medium text-gray-700";

  return (
    <div className="max-w-3xl space-y-6">
      {/* ── Personal Info ── */}
      <Section title="Personal Information">
        <div className="text-sm text-gray-500 -mt-2">
          <span className="font-medium text-gray-700">{userData.email}</span>
          <span className="ml-2 text-xs bg-gray-100 px-2 py-0.5 rounded">
            Email cannot be changed
          </span>
        </div>
        <form onSubmit={saveProfile}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                name="firstName"
                value={profileForm.firstName}
                onChange={handleProfileChange}
                className={inputCls}
                placeholder="First name"
              />
            </div>
            <div>
              <label className={labelCls}>
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                name="lastName"
                value={profileForm.lastName}
                onChange={handleProfileChange}
                className={inputCls}
                placeholder="Last name"
              />
            </div>
            <div>
              <label className={labelCls}>Phone</label>
              <input
                name="phone"
                type="tel"
                value={profileForm.phone}
                onChange={handleProfileChange}
                className={inputCls}
                placeholder="+1 555 000 0000"
              />
            </div>
            <div>
              <label className={labelCls}>Gender</label>
              <select
                name="gender"
                value={profileForm.gender}
                onChange={handleProfileChange}
                className={inputCls}
              >
                {Object.entries(genders).map(([k, v]) => (
                  <option key={k} value={v}>
                    {k}
                  </option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className={labelCls}>Address</label>
              <input
                name="address"
                value={profileForm.address}
                onChange={handleProfileChange}
                className={inputCls}
                placeholder="Your address"
              />
            </div>
          </div>
          <div className="mt-5 flex justify-end">
            <button
              type="submit"
              disabled={profileSaving}
              className="bg-primary text-white text-sm py-2.5 px-6 rounded-lg hover:bg-primary-dark transition disabled:opacity-60"
            >
              {profileSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </Section>

      {/* ── Change Password ── */}
      <Section title="Change Password">
        <form onSubmit={savePassword}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className={labelCls}>
                Current Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  name="currentPassword"
                  type={showPasswords ? "text" : "password"}
                  value={passwordForm.currentPassword}
                  onChange={handlePasswordChange}
                  className={inputCls}
                  placeholder="Enter current password"
                />
              </div>
            </div>
            <div>
              <label className={labelCls}>
                New Password <span className="text-red-500">*</span>
              </label>
              <input
                name="newPassword"
                type={showPasswords ? "text" : "password"}
                value={passwordForm.newPassword}
                onChange={handlePasswordChange}
                className={inputCls}
                placeholder="Min 6 characters"
              />
            </div>
            <div>
              <label className={labelCls}>
                Confirm New Password <span className="text-red-500">*</span>
              </label>
              <input
                name="confirmPassword"
                type={showPasswords ? "text" : "password"}
                value={passwordForm.confirmPassword}
                onChange={handlePasswordChange}
                className={inputCls}
                placeholder="Repeat new password"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showPasswords}
                  onChange={(e) => setShowPasswords(e.target.checked)}
                  className="w-4 h-4"
                />
                Show passwords
              </label>
            </div>
          </div>
          <div className="mt-5 flex justify-end">
            <button
              type="submit"
              disabled={passwordSaving}
              className="bg-primary text-white text-sm py-2.5 px-6 rounded-lg hover:bg-primary-dark transition disabled:opacity-60"
            >
              {passwordSaving ? "Changing..." : "Change Password"}
            </button>
          </div>
        </form>
      </Section>

      {/* ── College Profile ── */}
      {collegeId && (
        <Section title="College Profile">
          <form onSubmit={saveCollege}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>
                  College Name <span className="text-red-500">*</span>
                </label>
                <input
                  name="name"
                  value={collegeForm.name}
                  onChange={handleCollegeChange}
                  className={inputCls}
                  placeholder="College name"
                />
              </div>
              <div>
                <label className={labelCls}>Type</label>
                <select
                  name="type"
                  value={collegeForm.type}
                  onChange={handleCollegeChange}
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
                  value={collegeForm.country}
                  onChange={handleCollegeChange}
                  className={inputCls}
                  placeholder="Country"
                />
              </div>
              <div>
                <label className={labelCls}>
                  City <span className="text-red-500">*</span>
                </label>
                <input
                  name="city"
                  value={collegeForm.city}
                  onChange={handleCollegeChange}
                  className={inputCls}
                  placeholder="City"
                />
              </div>
              <div className="sm:col-span-2">
                <label className={labelCls}>Street Address</label>
                <input
                  name="streetAddress"
                  value={collegeForm.streetAddress}
                  onChange={handleCollegeChange}
                  className={inputCls}
                  placeholder="Street address"
                />
              </div>
              <div className="sm:col-span-2">
                <label className={labelCls}>Description</label>
                <textarea
                  name="description"
                  value={collegeForm.description}
                  onChange={handleCollegeChange}
                  className={`${inputCls} resize-none`}
                  rows={3}
                  placeholder="About your college"
                />
              </div>
            </div>
            <div className="mt-5 flex justify-end">
              <button
                type="submit"
                disabled={collegeSaving}
                className="bg-primary text-white text-sm py-2.5 px-6 rounded-lg hover:bg-primary-dark transition disabled:opacity-60"
              >
                {collegeSaving ? "Saving..." : "Update College Profile"}
              </button>
            </div>
          </form>
        </Section>
      )}
    </div>
  );
}
