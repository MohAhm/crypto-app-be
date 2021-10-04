import { CoinAPI } from "./datasources/coin";

export interface IDataSources {
  coinAPI: CoinAPI
}

export interface ILatestData {
  symbol_id: string
  period_id: string
  limit: number
}