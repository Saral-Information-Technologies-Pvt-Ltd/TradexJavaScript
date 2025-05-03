import {
  BookTypes,
  Exchanges,
  OptionTypes,
  OrderSides,
  OrderStatus,
  Products,
  Validities,
} from "../utilities/enums";

export interface OrderPacket {
  data: OrderPacketData;
  eventType: string;
}

interface OrderPacketData {
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
  status: OrderStatus;
  strike_price: number;
  symbol: string;
  trigger: number;
  user: string;
  user_order_no: number;
  validity: Validities;
}
