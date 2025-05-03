import {
  BookTypes,
  Exchanges,
  GttOrderStates,
  OptionTypes,
  OrderBookFilters,
  OrderSides,
  PriceConditions,
  Products,
  Validities,
} from "../utilities/enums";

interface OrderData {
  algol_id: number;
  api_source: string;
  auction_number: number;
  average_fill_price: number;
  book: BookTypes;
  client: string;
  client_entry_time: string;
  code: string;
  disc_qty: number;
  entry_at: string;
  exchange: Exchanges;
  exchange_order_no: string;
  executing_id: string;
  flags: string;
  generated_by: string;
  gtd: string;
  instrument: string;
  last_modified: string;
  option_type: OptionTypes;
  order_category: string;
  price: number;
  product: Products;
  qty_remaining: number;
  qty_traded: number;
  reason: string;
  sender_order_no: number;
  series: string;
  settlor: string;
  side: OrderSides;
  status: string;
  strike_price: number;
  symbol: string;
  trigger: number;
  user: string;
  user_order_no: number;
  validity: Validities;
}

export interface OrderBookRequest {
  ClientID: string;
  Filter: OrderBookFilters;
}

export interface OrderBookResponse {
  data: OrderData[];
  message: string;
  status: number;
}

export interface OrderHistoryRequest {
  client: string;
  code: string;
  exchange: Exchanges;
  exchange_order_no: string;
  sender_order_no: number;
}

export interface OrderHistoryResponse {
  data: OrderHistoryResponseData[];
  message: string;
  status: number;
}

export interface OrderHistoryResponseData {
  algol_id: number;
  api_source: string;
  auction_number: number;
  average_fill_price: number;
  book: BookTypes;
  client: string;
  client_entry_time: string; // ISO date string
  code: string;
  disc_qty: number;
  entry_at: string; // ISO date string
  exchange: Exchanges;
  exchange_order_no: string;
  executing_id: string;
  flags: string;
  generated_by: string;
  gtd: string;
  instrument: string;
  last_modified: string; // ISO date string
  option_type: OptionTypes;
  order_category: string;
  price: number;
  product: Products;
  qty_remaining: number;
  qty_traded: number;
  reason: string;
  sender_order_no: number;
  series: string;
  settlor: string;
  side: OrderSides;
  status: string;
  strike_price: number;
  symbol: string;
  trigger: number;
  user: string;
  user_order_no: number;
  validity: Validities;
}

interface OrderStatusData {
  algol_id: number;
  api_source: string;
  auction_number: number;
  average_fill_price: number;
  book: BookTypes;
  client: string;
  client_entry_time: string; // ISO date format (e.g., "2019-08-24T14:15:22Z")
  code: string;
  disc_qty: number;
  entry_at: string;
  exchange: Exchanges;
  exchange_order_no: string;
  executing_id: string;
  flags: string;
  generated_by: string;
  gtd: string;
  instrument: string;
  last_modified: string;
  option_type: OptionTypes;
  order_category: string;
  price: number;
  product: Products;
  qty_remaining: number;
  qty_traded: number;
  reason: string;
  sender_order_no: number;
  series: string;
  settlor: string;
  side: OrderSides;
  status: string;
  strike_price: number;
  symbol: string;
  trigger: number;
  user: string;
  user_order_no: number;
  validity: Validities;
}

export interface OrderStatusRequest {
  client: string;
  code: string;
  exchange: Exchanges;
  exchange_order_no?: string | null;
  sender_order_no?: number;
}

export interface OrderStatusResponse {
  data: OrderStatusData[];
  message: string;
  status: number;
}

export interface GttOrderBookRequest {
  ClientID: string;
}

export interface GttOrderBookResponse {
  data: GttOrderBookResponseData[];
  message: string;
  status: number;
}

interface GttOrderBookResponseData {
  api_source: string;
  client: string;
  code: string;
  created_at: string; // ISO date string
  created_by: string;
  exchange: Exchanges;
  exit_qty: number;
  exit_value: number;
  filled_qty: number;
  filled_value: number;
  flags: number;
  gtt_order_no: number;
  last_modified: string; // ISO date string
  main_order_price: string;
  main_state: GttOrderStates;
  main_trigger_price: number;
  modified_by: string;
  module: string;
  option_type: OptionTypes;
  price_condition: PriceConditions;
  product: Products;
  qty: number;
  reason: string;
  sender_order_no: number;
  series: string;
  side: OrderSides;
  stop_order_price: string;
  stop_state: GttOrderStates;
  stop_trigger_price: number;
  strike: string;
  symbol: string;
  target_order_price: string;
  target_state: GttOrderStates;
  target_trigger_price: number;
  trail_distance: number;
  trail_gap: number;
}

export interface TradeBookRequest {
  ClientID: string;
}

export interface TradeBookResponse {
  data: TradeBookResponseData[];
  message: string;
  status: number;
}

interface TradeBookResponseData {
  algol_id: number;
  api_source: string;
  average_fill_price: number;
  client: string;
  code: string;
  exchange: Exchanges;
  exchange_order_no: string;
  generated_by: string;
  instrument: string;
  option_type: OptionTypes;
  order_book: string;
  order_category: string;
  order_disc_qty: number;
  order_entry_at: string; // ISO date string
  order_last_modified: string; // ISO date string
  order_price: number;
  order_qty: number;
  order_status: string;
  order_trigger: number;
  order_validity: string;
  product: Products;
  qty_cumulative: number;
  qty_remaining: number;
  sender_order_no: number;
  series: string;
  side: OrderSides;
  strike_price: number;
  symbol: string;
  trade_no: string;
  trade_time: string; // ISO date string
  traded_price: number;
  traded_qty: number;
  traded_value: number;
  user: string;
  user_order_no: number;
}
