import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux'; 
import { ThemeProvider } from '@emotion/react';
import App from './App';
import { theme } from './styles/theme';
import { makeServer } from "./services/mirageServer";
import { store } from './store';

if (process.env.NODE_ENV === "development") {
  makeServer({ environment: "development" });
}

const container = document.getElementById('root');


const root = createRoot(container);
root.render(
  <Provider store={store}> 
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>
);