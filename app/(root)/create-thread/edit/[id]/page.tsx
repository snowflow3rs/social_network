import { fetchUser } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs';
import React from 'react';
import { redirect } from 'next/navigation';
import PostThreads from '@/components/forms/PostThreads';
import { fetchThreadById } from '@/lib/actions/thread.actions';
const page = async ({ params }: { params: { id: string } }) => {
    const user = await currentUser();
    if (!user) return null;

    // fetch organization list created by user
    const userInfo = await fetchUser(user.id);
    const test = await fetchThreadById(params.id);

    if (!userInfo?.onboarded) redirect('/onboarding');

    const threadData = {
        text: test.text,
        image_thread: test.image,
    };
    return (
        <>
            <h1 className="head-text">Edit Thread</h1>
            <PostThreads data={threadData} userId={JSON.stringify(userInfo._id)} threadId={String(params.id)} />;
        </>
    );
};

export default page;
