'use client';
import React, { useEffect, useRef, useState } from 'react';
import SearchInput from './SearchInput';
import Conversation from './Conversation';
import Messages from './Messages';
import MessageInput from './MessageInput';
import { NoChatSelected } from './Nochat';
import axios from 'axios';

interface props {
    data: any;
    currentUserId: string;
    imgP: string;
}
const ContainerMessage = ({ data, currentUserId, imgP }: props) => {
    const [currentChat, setCurrentChat] = useState<any>(null);
    const [messages, setMessages] = useState<any>([]);
    const scrollRef = useRef<any>();

    const addMessage = (newMessage: any) => {
        setMessages([...messages, newMessage]);
    };
    useEffect(() => {
        const getMess = async () => {
            if (!currentChat) return;
            try {
                const res = await axios.post('/api/message', { chatId: currentChat.id });
                setMessages(res.data);
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };
        getMess();
    }, [currentChat]);
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);
    return (
        <>
            <div className="flex h-full ">
                <div className="flex-1 bg-red overflow-auto ">
                    <SearchInput />
                    <div className="divider px-3"></div>
                    {data.map((item: any, i: string) => (
                        <div
                            key={i}
                            onClick={() => {
                                setCurrentChat(item);
                            }}
                        >
                            <Conversation data={item.members} currentUserId={currentUserId} />
                        </div>
                    ))}
                </div>
                <div className=" flex-[3] bg-black ">
                    <div className="md:min-w-[450px] flex flex-col h-full">
                        {currentChat ? (
                            <>
                                <div className="bg-primary-500 px-4 py-2 mb-2">
                                    <span className=" text-white label-text">To:</span>
                                    <span className="text-white ml-2 font-bold">John doe</span>
                                </div>

                                <Messages
                                    data={messages}
                                    currentUserId={currentUserId}
                                    imgP1={imgP}
                                    scrollRef={scrollRef}
                                />

                                <MessageInput curChat={currentChat.id} userId={currentUserId} funAdd={addMessage} />
                            </>
                        ) : (
                            <>
                                <div className="px-4 flex-1  overflow-y-auto">
                                    <NoChatSelected />
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ContainerMessage;
