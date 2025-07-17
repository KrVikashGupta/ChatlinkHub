import { store } from "@/app/store";
import { logoutUser } from "@/features/auth/authThunk";
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

// response interceptor to handle token refreshing
axiosInstance.interceptors.response.use(
  (response) => {
    return response; // if the response is successful return it
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401) {
      if (error.response.data.message === "Refresh token is missing") {
        // if there is no referesh token in the cookie then logout the user
        await store.dispatch(logoutUser());
        return Promise.reject(error); // Stop further processing
      }

      // if access token is expired or missing but referesh token is in the cookie
      if (!originalRequest._retry) {
        originalRequest._retry = true; // Mark the request as retried

        try {
          // try to get a new access token
          const refreshResponse =
            await axiosInstance.post("auth/refresh-token");

          if (refreshResponse.data.success) {
            // got new access token
            return axiosInstance(originalRequest);
          } else {
            // couldn't get new access token
            console.log("Refresh failed: Invalid refresh token.");
            await store.dispatch(logoutUser());
          }
        } catch (refreshError) {
          console.error("Error refreshing token:", refreshError);
          await store.dispatch(logoutUser());
        }
      }
    }

    // Return a rejected promise for other errors
    return Promise.reject(error);
  },
);
