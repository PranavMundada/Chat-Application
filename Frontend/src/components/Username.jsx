import { useEffect, useState } from 'react';
import axios from 'axios';

const Username = ({ msg, userId }) => {
  const [senderName, setSenderName] = useState('');
  useEffect(() => {
    const func = async () => {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/users/${msg.sender}`);
      setSenderName(response.data.data.user.name);
    };
    func();
    // <p>{otherUser.data}</p>
  });
  if (msg.sender !== userId) {
    return (
      <>
        <p>{senderName}</p>
      </>
    );
  } else {
    return <></>;
  }
};

export default Username;
