import getApiClient, { throwError } from "../utilities/globals";

import { API_ENDPOINTS } from "../constants";
import {
  GttOrderBookRequest,
  GttOrderBookResponse,
  OrderBookRequest,
  OrderBookResponse,
  OrderHistoryRequest,
  OrderHistoryResponse,
  OrderStatusRequest,
  OrderStatusResponse,
  TradeBookRequest,
  TradeBookResponse,
} from "../models/BookModels";

// Fetches the GTT (Good Till Triggered) order book
export async function getGttOrderBook(
  object: GttOrderBookRequest // Request payload for GTT orders
): Promise<GttOrderBookResponse> {
  try {
    const response = await getApiClient().post<GttOrderBookResponse>(
      API_ENDPOINTS.GttOrdersBook,
      object
    );

    return response.data;
  } catch (error) {
    // Handle and rethrow any API errors
    throwError(error);
    throw error;
  }
}

// Fetches the regular order book with filter parameters in query string
export async function getOrderBook(
  object: OrderBookRequest // Query parameters for order book
): Promise<OrderBookResponse> {
  try {
    const response = await getApiClient().post<OrderBookResponse>(
      API_ENDPOINTS.OrderBook,
      {}, // Empty body, parameters go in query string
      { params: object } // Attach parameters to URL
    );

    return response.data;
  } catch (error) {
    throwError(error);
    throw error;
  }
}

// Fetches the order history of a user
export async function getOrderHistory(
  object: OrderHistoryRequest // Request payload for order history
): Promise<OrderHistoryResponse> {
  try {
    const response = await getApiClient().post<OrderHistoryResponse>(
      API_ENDPOINTS.OrderHistory,
      object
    );

    return response.data;
  } catch (error) {
    throwError(error);
    throw error;
  }
}

// Checks the current status of a specific order
export async function getOrderStatus(
  object: OrderStatusRequest // Request payload with order identifier
): Promise<OrderStatusResponse> {
  try {
    const response = await getApiClient().post<OrderStatusResponse>(
      API_ENDPOINTS.OrderStatus,
      object
    );

    return response.data;
  } catch (error) {
    throwError(error);
    throw error;
  }
}

// Fetches the trade book, which lists completed trades
export async function getTradeBook(
  object: TradeBookRequest // Query parameters for trade book
): Promise<TradeBookResponse> {
  try {
    const response = await getApiClient().post<TradeBookResponse>(
      API_ENDPOINTS.TradeBook,
      {}, // Empty body
      { params: object } // Parameters passed as query string
    );

    return response.data;
  } catch (error) {
    throwError(error);
    throw error;
  }
}
