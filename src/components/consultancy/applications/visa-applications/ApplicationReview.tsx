"use client";
import ApplicationSummary from "./ApplicationSummary";
import Address from "./Address-Contact";
import Educational from "./EducationalBackground";
import LanguageTest from "./LanguageTest";
import Recommendation from "./Recomendation";
import Documents from "./Documents";

export default function ApplicationReview() {
  return (
    <>
      <section className="w-full p-5 rounded-sm mb-10">
        <ApplicationSummary />
        <Address />
        <Educational />
        <LanguageTest />
        <Recommendation />
        <Documents />
      </section>
    </>
  );
}
