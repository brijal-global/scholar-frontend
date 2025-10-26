"use client";

import React, { useState } from "react";
import { Upload, Button, message, Flex } from "antd";
import type { UploadFile, UploadProps } from "antd/es/upload/interface";
import { PrimaryButton } from "@/components/ui/Buttons";
import Image from "next/image";
import ProfilePic from "@/assets/illustrations/ProfilePic.svg";

export default function AccountSetting() {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  // Handle file changes (upload, remove, or reupload)
  const handleChange: UploadProps["onChange"] = ({ fileList }) => {
    setFileList(fileList);
  };

  // Handle file removal
  const handleRemove = () => {
    setFileList([]); // Reset file list after removal
  };

  // Handle reupload
  const handleReupload = () => {
    setFileList([]); // Clear current file so the user can upload a new one
    message.info("Please select a new profile picture.");
  };

  return (
    <section className="ml-4">
      {/* Profile Section */}
      <h3 className="text-sm font-medium text-gray-700 mb-2">
        Profile Picture
      </h3>
      <form name="ProfileSection" autoComplete="off" className="mb-4">
        <div>
          <Flex gap="middle" wrap align="center">
            <Upload
              listType="picture-card"
              maxCount={1}
              onChange={handleChange}
              fileList={fileList}
              showUploadList={true}
              className="custom-upload"
            >
              {fileList.length === 0 ? (
                <div>
                  <Image
                    src={ProfilePic}
                    alt="Profile Picture"
                    width={100}
                    height={100}
                  />
                </div>
              ) : null}
            </Upload>
            {fileList.length > 0 && (
              <div>
                <Button type="text" onClick={handleReupload}>
                  Reupload
                </Button>
                <Button type="text" onClick={handleRemove} danger>
                  Remove
                </Button>
              </div>
            )}
          </Flex>
        </div>
      </form>

      {/* Security Section */}
      <form
        name="SecuritySection"
        autoComplete="off"
        className="text-sm w-xs md:w-lg"
      >
        <p className="font-bold mb-2">Security</p>
        <div className="mb-4">
          <label
            className="block font-medium mb-2"
            style={{ color: "var(--color-grayish)" }}
          >
            Current Password
          </label>
          <input
            type="password"
            placeholder="Please enter current password"
            className="w-full bg-[#F5F5F5] rounded-lg h-14 p-4"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block font-medium mb-2"
            style={{ color: "var(--color-grayish)" }}
          >
            New Password
          </label>
          <input
            type="password"
            placeholder="Please enter your new password"
            className="w-full bg-[#F5F5F5] rounded-lg h-14 p-4"
            required
          />
        </div>
        <div className="mb-8">
          <label
            className="block font-medium mb-2"
            style={{ color: "var(--color-grayish)" }}
          >
            Confirm Password
          </label>
          <input
            type="password"
            placeholder="Please enter your password"
            className="w-full bg-[#F5F5F5] rounded-lg h-14 p-4"
            required
          />
        </div>
        <PrimaryButton
          title="Change Password"
          type="submit"
          className="rounded-lg w-full"
        />
      </form>
    </section>
  );
}
