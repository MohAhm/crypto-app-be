import { ApolloServer, gql } from 'apollo-server';
import 'dotenv/config';
import { CoinAPI } from './datasources/coin';
import { IDataSources } from './types';

const typeDefs = gql`
  type Exchange { 
    exchange_id: ID
    website: String
    name: String
    data_start: String
    data_end: String
    data_quote_start: String
    data_quote_end: String
    data_orderbook_start: String
    data_orderbook_end: String
    data_trade_start: String
    data_trade_end: String
    data_symbols_count: Int
    volume_1hrs_usd: Float
    volume_1day_usd: Float
    volume_1mth_usd: Float
  }

  type ExchangeIcons {
    exchange_id: ID
    url: String
  }

  type Symbol {
    symbol_id: ID
    exchange_id: String
    symbol_type: String
    asset_id_base: String
    asset_id_quote: String
    asset_id_unit: String
    future_contract_unit: Float
    future_contract_unit_asset: String
    data_start: String
    data_end: String
    data_quote_start: String
    data_quote_end: String
    data_orderbook_start: String
    data_orderbook_end: String
    data_trade_start: String
    data_trade_end: String
    volume_1hrs: Float
    volume_1hrs_usd: Float
    volume_1day: Float
    volume_1day_usd: Float
    volume_1mth: Float
    volume_1mth_usd: Float
    price: Float
    symbol_id_exchange: String
    asset_id_base_exchange: String
    asset_id_quote_exchange: String
    price_precision: Float
    size_precision: Float
  }

  type HistoricalData {
    time_period_start: String
    time_period_end: String
    time_open: String
    time_close: String
    price_open: Float
    price_high: Float
    price_low: Float
    price_close: Float
    volume_traded: Float
    trades_count: Int
  }

  type Assets {
    asset_id: ID
    name: String
    type_is_crypto: Boolean
    data_start: String
    data_end: String
    data_quote_start: String
    data_quote_end: String
    data_orderbook_start: String
    data_orderbook_end: String
    data_trade_start: String
    data_trade_end: String
    data_symbols_count: Int
    volume_1hrs_usd: Float
    volume_1day_usd: Float
    volume_1mth_usd: Float
    price_usd: Float
  }

  type AssetIcons {
    asset_id: ID
    url: String
  }

  type Query {
    exchanges: [Exchange]
    exchangeIcons: [ExchangeIcons]
    exchange(exchange_id: ID!): Exchange

    symbol(exchange_id: ID!): Symbol
    historicalData(
      symbol_id: ID!, 
      # period_id: tmp
      # time_start: tmp
    ): [HistoricalData]

    assets: [Assets]
    assetIcons: [AssetIcons]
    asset(asset_id: ID!): Assets
  }
`;

const resolvers = {
  Query: {
    exchanges: async (
      _: any, 
      __: any, 
      { dataSources }:{ dataSources: IDataSources }
    ) => {
      return dataSources.coinAPI.getExchanges()
    },
    exchange: async (
      _: any, 
      { exchange_id }:{ exchange_id: string }, 
      { dataSources }:{ dataSources: IDataSources }
    ) => {
      return dataSources.coinAPI.getExchange(exchange_id)
    },
    exchangeIcons: async (
      _: any, 
      __: any, 
      { dataSources }:{ dataSources: IDataSources }
    ) => {
      return dataSources.coinAPI.getExchangeIcons()
    },

    symbol: async (
      _: any, 
      { exchange_id }:{ exchange_id: string }, 
      { dataSources }:{ dataSources: IDataSources }
    ) => {
      return dataSources.coinAPI.getSymbol(exchange_id)
    },

    historicalData: async (
      _: any, 
      { symbol_id }:{ symbol_id: string }, 
      { dataSources }:{ dataSources: IDataSources }
    ) => {
      return dataSources.coinAPI.getHistory(symbol_id)
    },
    
    assets: async (
      _: any, 
      __: any, 
      { dataSources }:{ dataSources: IDataSources }
    ) => {
      return dataSources.coinAPI.getAssets()
    },
    asset: async (
      _: any, 
      { asset_id }:{ asset_id: string }, 
      { dataSources }:{ dataSources: IDataSources }
    ) => {
      return dataSources.coinAPI.getAsset(asset_id)
    },
    assetIcons: async (
      _: any, 
      __: any, 
      { dataSources }:{ dataSources: IDataSources }
    ) => {
      return dataSources.coinAPI.getAssetIcons()
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  dataSources: () => ({
    coinAPI: new CoinAPI(),
  }),
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});