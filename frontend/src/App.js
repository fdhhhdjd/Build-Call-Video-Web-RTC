import { Route, Routes } from "react-router-dom";
import { LoginPage, Dashboard } from "./Imports/Index";
import "./App.css";
import { useEffect } from "react";
import { connectWithWebSocket } from "./Utils/Connect-Soket/wssConnection";
function App() {
  useEffect(() => {
    connectWithWebSocket();
  }, []);
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
