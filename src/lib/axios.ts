/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, {
  Method,
  ResponseType,
  InternalAxiosRequestConfig,
  RawAxiosRequestHeaders,
} from "axios";
import envConfigs from "@/configs/env.config";
import { toast } from "react-toastify";
import { routerInstance } from "@/app/(protected)/layout";

export const axiosInstance = axios.create({
  baseURL: envConfigs.API_URL,
  withCredentials: true,
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig<any>) => {
    const body = config.data;

    if (body instanceof FormData) {
      // FormData sets its own Content-Type with boundary
      if (!config.headers["Content-Type"]) {
        config.headers["Content-Type"] = "multipart/form-data";
      }
    } else if (body && typeof body === "object" && containsFiles(body)) {
      // Handle objects containing files
      const formData = new FormData();
      convertObjectToFormData(body, formData);
      config.data = formData;
      config.headers["Content-Type"] = "multipart/form-data";
    }

    return config;
  },
  (error: any) => Promise.reject(error)
);

const fetchApi = async (
  url: string,
  {
    method = "GET",
    body = undefined,
    headers = {},
    signal = undefined,
    timeout = 30000,
    responseType = "json",
    withCredentials = true,
    showSuccessToast = false,
    showErrorToast = true,
    successRoute = undefined,
    errorRoute = undefined,
  }: {
    method?: Method;
    body?: undefined | null | object;
    headers?: RawAxiosRequestHeaders;
    signal?: AbortSignal;
    timeout?: number;
    responseType?: ResponseType;
    withCredentials?: boolean;
    showSuccessToast?: boolean;
    showErrorToast?: boolean;
    successRoute?: string;
    errorRoute?: string;
  } = {}
): Promise<any> => {
  try {
    method = method?.toUpperCase() as Method;
    const response = (await axiosInstance({
      url,
      method,
      data: body,
      headers,
      responseType,
      timeout,
      withCredentials,
      signal,
    })) as any;
    const successMessage = response?.data?.message || "Action successful.";
    if (showSuccessToast) {
      toast.success(successMessage);
    }
    if (successRoute) {
      routerInstance.push(successRoute);
    }
    return response?.data || response;
  } catch (error: any) {
    const errorMessage =
      error?.response?.data?.message || "An error occurred. Please try again.";
    if (showErrorToast) {
      toast.error(errorMessage);
    }
    if (errorRoute) {
      routerInstance.push(errorRoute);
    }
    return error?.response?.data || error;
  }
};

export default fetchApi;

const convertObjectToFormData = (
  obj: any,
  formData: FormData,
  parentKey = ""
) => {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      const formKey = parentKey ? `${parentKey}[${key}]` : key;

      if (value instanceof File || value instanceof Blob) {
        formData.append(formKey, value);
      } else if (Array.isArray(value)) {
        value.forEach((item, index) => {
          const arrayKey = `${formKey}[${index}]`;
          if (item instanceof File || item instanceof Blob) {
            formData.append(arrayKey, item);
          } else if (typeof item === "object") {
            convertObjectToFormData(item, formData, arrayKey);
          } else {
            formData.append(arrayKey, item);
          }
        });
      } else if (typeof value === "object" && value !== null) {
        convertObjectToFormData(value, formData, formKey);
      } else {
        formData.append(formKey, value);
      }
    }
  }
};

const isFile = (value: any) => {
  return (
    value instanceof File ||
    value instanceof Blob ||
    (value !== null &&
      typeof value === "object" &&
      typeof value.name === "string" &&
      typeof value.type === "string" &&
      typeof value.size === "number" &&
      value.constructor.name === "File")
  );
};

const containsFiles = (obj: any) => {
  if (!obj || typeof obj !== "object") return false;

  for (const key in obj) {
    if (isFile(obj[key])) {
      return true;
    } else if (obj[key] !== null && typeof obj[key] === "object") {
      if (containsFiles(obj[key])) return true;
    }
  }

  return false;
};
