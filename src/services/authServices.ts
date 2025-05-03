import axios from "../../node_modules/axios/index";

import { API_ENDPOINTS } from "../constants";
import { WebSocketClient } from "./websocketServices";
import { OrderPacket, TradePacket } from "../models/WebSocketModels";

import {
  LoginRequest,
  LoginResponse,
  LogoutRequest,
  LogoutResponse,
} from "../models/AuthModels";

import getApiClient, {
  getApiBaseUrl,
  getAuthData,
  GetWebSocketClient,
  setAuthData,
  SetWebSocketClient,
  throwError,
} from "../utilities/globals";

// Function to perform login
// Initialize WebSocket connection
// And register event callbacks
export async function doLogin(
  credentials: LoginRequest,
  onOrderEvent: (data: OrderPacket["data"]) => void = () => {}, // Callback for order events
  onTradeEvent: (data: TradePacket["data"]) => void = () => {} // Callback for trade events
): Promise<LoginResponse> {
  try {
    // Send login request to the API with user credentials
    const response = await axios.post<LoginResponse>(
      `${getApiBaseUrl()}${API_ENDPOINTS.Login}`,
      credentials
    );

    // Save login response (e.g. user ID, token) for further use
    setAuthData(response.data);

    console.log("Connecting to WebSocket...");

    // Create a WebSocket client instance using user ID and token
    const wsClient = new WebSocketClient({
      ClientID: getAuthData().data.user_id,
      token: getAuthData().data.token,
    });

    try {
      // Try to connect to the WebSocket server
      await wsClient.connect();

      // Save the connected WebSocket client globally (e.g. in app state)
      SetWebSocketClient(wsClient);

      // Register callback to handle order-related WebSocket messages
      wsClient.registerCallbacks<OrderPacket["data"]>(
        (data) => onOrderEvent(data),
        "order"
      );

      // Register callback to handle trade-related WebSocket messages
      wsClient.registerCallbacks<TradePacket["data"]>(
        (data) => onTradeEvent(data),
        "trade"
      );
    } catch (error) {
      // If WebSocket fails to connect, log the error
      console.error("WebSocket connection failed: ", error);
    }

    // Return the login response data
    return response.data;
  } catch (error) {
    // Handle and throw any errors that happen during login
    throwError(error);
    throw error;
  }
}

// Function to log out the user and disconnect WebSocket
export async function logout(
  parameter: LogoutRequest
): Promise<LogoutResponse> {
  try {
    // Prepare logout API URL using ClientID
    const url = `${API_ENDPOINTS.Logout}?ClientID=${parameter.ClientID}`;

    // Call the logout API
    const response = await getApiClient().post<LogoutResponse>(url);

    try {
      // Attempt to close the active WebSocket connection
      await GetWebSocketClient()?.close();
    } catch (error) {
      // Log if WebSocket disconnection fails (not critical)
      console.error("WebSocket Disconnection Failed: ", error);
    }

    // Return logout response data
    return response.data;
  } catch (error) {
    // Handle and throw any errors that happen during logout
    throwError(error);
    throw error;
  }
}
