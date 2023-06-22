import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import App from './App.tsx'
import './index.css'
import { Providers } from "redux/provider";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Providers>
      <ChakraProvider>
        <BrowserRouter>
          <App />
          <ToastContainer />
        </BrowserRouter>
      </ChakraProvider>
    </Providers>
  </React.StrictMode>
);
