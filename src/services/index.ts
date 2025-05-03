import { doLogin, logout } from "./authServices";
import { setConfig } from "../utilities/globals";
import { ConfigModel } from "../models/ConfigModels";
import { getFundsReport } from "./fundsReportServices";
import { getUserProfile } from "./userProfileServices";
import { executeBasketOrders } from "./basketOrderServices";
import { getExchangeStatus } from "./exchangeStatusServices";
import { LoginRequest, LoginResponse } from "../models/AuthModels";
import { OrderPacket, TradePacket } from "../models/WebSocketModels";
import {
  convertPosition,
  getHoldings,
  getPositions,
} from "./portfolioServices";
import {
  cancelGttOrder,
  modifyGttOrder,
  newGttOrder,
} from "./gttOrderServices";
import {
  cancelAllOrders,
  cancelOrder,
  modifyOrder,
  newOrder,
} from "./orderServices";
import {
  getGttOrderBook,
  getOrderBook,
  getOrderHistory,
  getOrderStatus,
  getTradeBook,
} from "./bookServices";

class TradeXClient {
  // Callbacks to handle order and trade WebSocket events
  private onOrderEvent: (message: OrderPacket["data"]) => void;
  private onTradeEvent: (message: TradePacket["data"]) => void;

  constructor(
    object: ConfigModel, // Configuration object (e.g., base URL, environment info)
    onOrderEvent: (message: OrderPacket["data"]) => void, // Callback for order updates
    onTradeEvent: (message: TradePacket["data"]) => void // Callback for trade updates
  ) {
    // Set global config using provided object
    setConfig(object);

    this.onOrderEvent = onOrderEvent;
    this.onTradeEvent = onTradeEvent;
  }

  // Handles login and WebSocket setup using provided credentials
  login(object: LoginRequest): Promise<LoginResponse> {
    const response = doLogin(object, this.onOrderEvent, this.onTradeEvent);
    return response;
  }
  logout = logout;

  // Funds
  getFundsReport = getFundsReport;

  // User
  getUserProfile = getUserProfile;

  // Basket
  executeBasketOrders = executeBasketOrders;

  // Exchange
  getExchangeStatus = getExchangeStatus;

  // Portfolio
  convertPosition = convertPosition;
  getHoldings = getHoldings;
  getPositions = getPositions;

  // GTT Orders
  cancelGttOrder = cancelGttOrder;
  modifyGttOrder = modifyGttOrder;
  newGttOrder = newGttOrder;

  // Orders
  cancelAllOrders = cancelAllOrders;
  cancelOrder = cancelOrder;
  modifyOrder = modifyOrder;
  newOrder = newOrder;

  // Book
  getGttOrderBook = getGttOrderBook;
  getOrderBook = getOrderBook;
  getOrderHistory = getOrderHistory;
  getOrderStatus = getOrderStatus;
  getTradeBook = getTradeBook;

  setConfig = setConfig;
}

export default TradeXClient;
