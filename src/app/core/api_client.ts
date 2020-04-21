import axios, { AxiosError, AxiosInstance } from "axios";

import { AuthRepoImpl } from "../modules/auth/data/repo";
import { ROUTES } from "../routes";
import { EnvService } from "./envService";

export interface ApiClient extends AxiosInstance {}

const prodApiUrl = "https://foglie-dialloro-api.herokuapp.com/";
const devApiUrl = "https://foglie-dialloro-api-dev.herokuapp.com/";
const localApiUrl = "http://localhost:4400/";

function getBaseApiUrl(): string {
  if (EnvService.profile === "prod") {
    return prodApiUrl;
  } else if (EnvService.profile === "dev") {
    return devApiUrl;
  }
  return localApiUrl;
}

export const BASE_URL = getBaseApiUrl();

function authInterceptor(error: AxiosError) {
  if (error.response?.status === 401) {
    AuthRepoImpl.logout();
    window.location.href = ROUTES.login;
  } else {
    return Promise.reject(error);
  }
}

export const apiClient: ApiClient = axios.create({
  baseURL: `${BASE_URL}`,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.response.use((res) => res, authInterceptor);
