import React from "react";
import ReactDOM from "react-dom";
import { App } from "./components/App";
import reportWebVitals from "./reportWebVitals";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import "./normalize.css";
import "./index.css";

const theme = createMuiTheme({
  typography: {
    fontFamily: ["Roboto Slab", "serif"].join(","),
    h1: {
      fontWeight: "700",
      fontSize: "1.6rem",
      "@media (min-width:960px)": {
        fontSize: "2.6rem",
      },
      fontFamily: ["Alegreya Sans", "serif"].join(","),
    },
    h2: {
      fontWeight: "700",
      fontSize: "1.2rem",
      "@media (min-width:960px)": {
        fontSize: "2.2rem",
      },
    },
  },
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById("root")
);

reportWebVitals();
