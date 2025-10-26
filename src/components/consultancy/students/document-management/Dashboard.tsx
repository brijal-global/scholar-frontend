"use client";

import { Search, ChevronDown, Plus, Rows3, LayoutGrid } from "lucide-react";
import { useState } from "react";
import DocumentList from "./DocumentList";
import DocumentGrid from "./DocumentGrid";
import AddStudentDocument from "@/components/modals/consultancy/AddStudentDocument";

export default function Documents() {
  const [selected, setSelected] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddStudentModel, setShowAddStudentModel] = useState(false);

  const handleButtonClick = (type: "grid" | "list") => {
    setSelected(type);
  };

  const renderForm = () => {
    switch (selected) {
      case "grid":
        return <DocumentGrid />;
      case "list":
        return <DocumentList />;
    }
  };

  const handleAddDocument = () => {
    setShowAddStudentModel(true);
  };

  return (
    <>
      {/* header */}
      <header>
        <div className="my-5">
          <h2 className="font-bold text-[#252C32] text-4xl text-center">
            “Student Document” Management
          </h2>
          <p className="text-[#252C32] text-center text-base mb-4">
            Provide all the necessary document of student for application
            process.
          </p>
        </div>
        <p className="font-bold text-[#252C32] mx-4 mb-2">
          Upload documents (23 documents are missing)
        </p>
      </header>
      {/* Search and Actions Bar */}
      <section>
        <div className="flex flex-col md:flex-row md:items-center gap-4 text-sm mx-4 mb-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search Documents here"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-[#F6F8F9] border border-[#E1E1E1] rounded-md outline-none"
            />
          </div>

          <div className="flex items-center gap-3 sm:gap-4 max-md:grid max-md:grid-cols-2 max-md:gap-2">
            <div className="relative max-md:w-full">
              <button className="appearance-none bg-white border border-[#E1E1E1] rounded-md px-4 py-3 text-[#A7A7A7] outline-none w-full">
                File type
              </button>
            </div>
            <div className="relative max-md:col-span-1 text-[#A7A7A7]">
              <select className="appearance-none bg-white border border-[#E1E1E1] rounded-md px-4 py-3 pr-10 outline-none w-full">
                <option>Sort</option>
                <option>Date (Newest)</option>
                <option>Date (Oldest)</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
            </div>
            <div className="relative max-md:col-span-2 bg-gray-100 flex p-1.5 rounded-md gap-1.5">
              <button
                onClick={() => handleButtonClick("grid")}
                className={`rounded-md p-2 w-full text-sm ${
                  selected === "grid" ? "bg-[#29935C] text-white" : ""
                }`}
              >
                <p className="flex gap-2">
                  <LayoutGrid /> Grid
                </p>
              </button>
              <button
                onClick={() => handleButtonClick("list")}
                className={`rounded-md p-2 pr-4 pt-2 pd-2 w-full text-sm ${
                  selected === "list" ? "bg-[#29935C] text-white" : ""
                }`}
              >
                <p className="flex gap-2">
                  <Rows3 /> List
                </p>
              </button>
            </div>
            <button
              onClick={handleAddDocument}
              className="bg-primary hover:bg-primary-dark text-white px-4 py-3 rounded-md cursor-pointer font-medium flex items-center gap-2 transition-colors max-md:w-full"
            >
              <Plus className="w-5 h-5" />
              Add new
            </button>
          </div>
        </div>
      </section>
      {/* Main Section of documents */}
      <main className="mx-5 pr-5 py-6 w-full">{renderForm()}</main>

      {/* Model for AddStudent */}
      <AddStudentDocument
        isOpen={showAddStudentModel}
        closeModal={() => setShowAddStudentModel(false)}
        action={() => setShowAddStudentModel(false)} // dummy action
      />
    </>
  );
}
