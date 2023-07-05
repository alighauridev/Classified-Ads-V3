import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider, useSelector, useDispatch } from "react-redux";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Store from "./Redux copy/store/store";
import { Auth0Provider } from "@auth0/auth0-react";
import { GoogleOAuthProvider } from "@react-oauth/google";

import jwt_decode from "jwt-decode";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={Store}>
      <GoogleOAuthProvider clientId="430388340650-cm3fqfnbpgfpnbgagudqmbjqmp7slm1d.apps.googleusercontent.com">


        <App />
      </GoogleOAuthProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
