// ./apollo-client.js

import { ApolloClient , InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri : "https://stjames.stepzen.net/api/telling-yak/__graphql",
    headers: {
        Authorization: `Apikey ${process.env.NEXT_PUBLIC_STEPZEN_API_KEY}`
    },
    cache:new InMemoryCache(),
});

export default client;
