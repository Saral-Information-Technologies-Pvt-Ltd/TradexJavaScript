export interface ConfigModel {
  apiBaseUrl: string;
  appKey: string;
  clientId: string | null;
  enableHttps: boolean;
  logResponseOnConsole: boolean;
  nonSslPort: number | null;
  secretKey: string;
  source: string;
  sslPort: number;
  userId: string;
  websocketBaseUrl: string | null;
}
