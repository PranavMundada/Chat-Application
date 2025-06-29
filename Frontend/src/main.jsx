import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './css/index.css';
import App from './App.jsx';
import Intro from './intro.jsx';
import Login from './components/login.jsx';
import Signup from './components/signup.jsx';
import ChatRoom from './components/chatroom.jsx';
import { CookiesProvider } from 'react-cookie';
import PrivateRoute from './components/privateRoute.jsx';
import CreateGroup from './components/createGroup.jsx';

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
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CookiesProvider>
      <RouterProvider router={router} />
    </CookiesProvider>
  </StrictMode>
);
