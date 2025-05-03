import WebSocket from "ws";

import { getWebSocketBaseUrl } from "../utilities/globals";
import {
  ConnectionRequestModel,
  ErrorEvents,
  OrderPacket,
  TradePacket,
} from "../models/WebSocketModels";

type EventTypes = "order" | "trade" | "error";

class WebSocketClient {
  // Track the state of the close and connect promises
  private closePromise: Promise<void> | undefined;
  private connectPromise: Promise<void> | undefined;

  // Store the WebSocket URL
  private url: string;

  // Reference to the WebSocket object
  private ws: WebSocket | null = null;

  // Max retry attempts and retry delay (in ms)
  private maxRetries: number = 3;
  private retryDelay: number = 2000;

  // Object to store callbacks for different event types
  private callbacks: Record<string, ((data: any) => void)[]> = {};

  // Constructor to initialize the WebSocket URL with the provided config
  constructor(config: ConnectionRequestModel) {
    this.url = `${getWebSocketBaseUrl()}?ClientID=${config.ClientID}&token=${
      config.token
    }`;
  }

  // Register a callback function for a specific event type (e.g., "order" or "trade")
  registerCallbacks<T>(callback: (data: T) => void, eventType: EventTypes) {
    if (!this.callbacks[eventType]) {
      this.callbacks[eventType] = []; // Create a new callback array if it doesn't exist
    }

    this.callbacks[eventType].push(callback); // Add the callback to the list
  }

  // Emit an error event to listeners or log it to the console
  private emitError(errorData: ErrorEvents) {
    const errorCallbacks = this.callbacks["error"];

    if (errorCallbacks && errorCallbacks.length) {
      errorCallbacks.forEach((cb) => cb(errorData)); // Call each error callback
    } else {
      console.error("WebSocket error:", errorData); // Log error if no listeners
    }
  }

  // Parse the raw incoming data and convert it to strongly typed interfaces
  private parseEventData(eventType: EventTypes, rawData: any): any {
    switch (eventType) {
      case "order":
        return rawData as OrderPacket["data"]; // Parse order data
      case "trade":
        return rawData as TradePacket["data"]; // Parse trade data
      default:
        return rawData; // Return raw data if no specific parsing needed
    }
  }

  // Creates the WebSocket connection and handles retries on failure
  private createWebSocket(
    resolve: () => void,
    reject: (error: any) => void,
    attempt = 1
  ) {
    this.ws = new WebSocket(this.url); // Create a new WebSocket instance
    this.ws.binaryType = "arraybuffer"; // Set the binary type for WebSocket

    // On connection open, resolve the promise
    this.ws.on("open", () => {
      console.log("WebSocket connected."); // Connection established
      resolve();
    });

    // On receiving a message, process it
    this.ws.on("message", (message: MessageEvent) => {
      if (typeof message === "object") {
        try {
          const object = JSON.parse(String(message)); // Parse the message
          const eventType: EventTypes = object.eventType; // Get the event type

          const parsedData = this.parseEventData(eventType, object.data); // Parse data based on event type
          const prefix = eventType === "trade" ? "Trade" : "Order"; // Set event prefix (Trade/Order)

          // Log the response for development purposes
          if (process.env.NODE_ENV === "development") {
            console.log(
              `\n${prefix} Response: ${JSON.stringify(object.data, null, 2)}\n`
            );
          }

          // Dispatch the callback for the specific event type
          const cbs = this.callbacks[eventType];

          if (cbs && cbs.length) {
            cbs.forEach((cb) => {
              try {
                cb(parsedData); // Call each registered callback with parsed data
              } catch (err) {
                // Handle callback errors
                this.emitError({
                  context: "callbackError",
                  error: err,
                  rawMessage: JSON.stringify(object),
                });
              }
            });
          } else {
            // Log if no callbacks were found for this event type
            this.emitError({
              context: "unknownEventType",
              error: new Error(`Unknown eventType: ${eventType}`),
              rawMessage: JSON.stringify(object),
            });
          }
        } catch (error) {
          console.warn("Error parsing JSON message: " + error); // Log parsing errors

          // Emit error for failed JSON parsing
          this.emitError({
            context: "parse",
            error,
            rawMessage: String(message),
          });
        }
      } else {
        console.warn("Received non-json format message: ", message); // Warn if message isn't JSON

        // Emit error for non-JSON message
        this.emitError({
          context: "other",
          error: new Error("Non-JSON message received"),
          rawMessage: String(message),
        });
      }
    });

    // Handle WebSocket connection errors and retries
    this.ws.on("error", (error: any) => {
      console.warn(
        `WebSocket connection failed (Attempt ${attempt} of ${this.maxRetries})`
      );

      // Emit error event
      this.emitError({ error, context: "other" });

      // Retry connection if attempts left
      if (attempt < this.maxRetries) {
        console.log(
          `Retrying connection... Attempt ${attempt} of ${this.maxRetries}`
        );

        // Set a timeout before retrying
        setTimeout(
          () => this.createWebSocket(resolve, reject, attempt + 1),
          this.retryDelay
        );

        // Increase retry delay for next attempt
        this.retryDelay *= 2;
      } else {
        console.error("Max retries reached. WebSocket connection failed."); // Max retries reached
        reject(error); // Reject the connection promise
      }
    });

    // When WebSocket is closed, log and clean up
    this.ws.on("close", () => {
      console.log("WebSocket closed."); // Connection closed

      // Cleanup
      this.ws = null;
      this.closePromise = undefined;
    });
  }

  // Connect to the WebSocket (returns a promise)
  async connect(): Promise<void> {
    if (!this.connectPromise) {
      this.connectPromise = new Promise((resolve, reject) => {
        this.createWebSocket(resolve, reject); // Create the WebSocket connection
      });
    }
    return this.connectPromise; // Return the promise
  }

  // Close the WebSocket connection (returns a promise)
  async close(): Promise<void> {
    if (!this.ws) {
      console.log("WebSocket Not Initialized."); // WebSocket not set up yet
      return Promise.reject(new Error("WebSocket Not Initialized.")); // Reject if WebSocket isn't initialized
    }

    if (!this.closePromise) {
      this.closePromise = new Promise((resolve, reject) => {
        try {
          this.ws?.on("close", () => {
            resolve(); // Resolve when closed
          });

          this.ws?.close(); // Close the WebSocket connection
        } catch (error) {
          console.log("WebSocket Disconnection Failed: " + error); // Log disconnection error
          reject(error); // Reject if disconnect fails
        }
      });
    }

    return this.closePromise; // Return the close promise
  }
}

export { EventTypes, WebSocketClient };
