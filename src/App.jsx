import { useState } from "react";
import "./App.css";
import Dashboard from "./components/Dashboard";
import AppContext from "./context/AppContext";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [stockSymbol, setStockSymbol] = useState("FB");

  return (
    <AppContext.Provider
      value={{ darkMode, setDarkMode, stockSymbol, setStockSymbol }}
    >
      <Dashboard />
    </AppContext.Provider>
  );
}

export default App;
