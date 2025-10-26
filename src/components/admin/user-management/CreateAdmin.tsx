"use client";

import { PrimaryButton } from "@/components/ui/Buttons";
import Link from "next/link";

export default function AddNewDashboard() {
  return (
    <section className="w-full h-full">
      <div className="flex flex-row space-x-2">
        <div className="flex flex-col w-full mt-10">
          <div className="text-center">
            <h1 className="font-bold text-4xl mb-3">Add a New Program</h1>
            <p className="mb-10">
              Provide complete details about the university to ensure accurate
              information for students and consultancies.
            </p>
          </div>
          <main className="py-6 w-fullPre departure flex justify-center">
            <div className="w-4xl bg-[#F9F9F9] p-5 rounded-3xl mb-10 border border-gray-200">
              <h2 className="font-semibold text-xl">Basic Information</h2>
              <p
                className="text-sm mb-5"
                style={{ color: "var(--color-grayish)" }}
              >
                Core details about this program
              </p>
              {/* Form */}
              <form className="space-y-6 text-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* First Row */}
                  <div>
                    <label
                      htmlFor="Name"
                      className="block font-medium mb-2"
                      style={{ color: "var(--color-grayish)" }}
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="Name"
                      placeholder="Admin 1"
                      className={`w-full bg-white rounded-lg h-14 p-4 border border-gray-300 placeholder-gray-300`}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block font-medium mb-2"
                      style={{ color: "var(--color-grayish)" }}
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="Admin@mailinator.com"
                      placeholder="Admin 1"
                      className={`w-full bg-white rounded-lg h-14 p-4 border border-gray-300 placeholder-gray-300`}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block font-medium mb-2"
                      style={{ color: "var(--color-grayish)" }}
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      id="Password"
                      placeholder="Admin 1"
                      className={`w-full bg-white rounded-lg h-14 p-4 border border-gray-300 placeholder-gray-300`}
                    />
                  </div>
                  <div>
                    <label
                      className="block font-medium mb-2"
                      style={{ color: "var(--color-grayish)" }}
                    >
                      Status
                    </label>
                    <div className="flex gap-4">
                      <label className="flex items-center select-none">
                        <input
                          type="radio"
                          name="status"
                          id="No"
                          className="mr-2 h-14 focus:outline-none"
                        />
                        Inactive
                      </label>
                      <label className="flex items-center select-none">
                        <input
                          type="radio"
                          name="status"
                          id="Yes"
                          className="mr-2 h-14 focus:outline-none"
                        />
                        Active
                      </label>
                    </div>
                  </div>
                </div>
                <p className="text-[#6F6F6F]">
                  Note: Only create Admin accounts for trusted team members.
                  Admins can manage operations but cannot create or manage other
                  admins.
                </p>
                <div className="pt-6 flex justify-end gap-6">
                  <Link
                    href="/admin/user-management"
                    className="bg-[#EDEDED] text-center px-4 py-3 rounded-md cursor-pointer font-medium md:w-1/5"
                  >
                    Cancel
                  </Link>
                  <PrimaryButton
                    title="Create"
                    type="submit"
                    className="rounded-lg md:w-1/5"
                  />
                </div>
              </form>
            </div>
          </main>
        </div>
      </div>
    </section>
  );
}
