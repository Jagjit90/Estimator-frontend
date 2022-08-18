
import React from "react";
import "./App.css";
import LoginPage from "./login/login";
import HomePage from "./addModules";
import Download from "./downloadfile/finaltable";
import Generatepdf from "./mainPage/generationfile";
import Logout from "./logout";
import Navigation from "./navigation/navigation";
import { Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Generatepdf />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/addmodules" element={<HomePage />} />
        <Route path="/download" element={<Download />} />
      </Routes>
    </>
  );
}

export default App;