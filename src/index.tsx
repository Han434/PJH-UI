import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store"; // Import the store here
import { ThemeProvider, CssBaseline } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import { lightTheme, darkTheme } from "./theme";

const Root = () => {
  return (
    <Provider store={store}>
      <AppWithTheme />
    </Provider>
  );
};

const AppWithTheme = () => {
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(<Root />);