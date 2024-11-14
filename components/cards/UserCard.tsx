'use client';
import Image from 'next/image';
import React from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
interface Props {
    id: string;
    username: string;
    name: string;
    imgUrl: string;
    userType: string;
}
const UserCard = ({ id, username, name, imgUrl, userType }: Props) => {
    const route = useRouter();
    const isCommunity = userType === 'Community';
    return (
        <article className="user-card">
            <div className="user-card_avatar">
                <Image
                    src={imgUrl}
                    alt=" logo"
                    width={48}
                    height={48}
                    className="rounded-full cursor-pointer"
                    onClick={() => {
                        if (isCommunity) {
                            route.push(`/communities/${id}`);
                        } else {
                            route.push(`/profile/${id}`);
                        }
                    }}
                />

                <div className="flex-1 text-ellipsis">
                    <h4 className="text-base-semibold text-light-1">{name}</h4>
                    <p className="text-small-medium text-gray-1">{username}</p>
                </div>
            </div>
            <Button
                onClick={() => {
                    if (isCommunity) {
                        route.push(`/communities/${id}`);
                    } else {
                        route.push(`/profile/${id}`);
                    }
                }}
                className="user-card_btn"
            >
                View
            </Button>
        </article>
    );
};

export default UserCard;
