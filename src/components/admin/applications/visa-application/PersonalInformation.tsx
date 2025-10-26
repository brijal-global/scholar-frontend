"use client";
import { BsQuestionCircle } from "react-icons/bs";

export default function PersonalInformation() {
  const demoData = {
    ApplicantName: "James Maharjan",
    PasswordNumber: "PA024342",
    University: "Yonsei University",
    Program: "Business Administration (Graduate)",
    Intake: "March 2025",
    TuitionFee: "$4000 per semester",
  };
  return (
    <>
      <section className="rounded-sm">
        {/* Applicant Information */}
        <div className="bg-[#F8FFFB] rounded-sm p-5 mb-4">
          <h2>Application Summary</h2>
          <div className="text-sm text-[#838383] flex flex-col space-y-2 mt-2">
            <div className="flex justify-between">
              <p>Applicant Name:</p>
              <p>{demoData.ApplicantName}</p>
            </div>
            <div className="flex justify-between">
              <p>Passport Number:</p>
              <p>{demoData.PasswordNumber}</p>
            </div>
            <div className="flex justify-between">
              <p>University:</p>
              <p>{demoData.University}</p>
            </div>
            <div className="flex justify-between">
              <p>Program:</p>
              <p>{demoData.Program}</p>
            </div>
            <div className="flex justify-between">
              <p>Intake:</p>
              <p>{demoData.Intake}</p>
            </div>
            <div className="flex justify-between">
              <p>Tuttion Fee:</p>
              <p>{demoData.TuitionFee}</p>
            </div>
          </div>
        </div>
        <h3 className="font-semibold text-[#258654]">Personal Information</h3>
        <form className="mt-4 text-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* First Row */}
            <div>
              <label
                htmlFor="firstName"
                className="block font-medium mb-2"
                style={{ color: "var(--color-grayish)" }}
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                placeholder="James"
                className="w-full bg-white rounded-lg h-14 p-4 border border-gray-300 placeholder-black"
                disabled
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block font-medium mb-2"
                style={{ color: "var(--color-grayish)" }}
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                className="w-full bg-white rounded-lg h-14 p-4 border border-gray-300 placeholder-black"
                placeholder="Maharjan"
                disabled
              />
            </div>
            <div>
              <label
                htmlFor="dob"
                className="block font-medium mb-2"
                style={{ color: "var(--color-grayish)" }}
              >
                Date of Birth
              </label>
              <input
                type="text"
                id="citizenship"
                className="w-full bg-white rounded-lg h-14 p-4 border border-gray-300 placeholder-black"
                placeholder="2000/01/02"
                disabled
              />
            </div>
            <div>
              <label
                htmlFor="gender"
                className="block font-medium mb-2"
                style={{ color: "var(--color-grayish)" }}
              >
                Gender
              </label>
              <input
                type="text"
                id="gender"
                className="w-full bg-white rounded-lg h-14 p-4 border border-gray-300 placeholder-black"
                placeholder="Male"
                disabled
              />
            </div>
            <div>
              <label
                htmlFor="citizenship"
                className="block font-medium mb-2"
                style={{ color: "var(--color-grayish)" }}
              >
                Country of Citizenship
              </label>
              <input
                type="text"
                id="citizenship"
                className="w-full bg-white rounded-lg h-14 p-4 border border-gray-300 placeholder-black"
                placeholder="Nepal"
                disabled
              />
            </div>
            <div>
              <label
                htmlFor="passportNumber"
                className="block font-medium mb-2"
                style={{ color: "var(--color-grayish)" }}
              >
                Passport Number <BsQuestionCircle className="inline" />
              </label>
              <input
                type="text"
                id="passportNumber"
                placeholder="PA0123456"
                className="w-full bg-white rounded-lg h-14 p-4 border border-gray-300 placeholder-black"
                disabled
              />
            </div>
            <div>
              <label
                htmlFor="passportExpiry"
                className="block font-medium mb-2"
                style={{ color: "var(--color-grayish)" }}
              >
                Passport Expiry Date
              </label>
              <input
                type="text"
                id="passportExpiry"
                placeholder="2000/01/02"
                className="w-full bg-white rounded-lg h-14 p-4 border border-gray-300 placeholder-black"
                disabled
              />
            </div>
          </div>
        </form>
        <h3 className="font-semibold text-[#258654] mt-4">
          Consultancy Information
        </h3>
        <form className="mt-4 text-sm mb-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* First Row */}
            <div>
              <label
                htmlFor="acencyName"
                className="block font-medium mb-2"
                style={{ color: "var(--color-grayish)" }}
              >
                Agency Name
              </label>
              <input
                type="text"
                id="acencyName"
                placeholder="ABC Consultancy"
                className="w-full bg-white rounded-lg h-14 p-4 border border-gray-300 placeholder-black"
                disabled
              />
            </div>
            <div>
              <label
                htmlFor="contactPerson"
                className="block font-medium mb-2"
                style={{ color: "var(--color-grayish)" }}
              >
                Contact Person <BsQuestionCircle className="inline" />
              </label>
              <input
                type="text"
                id="contactPerson"
                placeholder="PA0123456"
                className="w-full bg-white rounded-lg h-14 p-4 border border-gray-300 placeholder-black"
                disabled
              />
            </div>
            <div>
              <label
                htmlFor="contactNumber"
                className="block font-medium mb-2"
                style={{ color: "var(--color-grayish)" }}
              >
                Contact Number
              </label>
              <input
                type="text"
                id="contactNumber"
                placeholder="Contact Number"
                className="w-full bg-white rounded-lg h-14 p-4 border border-gray-300 placeholder-black"
                disabled
              />
            </div>
          </div>
        </form>
        <hr className="text-[#B5B5B5]" />
      </section>
    </>
  );
}
