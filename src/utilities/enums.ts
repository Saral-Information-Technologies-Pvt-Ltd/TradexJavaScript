export enum Exchanges {
  Bse = "Bse",
  BseCD = "BseCD",
  BseCO = "BseCO",
  BseFO = "BseFO",
  MCX = "MCX",
  Ncdex = "Ncdex",
  NseCD = "NseCD",
  NseCO = "NseCO",
  NseCm = "NseCm",
  NseFO = "NseFO",
}

export enum ExchangeStatusSessions {
  Closed = "Closed",
  Open = "Open",
  PreOpen = "Pre-Open",
}

export enum BookTypes {
  Rl = "RL",
  Sl = "SL",
  Po = "PO",
  Ca2 = "CA2",
}

export enum GttOrderStates {
  Cancelled = "Cancelled",
  Executed = "Executed",
  None = "None",
  Scheduled = "Scheduled",
  Triggered = "Triggered",
}

export enum OptionTypeIndices {
  "None" = 0,
  "CA" = 1,
  "CE" = 2,
  "PA" = 3,
  "PE" = 4,
}

export enum OptionTypes {
  Ca = "CA",
  Ce = "CE",
  None = "NONE",
  Pa = "PA",
  Pe = "PE",
}

export enum OrderBookFilters {
  All = "All",
  Cancelled = "Cancelled",
  Executed = "Executed",
  Failed = "Failed",
  Pending = "Pending",
  Rejected = "Rejected",
  Unconfirmed = "Unconfirmed",
}

export enum OrderFlags {
  Eight = 8,
  Four = 4,
  Twelve = 12,
  Two = 2,
  Zero = 0,
}

export enum OrderPriceTypes {
  Atp = "ATP",
  Active = "Active",
  Active2 = "Active2",
  Active3 = "Active3",
  Active4 = "Active4",
  Active5 = "Active5",
  Close = "Close",
  Extreme = "Extreme",
  Ltp = "LTP",
  Market = "Market",
  Open = "Open",
  Passive1 = "Passive1",
  Passive2 = "Passive2",
  Passive3 = "Passive3",
  Passive4 = "Passive4",
  Passive5 = "Passive5",
}

export enum OrderSides {
  Buy = "Buy",
  Sell = "Sell",
}

export enum OrderStatus {
  Accepted = "Accepted",
  Cancelled = "Cancelled",
  cDispatched = "cDispatched",
  Dispatched = "Dispatched",
  mDispatched = "mDispatched",
  Executed = "Executed",
  Failed = "Failed",
  Frozen = "Frozen",
  modFailed = "modFailed",
  Pending = "Pending",
  Rejected = "Rejected",
}

export enum PositionFilters {
  All = "All",
  Opening = "Opening",
  Todays = "Todays",
}

export enum PriceConditions {
  Immediate = "Immediate",
  PriceAbove = "PriceAbove",
  PriceBelow = "PriceBelow",
}

export enum Products {
  Cnc = "CNC",
  Intraday = "Intraday",
  Mtf = "MTF",
  Normal = "Normal",
}

export enum ProductsIndices {
  "Normal" = 1,
  "Intraday" = 2,
  "CNC" = 4,
  "MTF" = 8,
}

export enum Validities {
  Day = "Day",
  Eod = "EOD",
  Eoses = "EOSES",
  Gtc = "GTC",
  Gtd = "GTD",
  Ioc = "IOC",
}
