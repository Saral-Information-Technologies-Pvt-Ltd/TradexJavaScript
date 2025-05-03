import {
  BookTypes,
  Exchanges,
  OrderFlags,
  OrderSides,
  Products,
  Validities,
} from "../utilities/enums";

export interface ExecuteBasketOrderRequest {
  client: string;
  orders: ExecuteBasketOrderRequestData[];
}

export interface ExecuteBasketOrderRequestData {
  algol_id: number;
  book: BookTypes;
  client: string;
  code: string;
  disclosed_qty: number;
  exchange: Exchanges;
  gtd: string;
  order_flag: OrderFlags;
  price: number;
  product: Products;
  quantity: number;
  sender_order_no: number;
  side: OrderSides;
  trigger_price: number;
  validity: Validities;
}

export interface ExecuteBasketOrderResponse {
  data: null;
  message: string;
  status: number;
}
