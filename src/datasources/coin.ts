import { RESTDataSource } from "apollo-datasource-rest";
import 'dotenv/config';
import { ILatestData } from "../types";

export class CoinAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = process.env.COINAPI_URL
  }

  async getExchanges() {
    return this.get('/v1/exchanges', undefined, {
      headers: {
        'X-CoinAPI-Key': process.env.COINAPI_KEY as string
      }
    }) 
  }

  async getExchange(exchange_id: string) {
    const data = await this.get(`/v1/exchanges/${exchange_id}`, undefined, {
      headers: {
        'X-CoinAPI-Key': process.env.COINAPI_KEY as string
      }
    }) 

    return data[0]
  }

  async getExchangeIcons() {
    return this.get('/v1/exchanges/icons/1', undefined, {
      headers: {
        'X-CoinAPI-Key': process.env.COINAPI_KEY as string
      }
    }) 
  }

  async getSymbol(exchange_id: string) {
    const data = await this.get(`/v1/symbols/${exchange_id}`, undefined, {
      headers: {
        'X-CoinAPI-Key': process.env.COINAPI_KEY as string
      }
    }) 

    return data[0]
  }

  async getLatest({ 
    symbol_id, 
    period_id, 
    limit,
  } : ILatestData) {
    return await this.get(
      `/v1/ohlcv/${symbol_id}/latest?period_id=${period_id}&limit=${limit}`, 
    undefined, {
      headers: {
        'X-CoinAPI-Key': process.env.COINAPI_KEY as string
      }
    }) 
  }
}