"use client";
import { BsQuestionCircle } from "react-icons/bs";
import { FormStepProps } from "./AddNewDashboard";
import { PrimaryButton } from "@/components/ui/Buttons";
import { Button } from "antd";
import { Plus } from "lucide-react";

const AdditionalMaterials: React.FC<FormStepProps> = ({ handleNext }) => {
  return (
    <>
      <section className="w-4xl bg-[#F9F9F9] p-5 rounded-3xl mb-10 border border-gray-200">
        <h2 className="font-semibold text-xl">
          Additional Materials (Optional)
        </h2>
        <p className="text-sm mb-5" style={{ color: "var(--color-grayish)" }}>
          Tell us about yourself
        </p>
        {/* Form */}
        <form className="space-y-6 text-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* First Row */}
            <div>
              <label
                htmlFor="minGPA"
                className="block font-medium mb-2 cols-3"
                style={{ color: "var(--color-grayish)" }}
              >
                Curriculum / Syllabus Upload (PDF, JPG, Max 10MB){" "}
                <BsQuestionCircle className="inline" />
              </label>
              <div className="h-35">
                <Button
                  color="blue"
                  variant="dashed"
                  className="w-full"
                  style={{ height: "100%" }}
                >
                  <p>
                    <Plus />
                  </p>
                  <p>Click to Upload</p>
                </Button>
              </div>
            </div>
            <div>
              <label
                htmlFor="iltsScore"
                className="block font-medium mb-2 cols-3"
                style={{ color: "var(--color-grayish)" }}
              >
                Extras / Brochures (PDF, JPG, Max 10MB){" "}
                <BsQuestionCircle className="inline" />
              </label>
              <div className="h-35">
                <Button
                  color="blue"
                  variant="dashed"
                  className="w-full"
                  style={{ height: "100%" }}
                >
                  <p>
                    <Plus />
                  </p>
                  <p>Click to Upload</p>
                </Button>
              </div>
            </div>
            <div className="md:col-span-2">
              <label
                htmlFor="download"
                className="block font-medium mb-2"
                style={{ color: "var(--color-grayish)" }}
              >
                Downloads / Links
              </label>
              <input
                type="text"
                id="download"
                placeholder="eg: university handbook, official website page"
                className={`w-full bg-white rounded-lg h-14 p-4 border border-gray-300 placeholder-gray-300`}
              />
            </div>
          </div>
          <div className="pt-6 flex justify-end">
            <PrimaryButton
              title="Next"
              onClick={handleNext}
              className="rounded-lg md:w-1/4"
            />
          </div>
        </form>
      </section>
    </>
  );
};
export default AdditionalMaterials;
