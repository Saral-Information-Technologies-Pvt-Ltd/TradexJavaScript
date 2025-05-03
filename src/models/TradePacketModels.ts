import {
  BookTypes,
  Exchanges,
  OptionTypes,
  OrderSides,
  OrderStatus,
  Products,
  Validities,
} from "../utilities/enums";

export interface TradePacket {
  data: TradePacketData;
  eventType: string;
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
  option_type: OptionTypes;
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
