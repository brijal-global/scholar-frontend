import ApplicationCard from "@/components/user/application/ApplicationCard";

const Application = () => {
  return (
    <div className="my-8">
      {/* Header */}
      <h2 className="font-bold text-[#252C32] text-base mb-4 ml-4">
        My Applications
      </h2>

      {Array.from({ length: 1 }).map((_, index) => (
        <ApplicationCard index={index} key={index} />
      ))}
    </div>
  );
};

export default Application;
