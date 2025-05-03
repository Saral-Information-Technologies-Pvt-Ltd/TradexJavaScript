import getApiClient, { throwError } from "../utilities/globals";

import { API_ENDPOINTS } from "../constants";
import {
  CancelGttOrderRequest,
  CancelGttOrderResponse,
  ModifyGttOrderRequest,
  ModifyGttOrderResponse,
  NewGttOrderRequest,
  NewGttOrderResponse,
} from "../models/GttOrderModels";

// Cancels an existing GTT (Good Till Triggered) order
export async function cancelGttOrder(
  object: CancelGttOrderRequest // Contains order ID and necessary info for cancellation
): Promise<CancelGttOrderResponse> {
  try {
    const response = await getApiClient().post<CancelGttOrderResponse>(
      API_ENDPOINTS.CancelGttOrder,
      object
    );
    return response.data;
  } catch (error) {
    // Handle and rethrow any errors
    throwError(error);
    throw error;
  }
}

// Modifies an existing GTT order with updated conditions or values
export async function modifyGttOrder(
  object: ModifyGttOrderRequest // Payload with modified GTT order details
): Promise<ModifyGttOrderResponse> {
  try {
    const response = await getApiClient().post<ModifyGttOrderResponse>(
      API_ENDPOINTS.ModifyGttOrder,
      object
    );

    return response.data;
  } catch (error) {
    throwError(error);
    throw error;
  }
}

// Places a new GTT order with specified trigger and order details
export async function newGttOrder(
  object: NewGttOrderRequest // Payload for creating a new GTT order
): Promise<NewGttOrderResponse> {
  try {
    const response = await getApiClient().post<NewGttOrderResponse>(
      API_ENDPOINTS.NewGttOrder,
      object
    );
    return response.data;
  } catch (error) {
    throwError(error);
    throw error;
  }
}
