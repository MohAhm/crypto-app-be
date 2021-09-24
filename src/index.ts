import { ApolloServer, ApolloError, gql } from 'apollo-server';
import { CoinAPI } from './api/coinapi';
import 'dotenv/config';

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
    volume_1hrs_usd: Int
    volume_1day_usd: Int
    volume_1mth_usd: Int
  }

  type Query {
    exchanges: [Exchange]
    exchange(exchange_id: ID!): Exchange
  }
`;

const resolvers = {
  Query: {
    exchanges: async (_: any, __: any, { dataSources }: any) => {
      return dataSources.coinAPI.getExchanges()
    },
    exchange: async (_: any, { exchange_id }: { exchange_id: string }, { dataSources }: any) => {
      return dataSources.coinAPI.getExchange(exchange_id)
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