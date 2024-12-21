'use client';

import { extractTime, multiFormatDateString } from '@/lib/utils';

const Message = ({
    imgMess,
    text,
    owner,
    imgP2,
    createAt,
    receiverData,
}: {
    imgMess: string;
    text: string;
    owner: any;
    imgP2: string;
    createAt: string;
    receiverData: any;
}) => {
    const chatClassName = owner ? 'chat-end' : 'chat-start';

    const bubbleBgColor = owner ? 'bg-primary-500' : 'bg-blue-300';
    const test = owner ? imgP2 : receiverData?.image;

    return (
        <div className={`chat ${chatClassName}`}>
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <img alt="Tailwind CSS chat bubble component" src={`${test}`} width={14} height={14} />
                </div>
            </div>

            <div className={`chat-bubble text-white ${bubbleBgColor} pb-2`}>
                {imgMess && ( // Check if img exists
                    <img src={imgMess} alt="Message attachment" className="max-h-32 w-auto rounded-lg mb-2" /> // Render the image
                )}
                {text}
            </div>
            <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
                {multiFormatDateString(createAt)}
            </div>
        </div>
    );
};
export default Message;
