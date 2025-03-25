import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ptBR } from '@mui/material/locale';

const theme = createTheme(
  {
    palette: {
      primary: { main: '#009f5c' },
      secondary: { main: '#00874e'},
      error: { main:'#ff0000'},
      warning: { main: '#fff000'}
    },
  },
  ptBR,
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <CssBaseline />
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
    
  </React.StrictMode>
);
