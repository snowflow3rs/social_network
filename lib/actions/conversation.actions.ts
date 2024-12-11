'use server';

import Conversation from '../models/conversation.model';
import { connectDB } from '../mongoose';

export const newConversation = async (senderId: string, receiverId: string) => {
    try {
        connectDB();
        const newConversation = new Conversation({
            members: [{ senderId, receiverId }],
        });
        await newConversation.save();
    } catch (error) {
        // Handle any errors
        console.error('Error newConversation:', error);
        throw error;
    }
};

export const getConvUser = async (userId: string) => {
    try {
        connectDB();
        return await Conversation.find({
            members: { $in: [userId] },
        });
    } catch (error) {
        // Handle any errors
        console.error('Error getConvUser:', error);
        throw error;
    }
};

export const getAllConvUser = async (firstId: string, secondId: string) => {
    try {
        connectDB();
        await Conversation.findOne({
            members: { $all: [firstId, secondId] },
        });
    } catch (error) {
        // Handle any errors
        console.error('Error getAllConvUser:', error);
        throw error;
    }
};
