"use client";
export default function PaymentDetails() {
  return (
    <>
      <section className="p-5">
        <div className="flex justify-between">
          <h2 className="font-semibold text-xl">Bank & Payment Details</h2>
        </div>
        <form className="mt-4 text-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* First Row */}
            <div>
              <label
                htmlFor="bankName"
                className="block font-medium mb-2"
                style={{ color: "var(--color-grayish)" }}
              >
                Bank Name
              </label>
              <input
                type="text"
                id="bankName"
                placeholder="Sunrise Bank"
                className={`w-full bg-white rounded-lg h-14 p-4 border border-gray-300 placeholder-gray-300`}
                disabled
              />
            </div>
            <div>
              <label
                htmlFor="accHolderName"
                className="block font-medium mb-2"
                style={{ color: "var(--color-grayish)" }}
              >
                Account Holder Name
              </label>
              <input
                type="number"
                id="accHolderName"
                placeholder="200"
                className={`w-full bg-white rounded-lg h-14 p-4 border border-gray-300 placeholder-gray-300`}
                disabled
              />
            </div>
            <div>
              <label
                htmlFor="bankAccNumber"
                className="block font-medium mb-2"
                style={{ color: "var(--color-grayish)" }}
              >
                SWIFT / Routing Code
              </label>
              <input
                type="number"
                id="bankAccNumber"
                placeholder="123-456-789-0001"
                className={`w-full bg-white rounded-lg h-14 p-4 border border-gray-300 placeholder-gray-300`}
                disabled
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <label
                htmlFor="routingCode"
                className="block font-medium mb-2"
                style={{ color: "var(--color-grayish)" }}
              >
                SWIFT / Routing Code
              </label>
              <input
                type="text"
                id="routingCode"
                placeholder="NABILNPKA"
                className={`w-full bg-white rounded-lg h-14 p-4 border border-gray-300 placeholder-gray-300`}
                disabled
              />
            </div>
            <div className="flex flex-col">
              <label
                className="block font-medium mb-2"
                htmlFor="qrCode"
                style={{ color: "var(--color-grayish)" }}
              >
                Qr Code
              </label>
              <input
                type="text"
                id="qrCode"
                placeholder="Qr.png"
                className={`w-full bg-white rounded-lg h-14 p-4 border border-gray-300 placeholder-gray-300`}
                disabled
              />
            </div>
          </div>
        </form>
      </section>
    </>
  );
}
