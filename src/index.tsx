import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {ChakraProvider} from "@chakra-ui/react";
import {Router} from "react-router";
import {browserHistory} from "./browserHistory";

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <Router history={browserHistory}>
        <App/>
      </Router>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
