"use client";
export default function Address() {
  return (
    <>
      <section className="p-5 rounded-sm">
        <h3 className="font-semibold text-[#258654]">Address & Contact</h3>
        <form className="my-4 text-sm">
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
              <input
                type="text"
                id="country"
                placeholder="Nepal"
                className="w-full bg-white rounded-lg h-14 p-4 border border-gray-300 text-base placeholder-black"
                disabled
              />
            </div>
            <div>
              <label
                htmlFor="state"
                className="block font-medium mb-2"
                style={{ color: "var(--color-grayish)" }}
              >
                State/Province
              </label>
              <input
                type="text"
                id="state"
                placeholder="Bagmati"
                className="w-full bg-white rounded-lg h-14 p-4 border border-gray-300 text-base placeholder-black"
                disabled
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block font-medium mb-2"
                style={{ color: "var(--color-grayish)" }}
              >
                City
              </label>
              <input
                type="text"
                id="lastName"
                placeholder="Dhadhing"
                className="w-full bg-white rounded-lg h-14 p-4 border border-gray-300 text-base placeholder-black"
                disabled
              />
            </div>

            {/* Second Row */}
            <div>
              <label
                htmlFor="address"
                className="block font-medium mb-2"
                style={{ color: "var(--color-grayish)" }}
              >
                Address
              </label>
              <input
                type="text"
                id="address"
                className="w-full bg-white rounded-lg h-14 p-4 border border-gray-300 text-base placeholder-black"
                placeholder="Dhading 13"
                disabled
              />
            </div>
            <div>
              <label
                htmlFor="postalCode"
                className="block font-medium mb-2"
                style={{ color: "var(--color-grayish)" }}
              >
                Postal Code
              </label>
              <input
                type="text"
                name="postalCode"
                id="postalCode"
                className="w-full bg-white rounded-lg h-14 p-4 border border-gray-300 text-base placeholder-black"
                placeholder="33700"
                disabled
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
                id="citizenship"
                placeholder="jamesmhz@gmail.com"
                className="w-full bg-white rounded-lg h-14 p-4 border border-gray-300 text-base placeholder-black"
                disabled
              />
            </div>
            {/* Fourth Row */}
            <div className="md:col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Third Row */}
                <div>
                  <label
                    htmlFor="phoneNumber"
                    className="block font-medium mb-2"
                    style={{ color: "var(--color-grayish)" }}
                  >
                    Phone Number
                  </label>
                  <input
                    type="text"
                    id="phoneNumber"
                    placeholder="+977 9812345678"
                    className="w-full bg-white rounded-lg h-14 p-4 border border-gray-300 text-base placeholder-black"
                    disabled
                  />
                </div>
                <div>
                  <label
                    htmlFor="passportUpload"
                    className="block font-medium mb-2"
                    style={{ color: "var(--color-grayish)" }}
                  >
                    WhatsApp Contact(optional)
                  </label>
                  <input
                    type="text"
                    id="secondaryContact"
                    className="w-full bg-white rounded-lg h-14 p-4 border border-gray-300 text-base placeholder-black"
                    placeholder="+977 981234567"
                    disabled
                  />
                </div>
                <div>
                  <label
                    htmlFor="fathersName"
                    className="block font-medium mb-2"
                    style={{ color: "var(--color-grayish)" }}
                  >
                    Father&apos;s Name
                  </label>
                  <input
                    type="text"
                    id="fathersName"
                    className="w-full bg-white rounded-lg h-14 p-4 border border-gray-300 text-base placeholder-black"
                    placeholder="James Maharjan"
                    disabled
                  />
                </div>
                <div>
                  <label
                    htmlFor="fathersContactNumber"
                    className="block font-medium mb-2"
                    style={{ color: "var(--color-grayish)" }}
                  >
                    Father&apos;s Contact Number
                  </label>
                  <input
                    type="text"
                    id="fathersContactNumber"
                    className="w-full bg-white rounded-lg h-14 p-4 border border-gray-300 text-base placeholder-black"
                    placeholder="+977 9812345678"
                    disabled
                  />
                </div>
              </div>
            </div>
            {/* Fifth row */}
            <div className="md:col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="mothersName"
                    className="block font-medium mb-2"
                    style={{ color: "var(--color-grayish)" }}
                  >
                    Mother&apos;s Name
                  </label>
                  <input
                    type="text"
                    id="mothersName"
                    className="w-full bg-white rounded-lg h-14 p-4 border border-gray-300 text-base placeholder-black"
                    placeholder="Jesse Maharjan"
                    disabled
                  />
                </div>
                <div>
                  <label
                    htmlFor="mothersContactNumber"
                    className="block font-medium mb-2"
                    style={{ color: "var(--color-grayish)" }}
                  >
                    Mother&apos;s Contact Number
                  </label>
                  <input
                    type="text"
                    id="mothersContactNumber"
                    className="w-full bg-white rounded-lg h-14 p-4 border border-gray-300 text-base placeholder-black"
                    placeholder="+977 9812345678"
                    disabled
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
        <hr className="text-[#B5B5B5]" />
      </section>
    </>
  );
}
