// SocketService.js
import { io, Socket } from 'socket.io-client';
const ENDPOINT = process.env.URL_API || 'http://localhost:5000';

let socket: Socket;
export const connectSocket = () => {
    socket = io(ENDPOINT);
    // Lắng nghe sự kiện "connect"
    socket.on('connect', () => {
        console.log('Connected to server');
    });

    // Lắng nghe sự kiện "disconnect"
    socket.on('disconnect', () => {
        console.log('Disconnected from server');
    });
};

export const disconnectSocket = () => {
    if (socket) {
        socket.disconnect();
    }
};
export const getSocket = () => {
    return socket;
};
