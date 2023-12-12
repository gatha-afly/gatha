import { io } from "socket.io-client";

const socketUrl = import.meta.env.VITE_REACT_APP_SOCKET_URL;

const socket = io.connect(socketUrl, {
  withCredentials: true,
});

export default socket;
