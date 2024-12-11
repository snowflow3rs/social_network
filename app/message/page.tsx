import ContainerMessage from '@/components/ContainerMessage';

import { getConvUser } from '@/lib/actions/conversation.actions';

import { currentUser } from '@clerk/nextjs';

const MessagePage = async () => {
    const user = await currentUser();
    if (!user) return null;
    const getConversationByUser = await getConvUser(user.id);

    const formattedData = getConversationByUser.map((item: any) => ({
        id: item._id.toString(),
        members: item.members,
    }));

    return (
        <>
            <ContainerMessage data={formattedData} currentUserId={user.id} imgP={user.imageUrl} />
        </>
    );
};

export default MessagePage;
