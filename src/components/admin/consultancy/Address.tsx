"use client";
export default function Address() {
  return (
    <>
      <section className="p-5">
        <div className="flex justify-between">
          <h2 className="font-semibold text-xl">Address & Location</h2>
        </div>
        <form className="mt-4 text-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* First Row */}
            <div>
              <label
                htmlFor="country"
                className="block font-medium mb-2"
                style={{ color: "var(--color-grayish)" }}
              >
                Country
              </label>
              <div>
                <select
                  id="country"
                  className={`appearance-none w-full bg-white rounded-lg h-14 p-4 border border-gray-300 text-gray-600`}
                  defaultValue="Nepal"
                  disabled
                >
                  <option value="" disabled>
                    Select Country
                  </option>
                  <option value="Nepal" className="text-gray-600">
                    Nepal
                  </option>
                  <option value="India" className="text-gray-600">
                    India
                  </option>
                </select>
              </div>
            </div>
            <div>
              <label
                htmlFor="state"
                className="block font-medium mb-2"
                style={{ color: "var(--color-grayish)" }}
              >
                State/Province
              </label>
              <select
                id="state"
                className={`appearance-none w-full bg-white rounded-lg h-14 p-4 border border-gray-300 text-gray-600`}
                defaultValue="Bagmati"
                disabled
              >
                <option value="" disabled>
                  --Select State/Province--
                </option>
                <option value="ProvinceNo1" className="text-gray-600">
                  Province No 1
                </option>
                <option value="Bagmati" className="text-gray-600">
                  Bagmati
                </option>
              </select>
            </div>
            <div>
              <label
                htmlFor="city"
                className="block font-medium mb-2"
                style={{ color: "var(--color-grayish)" }}
              >
                City
              </label>
              <input
                type="text"
                id="city"
                placeholder="Kathmandu"
                className={`appearance-none w-full bg-white rounded-lg h-14 p-4 border border-gray-300 text-gray-600`}
                disabled
              />
            </div>
          </div>
          {/* Second Row */}
          <div>
            <label
              htmlFor="streetAddress"
              className="block font-medium mb-2 mt-4"
              style={{ color: "var(--color-grayish)" }}
            >
              Street Address
            </label>
            <input
              type="text"
              id="streetAddress"
              className={`appearance-none w-full bg-white rounded-lg h-14 p-4 border border-gray-300 text-gray-600`}
              placeholder="Lalitpur, 06 Mahalaxmi (44600)"
              disabled
            />
          </div>
        </form>
      </section>
    </>
  );
}
