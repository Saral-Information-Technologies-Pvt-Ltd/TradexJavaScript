import getApiClient, { throwError } from "../utilities/globals";

import { API_ENDPOINTS } from "../constants";
import {
  HoldingsResponse,
  HoldingsRequest,
  PositionResponse,
  PositionsRequest,
  ConvertPositionRequest,
  ConvertPositionResponse,
} from "../models/PortfolioModels";

// Converts an existing position (e.g., from intraday to delivery)
export async function convertPosition(
  object: ConvertPositionRequest
): Promise<ConvertPositionResponse> {
  try {
    const response = await getApiClient().post<ConvertPositionResponse>(
      API_ENDPOINTS.ModifyProduct, // Endpoint for position conversion
      object // Contains details like symbol, quantity, etc.
    );
    return response.data; // Return the response from server
  } catch (error) {
    throwError(error); // Log or handle error centrally
    throw error; // Re-throw so caller can handle if needed
  }
}

// Fetches user's current holdings (stocks bought and held)
export async function getHoldings(
  object: HoldingsRequest
): Promise<HoldingsResponse> {
  try {
    const response = await getApiClient().post<HoldingsResponse>(
      API_ENDPOINTS.Holdings, // Holdings API endpoint
      {}, // No body required
      { params: object } // Request parameters passed via query string
    );

    return response.data;
  } catch (error) {
    throwError(error); // Handle failure
    throw error;
  }
}

// Fetches user's net positions (open positions in intraday or delivery)
export async function getPositions(
  object: PositionsRequest
): Promise<PositionResponse> {
  try {
    const response = await getApiClient().post<PositionResponse>(
      API_ENDPOINTS.NetPositions, // Endpoint for fetching positions
      {}, // No body required
      { params: object } // Parameters passed as query params
    );

    return response.data;
  } catch (error) {
    throwError(error); // Error handling
    throw error;
  }
}
