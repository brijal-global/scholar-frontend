/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import fetchApi from "@/lib/axios";

interface UseFetchOptions {
  now?: boolean;
  [key: string]: any;
}

interface UseFetchReturn<T> {
  hitApi: () => Promise<void>;
  refetch: () => Promise<void>;
  data: T | null;
  response: any;
  loading: boolean;
  reloading: boolean;
  error: string | null;
  isFinished: boolean;
}

const useFetch = <T,>(
  url: string,
  options: UseFetchOptions = {}
): UseFetchReturn<T> => {
  const [data, setData] = useState<T | null>(null);
  const [response, setResponse] = useState<any>(null);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [reloading, setReloading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Use ref to store options to avoid recreating callbacks on options change
  const optionsRef = useRef(options);
  optionsRef.current = options;

  const fetchData = useCallback(async () => {
    setError(null);

    try {
      const response = await fetchApi(url, optionsRef.current as any);

      // Check if response indicates an error
      if (response?.error || response?.status === "error") {
        const errorMessage = response?.message || "An error occurred!";
        setError(errorMessage);
        setData(null);
        setResponse(null);
        return null;
      }

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
        setError(errorMessage);
        setData(null);
        setResponse(null);
        console.warn(errorMessage, error);
      }
      return null;
    } finally {
      setIsFinished(true);
    }
  }, [url]); // Only depend on url

  const hitApi = useCallback(async () => {
    setLoading(true);
    setIsFinished(false);
    const res = await fetchData();
    setLoading(false);
    return res;
  }, [fetchData]);

  const refetch = useCallback(async () => {
    setReloading(true);
    const res = await fetchData();
    setReloading(false);
    return res;
  }, [fetchData]);

  // Use useEffect to fetch data when component mounts
  useEffect(() => {
    if (options?.now !== false) {
      hitApi();
    }
  }, [hitApi, options?.now]); // Added hitApi dependency

  return {
    hitApi,
    refetch,
    data,
    response,
    loading,
    reloading,
    error,
    isFinished,
  };
};

export default useFetch;
