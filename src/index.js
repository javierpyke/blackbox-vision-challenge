import { ChakraProvider } from "@chakra-ui/react";
import ReactDOM from 'react-dom';
import Game from './Components/Game';
import React from 'react';
import './index.css';




ReactDOM.render(
  <ChakraProvider>
    <Game />
  </ChakraProvider>,
  document.getElementById('root')
);

