"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
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

  /* seed from user data */
  useEffect(() => {
    if (userData) {
      setTimeout(() => {
        setProfileForm({
          firstName: userData.firstName || "",
          lastName: userData.lastName || "",
          phone: userData.phone || "",
          gender: userData.gender || "male",
          address: userData.address || "",
        });
      }, 0);
    }
  }, [userData]);

  const handleProfileChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => setProfileForm({ ...profileForm, [e.target.name]: e.target.value });

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });

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
      const res = await fetchApi("/auth/change-my-password", {
        method: "PUT",
        body: {
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword,
          confirmPassword: passwordForm.confirmPassword,
        },
      });
      if (res?.success) {
        toast.success("Password changed successfully");
        setPasswordForm({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      }
    } catch {
      toast.error("Failed to change password. Check your current password.");
    } finally {
      setPasswordSaving(false);
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

      {/* College Profile has been moved to /org/college-profile */}
    </div>
  );
}
