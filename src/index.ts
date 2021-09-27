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
    data_symbols_count: Int
    volume_1hrs_usd: Float
    volume_1day_usd: Float
    volume_1mth_usd: Float
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
    exchange(exchange_id: ID!): [Exchange]

    assets: [Assets]
    asset(asset_id: ID!): [Assets]
    assetIcons(iconSize: Int!): [AssetIcons]
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
      { iconSize }:{ iconSize: number }, 
      { dataSources }:{ dataSources: IDataSources }
    ) => {
      return dataSources.coinAPI.getAssetIcons(iconSize)
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