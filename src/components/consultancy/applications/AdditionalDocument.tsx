/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { Collapse } from "antd";
import { useState } from "react";

export default function AdditionalDocument() {
  const [fileName, setFileName] = useState("Upload");
  const [formData, setFormData] = useState({
    recomenderFullName: "",
    institution: "",
    relationshipApplicant: "",
    email: "",
    phoneNumber: "",
    uploadLetter: null as File | null,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFileName(file ? file.name : "Upload");
  };

  const Form = () => {
    return (
      <>
        <form>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div>
              <label htmlFor="recommenderFullName">Recommender Full Name</label>
              <input
                type="text"
                name="recommenderFullName"
                id="Full Name"
                className={`w-full bg-white rounded-lg h-14 p-4 border border-gray-300 ${
                  formData.recomenderFullName
                    ? "placeholder-gray-600"
                    : "placeholder-gray-300"
                }`}
              />
            </div>
            <div>
              <label htmlFor="recommenderFullName">
                Organization / Institution
              </label>
              <input
                type="text"
                name="recommenderFullName"
                id="Full Name"
                className={`w-full bg-white rounded-lg h-14 p-4 border border-gray-300 ${
                  formData.recomenderFullName
                    ? "placeholder-gray-600"
                    : "placeholder-gray-300"
                }`}
              />
            </div>
            <div>
              <label htmlFor="recommenderFullName">
                Relationship to Applicant
              </label>
              <input
                type="text"
                name="recommenderFullName"
                id="Full Name"
                className={`w-full bg-white rounded-lg h-14 p-4 border border-gray-300 ${
                  formData.recomenderFullName
                    ? "placeholder-gray-600"
                    : "placeholder-gray-300"
                }`}
              />
            </div>
            <div>
              <label htmlFor="recommenderFullName">Email Address</label>
              <input
                type="text"
                name="recommenderFullName"
                id="Full Name"
                className={`w-full bg-white rounded-lg h-14 p-4 border border-gray-300 ${
                  formData.recomenderFullName
                    ? "placeholder-gray-600"
                    : "placeholder-gray-300"
                }`}
              />
            </div>
            <div>
              <label htmlFor="recommenderFullName">Phone number</label>
              <input
                type="text"
                name="recommenderFullName"
                id="Full Name"
                className={`w-full bg-white rounded-lg h-14 p-4 border border-gray-300 ${
                  formData.recomenderFullName
                    ? "placeholder-gray-600"
                    : "placeholder-gray-300"
                }`}
              />
            </div>
            <div className="flex flex-col">
              <label
                className="block font-medium mb-2"
                htmlFor="passportPhoto"
                style={{ color: "var(--color-grayish)" }}
              >
                Upload Passport (BothSides){" "}
              </label>

              {/* Upload  button */}
              <label className="bg-white rounded-lg border border-gray-300 p-4 text-center font-medium">
                <span className="text-grayish truncate max-w-[80%]">
                  {fileName}
                </span>
                <input
                  type="file"
                  id="passportPhoto"
                  className="hidden"
                  accept="image/*,.pdf"
                  onChange={handleFileChange}
                />
              </label>
            </div>
          </div>
        </form>
      </>
    );
  };

  const recommendation = [
    {
      key: "1",
      label: <strong> Recommendation Letter 1</strong>,
      children: <div>{Form()}</div>,
    },
    {
      key: "2",
      label: <strong> Recommendation Letter 2</strong>,
      children: <div>{Form()}</div>,
    },
  ];
  return (
    <>
      <section className="mx-4">
        <p className="text-sm font-semibold">
          Please add the SOP and Recommendation letter of the student
        </p>
        <div className="my-10 flex flex-col">
          <label className="text-sm font-semibold mb-5" htmlFor="SOP">
            How would you like to provide your SOP?
          </label>
          <div className="flex items-center space-x-4">
            <label
              style={{ color: "var(--color-grayish)" }}
              className="flex items-center text-sm font-medium"
            >
              <input
                type="radio"
                name="SOP"
                id="SOP"
                className="mr-2 focus:outline-none"
              />
              Write your SOP
            </label>
            <label
              style={{ color: "var(--color-grayish)" }}
              className="flex items-center text-sm font-medium"
            >
              <input
                type="radio"
                name="SOP"
                id="SOP"
                className="mr-2 focus:outline-none"
              />
              Upload SOP (PDF)
            </label>
          </div>
        </div>
        {/* Text Area */}
        <div className="mb-4">
          <p className="mb-2 text-sm font-semibold">
            Write your Statement of Purpose
          </p>
          <textarea
            name="additionalNotes"
            id="additionalNotes"
            cols={30}
            rows={9}
            className="w-full bg-[#FAFAFA] rounded-sm p-4 border border-gray-300 "
            placeholder="Minimum 200 words. (Note: Rich text editor features like bold, italic, bullets are not supported in this basic input.)"
          />
        </div>
        {/* Recommendation Letter */}
        <Collapse accordion items={recommendation} />
      </section>
    </>
  );
}
