import React from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from '@emotion/react';
import App from './App';
import { theme } from './styles/theme';
import { makeServer } from "./services/mirageServer";

if (process.env.NODE_ENV === "development") {
  makeServer({ environment: "development" });
}

const container = document.getElementById('root');


const root = createRoot(container);
root.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
);