import ProgramCard from "@/components/common/universities/ProgramCard";
import React from "react";

const Programs = () => {
  return (
    <div className="w-full">
      {/* Header */}
      <h1 className="text-xl font-semibold text-[#111111] mt-4 mb-6">
        Programs (43)
      </h1>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <ProgramCard index={index} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Programs;
