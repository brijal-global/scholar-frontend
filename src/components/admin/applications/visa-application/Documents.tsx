"use client";

import { SecondaryOutlineButton } from "@/components/ui/Buttons";
import { Search, Rows3, LayoutGrid } from "lucide-react";
import { useState } from "react";
import DocumentGrid from "./DocumentGrid";
import DocumentList from "./DocumentList";
export default function Documents() {
  const [selected, setSelected] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");

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
  return (
    <>
      <h3 className="font-bold text-[#258654] mb-4 ml-4">Documents</h3>
      {/* Search and Actions Bar */}
      <div className="flex flex-col md:flex-row md:items-center gap-4 text-sm ml-4 mb-4">
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
          <SecondaryOutlineButton
            title="Verify All"
            onClick={handleButtonClick}
            className="!border-[#29935C] !text-[#29935C]"
          />
        </div>
      </div>

      {/* Section of documents */}
      <main className="mx-5 pr-5 py-6 w-full">{renderForm()}</main>
    </>
  );
}
