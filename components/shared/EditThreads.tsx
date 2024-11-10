'use client';

import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
interface Props {
    threadId: string;
    currentUserId: string;
    authorId: string;
    parentId: string | null;
    isComment?: boolean;
}
const EditThreads = ({ threadId, currentUserId, authorId, parentId, isComment }: Props) => {
    const pathname = usePathname();
    const router = useRouter();

    if (currentUserId !== authorId || pathname === '/') return null;

    return (
        <Image
            src="/assets/edit.svg"
            alt="logout"
            width={24}
            height={24}
            className=" hover:bg-purple-400   cursor-pointer object-contain rounded-md"
            onClick={async () => {
                router.push(`/create-thread/edit/${threadId}`);
            }}
        />
    );
};

export default EditThreads;
