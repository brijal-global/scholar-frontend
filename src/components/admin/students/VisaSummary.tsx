"use client";

import SOP from "./SOP";
import Documents from "./Documents";

export default function VisaSummary() {
  return (
    <>
      <section className="p-5">
        <div>
          <h2 className="font-semibold text-xl">Visa Summary</h2>
          <p className="text-sm text-[#929292]">
            Core details about the Student
          </p>
        </div>
        {/* Visa Summary */}
        <h3 className="text-[#258654] font-bold mt-5 mb-3">Visa Summary</h3>
        <form className="space-y-6 text-sm mb-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="visaType"
                className="block font-medium mb-2"
                style={{ color: "var(--color-grayish)" }}
              >
                Visa Type
              </label>
              <input
                type="text"
                id="visaType"
                placeholder="D-2"
                className={`w-full bg-white rounded-lg h-14 p-4 border border-gray-300 placeholder-black`}
                disabled
              />
            </div>
            <div>
              <label
                htmlFor="status"
                className="block font-medium mb-2"
                style={{ color: "var(--color-grayish)" }}
              >
                Status
              </label>
              <input
                type="text"
                id="status"
                placeholder="In-progress"
                className={`w-full bg-white rounded-lg h-14 p-4 border border-gray-300 placeholder-black`}
                disabled
              />
            </div>
          </div>
        </form>
        <SOP />
        <Documents />
      </section>
    </>
  );
}
