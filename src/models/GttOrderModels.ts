import {
  Exchanges,
  OrderPriceTypes,
  OrderSides,
  GttOrderStates,
  PriceConditions,
} from "../utilities/enums";

export interface CancelGttOrderRequest {
  ClientID: string;
  GttOrderNo: number;
}

export interface CancelGttOrderResponse {
  data: CancelGttOrderResponseData;
  message: string;
  status: number;
}

interface CancelGttOrderResponseData {
  api_source: string;
  client: string;
  code: string;
  created_at: string;
  created_by: string;
  exchange: string;
  exit_qty: number;
  exit_value: number;
  filled_qty: number;
  filled_value: number;
  flags: number;
  gtt_order_no: number;
  last_modified: string;
  main_order_price: string;
  main_state: string;
  main_trigger_price: number;
  modified_by: string;
  module: string;
  option_type: string;
  price_condition: string;
  product: string;
  qty: number;
  reason: string;
  sender_order_no: number;
  series: string;
  side: string;
  stop_order_price: string;
  stop_state: string;
  stop_trigger_price: number;
  strike: string;
  symbol: string;
  target_order_price: string;
  target_state: string;
  target_trigger_price: number;
  trail_distance: number;
  trail_gap: number;
}

export interface ModifyGttOrderRequest {
  client: string;
  code: string;
  exchange: Exchanges;
  gtt_order_no: number;
  main_order_price: string | null;
  main_state: GttOrderStates;
  main_trigger_price: number;
  price_condition: PriceConditions;
  product: string;
  qty: number;
  sender_order_no: number;
  side: OrderSides;
  stop_order_price: string | null;
  stop_state: string | null;
  stop_trigger_price: number | null;
  target_order_price: string | null;
  target_state: string | null;
  target_trigger_price: number | null;
  trail_gap: number | null;
}

export interface ModifyGttOrderResponse {
  data: ModifyGttOrderResponseData;
  message: string;
  status: number;
}

interface ModifyGttOrderResponseData {
  api_source: string;
  client: string;
  code: string;
  created_at: string;
  created_by: string;
  exchange: Exchanges;
  exit_qty: number;
  exit_value: number;
  filled_qty: number;
  filled_value: number;
  flags: number;
  gtt_order_no: number;
  last_modified: string;
  main_order_price: string | null;
  main_state: GttOrderStates;
  main_trigger_price: number;
  modified_by: string;
  module: string;
  option_type: string;
  price_condition: PriceConditions;
  product: string;
  qty: number;
  reason: string;
  sender_order_no: number;
  series: string;
  side: OrderSides;
  stop_order_price: string | null;
  stop_state: GttOrderStates | null;
  stop_trigger_price: number | null;
  strike: string;
  symbol: string;
  target_order_price: string | null;
  target_state: GttOrderStates | null;
  target_trigger_price: number | null;
  trail_distance: number | null;
  trail_gap: number | null;
}

export interface NewGttOrderRequest {
  client: string;
  code: string;
  exchange: Exchanges;
  main_order_price: OrderPriceTypes | string;
  main_state: GttOrderStates;
  main_trigger_price: number;
  price_condition: PriceConditions;
  product: string;
  qty: number;
  sender_order_no: number;
  side: OrderSides;
  stop_order_price: OrderPriceTypes | string;
  stop_state: GttOrderStates;
  stop_trigger_price: number;
  target_order_price: OrderPriceTypes | string;
  target_state: GttOrderStates;
  target_trigger_price: number;
  trail_gap: number;
}

export interface NewGttOrderResponse {
  data: NewGttOrderResponseData;
  message: string;
  status: number;
}

interface NewGttOrderResponseData {
  api_source: string;
  client: string;
  code: string;
  created_at: string;
  created_by: string;
  exchange: Exchanges;
  exit_qty: number;
  exit_value: number;
  filled_qty: number;
  filled_value: number;
  flags: number;
  gtt_order_no: number;
  last_modified: string;
  main_order_price: OrderPriceTypes | string;
  main_state: GttOrderStates;
  main_trigger_price: number;
  modified_by: string;
  module: string;
  option_type: string;
  price_condition: PriceConditions;
  product: string;
  qty: number;
  reason: string;
  sender_order_no: number;
  series: string;
  side: OrderSides;
  stop_order_price: OrderPriceTypes | string;
  stop_state: GttOrderStates;
  stop_trigger_price: number;
  strike: string;
  symbol: string;
  target_order_price: OrderPriceTypes | string;
  target_state: GttOrderStates;
  target_trigger_price: number;
  trail_distance: number;
  trail_gap: number;
}
