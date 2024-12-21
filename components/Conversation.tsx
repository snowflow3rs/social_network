'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { getSocket } from '@/lib/Socket/SocketService';

interface ConversationProps {
    data: any;
    currentUserId: string;
}
const Conversation = ({ data, currentUserId }: ConversationProps) => {
    const [user, setUser] = useState<any>();
    const [userOnline, setuserOnline] = useState<any>();
    const getFriendChat = data?.find((m: any) => m !== currentUserId);

    const isOnline = userOnline?.some((item: any) => item.userId?.includes(user?.id));

    useEffect(() => {
        const getUser = async () => {
            try {
                if (getFriendChat) {
                    const res = await axios.post('/api/user', { userId: getFriendChat });
                    setUser(res.data);
                }
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        getUser();
    }, [getFriendChat]);
    useEffect(() => {
        const socket = getSocket();
        socket?.on('getUsers', (data) => {
            setuserOnline(data);
        });
    }, [currentUserId]);

    return (
        <>
            <div className=" w-full flex gap-2 items-center hover:bg-primary-500 rounded p-2 py-1 cursor-pointer">
                <div className={`avatar ${isOnline ? 'online' : ''} `}>
                    <div className="w-12 rounded-full">
                        <img src={user?.image} alt="user avatar" />
                    </div>
                </div>

                <div className="flex flex-col flex-1">
                    <div className="flex gap-3 justify-between">
                        <p className="font-bold text-gray-200">{user?.name}</p>
                        <span className="text-xl">🎃</span>
                    </div>
                </div>
            </div>

            <div className="divider my-0 py-0 h-1" />
        </>
    );
};

export default Conversation;
