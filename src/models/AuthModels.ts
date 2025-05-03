export interface LoginRequest {
  app_key: string;
  secret_key: string;
  source: string;
  user_id: string;
}

export interface LoginResponse {
  data: LoginResponseData;
  message: string;
  status: string | number;
}

interface LoginResponseData {
  exchanges_allowed: string;
  products_allowed: string;
  token: string;
  user_id: string;
}

export interface LogoutRequest {
  ClientID: string;
}

export interface LogoutResponse {
  data: string;
  message: string;
  status: number;
}
