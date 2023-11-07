import ThreadCard from '@/components/cards/ThreadCard';
import { fetchPosts } from '@/lib/actions/thread.actions';
import { fetchUser } from '@/lib/actions/user.actions';

import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

import React from 'react';

const Home = async ({ searchParams }: { searchParams: { [key: string]: string | undefined } }) => {
    const user = await currentUser();
    if (!user) return null;
    const userInfor = await fetchUser(user.id);
    if (!userInfor?.onboarded) redirect('/onboarding');
    const resultPost = await fetchPosts(searchParams.page ? +searchParams.page : 1, 30);

    return (
        <>
            <h1
                className="head-text
       text-left"
            >
                New Feed
            </h1>
            <section className=" mt-9 flex flex-col gap-10">
                {resultPost.posts.length === 0 ? (
                    <p>no thread found</p>
                ) : (
                    <>
                        {resultPost.posts.map((post) => (
                            <ThreadCard
                                key={post._id}
                                id={post._id}
                                imgThread={post?.image}
                                currentUserId={user?.id}
                                parentId={post.parentId}
                                content={post.text}
                                author={post.author}
                                community={post.community}
                                createdAt={post.createdAt}
                                comments={post.children}
                                likes={post.likes}
                            />
                        ))}
                    </>
                )}
            </section>
        </>
    );
};

export default Home;
