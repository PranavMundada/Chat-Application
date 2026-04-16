import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './css/index.css';
import App from './App.jsx';
import Intro from './intro.jsx';
import Login from './components/login.jsx';
import Signup from './components/signup.jsx';
import ChatRoom from './components/chatroom.jsx';
import axios from 'axios';

axios.defaults.withCredentials = true;
import PrivateRoute from './components/privateRoute.jsx';
import CreateGroup from './components/createGroup.jsx';
import GoogleCallback from './components/GoogleCallback.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Intro />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/chat',
    element: (
      <PrivateRoute>
        <ChatRoom />
      </PrivateRoute>
    ),
  },
  {
    path: '/app',
    element: <App />,
  },
  {
    path: '/createChatGroup',
    element: <CreateGroup />,
  },
  {
    path: '/auth/callback',
    element: <GoogleCallback />,
  },
]);

import { AuthProvider } from './context/AuthContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
