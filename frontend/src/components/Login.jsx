import React, { useState } from "react";
import axios from "axios"; // Assuming you're using Axios for API calls
import { useNavigate } from "react-router-dom";

const Login = () => {
  // You can optionally pass a props object for login success handling
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/login",
        formData
      );
      console.log("Login response:", response.data);
      const { token } = response.data;
      const username = response.data.user.userName; // Access using "userName"
      localStorage.setItem("authToken", token);
      localStorage.setItem("username", username);
      navigate("/notes");
    } catch (error) {
      console.error("Login error:", error.response.data);
      setErrorMessage(error.response.data.message);
    }
  };
  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <p>
          Don't Have an Account?
          <a href="/"> Register Here</a>
        </p>
        <button type="submit">Login</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default Login;
