// App.tsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUpForm from "./components/SignUpForm";
import './App.css'
import LandingPage from "./pages/LandingPage";
import ThankYou from "./components/ThankYou";
import Login from "./components/Login";
import Users from "./components/Users";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-700 via-purple-600 to-pink-500"><SignUpForm /></div>} />
        <Route path="/landing" element={<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-700 via-purple-600 to-pink-500"><LandingPage/></div>} />
        <Route path="/thank-you" element={<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-700 via-purple-600 to-pink-500"><ThankYou/></div>} />
        <Route path="/login" element={<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-700 via-purple-600 to-pink-500"><Login/></div>} />
        <Route path="/users" element={<Users/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
