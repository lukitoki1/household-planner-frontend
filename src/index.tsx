import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react';
import { Router } from 'react-router';
import { QueryClientProvider } from 'react-query';
import { queryClient } from './api/queryClient';
import { browserHistory } from './store/browserHistory';
import { AuthContextProvider } from './store/auth/authProvider';

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <AuthContextProvider>
        <QueryClientProvider client={queryClient}>
          <Router history={browserHistory}>
            <App />
          </Router>
        </QueryClientProvider>
      </AuthContextProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
