import ApolloClient from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';

export const API_ROOT = "http://localhost:4000/graphql";

const client = new ApolloClient({
  uri: API_ROOT,
  cache: new InMemoryCache(),
  request: (operation) => {
    const token = window.localStorage.getItem('jwt')
    operation.setContext({
      headers: {
        authorization: token ? `Token ${token}` : ''
      }
    })
  }
});


export default client;