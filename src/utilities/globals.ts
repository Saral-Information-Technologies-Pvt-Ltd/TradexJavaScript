import axios, { AxiosInstance } from "../../node_modules/axios/index";

import { DEFAULTS } from "../constants";
import { LoginResponse } from "../models/AuthModels";
import { ConfigModel } from "../models/ConfigModels";
import { WebSocketClient } from "../services/websocketServices";
import { UserProfileResponse } from "../models/UserProfileModel";

let apiClient: AxiosInstance | null = null;
let wsClient: WebSocketClient | null;

const authData: LoginResponse = {
  data: {
    exchanges_allowed: "",
    products_allowed: "",
    token: "",
    user_id: "",
  },
  message: "",
  status: 0,
} as LoginResponse;

export const config: ConfigModel = {
  apiBaseUrl: "",
  appKey: "",
  clientId: "",
  enableHttps: false,
  logResponseOnConsole: true,
  nonSslPort: 0,
  secretKey: "",
  source: "",
  sslPort: 0,
  userId: "",
  websocketBaseUrl: "",
};

const userProfileData: UserProfileResponse = {
  data: {
    beneficiary_id: "",
    client_id: "",
    dp_id: "",
    email: "",
    has_poa: false,
    mobile: "",
    name: "",
    pan: "",
    products_allowed: "",
    trading_allowed: "",
  },
  message: "",
  status: 0,
} as UserProfileResponse;

export default function getApiClient(): AxiosInstance {
  if (!apiClient) {
    apiClient = axios.create({
      baseURL: getApiBaseUrl(),
      headers: {
        ...DEFAULTS.Headers,
        Authorization: `Bearer ${getAuthData().data.token}`,
      },
      timeout: DEFAULTS.Timeout,
    });
  }

  return apiClient;
}

export function getApiBaseUrl(): string {
  const { apiBaseUrl, enableHttps, nonSslPort, sslPort } = config;

  const port = enableHttps ? sslPort : nonSslPort;
  const protocol = enableHttps ? "https" : "http";

  return `${protocol}://${apiBaseUrl}:${port}/TradeXApi/v1`;
}

export function getAuthData(): LoginResponse {
  return authData;
}

export function getUserProfileData(): UserProfileResponse {
  return userProfileData;
}

export function getWebSocketBaseUrl(): string {
  const { enableHttps, nonSslPort, sslPort, websocketBaseUrl } = config;

  const port = enableHttps ? sslPort : nonSslPort;
  const protocol = enableHttps ? "wss" : "ws";

  return `${protocol}://${websocketBaseUrl}:${port}`;
}

export function GetWebSocketClient(): WebSocketClient | null {
  return wsClient;
}

export function setAuthData(object: LoginResponse): void {
  authData.data = object.data;
}

export function setConfig(object: ConfigModel): void {
  config.apiBaseUrl = object.apiBaseUrl;
  config.appKey = object.appKey;
  config.secretKey = object.secretKey;
  config.clientId = object.clientId ?? "";
  config.enableHttps = object.enableHttps;
  config.logResponseOnConsole = object.logResponseOnConsole;
  config.nonSslPort = object.nonSslPort;
  config.sslPort = object.sslPort;
  config.source = object.source;
  config.userId = object.userId;
  config.websocketBaseUrl = object.websocketBaseUrl ?? object.apiBaseUrl;
}

export function setUserProfileData(object: UserProfileResponse): void {
  userProfileData.data = object.data;
}

export function SetWebSocketClient(client: WebSocketClient): void {
  wsClient = client;
}

export function throwError(error: unknown): void {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    const defaultMessage = error.message;
    const detailedMessage = error.response?.data?.message;

    throw new Error(
      `Error: ${status} - ${defaultMessage}${
        detailedMessage ? ` - ${detailedMessage}` : ""
      }`
    );
  } else {
    throw new Error("An unknown error occurred.");
  }
}
