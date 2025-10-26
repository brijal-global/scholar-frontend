"use client";
export default function ResetPassword() {
  return (
    <>
      <section className="p-5">
        <div className="flex justify-between">
          <h2 className="font-semibold text-xl">Basic Information</h2>
        </div>
        <p>Core details about the admin</p>
        <form className="mt-4 text-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* First Row */}
            <div>
              <label
                htmlFor="newPassword"
                className="block font-medium mb-2"
                style={{ color: "var(--color-grayish)" }}
              >
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                placeholder="Password"
                className={`appearance-none w-full bg-white rounded-lg h-14 p-4 border border-gray-300 text-gray-600`}
                disabled
              />
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block font-medium mb-2"
                style={{ color: "var(--color-grayish)" }}
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="Password"
                className={`appearance-none w-full bg-white rounded-lg h-14 p-4 border border-gray-300 text-gray-600`}
                disabled
              />
            </div>
          </div>
        </form>
      </section>
    </>
  );
}
