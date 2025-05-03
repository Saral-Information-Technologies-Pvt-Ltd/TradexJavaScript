export const API_ENDPOINTS = {
  CancelAllOrders: "/CancelAllOrders",
  CancelGttOrder: "/CancelGttOrder",
  CancelOrder: "/CancelOrder",
  Connect: "/Connect",
  ExchangeStatus: "/ExchangeStatus",
  ExecuteBasket: "/ExecuteBasket",
  FundsReport: "/FundsReport",
  GttOrdersBook: "/GttOrdersBook",
  Holdings: "/Holdings",
  Login: "/Login",
  Logout: "/Logout",
  ModifyGttOrder: "/ModifyGttOrder",
  ModifyOrder: "/ModifyOrder",
  ModifyProduct: "/ModifyProduct",
  NetPositions: "/NetPositions",
  NewGttOrder: "/NewGttOrder",
  NewOrder: "/NewOrder",
  OrderBook: "/OrderBook",
  OrderHistory: "/OrderHistory",
  OrderStatus: "/OrderStatus",
  Orders: "/Orders",
  TradeBook: "/TradeBook",
  Trades: "/Trades",
  UserProfile: "/UserProfile",
} as const;

export const DEFAULTS = Object.freeze({
  Headers: {
    "Content-Type": "application/json",
  },
  Timeout: 5000,
});
