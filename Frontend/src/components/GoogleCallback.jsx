import { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext.jsx';

const GoogleCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { checkAuth } = useAuth();
  const handled = useRef(false);

  useEffect(() => {
    // Basic trick to prevent double requests in React Strict Mode
    if (handled.current) return;
    handled.current = true;

    const queryParams = new URLSearchParams(location.search);
    const code = queryParams.get('code');

    if (!code) {
      alert("No authorization code found.");
      navigate('/login');
      return;
    }

    const exchangeCode = async () => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/users/google-login`,
          { code },
          { withCredentials: true }
        );

        if (response.data.status === 'success') {
          // Set user in global context via checkAuth so session triggers nicely via PrivateRoute
          await checkAuth();
          navigate('/chat');
        }
      } catch (err) {
        console.error('Callback error:', err.response?.data || err.message);
        alert('Authentication failed.');
        navigate('/login');
      }
    };

    exchangeCode();
  }, [location, navigate, checkAuth]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mb-4"></div>
      <p className="text-xl font-semibold text-gray-700">Authenticating with Google...</p>
    </div>
  );
};

export default GoogleCallback;
