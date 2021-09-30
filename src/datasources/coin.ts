import { RESTDataSource } from "apollo-datasource-rest";
import 'dotenv/config';

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

  async getHistory(symbol_id: string, period_id?: string, time_start?: string) {
    return await this.get(`/v1/ohlcv/${symbol_id}/history?period_id=1DAY&time_start=2016-01-01T00:00:00`, undefined, {
      headers: {
        'X-CoinAPI-Key': process.env.COINAPI_KEY as string
      }
    }) 
  }

  async getAssets() {
    return this.get('/v1/assets', undefined, {
      headers: {
        'X-CoinAPI-Key': process.env.COINAPI_KEY as string,
      }
    }) 
  }

  async getAsset(asset_id: string) {
    const data = await this.get(`/v1/assets/${asset_id}`, asset_id, {
      headers: {
        'X-CoinAPI-Key': process.env.COINAPI_KEY as string
      }
    }) 

    return data[0]
  }

  async getAssetIcons() {
    return this.get('/v1/assets/icons/1', undefined, {
      headers: {
        'X-CoinAPI-Key': process.env.COINAPI_KEY as string
      }
    }) 
  }
}