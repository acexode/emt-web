import axios from "axios";
import tokenService from "../services/tokenService"
import {BASE_URL} from "./baseurl";

let headers:any = {};
const token = localStorage.getItem("token");

if (token) {
    headers.Authorization = `${token}`;
}

const axiosInstance = axios.create({
    baseURL:BASE_URL,
});
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new axios.Cancel("Token is not available. Do login, please.");
    } else {
        config.headers.Authorization = token;
        return config;
    }
});
axiosInstance.interceptors.response.use(
    (response) =>
        new Promise((resolve, _reject) => {
            resolve(response);
        }),
    (error) => {
        if (!error.response) {
            return new Promise((_resolve, reject) => {
                reject(error);
            });
        }
        if (error.response.status === 401) {
            tokenService.removeToken();

            // @ts-ignore
            window.location = "/auth/login";
        } else {
            return new Promise((_resolve, reject) => {
                reject(error);
            });
        }
    }
);

export default axiosInstance;
