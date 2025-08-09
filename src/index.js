// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { ThemeToggleProvider, useThemeToggle } from './themes/ThemeContext';

// This component consumes the theme from context AFTER the provider is set
const ThemeConsumerWrapper = () => {
  const { theme } = useThemeToggle();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeToggleProvider>
        <ThemeConsumerWrapper />
      </ThemeToggleProvider>
    </Provider>
  </React.StrictMode>
);