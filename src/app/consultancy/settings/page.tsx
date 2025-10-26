"use client";

import React from "react";
import { PrimaryButton } from "@/components/ui/Buttons";

export default function AccountSetting() {
  return (
    <section className="ml-4">
      {/* Security Section */}
      <form
        name="SecuritySection"
        autoComplete="off"
        className="text-sm w-xs md:w-lg"
      >
        <p className="font-bold mb-2">Security</p>
        <div className="mb-4">
          <label
            className="block font-medium mb-2"
            style={{ color: "var(--color-grayish)" }}
          >
            Current Password
          </label>
          <input
            type="password"
            placeholder="Please enter current password"
            className="w-full bg-[#F5F5F5] rounded-lg h-14 p-4"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block font-medium mb-2"
            style={{ color: "var(--color-grayish)" }}
          >
            New Password
          </label>
          <input
            type="password"
            placeholder="Please enter your new password"
            className="w-full bg-[#F5F5F5] rounded-lg h-14 p-4"
            required
          />
        </div>
        <div className="mb-8">
          <label
            className="block font-medium mb-2"
            style={{ color: "var(--color-grayish)" }}
          >
            Confirm Password
          </label>
          <input
            type="password"
            placeholder="Please enter your password"
            className="w-full bg-[#F5F5F5] rounded-lg h-14 p-4"
            required
          />
          <p className="text-[#606060] text-sm mt-2">
            Must be at least 8 characters long and include one number and one
            special character.
          </p>
        </div>
        <PrimaryButton
          title="Change Password"
          type="submit"
          className="rounded-lg w-full"
        />
      </form>
    </section>
  );
}
