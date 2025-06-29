import { useState } from 'react';
import { Send, MessageCircle, Users } from 'lucide-react';
import { Button } from './button';
import { Input } from './c_input';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import { Textarea } from './textarea';
import axios from 'axios';
import { useEffect } from 'react';
import io from 'socket.io-client';
import Messages from './Messages';
import { useNavigate } from 'react-router-dom';

const socket = io(`${import.meta.env.VITE_API_URL}`);

const ChatRoom = () => {
  const [selectedUser, setSelectedUser] = useState([]);
  const [message, setMessage] = useState('');
  const [chatGroup, setChatGroup] = useState([]);
  // const [userId, setUserId] = useState("");
  const [messages, setMessages] = useState([]);
  const [room, setRoom] = useState('general');
  const navigate = useNavigate();
  // const messageRef = useRef();

  useEffect(() => {
    socket.on('room message', (room, msg, userId) => {
      const newmessages = [...messages];
      newmessages.push({ chatGroup: room, message: msg, sender: userId });
      setMessages(newmessages);
    });
  });

  // function addMessage() {
  //   const value = messageRef.current.value;
  //   if (value.trim() === "") return;
  //   socket.emit("room message", room, value);
  //   messageRef.current.value = "";
  // }

  function enterRoom(uId) {
    setRoom(uId);
    socket.emit('change room', uId);
  }

  useEffect(() => {
    const tempf = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/me`, {
          withCredentials: true,
        });
        sessionStorage.setItem('userId', response.data.user.id);
        const currentUser = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/users/${response.data.user.id}`,
          { withCredentials: true }
        );
        const chatGroups = currentUser.data.data.user.chatGroups;
        chatGroups.map((cg) => {
          if (cg.length <= 2) cg.avatar = '👤';
          else {
            cg.avatar = '👥';
          }
        });
        setChatGroup(chatGroups);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    tempf();
  }, []);

  const handleSendMessage = () => {
    if (message.trim()) {
      socket.emit('room message', room, message, sessionStorage.getItem('userId'));
      setMessage('');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'online':
        return 'bg-green-500';
      case 'away':
        return 'bg-yellow-500';
      case 'offline':
        return 'bg-gray-400';
      default:
        return 'bg-gray-400';
    }
  };

  return (
    <div className="h-screen flex bg-gray-50">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col h-screen">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-2 mb-4">
            <MessageCircle className="h-6 w-6 text-blue-600" />
            <h1 className="text-xl font-bold text-gray-800">ChatApp</h1>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600"></div>
        </div>

        <div className="flex flex-col overflow-y-auto h-screen">
          <div className="flex-1 p-4">
            <h2 className="text-sm font-semibold text-gray-600 mb-3">CHATS</h2>
            <div className="space-y-2">
              {chatGroup.map((user) => (
                <div
                  key={user._id}
                  onClick={async () => {
                    setSelectedUser([user.name, user._id]);
                    const response = await axios.get(
                      `${import.meta.env.VITE_API_URL}/api/messages/${user._id}`,
                      { withCredentials: true }
                    );
                    setMessages(response.data.data.messages);
                    enterRoom(user._id);
                  }}
                  className={`flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors ${
                    selectedUser === user._id ? 'bg-blue-50 border border-blue-200' : ''
                  }`}
                >
                  <div className="relative">
                    <span className="text-2xl">{user.avatar}</span>
                    <div
                      className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(
                        user.status
                      )}`}
                    ></div>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{user.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="p-4">
              <button
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
                onClick={() => {
                  navigate('/createChatGroup');
                }}
              >
                Create Group Chat
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">👤</span>
            <div>
              <h2 className="font-semibold text-gray-800">{selectedUser[0]}</h2>
              <p className="text-sm text-green-500">Online</p>
            </div>
          </div>
        </div>

        <Messages messages={messages} userId={sessionStorage.getItem('userId')} />
        {/* Messages Area */}
        {/* <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg._id}
              className={`flex ${msg.isMe ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  msg.sender === userId
                    ? "bg-blue-600 text-white"
                    : "bg-white border border-gray-200 text-gray-800"
                }`}
              >
                <p className="text-sm">{msg.message}</p>
                <p
                  className={`text-xs mt-1 ${
                    msg.sender === `${userId}`
                      ? "text-blue-100"
                      : "text-gray-500"
                  }`}
                >
                  {msg.time}
                </p>
              </div>
            </div>
          ))}
        </div> */}

        {/* Message Input */}
        <div className="bg-white border-t border-gray-200 p-4">
          <div className="flex space-x-2">
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              // onKeyPress={handleKeyPress}
              placeholder={`Enter Message`}
              className="flex-1 min-h-[40px] max-h-32 resize-none"
              rows={1}
            />
            <Button
              onClick={handleSendMessage}
              className="bg-blue-600 hover:bg-blue-700 px-4"
              disabled={!message.trim()}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
