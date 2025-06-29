import { Link } from 'react-router-dom';
import { MessageCircle, Users, Zap, Shield } from 'lucide-react';
import { Button } from './components/button';

function Intro() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="flex justify-between items-center p-6">
        <div className="flex items-center space-x-2">
          <MessageCircle className="h-8 w-8 text-blue-600" />
          <span className="text-xl font-bold text-gray-800">ChatApp</span>
        </div>
        <div className="space-x-4">
          <Link to="/login">
            <Button variant="ghost" className="text-gray-600 hover:text-gray-800">
              Login
            </Button>
          </Link>
          <Link to="/signup">
            <Button className="text-gray-600 hover:text-gray-800">Sign Up</Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center min-h-[80vh] px-4">
        <div className="text-center max-w-4xl mx-auto">
          {/* Hero Title */}
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6 leading-tight">
            Chat Application
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Connect, communicate, and collaborate with friends and colleagues in real-time
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link to="/signup">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                Get Started Free
              </Button>
            </Link>
            <Link to="/login">
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                Sign In
              </Button>
            </Link>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center p-6 rounded-2xl bg-white/50 backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-xl mb-4">
                <Zap className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Real-time Messaging</h3>
              <p className="text-gray-600">Instant messaging with lightning-fast delivery</p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-white/50 backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-xl mb-4">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Group Chats</h3>
              <p className="text-gray-600">Create and manage group conversations easily</p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-white/50 backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-xl mb-4">
                <Shield className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Secure & Private</h3>
              <p className="text-gray-600">End-to-end encryption for all your conversations</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-8 text-gray-500">
        <p>&copy; 2024 ChatApp. Made with ❤️ for better communication.</p>
      </footer>
    </div>
  );
}

export default Intro;
