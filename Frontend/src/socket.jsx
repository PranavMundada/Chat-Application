import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL = `${import.meta.env.VITE_API_URL}`;

export const socket = io(URL, {
  autoConnect: false,
});
