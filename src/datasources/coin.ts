import { RESTDataSource } from "apollo-datasource-rest"

import { ILatestData } from "../types";

const coinApiKey ='F970591D-A926-44D0-8E3A-39D22375F1AF'

export class CoinAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = 'https://rest.coinapi.io/'
  }

  async getExchanges() {
    return this.get('/v1/exchanges', undefined, {
      headers: {
        'X-CoinAPI-Key': coinApiKey
      }
    }) 
  }

  async getExchange(exchange_id: string) {
    const data = await this.get(`/v1/exchanges/${exchange_id}`, undefined, {
      headers: {
        'X-CoinAPI-Key': coinApiKey
      }
    }) 

    return data[0]
  }

  async getExchangeIcons() {
    return this.get('/v1/exchanges/icons/1', undefined, {
      headers: {
        'X-CoinAPI-Key': coinApiKey
      }
    }) 
  }

  async getSymbol(exchange_id: string) {
    const data = await this.get(`/v1/symbols/${exchange_id}`, undefined, {
      headers: {
        'X-CoinAPI-Key': coinApiKey
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
        'X-CoinAPI-Key': coinApiKey
      }
    }) 
  }
}