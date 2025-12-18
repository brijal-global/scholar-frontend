import { CodeIcon } from "lucide-react";

const Support = () => {
  return (
    <div className="mt-52 text-center text-gray-400 text-xl font-medium flex flex-col items-center gap-4">
      <CodeIcon className="w-10 h-10" />
      <p>Under development</p>
      <p className="text-sm text-gray-400">
        This feature is currently under development. Please check back later.
      </p>
    </div>
  );
};

export default Support;
