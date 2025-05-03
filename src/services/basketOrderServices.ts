import getApiClient, { throwError } from "../utilities/globals";

import { API_ENDPOINTS } from "../constants";
import {
  ExecuteBasketOrderRequest,
  ExecuteBasketOrderResponse,
} from "../models/BasketModels";

// Function to execute basket orders
export async function executeBasketOrders(
  object: ExecuteBasketOrderRequest // object - Request payload containing basket order details
): Promise<ExecuteBasketOrderResponse> {
  try {
    // Send POST request to execute the basket order
    const response = await getApiClient().post<ExecuteBasketOrderResponse>(
      API_ENDPOINTS.ExecuteBasket,
      object
    );

    // Return the response data from the server
    return response.data;
  } catch (error) {
    // Handle and rethrow any errors that occur during the API call
    throwError(error);
    throw error;
  }
}
