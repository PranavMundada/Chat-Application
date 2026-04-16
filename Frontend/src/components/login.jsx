import { Link, useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import { MessageCircle, ArrowLeft } from 'lucide-react';
import { Button } from './button';
import { Input } from './c_input';
import { Label } from './label';
import axios from 'axios';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './card';
import { useAuth } from '../context/AuthContext.jsx';
// Google OAuth is done manually

const Login = () => {
  const emailref = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();
  const { checkAuth } = useAuth();

  // --- Standard Login ---
  const login = async (e) => {
    e.preventDefault();
    const email = emailref.current.value;
    const password = passwordRef.current.value;

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/users/login`,
        { email, password },
        { withCredentials: true }
      );

      await checkAuth();
      navigate('/chat');
    } catch (err) {
      console.error('Login error:', err.response?.data);
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  // --- 2. Manual Google Login Redirect ---
  const handleGoogleLogin = () => {
    const clientId = '747036868289-oufb5i5ne6g3u9v21n5bk1jqtgsd4tah.apps.googleusercontent.com';
    const redirectUri = 'http://localhost:5173/auth/callback';
    const scope = encodeURIComponent('email profile');
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}`;
    window.location.href = authUrl;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link
          to="/"
          className="inline-flex items-center text-gray-600 hover:text-gray-800 mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>

        <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-8">
            <div className="flex items-center justify-center mb-4">
              <MessageCircle className="h-10 w-10 text-blue-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-800">Welcome Back</CardTitle>
            <CardDescription className="text-gray-600">
              Sign in to your ChatApp account
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* 3. Google Login Button Section */}
            <div className="flex flex-col items-center justify-center space-y-4">
              <Button 
                variant="outline" 
                className="w-full text-black border-2 border-gray-200 h-12 flex items-center justify-center gap-2"
                onClick={handleGoogleLogin}
              >
                <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5"/>
                Sign in with Google
              </Button>

              <div className="relative w-full flex items-center py-2">
                <div className="flex-grow border-t border-gray-200"></div>
                <span className="flex-shrink mx-4 text-gray-400 text-xs uppercase tracking-wider">
                  Or continue with
                </span>
                <div className="flex-grow border-t border-gray-200"></div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  ref={emailref}
                  className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  ref={passwordRef}
                  className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <Link to="#" className="text-blue-600 hover:text-blue-700 hover:underline">
                Forgot password?
              </Link>
            </div>

            <Button
              className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={login}
            >
              Sign In
            </Button>

            <div className="text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <Link
                to="/signup"
                className="text-blue-600 hover:text-blue-700 font-semibold hover:underline"
              >
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
