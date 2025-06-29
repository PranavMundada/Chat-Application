import { Link } from 'react-router-dom';
import { MessageCircle, ArrowLeft } from 'lucide-react';
import { Button } from './button';
import { Input } from './c_input';
import { Label } from './label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './card';
import { useEffect } from 'react';
import axios from 'axios';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const nameRef = useRef(null);
  const emailref = useRef(null);
  const passwordRef = useRef(null);
  const pwdConfirmRef = useRef(null);
  const navigate = useNavigate();

  const signup = async (e) => {
    const name = nameRef.current.value;
    const email = emailref.current.value;
    const password = passwordRef.current.value;
    const passwordConfirm = pwdConfirmRef.current.value;
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/users/signup`, {
        name,
        email,
        password,
        passwordConfirm,
      });
      navigate('/login');
    } catch (err) {
      console.log(err);
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
            <CardTitle className="text-2xl font-bold text-gray-800">Create Account</CardTitle>
            <CardDescription className="text-gray-600">
              Join ChatApp and start connecting with others
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  ref={nameRef}
                  className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  ref={emailref}
                  placeholder="Enter your email"
                  className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  ref={passwordRef}
                  placeholder="Create a password"
                  className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  ref={pwdConfirmRef}
                  placeholder="Confirm your password"
                  className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>

            <Button
              className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={signup}
            >
              Create Account
            </Button>

            <div className="text-center text-sm text-gray-600">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-blue-600 hover:text-blue-700 font-semibold hover:underline"
              >
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Signup;
