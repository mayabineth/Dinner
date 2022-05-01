import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import pages
import Home from "./pages/Home";
import Dinner from "./pages/Dinner";
import Error from "./pages/Error";
// import components
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/Dinner-Reservation" element={<Dinner />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;
