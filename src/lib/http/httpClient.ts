import Axios from "axios";

export const httpClient = Axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: false,
});

httpClient.interceptors.request.use((config) => {
  config.headers["Content-Type"] = "application/json";
  config.headers["Accept"] = "application/json";

  return config;
});

httpClient.interceptors.response.use(
  (response) => {
    return {
      ...response,
      error: false,
      message: response.data.message || "Success",
      status: response.status,
    };
  },
  (error) => {
    if (error.response) {
      const errorMessage = error.response.data || "Unknown Error";
      if (error.config.throwError) {
        throw new Error(errorMessage);
      }

      return {
        error: true,
        data: null,
        message: errorMessage,
        status: error.response.status,
      };
    }

    if (error.request) {
      if (error.config.throwError) {
        throw new Error("No response received from the server");
      }
      return {
        error: true,
        data: null,
        message: "No response received from the server",
        status: null,
      };
    }

    ("No response received from the server");

    return {
      error: true,
      data: null,
      message: error.message || "Request error",
      status: null,
    };
  }
);
