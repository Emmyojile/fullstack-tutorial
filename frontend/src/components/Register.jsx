import React, { useState } from 'react';
import axios from 'axios'; // Assuming you're using Axios for API calls
import { useNavigate  } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    userName: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/register', formData);
      console.log('Registration response:', response.data);
      navigate('/login');
    } catch (error) {
      console.error('Registration error:', error.response.data);
      setErrorMessage(error.response.data.message);
    }
  };
  return (
    <div className='form-container'>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
        <label htmlFor="userName">Username:</label>
        <input type="text" id="userName" name="userName" value={formData.userName} onChange={handleChange} required />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
        <p>Already Have an Account? 
        <a href="/login"> Login</a>
        </p>
        <button type="submit">Register</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default Register;
