// 'use client';

// import { useSocket } from '@/app/hooks/useSocket';
// import React, { useEffect, useState } from 'react';

// interface Message {
//     senderName: string;
//     text: string;
//     timestamp: number;
// }

// export default function ChatComponent({ username = 'dsadsadas' }: { username: string }) {
//     const socket = useSocket();
//     const [messages, setMessages] = useState<Message[]>([]);
//     const [text, setText] = useState('');
//     const [isConnected, setIsConnected] = useState(false);

//     useEffect(() => {
//         if (!socket) return;

//         // Handle connection status
//         setIsConnected(socket.connected);

//         socket.on('connect', () => {
//             setIsConnected(true);
//             socket.emit('newUser', username);
//         });

//         socket.on('disconnect', () => {
//             setIsConnected(false);
//         });

//         // Handle messages
//         socket.on('newMessage', (message: Message) => {
//             setMessages((prev) => [...prev, message]);
//         });

//         return () => {
//             socket.off('connect');
//             socket.off('disconnect');
//             socket.off('newMessage');
//         };
//     }, [socket, username]);

//     const sendMessage = (e: React.FormEvent) => {
//         e.preventDefault();
//         if (!socket || !text.trim()) return;

//         const newMessage = {
//             senderName: username,
//             text: text.trim(),
//             timestamp: Date.now(),
//         };

//         socket.emit('sendMessage', newMessage);
//         setText('');
//     };

//     return (
//         <div className="p-4 max-w-2xl mx-auto">
//             <div className="mb-4">
//                 <span
//                     className={`inline-block px-2 py-1 rounded ${
//                         isConnected ? 'bg-green-500' : 'bg-red-500'
//                     } text-white text-sm`}
//                 >
//                     {isConnected ? 'Connected' : 'Disconnected'}
//                 </span>
//             </div>

//             <div className="bg-white rounded-lg shadow">
//                 <div className="h-96 overflow-y-auto p-4 space-y-4">
//                     {messages.map((message, index) => (
//                         <div
//                             key={index}
//                             className={`flex flex-col ${message.senderName === username ? 'items-end' : 'items-start'}`}
//                         >
//                             <div
//                                 className={`max-w-[70%] rounded-lg p-3 ${
//                                     message.senderName === username ? 'bg-blue-500 text-white' : 'bg-gray-100'
//                                 }`}
//                             >
//                                 <p className="font-bold text-sm">{message.senderName}</p>
//                                 <p>{message.text}</p>
//                             </div>
//                         </div>
//                     ))}
//                 </div>

//                 <form onSubmit={sendMessage} className="border-t p-4">
//                     <div className="flex gap-2">
//                         <input
//                             type="text"
//                             value={text}
//                             onChange={(e) => setText(e.target.value)}
//                             className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             placeholder="Type a message..."
//                             disabled={!isConnected}
//                         />
//                         <button
//                             type="submit"
//                             className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50"
//                             disabled={!isConnected || !text.trim()}
//                         >
//                             Send
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// }
