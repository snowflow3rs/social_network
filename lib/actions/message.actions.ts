'use server';

import { revalidatePath } from 'next/cache';
import Message from '../models/message.modal';
import { connectDB } from '../mongoose';

export const newMessage = async (values: any, path: string) => {
    try {
        connectDB();

        const newMessage = new Message({
            conversationId: values.conversationId,
            sender: values.sender,
            text: values.text,
            img_mess: values.img_mess || '',
        });

        await newMessage.save();
        revalidatePath(path);
    } catch (error) {
        // Handle any errors
        console.error('Error newMessage:', error);
        throw error;
    }
};
export const getMessByUser = async (conversationId: string) => {
    try {
        connectDB();
        await Message.find({
            conversationId: conversationId,
        });
    } catch (error) {
        // Handle any errors
        console.error('Error getMessByUser:', error);
        throw error;
    }
};
