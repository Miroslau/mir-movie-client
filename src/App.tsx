import React from "react";
import { BrowserRouter } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import AppRouter from "./components/app-router/app-router";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <CssBaseline />
        <AppRouter />
      </BrowserRouter>
    </div>
  );
}

export default App;
