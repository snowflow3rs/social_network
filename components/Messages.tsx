'use client';

import Message from './Message';

const Messages = ({
    data,
    currentUserId,
    imgP1,
    scrollRef,
}: {
    data: Array<any>;
    currentUserId: string;
    imgP1: any;
    scrollRef: any;
}) => {
    console.log('123', data);
    return (
        <div className="px-4 flex-1 overflow-y-auto">
            {data.map(
                (msg: any, index: number) =>
                    msg && ( // Check if msg is defined
                        <div ref={scrollRef} key={msg._id || index}>
                            <Message
                                imgMess={msg.img_mess}
                                text={msg.text}
                                owner={msg.sender === currentUserId}
                                imgP2={imgP1}
                                createAt={msg.createAt}
                            />
                        </div>
                    ),
            )}
        </div>
    );
};

export default Messages;
