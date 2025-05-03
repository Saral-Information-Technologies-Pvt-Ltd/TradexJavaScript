import {
  BookTypes,
  Exchanges,
  OptionTypes,
  OrderSides,
  OrderStatus,
  Products,
  Validities,
} from "../utilities/enums";

export interface ConnectionRequestModel {
  ClientID: string;
  token: string;
}

export interface ErrorEvents {
  context: "parse" | "unknownEventType" | "callbackError" | "other";
  error: any;
  rawMessage?: string;
}

export interface OrderPacket {
  eventType: "order";
  data: OrderPacketData;
}

interface OrderPacketData {
  algol_id: number;
  api_source: string;
  auction_number: number;
  average_fill_price: number;
  book: string;
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
  gtd: string | null;
  instrument: "EQUITIES";
  last_modified: string;
  option_type: string | null;
  order_category: string;
  price: number;
  product: Products;
  qty_remaining: number;
  qty_traded: number;
  reason: string | null;
  sender_order_no: number;
  series: string;
  settlor: string;
  side: OrderSides;
  status: OrderStatus;
  strike_price: number;
  symbol: string;
  trigger: number;
  user: string;
  user_order_no: number;
  validity: Validities;
}

export interface TradePacket {
  eventType: "trade";
  data: TradePacketData;
}

interface TradePacketData {
  algol_id: number;
  api_source: string;
  average_fill_price: number;
  client: string;
  code: string;
  exchange: Exchanges;
  exchange_order_no: string;
  generated_by: string;
  instrument: string;
  option_type: OptionTypes | null;
  order_book: BookTypes;
  order_category: string;
  order_disc_qty: number;
  order_entry_at: string;
  order_last_modified: string;
  order_price: number;
  order_qty: number;
  order_status: OrderStatus;
  order_trigger: number;
  order_validity: Validities;
  product: Products;
  qty_cumulative: number;
  qty_remaining: number;
  sender_order_no: number;
  series: string;
  side: OrderSides;
  strike_price: number;
  symbol: string;
  trade_no: string;
  trade_time: string;
  traded_price: number;
  traded_qty: number;
  traded_value: number;
  user: string;
  user_order_no: number;
}
