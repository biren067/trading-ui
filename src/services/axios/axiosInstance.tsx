import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const axiosInstance = axios.create({ baseURL: API_URL });

// Function to refresh the token
// const refreshTokenFn = async () => {
//   try {
//     const response = await axiosInstance.post(`${API_URL}/token/refresh/`, {
//       refresh: localStorage.getItem('refreshToken'),
//       fyers_access_token: localStorage.getItem('fyers_access_token'),
//     });
    
//     localStorage.setItem('accessToken', response.data.access); // Update access token
//     return response.data.access;
//   } catch (error) {
//     console.error("Failed to refresh token", error);
//     localStorage.removeItem('accessToken'); // Clear tokens if refresh fails
//     localStorage.removeItem('refreshToken');
//     throw error;
//   }
// };

// Axios request interceptor: Attach token automatically
axiosInstance.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('accessToken');
    // const fyersAccessToken = localStorage.getItem('fyers_access_token');
    // console.log("localStorage::",localStorage);


    if (!token) return config; // No token, proceed without it

    // Attach Authorization header
    config.headers.Authorization = `Bearer ${token}`;
    // if (fyersAccessToken) {
    //   config.headers['fyers_access_token'] = fyersAccessToken;
    // }
    // else{
    //   console.log("=================fysers_access_token not found")
    // }

    return config;
  },
  (error) => Promise.reject(error)
);

// Axios response interceptor: Handle token expiration automatically
// axiosInstance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     const originalRequest = error.config;
    
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true; // Mark request as retried

//       try {
//         const newToken = await refreshTokenFn();
//         axiosInstance.defaults.headers.Authorization = `Bearer ${newToken}`;
//         originalRequest.headers.Authorization = `Bearer ${newToken}`;
//         return axiosInstance(originalRequest); // Retry the request
//       } catch (refreshError) {
//         console.error("Token refresh failed", refreshError);
//         return Promise.reject(refreshError);
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// Example interceptor fix:
axiosInstance.interceptors.response.use(
  res => res,
  async error => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes('/token/refresh')
    ) {
      originalRequest._retry = true;

      try {
        const refreshResponse = await axios.post(`${API_URL}/token/refresh/`, {
          refresh: localStorage.getItem("refreshToken"),
        });

        const newAccess = refreshResponse.data.access;
        localStorage.setItem("accessToken", newAccess);

        axios.defaults.headers.common["Authorization"] = `Bearer ${newAccess}`;
        originalRequest.headers["Authorization"] = `Bearer ${newAccess}`;

        return axios(originalRequest);
      } catch (refreshError) {
        // Token refresh failed, redirect to login
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
