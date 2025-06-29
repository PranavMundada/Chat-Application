import { Link, useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import { MessageCircle, ArrowLeft } from 'lucide-react';
import { Button } from './button';
import { Input } from './c_input';
import { Label } from './label';
import axios from 'axios';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './card';
import { useCookies } from 'react-cookie';

const Login = () => {
  const emailref = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(['jwt']);

  const login = async (e) => {
    e.preventDefault();
    const email = emailref.current.value;
    const password = passwordRef.current.value;

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/users/login`,
        { email, password },
        { withCredentials: true } // this is required for cookies
      );

      // Optional: store user info if needed
      setCookie('jwt', response.data.token, { path: '/' });

      // ✅ Redirect after successful login
      navigate('/chat');
    } catch (err) {
      console.error('Login error:', err.response?.data);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back Button */}
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
