"use client";
export default function BasicInformation() {
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
                htmlFor="name"
                className="block font-medium mb-2"
                style={{ color: "var(--color-grayish)" }}
              >
                Name
              </label>
              <div>
                <input
                  type="text"
                  id="name"
                  placeholder="Admin 1"
                  className={`appearance-none w-full bg-white rounded-lg h-14 p-4 border border-gray-300 text-gray-600`}
                  disabled
                />
              </div>
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
                id="email"
                placeholder="Admin@mailinator.com"
                className={`appearance-none w-full bg-white rounded-lg h-14 p-4 border border-gray-300 text-gray-600`}
                disabled
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
                id="password"
                placeholder="Password"
                className={`appearance-none w-full bg-white rounded-lg h-14 p-4 border border-gray-300 text-gray-600`}
                disabled
              />
            </div>
            <div>
              <label
                className="block font-medium mb-2"
                style={{ color: "var(--color-grayish)" }}
                htmlFor="status"
              >
                Status
              </label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="status"
                    id="inActive"
                    className="mr-2 h-14 focus:outline-none"
                  />
                  Inactive
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="status"
                    id="active"
                    className="mr-2 h-14 focus:outline-none"
                  />
                  Active
                </label>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
}
