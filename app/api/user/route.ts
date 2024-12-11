import User from '@/lib/models/user.model';
import { connectDB } from '@/lib/mongoose';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        await connectDB();

        // Parse the request body
        const body = await req.json();
        const { userId } = body;

        const user = await User.findOne({ id: userId });

        return NextResponse.json(user);
    } catch (error) {
        console.error('[USER_POST]', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
