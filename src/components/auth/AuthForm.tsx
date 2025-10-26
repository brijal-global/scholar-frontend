/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { EyeFreeIcons, ViewOffSlashIcon } from "@hugeicons/core-free-icons";
import { PrimaryButton } from "../ui/Buttons";
import hitApi from "@/lib/axios";
import { toast } from "react-toastify";

const AuthForm = ({ action }: { action: string | null }) => {
  const router = useRouter();

  const actions = [
    {
      label: "Sign in",
      description: "Sign in to continue your journey",
      value: "sign-in",
      endpoint: "/auth/signin",
      redirect: "/onboarding",
      inputs: [
        {
          label: "Email",
          type: "email",
          value: "",
          name: "email",
          placeholder: "Enter your email",
        },
        {
          label: "Password",
          type: "password",
          value: "",
          name: "password",
          placeholder: "Enter your password",
        },
      ],
    },
    {
      label: "Create account",
      description: "Let's get you started on your study adventure ✈️",
      value: "sign-up",
      endpoint: "/auth/signup/student",
      redirect: "/auth?action=sign-in",
      inputs: [
        {
          label: "First name",
          type: "text",
          value: "",
          name: "firstName",
          placeholder: "Enter your first name",
        },
        {
          label: "Last name",
          type: "text",
          value: "",
          name: "lastName",
          placeholder: "Enter your last name",
        },
        {
          label: "Email",
          type: "email",
          value: "",
          name: "email",
          placeholder: "Enter your email",
        },
        {
          label: "Password",
          type: "password",
          value: "",
          name: "password",
          placeholder: "Enter your password",
        },
        {
          label: "Confirm Password",
          type: "password",
          value: "",
          name: "confirmPassword",
          placeholder: "Confirm your password",
        },
      ],
    },
  ];
  const [authType, setAuthType] = useState<string>(actions[0].value);

  const [formData, setFormData] = useState<{
    email: string;
    password: string;
    confirmPassword?: string;
  }>({
    email: "",
    password: "",
  });

  const [isPasswordShown, setIsPasswordShown] = useState<boolean>(false);
  const [isConfirmPasswordShown, setIsConfirmPasswordShown] =
    useState<boolean>(false);

  useEffect(() => {
    if (action === "sign-in") {
      setAuthType("sign-in");
    } else if (action === "sign-up") {
      setAuthType("sign-up");
    } else {
      router.push("/auth?action=sign-in");
    }
  }, [action, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);

    let payload = formData;

    if (authType === "sign-in") {
      payload = {
        email: formData.email,
        password: formData.password,
      };
    }

    try {
      const res = await hitApi(
        actions.find((action) => action.value === authType)?.endpoint || "",
        "POST",
        payload
      );
      console.log(res);
      if (res?.ok || res?.success || res?.status === 200) {
        toast.success(res?.message || "Account created successfully!");
        router.push(
          actions.find((action) => action.value === authType)?.redirect || "/"
        );
      } else {
        toast.error(res?.message || "Something went wrong!");
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error?.message || "Something went wrong!");
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-1">
      <p className="text-lg font-medium">
        {actions.find((action) => action.value === authType)?.label}
      </p>
      <p className="text-blackish text-sm">
        {actions.find((action) => action.value === authType)?.description}
      </p>

      <div className="w-full bg-[#F5F5F5] my-5 p-1.5 rounded-lg flex">
        {actions.map((action, index) => (
          <Link
            key={index}
            href={`/auth?action=${action.value}`}
            className={`w-1/2 p-2 rounded-md flex items-center justify-center text-sm font-medium ${
              action.value === authType ? "bg-white" : ""
            } `}
          >
            {action.label}
          </Link>
        ))}
      </div>

      <form
        className="w-full flex flex-col items-center gap-4 text-sm"
        onSubmit={handleSubmit}
      >
        {actions
          .find((action) => action.value === authType)
          ?.inputs.map(
            (input, index) =>
              ["text", "email", "password", "number", "date", "tel"].includes(
                input.type
              ) && (
                <div key={index} className="flex flex-col gap-0.5 w-full">
                  <label htmlFor={input.label} className="text-grayish">
                    {input.label}
                  </label>
                  <div className="w-full relative">
                    <input
                      type={
                        input.name === "password"
                          ? isPasswordShown
                            ? "text"
                            : "password"
                          : input.name === "confirmPassword"
                          ? isConfirmPasswordShown
                            ? "text"
                            : "password"
                          : input.type
                      }
                      name={input.name}
                      value={
                        formData[input.name as keyof typeof formData] || ""
                      }
                      onChange={handleChange}
                      placeholder={input.placeholder}
                      className="w-full p-3 rounded-md bg-[#F5F5F5]"
                    />
                    {input.type === "password" && (
                      <HugeiconsIcon
                        icon={
                          input.name === "password"
                            ? isPasswordShown
                              ? ViewOffSlashIcon
                              : EyeFreeIcons
                            : isConfirmPasswordShown
                            ? ViewOffSlashIcon
                            : EyeFreeIcons
                        }
                        className="w-4 h-4 text-grayish absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer z-10"
                        onClick={() => {
                          if (input.name === "password") {
                            setIsPasswordShown(!isPasswordShown);
                          } else {
                            setIsConfirmPasswordShown(!isConfirmPasswordShown);
                          }
                        }}
                      />
                    )}
                  </div>
                </div>
              )
          )}

        {/* <div className="w-full flex justify-start">
          <Link
            href={"/auth/forgot-password"}
            className="text-[#c6c6c6] hover:text-[#606060] transition text-sm"
          >
            Forgot password
          </Link>
        </div> */}

        {/* <button
          type="submit"
          className="w-full p-3 rounded-md bg-primary hover:bg-primary-dark transition-all cursor-pointer text-white"
        >
          {actions.find((action) => action.value === authType)?.label}
        </button> */}

        <PrimaryButton
          title={
            actions.find((action) => action.value === authType)?.label || ""
          }
          type="submit"
          className="w-full"
        />
      </form>

      {/* <div className="w-full flex items-center justify-center gap-2">
        <div className="w-full h-[1px] bg-gray-300"></div>
        <p className="text-[#C6C6C6E5] text-xs text-nowrap my-2">Or</p>
        <div className="w-full h-[1px] bg-gray-300"></div>
      </div>

      <div className="w-full flex items-center justify-center gap-2">
        <Link
          href={""}
          className="w-full p-3 rounded-md bg-[#f2f2f2] border-gray-300 text-sm font-medium text-blackish hover:bg-[#e0e0e0] transition-all cursor-pointer text-center"
        >
          Continue with Google
        </Link>
      </div> */}
    </div>
  );
};

export default AuthForm;
