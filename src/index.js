import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { sendToVercelAnalytics } from "./vitals";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HouseRentAllowance from "./exemptions/HouseRentAllowance";
ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HouseRentAllowance />} />
          <Route exact path="HRA" element={<HouseRentAllowance />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals(sendToVercelAnalytics);
