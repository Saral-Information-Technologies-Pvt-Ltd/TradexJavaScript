import { Exchanges, ExchangeStatusSessions } from "../utilities/enums";

export interface ExchangeStatusRequest {
  ClientID: string;
}

export interface ExchangeStatusResponse {
  data: ExchangeStatusResponseData[];
  message: string;
  status: number;
}

interface ExchangeStatusResponseData {
  exchange: Exchanges;
  isConnected: boolean;
  session: ExchangeStatusSessions;
}
