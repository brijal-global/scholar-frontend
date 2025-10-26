"use client";

export default function LanguageTest() {
  return (
    <>
      <section className="p-5 rounded-sm">
        <h3 className="text-[#258654] font-bold">English Proficiency Test</h3>
        <form className="mt-4 text-sm">
          {/* English Proficiency Test */}
          <div className="flex flex-col space-y-5 mb-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* First Row */}
              <div>
                <label
                  htmlFor="EPT_Testtype"
                  className="block font-medium mb-2"
                  style={{ color: "var(--color-grayish)" }}
                >
                  Test Type
                </label>
                <input
                  type="text"
                  id="EPT_Testtype"
                  placeholder="IELTS"
                  className={`w-full bg-white rounded-lg h-14 p-4 border border-gray-300 placeholder-black`}
                  disabled
                />
              </div>
              <div>
                <label
                  htmlFor="EPT_Score"
                  className="block font-medium mb-2"
                  style={{ color: "var(--color-grayish)" }}
                >
                  Score
                </label>
                <input
                  type="text"
                  id="score"
                  placeholder="7.5"
                  className={`w-full bg-white rounded-lg h-14 p-4 border border-gray-300 placeholder-black`}
                  disabled
                />
              </div>
              <div>
                <label
                  htmlFor="EPT_ExamDate"
                  className="block font-medium mb-2"
                  style={{ color: "var(--color-grayish)" }}
                >
                  Date of Exam
                </label>
                <input
                  type="text"
                  id="score"
                  placeholder="2000/01/02"
                  className={`w-full bg-white rounded-lg h-14 p-4 border border-gray-300 placeholder-black`}
                  disabled
                />
              </div>
            </div>
            <hr className="text-[#B5B5B5]" />
          </div>
        </form>

        {/* Korean Language Test */}
        <h3 className="text-[#258654] font-bold">Korean Language Test</h3>
        <form className="mt-4 text-sm">
          <div className="flex flex-col space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* First Row */}
              <div>
                <label
                  htmlFor="KLT_TestType"
                  className="block font-medium mb-2"
                  style={{ color: "var(--color-grayish)" }}
                >
                  Test Type
                </label>
                <input
                  type="text"
                  id="KLT_TestType"
                  placeholder="TOPIKI"
                  className={`w-full bg-white rounded-lg h-14 p-4 border border-gray-300 placeholder-black`}
                  disabled
                />
              </div>
              <div>
                <label
                  htmlFor="KLP_Score"
                  className="block font-medium mb-2"
                  style={{ color: "var(--color-grayish)" }}
                >
                  Score
                </label>
                <input
                  type="text"
                  id="score"
                  placeholder="Score"
                  className={`w-full bg-white rounded-lg h-14 p-4 border border-gray-300 placeholder-black`}
                  disabled
                />
              </div>
              <div>
                <label
                  htmlFor="KLP_ExamDate"
                  className="block font-medium mb-2"
                  style={{ color: "var(--color-grayish)" }}
                >
                  Date of Exam
                </label>
                <input
                  type="text"
                  id="KLP_ExamDate"
                  placeholder="2000/01/02"
                  className={`w-full bg-white rounded-lg h-14 p-4 border border-gray-300 placeholder-black`}
                  disabled
                />
              </div>
            </div>
            <hr className="text-[#B5B5B5]" />
          </div>
        </form>
      </section>
    </>
  );
}
