export interface FundsReportRequest {
  ClientID: string;
}

export interface FundsReportResponse {
  data: FundsReportResponseData[];
  message: string;
  status: number;
}

interface FundsReportResponseData {
  adhoc: string;
  cash: string;
  cash_available: string;
  client_id: string;
  cnc_sell_benefit: string;
  collateral: string;
  costs: string;
  limit_id: string;
  margin_available: string;
  margin_used: string;
  payin: string;
  payout: string;
}
