import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./Home";
import Create from "./Create";
import SignUp from "./SignUp"; // Import SignUp
import Login from "./Login"; // Import Login
import Edit from "./Edit"; // Import Edit

const App = () => {
  // Define the onSignUp function
  const handleSignUp = async (username, password) => {
    try {
      const response = await fetch("http://localhost:8000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!response.ok) {
        throw new Error("Failed to sign up");
      }
      alert("Sign up successful!");
    } catch (error) {
      console.error("Error during sign-up:", error);
      alert("Sign up failed. Please try again.");
    }
  };

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/signup" element={<SignUp onSignUp={handleSignUp} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/edit/:id" element={<Edit />} />  {/* Add the Edit route */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
