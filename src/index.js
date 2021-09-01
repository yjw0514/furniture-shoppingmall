import { ThemeProvider, createTheme } from "@material-ui/core";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

const theme = createTheme({
  typography: {
    fontFamily: ["Noto Sans KR", "Gowun Dodum"].join(","),
  },
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </ThemeProvider>,

  document.getElementById("root")
);
