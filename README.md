# TradeX SDK

## Installation

You can use this library in 2 ways i.e. `Production` build or `Development` build. Run the below commands in your project's root directory. You can use `Command Prompt` or any code editor that supports terminal.

- To use the production build, run the below command:

```
npm i tradex-sdk
```

- To use the development build directly, clone/download the repository and then run the below command. This will install all the required dependencies.

```
npm install
```

## Initialization

- Firstly, create a file called `index.ts` or `index.js` in your project's root directory (Only if you opt for `Production` build otherwise `Development` build already includes everything).
- Secondly, create an instance of `TradeXClient`:

```ts
import { TradeXClient } from "tradex-sdk";

const tradexClient = new TradeXClient(
  {
    apiBaseUrl: "<your-base-url>",
    appKey: "<your-app-key>",
    secretKey: "<your-secret-key>",
    clientId: "<your-client-id>",
    enableHttps: true,
    logResponseOnConsole: true,
    nonSslPort: "<your-non-ssl-port>",
    sslPort: "<your-ssl-port>",
    source: "<your-source>",
    userId: "<your-user-id>",
    websocketBaseUrl: "<your-base-url>",
  },
  onOrderEventReceived,
  onTradeEventReceived
);
```

---

## Important Notes

- `config` is a globally accessible object storing your initialization details. You can reuse it wherever needed.
- `TradeXClient` manages API interactions and WebSocket connections internally.
- Always ensure you have valid `appKey`, `secretKey`, `source`, and `userId` for authentication.
- WebSocket callbacks (`onOrderEventReceived`, `onTradeEventReceived`) automatically handle incoming events.

### Object Key Explanations

| Key                    | Type      | Required | Description                                                                          |
| :--------------------- | :-------- | :------: | :----------------------------------------------------------------------------------- |
| `apiBaseUrl`           | `string`  |    ✅    | The base URL for connecting to the API. Example: `tradex.saral-info.com`             |
| `appKey`               | `string`  |    ✅    | Your unique App Key received via email.                                              |
| `secretKey`            | `string`  |    ✅    | Your unique Secret Key received via email.                                           |
| `clientId`             | `string`  |    ❌    | Your Client ID (if available).                                                       |
| `enableHttps`          | `boolean` |    ❌    | Defaults to `true`. Set to `false` if you want to use HTTP instead of HTTPS.         |
| `logResponseOnConsole` | `boolean` |    ❌    | Defaults to `true`. If `true`, all API responses will be logged in the console.      |
| `nonSslPort`           | `number`  |    ❌    | Port to connect over HTTP (only if `enableHttps` is `false`).                        |
| `sslPort`              | `number`  |    ✅    | Port to connect over HTTPS (only if `enableHttps` is `true`).                        |
| `source`               | `string`  |    ✅    | Your source name, provided by the platform.                                          |
| `userId`               | `string`  |    ✅    | Your unique User ID.                                                                 |
| `websocketBaseUrl`     | `string`  |    ❌    | WebSocket base URL. If empty, it defaults to the domain extracted from `apiBaseUrl`. |

### Example Callback Functions

```ts
function onOrderEventReceived(packet) {
  console.log("Order Event:\n", JSON.stringify(packet, null, 2));
}

function onTradeEventReceived(packet) {
  console.log("Trade Event:\n", JSON.stringify(packet, null, 2));
}
```

## Usage

### Performing Login

```ts
async function performLogin() {
  console.log("Logging in...");

  try {
    const response = await tradexClient.login({
      app_key: config.appKey,
      secret_key: config.secretKey,
      source: config.source,
      user_id: config.userId,
    });

    if (response && config.logResponseOnConsole) {
      console.log(response);
    }
  } catch (error) {
    console.error(error);
  }
}
```

### Placing New Order

```ts
async function placeNewOrder() {
  console.log("Placing new order...");

  const result = await tradexClient.newOrder({
    algol_id: 0,
    book: "RL",
    client: config.userId,
    code: "500325",
    disclosed_qty: 0,
    exchange: "Bse",
    gtd: "",
    order_flag: 0,
    price: 1290,
    product: "Normal",
    quantity: 15,
    sender_order_no: 1514,
    side: "Buy",
    trigger_price: 0,
    validity: "Day",
  });

  if (result && config.logResponseOnConsole) {
    console.log(result);
  }
}
```

### Logout

After your work is done, call `logout` to disconnect the WebSocket and clean up resources.

---

## **Optional**: Folder Structure Suggestion

You can optionally organize your project like this for better structure:

```
/your-project-root
|-- /src
|   |-- /services
|   |   |-- tradexClient.ts
|   |-- /utils
|   |   |-- helpers.ts
|   |-- index.ts
|-- package.json
|-- README.md
```
