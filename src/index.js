import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import App from './Components/App';
import { ApolloProvider } from '@apollo/react-hooks';
import client from './ApolloClient';
import store from './Reducers/Store';

ReactDOM.render((
  <ApolloProvider client={client}>
    <Provider store={store}>
      <App />
    </Provider>
  </ApolloProvider>
), document.getElementById('root'));