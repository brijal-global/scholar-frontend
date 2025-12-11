/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import fetchApi from "@/lib/axios";

const useFetch = <T,>(url: string, options: any = undefined) => {
  const [data, setData] = useState<T | null>(null);
  const [response, setResponse] = useState<any>(null);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [reloading, setReloading] = useState<boolean>(false);
  const [err, setErr] = useState<string | null>(null);

  const hitApi = useCallback(async () => {
    setErr(null);
    setLoading(true);
    setReloading(true);
    setIsFinished(false);
    try {
      const response = await fetchApi(url, options);
      const responseData = response?.data;
      setResponse(response);
      setData(responseData);
      return response;
    } catch (error: any) {
      if (axios.isCancel(error)) {
        console.warn("Request cancelled 'useFetch'");
      } else {
        const errorMessage =
          error?.response?.data?.message ||
          error?.message ||
          "An error occurred!";
        setErr(errorMessage);
        console.warn(errorMessage, error);
      }
    } finally {
      setLoading(false);
      setReloading(false);
      setIsFinished(true);
    }
  }, [url, options]);

  // Use useEffect to fetch data when component mounts
  useEffect(() => {
    if (options?.now !== false) hitApi();
  }, [options?.now]);

  return { hitApi, data, response, loading, reloading, err, isFinished } as any;
};

export default useFetch;
