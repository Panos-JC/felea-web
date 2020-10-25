import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
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
      light: "rgba(146, 255, 198, 1)",
      main: "rgba(92, 219, 149, 1)",
      dark: "rgba(26, 168, 103, 1)",
      contrastText: "#fff",
    },
    secondary: {
      light: "rgba(66, 98, 154, 1)",
      main: "rgba(5, 56, 107, 1)",
      dark: "rgba(0, 19, 64, 1)",
      contrastText: "#fff",
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

  // palette: {
  //   common: {
  //     black: "#000",
  //     white: "#fff",
  //   },
  //   background: {
  //     paper: "#fff",
  //     default: "#fafafa",
  //   },
  //   primary: {
  //     light: "rgba(223, 215, 121, 1)",
  //     main: "rgba(174, 166, 40, 1)",
  //     dark: "rgba(121, 114, 12, 1)",
  //     contrastText: "#fff",
  //   },
  //   secondary: {
  //     light: "rgba(208, 212, 208, 1)",
  //     main: "rgba(136, 138, 136, 1)",
  //     dark: "rgba(103, 105, 103, 1)",
  //     contrastText: "#fff",
  //   },
  //   error: {
  //     light: "#e57373",
  //     main: "#f44336",
  //     dark: "#d32f2f",
  //     contrastText: "#fff",
  //   },
  //   text: {
  //     primary: "rgba(0, 0, 0, 0.87)",
  //     secondary: "rgba(0, 0, 0, 0.54)",
  //     disabled: "rgba(0, 0, 0, 0.38)",
  //     hint: "rgba(0, 0, 0, 0.38)",
  //   },
  // },
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
