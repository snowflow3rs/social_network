import Message from '@/lib/models/message.modal';
import User from '@/lib/models/user.model';
import { connectDB } from '@/lib/mongoose';
import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
export async function POST(req: Request) {
    try {
        await connectDB();

        // Parse the request body
        const body = await req.json();
        const { chatId } = body;

        const messages = await Message.find({
            conversationId: chatId,
        });

        return NextResponse.json(messages);
    } catch (error) {
        console.error('[USER_POST]', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
