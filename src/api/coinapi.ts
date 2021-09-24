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
    return this.get(`/v1/exchanges/${exchange_id}`, undefined, {
      headers: {
        'X-CoinAPI-Key': process.env.COINAPI_KEY as string
      }
    }) 
  }

}