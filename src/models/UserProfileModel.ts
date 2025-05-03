export interface UserProfileRequest {
  ClientID: string;
}

export interface UserProfileResponse {
  data: UserProfileResponseData;
  message: string;
  status: number;
}

export interface UserProfileResponseData {
  beneficiary_id: string;
  client_id: string;
  dp_id: string;
  email: string;
  has_poa: boolean;
  mobile: string;
  name: string;
  pan: string;
  products_allowed: string;
  trading_allowed: string;
}
