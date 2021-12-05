import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react';
import { Router } from 'react-router';
import { browserHistory } from './browserHistory';
import { QueryClientProvider } from 'react-query';
import { queryClient } from './api/queryClient';

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <Router history={browserHistory}>
          <App />
        </Router>
      </QueryClientProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
