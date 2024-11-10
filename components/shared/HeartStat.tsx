'use client';

import React, { useEffect, useState } from 'react';

import { likePosts } from '@/lib/actions/thread.actions';

const HeartStat = ({ postId, likes, userId }: any) => {
    const [like, setLike] = useState(likes.length);
    const [isLiked, setIsLiked] = useState(false);
    useEffect(() => {
        setIsLiked(likes.includes(userId));
    }, [userId, likes]);
    const handleLikePost = async () => {
        await likePosts(postId, userId);

        setLike(isLiked ? like - 1 : like + 1);
        setIsLiked(!isLiked);
    };

    return (
        <div className="flex group transition-colors">
            <div className=" rounded-lg group-hover:bg-red-400">
                <img
                    src={`${isLiked ? '/assets/liked.svg' : '/assets/heart-gray.svg'}`}
                    alt="heart"
                    width={24}
                    height={24}
                    onClick={handleLikePost}
                    className="cursor-pointer object-contain"
                />
            </div>
            <p className="small-medium lg:base-medium cursor-pointer text-gray-1 ml-[2px] group-hover:text-red-400">
                {like}
            </p>
        </div>
    );
};

export default HeartStat;
