import React from 'react';
import ReactDOM from 'react-dom';
import RootView from './view/RootView';
import * as serviceWorker from './serviceWorker';

import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient, InMemoryCache } from 'apollo-boost';
import { createUploadLink } from "apollo-upload-client";
import { setContext } from 'apollo-link-context';

const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('nodeToken');
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: token || "",
        }
    }
});

const httpLink = createUploadLink({ uri: "http://localhost:5000/graphql" });

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    
})

ReactDOM.render(<ApolloProvider client={client}><RootView /></ApolloProvider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
