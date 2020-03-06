import axios, { AxiosInstance, AxiosError } from "axios";
import { ROUTES } from "../routes";
import { AuthRepoImpl } from "../modules/auth/data/repo";

export interface ApiClient extends AxiosInstance {}

const currentDomain = window.location.hostname;

const prodDomain = "foglie-dialloro-admin.now.sh";
const devDomain = "foglie-dialloro-admin.now.sh";

const prodApiUrl = "https://foglie-dialloro-api.herokuapp.com/";
const devApiUrl = "https://foglie-dialloro-api.herokuapp.com/";
const localApiUrl = "http://localhost:4400/";

function getBaseApiUrl(): string {
  if (currentDomain === prodDomain) {
    return prodApiUrl;
  } else if (currentDomain === devDomain) {
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
