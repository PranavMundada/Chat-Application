import { useState, useRef } from 'react';
import './css/index.css';
import Messages from './components/Messages.jsx';
import Input from './components/input.jsx';
import io from 'socket.io-client';
import { useEffect } from 'react';

const socket = io(`${import.meta.env.VITE_API_URL}`, {
  autoConnect: false,
});

function App() {
  const [messages, setMessages] = useState([]);
  const [room, setRoom] = useState('general');
  const messageRef = useRef();
  const roomRef = useRef();

  useEffect(() => {
    socket.on('room message', (msg) => {
      const newmessages = [...messages];
      newmessages.push(msg);
      setMessages(newmessages);
    });
  });

  function addMessage() {
    const value = messageRef.current.value;
    if (value.trim() === '') return;
    socket.emit('room message', room, value);
    messageRef.current.value = '';
  }

  function enterRoom() {
    const value = roomRef.current.value;
    if (value.trim() === '') return;
    setRoom(value);
    socket.emit('change room', value);
    roomRef.current.value = '';
  }

  return (
    <>
      <Messages messages={messages} />
      <form className=" flex-col justify-between  m-10">
        <Input
          Ref={messageRef}
          id="message"
          placeholder="Enter Message..."
          submit={addMessage}
        ></Input>
        <Input Ref={roomRef} id="roomId" placeholder="Enter Room ID" submit={enterRoom}></Input>
      </form>
      <button
        className="border-2 m-5"
        onClick={() => {
          socket.connect();
          socket.join(room);
        }}
      >
        Connect
      </button>
      <button
        className="border-2 m-5"
        onClick={() => {
          socket.disconnect();
        }}
      >
        Disconnect
      </button>
    </>
  );
}

export default App;
