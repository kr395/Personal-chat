import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRouts from "./Components/PrivateRouts";
import { Room, LoginPage, RegisterPage} from "./pages";
import { AuthProvider } from "./utils/AuthContext";
function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route element={<PrivateRouts />}>
            <Route path="/" element={<Room />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
