/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useEffect, useCallback } from "react";
import axios, { type Method, type RawAxiosRequestHeaders } from "axios";
import fetchApi from "@/lib/axios";

const useFetch = <T,>(
  url: string,
  now = true,
  method: Method = "GET",
  body: any | null = null,
  headers: RawAxiosRequestHeaders = {},
  responseType: any = "json",
  timeout: number = 10000
) => {
  const [data, setData] = useState<T | null>(null);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [reloading, setReloading] = useState<boolean>(false);
  const [err, setErr] = useState<string | null>(null);

  // hitApi function that can be called to fetch or refetch data
  const fetchData = useCallback(async () => {
    setErr(null);
    setReloading(true);
    setIsFinished(false);
    try {
      const response = await fetchApi(url, {
        method,
        body,
        headers,
        responseType,
        timeout,
      });
      // console.info("response", response);
      setData(response?.data);
    } catch (error: any) {
      if (axios.isCancel(error)) {
        console.error("Request cancelled 'useFetch'");
      } else {
        setErr(
          error?.response?.data?.message ||
            error?.message ||
            "An error occurred!"
        );
        console.log(error);
      }
    } finally {
      setReloading(false);
      setIsFinished(true);
    }
  }, [url, method, body, headers, responseType, timeout]);

  // Use useEffect to fetch data when component mounts
  useEffect(() => {
    if (now) fetchData();
  }, []);

  return { fetchData, data, reloading, err, isFinished } as any;
};

export default useFetch;
