import getApiClient, { throwError } from "../utilities/globals";

import { API_ENDPOINTS } from "../constants";
import {
  ExchangeStatusRequest,
  ExchangeStatusResponse,
} from "../models/ExchangeStatusModels";

// Fetches the current status of exchanges (e.g., NSE, BSE, etc.)
export async function getExchangeStatus(
  object: ExchangeStatusRequest // Query parameters for the request
): Promise<ExchangeStatusResponse> {
  try {
    // Send a POST request with query parameters and an empty body
    const response = await getApiClient().post<ExchangeStatusResponse>(
      API_ENDPOINTS.ExchangeStatus,
      {}, // No body content
      { params: object } // Parameters passed in the URL
    );

    // Return the server's response data
    return response.data;
  } catch (error) {
    // Handle and rethrow any errors during the API call
    throwError(error);
    throw error;
  }
}
