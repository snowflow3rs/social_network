'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { FollowUser } from '@/lib/actions/user.actions';

import { usePathname } from 'next/navigation';

interface Props {
    accountId: any;
    authUserId: any;
    name: string;
    username: string;
    imgUrl: string;
    bio: string;
    type?: string;
    followers?: any;
    followings?: any;
}
const ProfileHead = ({
    accountId: userId,
    authUserId: currentUser,
    name,
    username,
    imgUrl,
    bio,
    type,
    followers,
    followings,
}: Props) => {
    const path = usePathname();

    const [isFollow, setIsFollow] = useState(followers.includes(currentUser));
    const [followerCount, setFollowerCount] = useState(followers.length);
    const [followingCount] = useState(followings.length);

    const handleFollowToggle = async () => {
        await FollowUser(currentUser, userId, path);

        setIsFollow((prev: any) => !prev);
        setFollowerCount((prev: any) => (isFollow ? prev - 1 : prev + 1));
    };

    return (
        <div className="flex w-full  flex-col justify-start">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="relative h-20 w-20 object-cover">
                        <Image src={imgUrl} alt="logo" fill className="rounded-full object-cover shadow-2xl" />
                    </div>
                    <div className="flex-1">
                        <h2 className="text-left text-heading3-bold text-light-1">{name}</h2>
                        <p className="text-base-medium text-gray-1">@{username}</p>

                        <div className=" flex items-center gap-3 mt-2 text-light-1 ">
                            <p>{followingCount} Following</p>
                            <p className=" text-white">{followerCount} Follower</p>
                        </div>

                        {userId !== currentUser && (
                            <>
                                <Button
                                    onClick={handleFollowToggle}
                                    className=" h-auto min-w-[200px] rounded-md bg-primary-500 text-[12px] text-light-1 mt-3"
                                >
                                    {isFollow ? 'UnFollow' : 'Follow'}
                                </Button>
                            </>
                        )}
                    </div>
                </div>
                {userId === currentUser && type !== 'Community' && (
                    <Link href="/profile/edit">
                        <div className="flex cursor-pointer gap-3 rounded-lg bg-dark-3 px-4 py-2">
                            <Image src="/assets/edit.svg" alt="logout" width={16} height={16} />

                            <p className="text-light-2 max-sm:hidden">Edit</p>
                        </div>
                    </Link>
                )}
            </div>

            <p className="mt-6 max-w-lg text-base-regular text-light-2">{bio}</p>
            <div className="mt-12 h-0.5 w-full bg-dark-3" />
        </div>
    );
};

export default ProfileHead;
