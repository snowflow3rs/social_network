import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import { formatDateString, multiFormatDateString } from '@/lib/utils';
import HeartStat from '../shared/HeartStat';
import DeleteThread from '../shared/DeleteThreads';
// import DeleteThread from "../form/DeleteThreads";
// import HeartStat from "../shared/HeartStat";

interface Props {
    id: string;
    imgThread: string;
    currentUserId: string;
    parentId: string | null;
    content: string;
    author: {
        name: string;
        image: string;
        id: string;
    };
    community: {
        name: string;
        image: string;
        id: string;
    } | null;
    createdAt: string;
    comments: {
        author: {
            name: string;
            image: string;
            id: string;
        };
    }[];

    likes: string[];
    isComment?: boolean;
}
const ThreadCard = ({
    id,
    imgThread,
    currentUserId,
    parentId,
    content,
    author,
    community,
    createdAt,
    comments,
    likes,
    isComment,
}: Props) => {
    // handle down the line and when posting test it was a url
    const formatContent = (content: string) => {
        const lines = content.split('\n').map((line, index) => {
            const urlRegex = /https?:\/\/\S+/g;

            const matches = line.match(urlRegex);

            if (matches) {
                // Replace each URL with a clickable link
                matches.forEach((url) => {
                    const link = `<a href="${url}" target="_blank" rel="noopener noreferrer" style="color: rgb(29, 155, 240); text-decoration: none; cursor: pointer;" onmouseover="this.style.textDecoration='underline'" onmouseout="this.style.textDecoration='none'">${url}</a>`;
                    line = line.replace(url, link);
                });

                return <span key={index} dangerouslySetInnerHTML={{ __html: line }} />;
            } else {
                return (
                    <React.Fragment key={index}>
                        {line}
                        <br />
                    </React.Fragment>
                );
            }
        });

        return <React.Fragment>{lines}</React.Fragment>;
    };

    return (
        <article className={`flex w-full flex-col rounded-xl ${isComment ? 'px-0 xs:px-7' : 'bg-dark-2 p-7'}`}>
            <div className="flex items-start justify-between">
                <div className="flex w-full flex-1 flex-row gap-4">
                    <div className="flex flex-col items-center">
                        <Link href={`profile/${author.id}`} className="relative h-11 w-11">
                            <Image src={author.image} alt="" fill className="rounded-full cursor-pointer" />
                        </Link>

                        <div className="thread-card_bar"></div>
                    </div>

                    <div className=" flex w-full flex-col ">
                        <Link href={`profile/${author.id}`} className="w-fit">
                            <h4 className="flex cursor-pointer text-light-1 text-base-semibold">{author.name}</h4>
                            <p className="text-subtle-medium text-gray-1 pt-[2px]">
                                {multiFormatDateString(createdAt)}
                            </p>
                        </Link>

                        <p className="mt-2 text-small-regular text-light-2">{formatContent(content)}</p>

                        {imgThread ? (
                            <img
                                src={imgThread}
                                alt="Post Image"
                                className=" pt-[14px]  flex items-center   rounded-lg  lg:base-medium w-[680px] h-auto"
                            />
                        ) : (
                            <></>
                        )}
                        <div className={`${isComment && 'mb-10'} mt-5 flex flex-col gap-3`}>
                            <div className="flex gap-3.5">
                                <HeartStat
                                    postId={JSON.stringify(id)}
                                    likes={likes}
                                    userId={JSON.stringify(currentUserId)}
                                />
                                <Link href={`/thread/${id}`}>
                                    <Image
                                        src="/assets/reply.svg"
                                        alt="heart"
                                        width={24}
                                        height={24}
                                        className=" cursor-pointer object-contain"
                                    />
                                </Link>
                                <Image
                                    src="/assets/repost.svg"
                                    alt="heart"
                                    width={24}
                                    height={24}
                                    className=" cursor-pointer object-contain"
                                />
                                <Image
                                    src="/assets/share.svg"
                                    alt="heart"
                                    width={24}
                                    height={24}
                                    className=" cursor-pointer object-contain"
                                />
                            </div>

                            {isComment && comments.length > 0 && (
                                <Link href={`/thread/${id}`}>
                                    <p className="mt-1  text-subtle-medium text-gray-1">
                                        {comments.length} repl{comments.length > 1 ? 'ies' : 'y'}
                                    </p>
                                </Link>
                            )}
                        </div>
                    </div>
                    <div>
                        <DeleteThread
                            threadId={JSON.stringify(id)}
                            currentUserId={currentUserId}
                            authorId={author.id}
                            parentId={parentId}
                            isComment={isComment}
                        />
                    </div>
                </div>
            </div>

            {!isComment && comments.length > 0 && (
                <div className="ml-1 mt-3 flex items-center gap-2">
                    {comments.slice(0, 2).map((comment, index) => (
                        <Image
                            key={index}
                            src={comment.author.image}
                            alt={`user_${index}`}
                            width={24}
                            height={24}
                            className={`${index !== 0 && '-ml-5'} rounded-full object-cover`}
                        />
                    ))}

                    <Link href={`/thread/${id}`}>
                        <p className="mt-1 text-subtle-medium text-gray-1">
                            {comments.length} repl{comments.length > 1 ? 'ies' : 'y'}
                        </p>
                    </Link>
                </div>
            )}
            {!isComment && community && (
                <Link href={`/communities/${community.id}`} className="mt-5 flex items-center">
                    <p className="text-subtle-medium text-gray-1">
                        {formatDateString(createdAt)}
                        {community && ` - ${community.name} Community`}
                    </p>

                    <Image
                        src={community.image}
                        alt={community.name}
                        width={14}
                        height={14}
                        className="ml-1 rounded-full object-cover"
                    />
                </Link>
            )}
            <p className="text-subtle-medium text-gray-1 pt-[10px]">{formatDateString(createdAt)}</p>
        </article>
    );
};

export default ThreadCard;
