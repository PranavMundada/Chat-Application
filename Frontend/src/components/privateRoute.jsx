// components/PrivateRoute.jsx
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const PrivateRoute = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(null);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/auth/verify`, {
        withCredentials: true,
      })
      .then((res) => {
        setAuthenticated(true);
      })
      .catch(() => {
        setAuthenticated(false);
      });
  }, []);

  if (authenticated === null) return <div>Loading...</div>;
  return authenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
