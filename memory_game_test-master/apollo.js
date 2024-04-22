import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'URL_DEL_SERVIDOR_GRAPHQL', // Aquí colocas la URL de tu servidor GraphQL
  cache: new InMemoryCache()
});

export default client;
