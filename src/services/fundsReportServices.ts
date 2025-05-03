import getApiClient, { throwError } from "../utilities/globals";

import { API_ENDPOINTS } from "../constants";
import { FundsReportRequest, FundsReportResponse } from "../models/FundModels";

// Fetches the funds report for the user (e.g. available margin, used funds, etc.)
export async function getFundsReport(
  object: FundsReportRequest // Query parameters to filter the funds report
): Promise<FundsReportResponse> {
  try {
    // Send a POST request with empty body and parameters in the URL
    const response = await getApiClient().post<FundsReportResponse>(
      API_ENDPOINTS.FundsReport,
      {}, // No request body
      { params: object } // Pass request params in query string
    );

    // Return the data received from the server
    return response.data;
  } catch (error) {
    // Handle and rethrow any error that occurs during the request
    throwError(error);
    throw error;
  }
}
