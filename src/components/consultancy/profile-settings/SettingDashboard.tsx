"use client";

import { FilesIcon, GraduationCap, Home, Menu, User, X } from "lucide-react";
import BasicInformation from "./BasicInformation";
import Address from "./Address";
import OperationalDetails from "./OperationalDetails";
import Payment from "./PaymentDetails";
import { useState } from "react";

export default function ProfileSetting() {
  const [step, setStep] = useState(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navItems = [
    { id: 1, label: "Basic Information", icon: User },
    { id: 2, label: "Address & Location", icon: Home },
    { id: 3, label: "Operational Details", icon: GraduationCap },
    { id: 4, label: "Bank & Payment Details", icon: FilesIcon },
  ];

  const renderForm = () => {
    switch (step) {
      case 1:
        return <BasicInformation />;
      case 2:
        return <Address />;
      case 3:
        return <OperationalDetails />;
      case 4:
        return <Payment />;
      default:
        return <BasicInformation />;
    }
  };

  const handleNavClick = (id: number) => {
    setStep(id);
    setIsSidebarOpen(false);
  };

  return (
    <>
      {/* Mobile menu button */}
      <div className="bg-white p-4 flex justify-between items-center md:hidden">
        <h1 className="text-lg font-bold text-gray-800">“Consultancy Name”</h1>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          {isSidebarOpen ? (
            <X className="w-6 h-6 text-gray-700" />
          ) : (
            <Menu className="w-6 h-6 text-gray-700" />
          )}
        </button>
      </div>

      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:shadow-none md:w-64 md:hidden ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:block`}
      >
        <div className="p-4">
          <h2 className="text-lg font-bold text-gray-800 md:hidden">
            Profile Settings
          </h2>
          <nav className="pt-4 flex flex-col space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center p-3 rounded-lg font-medium text-sm transition-colors duration-200 ${
                  step === item.id ? "text-white" : "text-gray-700"
                }`}
                style={{
                  backgroundColor:
                    step === item.id ? "var(--color-primary)" : "transparent",
                  color: step !== item.id ? "var(--color-grayish)" : undefined,
                }}
              >
                {item.icon && <item.icon className="w-5 h-5 mr-2" />}
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* For desktop view */}
      <div className="flex flex-row space-x-10">
        <div className="hidden md:block w-64 bg-white p-4">
          <h2 className="text-base font-bold">“Consultancy Name”</h2>
          <div>
            {/* Navigation between setting for desktop*/}
            <div className="pt-4 flex flex-col space-y-2 w-3xs">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center p-2 rounded-lg font-medium ${
                    step === item.id ? "text-white" : "text-gray-700"
                  }`}
                  style={{
                    backgroundColor:
                      step === item.id ? "var(--color-primary)" : "transparent",
                    color:
                      step !== item.id ? "var(--color-grayish)" : undefined,
                  }}
                >
                  {item.icon && <item.icon className="w-5 h-5 mr-2" />}
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
        {/* Render of forms */}
        <section className="py-6 w-full">{renderForm()}</section>
      </div>
    </>
  );
}
