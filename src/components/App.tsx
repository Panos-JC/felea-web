import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import store from "../redux/store";
import { Routes } from "../router/Routes";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51Hhu6gGUOvv7bpMI5MYHR3hYRr0i1RxLT4GxssYJaWY8PAguUCejXB1mlQGO9Z3nGHgCxzDPU1A6IrUWsD0uhwui00jyhvCZrY"
);

function App() {
  return (
    <Provider store={store}>
      <Elements stripe={stripePromise}>
        <Router>
          <Routes />
        </Router>
      </Elements>
    </Provider>
  );
}

export default App;
