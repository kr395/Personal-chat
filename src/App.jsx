import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRouts from "./Components/PrivateRouts";
import { Room, LoginPage } from "./pages";
import { AuthProvider } from "./utils/AuthContext";
function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route element={<PrivateRouts />}>
            <Route path="/" element={<Room />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
