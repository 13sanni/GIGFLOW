import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Gigs from "./pages/Gigs";
import GigDetail from "./pages/GigDetails.jsx";
function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 text-gray-800">
        <Routes>
          <Route path="/" element={<Navigate to="/gigs" />} />
          <Route path="/gigs/:id" element={<GigDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/gigs" element={<Gigs />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
