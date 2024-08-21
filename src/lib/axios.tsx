import axios from "axios";
import https from "https";
import { redirect } from "next/navigation";

const backendAxios = axios.create({
  baseURL: `${process.env.BACKEND_API_URL}/${process.env.BACKEND_API_VERSION}`,
  timeout: 60000, // optional
  httpsAgent: new https.Agent({ keepAlive: true }),
});

backendAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.data.statusCode === 401) {
      redirect("/auth/login");
    }
    return Promise.reject(error);
  }
);

export default backendAxios;
