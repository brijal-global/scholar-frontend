import UniversityCard from "@/components/common/universities/UniversityCard";

const Universities = () => {
  return (
    <div className="my-8">
      {/* Header */}
      <div className="text-center my-8 space-y-1">
        <h1 className="text-3xl font-semibold text-gray-900">
          Explore Universities
        </h1>
        <p className="text- text[#252C32]">
          Find your perfect university in Korea
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {Array.from({ length: 10 }).map((_, index) => (
          <UniversityCard index={index} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Universities;
