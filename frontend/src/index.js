import React from "react";
import ReactDOM from "react-dom";

import axios from "axios";

/* REDUX */
import { Provider } from "react-redux";

/* COMPONENTS */
import App from "./App";
import reportWebVitals from "./reportWebVitals";

/* STYLING */
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

/* REDUX STORE */
import store from "./redux/store/store";

axios.defaults.baseURL =
  process.env.REACT_APP_API_URL || "";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

reportWebVitals();