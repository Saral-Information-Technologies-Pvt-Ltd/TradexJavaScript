import {
  Exchanges,
  OptionTypes,
  OrderSides,
  PositionFilters,
  Products,
} from "../utilities/enums";

export interface ConvertPositionRequest {
  client: string;
  exchange: Exchanges;
  code: string;
  old_product: Products;
  new_product: Products;
  side: OrderSides;
  qty: number;
}

export interface ConvertPositionResponse {
  data: {
    message: string;
    status: string;
    user_order_no: number;
  };
  message: string;
  status: number;
}

export interface HoldingsRequest {
  ClientID: string;
}

export interface HoldingsResponse {
  status: number;
  message: string;
  data: HoldingsResponseData[];
}

interface HoldingsResponseData {
  blocked_qty: number;
  bse_code: string;
  bse_ltp: number;
  bse_name: string;
  btst_qty: number;
  buy_price: number;
  client: string;
  close_price: number;
  collateral_qty: number;
  collateral_value: number;
  free_qty: number;
  isin: string;
  non_poa_qty: number;
  nse_code: string;
  nse_ltp: number;
  nse_name: string;
  pledged_qty: number;
  position: number;
  value: number;
}

export interface PositionsRequest {
  ClientID: string;
  Filter: PositionFilters;
}

export interface PositionResponse {
  data: PositionResponseData[];
  message: string;
  status: number;
}

interface PositionResponseData {
  breakeven_point: number;
  buy_avg: number;
  buy_qty: number;
  buy_value: number;
  client: string;
  close_price: number;
  code: string;
  exchange: Exchanges;
  extrinsic_value: number;
  instrument: string;
  intrinsic_value: number;
  lot_size: number;
  market_price: number;
  mtm: number;
  multiplier: number;
  net_price: number;
  net_qty: number;
  net_value: number;
  option_type: OptionTypes;
  product: Products;
  realized_mtm: number;
  sell_avg: number;
  sell_qty: number;
  sell_value: number;
  series: string;
  strike_price: number;
  symbol: string;
  unrealized_mtm: number;
}
