console.log("\x1b]2;TradeX Javascript SDK\x1b\x5c");

import * as readline from "readline";
import TradeXClient from "./services/index";

import { config } from "./utilities/globals";
import { FundsReportResponse } from "./models/FundModels";
import { UserProfileResponse } from "./models/UserProfileModel";
import { ExecuteBasketOrderResponse } from "./models/BasketModels";
import { OrderPacket, TradePacket } from "./models/WebSocketModels";
import { LoginResponse, LogoutResponse } from "./models/AuthModels";
import { ExchangeStatusResponse } from "./models/ExchangeStatusModels";
import {
  CancelGttOrderResponse,
  ModifyGttOrderResponse,
  NewGttOrderResponse,
} from "./models/GttOrderModels";
import {
  ConvertPositionResponse,
  HoldingsResponse,
  PositionResponse,
} from "./models/PortfolioModels";
import {
  CancelAllOrdersResponse,
  CancelOrderResponse,
  ModifyOrderResponse,
  NewOrderResponse,
} from "./models/OrderModels";
import {
  GttOrderBookResponse,
  OrderBookResponse,
  OrderHistoryResponse,
  OrderStatusResponse,
  TradeBookResponse,
} from "./models/BookModels";
import {
  Exchanges,
  Products,
  OrderSides,
  BookTypes,
  OrderFlags,
  Validities,
  PositionFilters,
  OrderBookFilters,
  GttOrderStates,
  PriceConditions,
  OrderPriceTypes,
} from "./utilities/enums";

async function init(): Promise<void> {
  function onOrderEventReceived(packet: OrderPacket["data"]) {
    console.log("Order Event:\n", JSON.stringify(packet, null, 2));
  }

  function onTradeEventReceived(packet: TradePacket["data"]) {
    console.log("Trade Event:\n", JSON.stringify(packet, null, 2));
  }

  const tradexClient = new TradeXClient(
    {
      apiBaseUrl: "tradex.saral-info.com",
      appKey: "",
      secretKey: "",
      clientId: "",
      enableHttps: true,
      logResponseOnConsole: true,
      nonSslPort: 30000,
      sslPort: 30001,
      source: "Test",
      userId: "test01",
      websocketBaseUrl: "tradex.saral-info.com",
    },
    onOrderEventReceived,
    onTradeEventReceived
  );

  const options = Object.freeze([
    { index: 1, label: "Login" },
    { index: 2, label: "Get User Profile" },
    { index: 3, label: "Place New Order" },
    { index: 4, label: "Modify Order" },
    { index: 5, label: "Cancel Order" },
    { index: 6, label: "Cancel All Orders" },
    { index: 7, label: "Place New GTT Order" },
    { index: 8, label: "Modify GTT Order" },
    { index: 9, label: "Cancel GTT Order" },
    { index: 10, label: "Execute Basket Orders" },
    { index: 11, label: "Get Order Book" },
    { index: 12, label: "Get Order Status" },
    { index: 13, label: "Get Order History" },
    { index: 14, label: "Get GTT Order Book" },
    { index: 15, label: "Get Trade Book" },
    { index: 16, label: "Convert Position" },
    { index: 17, label: "Get Holdings" },
    { index: 18, label: "Get Positions" },
    { index: 19, label: "Get Funds Report" },
    { index: 20, label: "Get Exchange Status" },
    { index: 21, label: "Logout" },
    { index: 22, label: "Exit" },
  ]);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  function showMenu() {
    console.log("=========== TradeX Menu ===========");

    const _options = Object.values(options);

    _options.forEach((label, index) => {
      console.log(`${index + 1}. ${label.label}`);
    });

    console.log("===================================");

    rl.question(`\nSelect an option (1-${_options.length}): `, async (i) => {
      const choice: number = parseInt(i);

      if (isNaN(choice) || choice < 1 || choice > _options.length) {
        console.log(`Invalid option. Select between 1 and ${_options.length}.`);
        return showMenu();
      }

      try {
        switch (choice) {
          case 1: {
            console.log("Logging in...");

            const result: LoginResponse = await tradexClient.login({
              app_key: config.appKey,
              secret_key: config.secretKey,
              source: config.source,
              user_id: config.userId,
            });

            if (result) {
              if (config.logResponseOnConsole) {
                console.log(result);
              }
            }

            break;
          }

          case 2: {
            console.log("Getting user profile...");
            const result: UserProfileResponse =
              await tradexClient.getUserProfile({
                ClientID: config.userId,
              });
            if (result) {
              if (config.logResponseOnConsole) {
                console.log(result);
              }
            }
            break;
          }

          case 3: {
            console.log("Placing new order...");
            const result: NewOrderResponse = await tradexClient.newOrder({
              algol_id: 0,
              book: BookTypes.Rl,
              client: config.userId,
              code: "500325",
              disclosed_qty: 0,
              exchange: Exchanges.Bse,
              gtd: "",
              order_flag: OrderFlags.Zero,
              price: 2790,
              product: Products.Normal,
              quantity: 10,
              sender_order_no: 1514,
              side: OrderSides.Buy,
              trigger_price: 0,
              validity: Validities.Day,
            });

            if (result) {
              if (config.logResponseOnConsole) {
                console.log(result);
              }
            }
            break;
          }

          case 4: {
            console.log("Modifying order...");
            const result: ModifyOrderResponse = await tradexClient.modifyOrder({
              book: BookTypes.Rl,
              client: config.userId,
              code: "3499",
              disclosed_qty: 0,
              exchange: Exchanges.NseCm,
              exchange_order_no: "1300000000030095",
              gtd: "",
              order_flag: OrderFlags.Zero,
              price: 140,
              product: Products.Normal,
              qty_remaining: 75,
              qty_traded: 0,
              quantity: 80,
              sender_order_no: 1513,
              side: OrderSides.Buy,
              trigger_price: 0,
              validity: Validities.Day,
            });
            if (result) {
              if (config.logResponseOnConsole) {
                console.log(result);
              }
            }
            break;
          }

          case 5: {
            console.log("Cancelling order...");
            const result: CancelOrderResponse = await tradexClient.cancelOrder({
              client: config.userId,
              code: "3499",
              exchange: Exchanges.NseCm,
              exchange_order_no: "1300000000030095",
              sender_order_no: 1513,
              user_order_no: 3,
            });
            if (result) {
              if (config.logResponseOnConsole) {
                console.log(result);
              }
            }
            break;
          }

          case 6: {
            console.log("Cancelling all orders...");
            const result: CancelAllOrdersResponse =
              await tradexClient.cancelAllOrders({
                client: config.userId,
                code: "3499",
                exchange: Exchanges.NseCm,
              });
            if (result) {
              if (config.logResponseOnConsole) {
                console.log(result);
              }
            }
            break;
          }

          case 7: {
            console.log("Placing new GTT order...");
            const result: NewGttOrderResponse = await tradexClient.newGttOrder({
              client: config.userId,
              code: "11915",
              exchange: Exchanges.NseCm,
              main_order_price: OrderPriceTypes.Ltp,
              main_state: GttOrderStates.Scheduled,
              main_trigger_price: 0,
              price_condition: PriceConditions.Immediate,
              product: Products.Normal,
              qty: 10,
              sender_order_no: 0,
              side: OrderSides.Buy,
              stop_order_price: "",
              stop_state: GttOrderStates.None,
              stop_trigger_price: 0,
              target_order_price: "",
              target_state: GttOrderStates.None,
              target_trigger_price: 0,
              trail_gap: 0,
            });
            if (result) {
              if (config.logResponseOnConsole) {
                console.log(result);
              }
            }
            break;
          }

          case 8: {
            console.log("Modifying GTT order...");
            const result: ModifyGttOrderResponse =
              await tradexClient.modifyGttOrder({
                client: config.userId,
                code: "XYZ123",
                exchange: Exchanges.NseCm,
                gtt_order_no: 1001,
                main_order_price: "150.0",
                main_state: GttOrderStates.Scheduled,
                main_trigger_price: 150.5,
                price_condition: PriceConditions.PriceAbove,
                product: Products.Normal,
                qty: 100,
                sender_order_no: 1513,
                side: OrderSides.Buy,
                stop_order_price: "0.0",
                stop_state: GttOrderStates.None,
                stop_trigger_price: 0.0,
                target_order_price: "0.0",
                target_state: GttOrderStates.None,
                target_trigger_price: 0.0,
                trail_gap: 0.0,
              });
            if (result) {
              if (config.logResponseOnConsole) {
                console.log(result);
              }
            }
            break;
          }

          case 9: {
            console.log("Cancelling GTT order...");
            const result: CancelGttOrderResponse =
              await tradexClient.cancelGttOrder({
                ClientID: config.userId,
                GttOrderNo: 1001,
              });
            if (result) {
              if (config.logResponseOnConsole) {
                console.log(result);
              }
            }
            break;
          }

          case 10: {
            console.log("Executing basket orders...");
            const result: ExecuteBasketOrderResponse =
              await tradexClient.executeBasketOrders({
                client: config.userId,
                orders: [
                  {
                    algol_id: 7890,
                    book: BookTypes.Rl,
                    code: "ABC123",
                    client: config.userId,
                    disclosed_qty: 50,
                    exchange: Exchanges.NseCm,
                    gtd: "2025-03-31",
                    order_flag: OrderFlags.Zero,
                    price: 250.5,
                    product: Products.Normal,
                    quantity: 100,
                    sender_order_no: 123456,
                    side: OrderSides.Buy,
                    trigger_price: 240.0,
                    validity: Validities.Day,
                  },
                ],
              });

            if (result) {
              if (config.logResponseOnConsole) {
                console.log(result);
              }
            }

            break;
          }

          case 11: {
            console.log("Getting orders book...");
            const result: OrderBookResponse = await tradexClient.getOrderBook({
              ClientID: config.userId,
              Filter: OrderBookFilters.All,
            });
            if (result) {
              if (config.logResponseOnConsole) {
                console.log(result);
              }
            }
            break;
          }

          case 12: {
            console.log("Getting order status...");
            const result: OrderStatusResponse =
              await tradexClient.getOrderStatus({
                client: config.userId,
                code: "3499",
                exchange: Exchanges.NseCm,
                exchange_order_no: "1300000000016512",
                sender_order_no: 1513,
              });
            if (result) {
              if (config.logResponseOnConsole) {
                console.log(result);
              }
            }
            break;
          }

          case 13: {
            console.log("Getting order history...");
            const result: OrderHistoryResponse =
              await tradexClient.getOrderHistory({
                client: config.userId,
                code: "3499",
                exchange: Exchanges.NseCm,
                exchange_order_no: "1300000000016512",
                sender_order_no: 1513,
              });
            if (result) {
              if (config.logResponseOnConsole) {
                console.log(result);
              }
            }
            break;
          }

          case 14: {
            console.log("Getting GTT orders book...");
            const result: GttOrderBookResponse =
              await tradexClient.getGttOrderBook({
                ClientID: config.userId,
              });
            if (result) {
              if (config.logResponseOnConsole) {
                console.log(result);
              }
            }
            break;
          }

          case 15: {
            console.log("Getting trade book...");
            const result: TradeBookResponse = await tradexClient.getTradeBook({
              ClientID: config.userId,
            });
            if (result) {
              if (config.logResponseOnConsole) {
                console.log(result);
              }
            }
            break;
          }

          case 16: {
            console.log("Converting position...");
            const result: ConvertPositionResponse =
              await tradexClient.convertPosition({
                client: config.userId,
                code: "500325",
                exchange: Exchanges.Bse,
                new_product: Products.Cnc,
                old_product: Products.Normal,
                qty: 5,
                side: OrderSides.Buy,
              });
            if (result) {
              if (config.logResponseOnConsole) {
                console.log(result);
              }
            }
            break;
          }

          case 17: {
            console.log("Getting holdings...");
            const result: HoldingsResponse = await tradexClient.getHoldings({
              ClientID: config.userId,
            });
            if (result) {
              if (config.logResponseOnConsole) {
                console.log(result);
              }
            }
            break;
          }

          case 18: {
            console.log("Getting positions...");
            const result: PositionResponse = await tradexClient.getPositions({
              ClientID: config.userId,
              Filter: PositionFilters.All,
            });
            if (result) {
              if (config.logResponseOnConsole) {
                console.log(result);
              }
            }
            break;
          }

          case 19: {
            console.log("Getting funds reports...");
            const result: FundsReportResponse =
              await tradexClient.getFundsReport({
                ClientID: config.userId,
              });
            if (result) {
              if (config.logResponseOnConsole) {
                console.log(result);
              }
            }
            break;
          }

          case 20: {
            console.log("Getting exchange statuses...");
            const result: ExchangeStatusResponse =
              await tradexClient.getExchangeStatus({
                ClientID: config.userId,
              });
            if (result) {
              if (config.logResponseOnConsole) {
                console.log(result);
              }
            }
            break;
          }

          case 21: {
            console.log("Logging out...");

            const result: LogoutResponse = await tradexClient.logout({
              ClientID: config.userId,
            });

            if (result) {
              if (config.logResponseOnConsole) {
                console.log(result);
              }
            }

            break;
          }

          case 22: {
            console.log("Exiting...");
            rl.close();
            return;
          }

          default:
            console.log("Invalid choice. Please select a valid option.");
        }
      } catch (error) {
        console.error("Error: ", error);
      }

      showMenu();
    });
  }

  // showMenu();

  async function testPacketResponse() {
    console.log("Logging in...");

    const result: LoginResponse = await tradexClient.login({
      app_key: config.appKey,
      secret_key: config.secretKey,
      source: config.source,
      user_id: config.userId,
    });

    if (result) {
      if (config.logResponseOnConsole) {
        console.log(result);
      }
    }

    console.log("Placing new order...");

    const result1: NewOrderResponse = await tradexClient.newOrder({
      algol_id: 0,
      book: BookTypes.Rl,
      client: config.userId,
      code: "500325",
      disclosed_qty: 0,
      exchange: Exchanges.Bse,
      gtd: "",
      order_flag: OrderFlags.Zero,
      price: 1290,
      product: Products.Normal,
      quantity: 15,
      sender_order_no: 1514,
      side: OrderSides.Buy,
      trigger_price: 0,
      validity: Validities.Day,
    });

    if (result1) {
      if (config.logResponseOnConsole) {
        console.log(result1);
      }
    }
  }

  testPacketResponse();
}

if (require.main === module) {
  init();
}

export { default as TradeXClient } from "./services/index";
export { config, getAuthData } from "./utilities/globals";
