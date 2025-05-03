import {
  BookTypes,
  Exchanges,
  OrderFlags,
  OrderSides,
  Products,
  Validities,
} from "../utilities/enums";

export interface CancelAllOrdersRequest {
  client: string;
  code: string;
  exchange: Exchanges;
}

export interface CancelAllOrdersResponse {
  data: any;
  message: string;
  status: number;
}

export interface CancelOrderRequest {
  client: string;
  code: string;
  exchange: Exchanges;
  exchange_order_no: string;
  sender_order_no: number;
  user_order_no: number;
}

export interface CancelOrderResponse {
  data: GeneralDataResponse;
  message: string;
  status: number;
}

interface GeneralDataResponse {
  client: string;
  exchange_order_no: string;
  sender_order_no: number;
  user_order_no: number;
}

export interface ModifyOrderRequest {
  book: BookTypes;
  client: string;
  code: string;
  disclosed_qty: number;
  exchange: Exchanges;
  exchange_order_no: string;
  gtd?: string | null;
  order_flag?: number;
  price: number;
  product: string;
  qty_remaining: number;
  qty_traded: number;
  quantity: number;
  sender_order_no: number;
  side: OrderSides;
  trigger_price: number;
  validity: string;
}

export interface ModifyOrderResponse {
  data: GeneralDataResponse;
  message: string;
  status: number;
}

export interface NewOrderRequest {
  algol_id: number;
  book: BookTypes;
  client: string;
  code: string | number;
  disclosed_qty: number;
  exchange: Exchanges;
  gtd: string | null;
  order_flag: OrderFlags;
  price: number;
  product: Products;
  quantity: number;
  sender_order_no: number;
  side: OrderSides;
  trigger_price: number;
  validity: Validities;
}

export interface NewOrderResponse {
  data: {
    client: string;
    sender_order_no: number;
    user_order_no: string;
  };
  message: string;
  status: number;
}
