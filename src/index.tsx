import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";

const client = new ApolloClient({
  // uri: "http://localhost:4000/graphql",
  uri: "https://felea-server-prod.herokuapp.com/graphql",
  cache: new InMemoryCache(),
  credentials: "include",
});

const theme = createMuiTheme({
  palette: {
    common: {
      black: "#000",
      white: "#fff",
    },
    background: {
      paper: "rgba(255, 255, 255, 1)",
      default: "#f5f5f5",
    },
    primary: {
      main: "rgba(24, 43, 85, 1)",
      contrastText: "#fff",
    },
    secondary: {
      main: "rgba(214, 212, 212, 1)",
      contrastText: "#rgba(24, 43, 85, 1)",
    },
    success: {
      light: "rgba(128, 226, 126, 1)",
      main: "rgba(76, 175, 80, 1)",
      dark: "rgba(8, 127, 35, 1)",
    },
    warning: {
      light: "rgba(255, 243, 80, 1)",
      main: "rgba(255, 193, 7, 1)",
      dark: "rgba(199, 145, 0, 1)",
    },
    error: {
      light: "#e57373",
      main: "#f44336",
      dark: "#d32f2f",
      contrastText: "#fff",
    },
    text: {
      primary: "rgba(0, 0, 0, 0.87)",
      secondary: "rgba(0, 0, 0, 0.54)",
      disabled: "rgba(0, 0, 0, 0.38)",
      hint: "rgba(0, 0, 0, 0.38)",
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
