import React, { useMemo } from "react";
import { BrowserRouter } from "react-router-dom";
import {
  createTheme,
  CssBaseline,
  ThemeOptions,
  ThemeProvider,
} from "@mui/material";
import AppRouter from "./components/app-router/app-router";
import { themeSettings } from "./theme";
function App() {
  const mode = "dark";

  const theme = useMemo(() => {
    // @ts-ignore
    return createTheme(themeSettings<ThemeOptions>(mode));
  }, [mode]);

  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AppRouter />
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
