import React from "react";
import App from "./App.js";
import "swiper/css/bundle";
import "animate.css";
import reactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

reactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
