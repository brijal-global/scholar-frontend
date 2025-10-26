"use client";
import Image from "next/image";
import CompleteImage from "@/components/ui/Completed-pana 1.svg";
import { Button } from "antd";
export default function EducationalInformation() {
  return (
    <>
      <section className="h-screen p-5 rounded-sm">
        <div className="text-center">
          <h1 className="font-bold text-4xl mb-3">Profile Setup Complete</h1>
          <p>You’re all set to explore universities!</p>
        </div>
        <div className="flex justify-center">
          <Image
            src={CompleteImage}
            alt="Picture of completion"
            style={{
              width: "18rem",
              height: "30rem",
            }}
          />
        </div>
        <div className="w-full flex space-x-8">
          <Button
            style={{
              backgroundColor: "#CCF8E2",
              marginTop: "1.5rem",
              padding: "1rem",
              color: "#29935C",
              borderRadius: "0.5rem",
              width: "10rem",
              height: "3rem",
            }}
          >
            Browse University
          </Button>
          <Button
            style={{
              backgroundColor: "#CCF8E2",
              marginTop: "1.5rem",
              padding: "1rem",
              color: "#29935C",
              borderRadius: "0.5rem",
              width: "10rem",
              height: "3rem",
            }}
          >
            Start your application
          </Button>
          <Button
            style={{
              backgroundColor: "#CCF8E2",
              marginTop: "1.5rem",
              padding: "1rem",
              color: "#29935C",
              borderRadius: "0.5rem",
              width: "10rem",
              height: "3rem",
            }}
          >
            Connect with consultant
          </Button>
        </div>
        <div className="w-full flex justify-center space-x-5">
          <Button
            type="primary"
            style={{
              backgroundColor: "#E7E7E7",
              marginTop: "1.5rem",
              padding: "1rem",
              color: "var(--color-grayish)",
              borderRadius: "0.5rem",
              width: "10rem",
              height: "3rem",
            }}
          >
            Dashboard
          </Button>
          <Button
            type="primary"
            style={{
              backgroundColor: "var(--color-primary)",
              marginTop: "1.5rem",
              padding: "1rem",
              color: "#fff",
              borderRadius: "0.5rem",
              width: "12rem",
              height: "3rem",
            }}
          >
            Go to university section
          </Button>
        </div>
      </section>
    </>
  );
}
