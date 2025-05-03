import getApiClient, { throwError } from "../utilities/globals";

import { API_ENDPOINTS } from "../constants";
import {
  CancelAllOrdersRequest,
  CancelAllOrdersResponse,
  CancelOrderRequest,
  CancelOrderResponse,
  ModifyOrderRequest,
  ModifyOrderResponse,
  NewOrderRequest,
  NewOrderResponse,
} from "../models/OrderModels";

// Cancels all orders placed by the user
export async function cancelAllOrders(
  object: CancelAllOrdersRequest
): Promise<CancelAllOrdersResponse> {
  try {
    const response = await getApiClient().post<CancelAllOrdersResponse>(
      API_ENDPOINTS.CancelAllOrders,
      object
    );

    return response.data;
  } catch (error) {
    throwError(error); // Log or handle error globally
    throw error; // Re-throw for further handling by caller
  }
}

// Cancels a specific order
export async function cancelOrder(
  object: CancelOrderRequest
): Promise<CancelOrderResponse> {
  try {
    const response = await getApiClient().post<CancelOrderResponse>(
      API_ENDPOINTS.CancelOrder,
      object
    );

    return response.data;
  } catch (error: unknown) {
    throwError(error); // Capture error and optionally display/log
    throw error;
  }
}

// Modifies an existing order (e.g., change price or quantity)
export async function modifyOrder(
  object: ModifyOrderRequest
): Promise<ModifyOrderResponse> {
  try {
    const response = await getApiClient().post<ModifyOrderResponse>(
      API_ENDPOINTS.ModifyOrder,
      object
    );

    return response.data;
  } catch (error: unknown) {
    throwError(error); // Pass error to the central error handler
    throw error;
  }
}

// Places a new order
export async function newOrder(
  object: NewOrderRequest
): Promise<NewOrderResponse> {
  try {
    const response = await getApiClient().post<NewOrderResponse>(
      API_ENDPOINTS.NewOrder,
      object
    );

    return response.data;
  } catch (error) {
    throwError(error); // Handle failure (e.g., validation, network)
    throw error;
  }
}
