/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import useFetch from "@/hooks/useFetch";
import { authEndpoints } from "@/configs/api-endpoints.config";
import Loader from "@/components/ui/Loader";

const Dashboard = () => {
  const { data: userData, loading } = useFetch(authEndpoints.me, {
    showErrorToast: false,
  }) as any;
  return (
    <div className="p-10 flex flex-col gap-4">
      {loading === false && userData ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <h2 className="text-lg font-medium my-5 text-green-500 md:col-span-2 leading-8">
            Logged In as {userData?.firstName + " " + userData?.lastName} <br />
            Role: {userData?.role?.name}
          </h2>

          {Object.entries(userData as any).map(([key, value]) => {
            return (
              <div key={key} className="flex items-center gap-2">
                <h1 className="font-medium">{key}</h1>
                <p className="text-sm text-gray-500">
                  {String(value) as string}
                </p>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-red-500 text-center">Not logged in.</div>
      )}

      {loading === true && <Loader />}
    </div>
  );
};

export default Dashboard;
