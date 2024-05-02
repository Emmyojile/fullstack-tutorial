import React from 'react';
import { Navigate } from 'react-router-dom';
import Notes from './Notes'; // Assuming Notes component path

const PrivateRoute = () => {
  const token = localStorage.getItem('authToken');

  if (!token) {
    return <Navigate to="/login" replace />; // Redirect to login if no token
  }

  return <Notes />; // Render Notes component if token exists
};

export default PrivateRoute;
