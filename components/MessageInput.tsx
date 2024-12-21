'use client';
import EmojiPicker from 'emoji-picker-react';
import { BsSend } from 'react-icons/bs';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { newMessage } from '@/lib/actions/message.actions';
import { usePathname } from 'next/navigation';

import { isBase64Image } from '@/lib/utils';
import { useUploadThing } from '@/lib/uploadThing';
import { Input } from './ui/input';
import { getSocket } from '@/lib/Socket/SocketService';
const MessageInput = ({
    curChatData,
    curChatId,
    userId,
    funAdd,
}: {
    curChatData: any;
    curChatId: string;
    userId: string;
    funAdd: any;
}) => {
    const pathname = usePathname();
    const [files, setFiles] = useState<File[]>([]);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const { startUpload } = useUploadThing('media');

    const socket = getSocket();

    useEffect(() => {
        socket.on('getUsers', (msg) => {
            console.log(msg);
        });
    }, []);
    const messValidation = z.object({
        text: z.string(),
        img_mess: z.string().optional(),
        conversationId: z.string(),
        sender: z.string(),
    });

    const form = useForm({
        resolver: zodResolver(messValidation),
        defaultValues: {
            sender: userId,
            text: '',
            conversationId: curChatId,
            img_mess: '',
        },
    });

    const handleEmojiSelect = (emoji: { emoji: string }) => {
        form.setValue('text', form.getValues('text') + emoji.emoji);
        setShowEmojiPicker(false);
    };

    const handleImage = (e: ChangeEvent<HTMLInputElement>, fieldChange: (values: string) => void) => {
        e.preventDefault();

        const fileReader = new FileReader();
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];

            setFiles(Array.from(e.target.files));
            if (!file.type.includes('image')) return;

            fileReader.onload = async (event) => {
                const imgDataURL = event.target?.result?.toString() || '';

                fieldChange(imgDataURL);
            };
            fileReader.readAsDataURL(file);
        }
    };

    const onSubmit = async (values: z.infer<typeof messValidation>) => {
        const blod = values.img_mess || '';
        const hasImageChange = isBase64Image(blod);

        if (hasImageChange) {
            const imgRes = await startUpload(files);
            if (imgRes && imgRes[0].fileUrl) {
                values.img_mess = imgRes[0].fileUrl;
            }
        }

        const receiver = curChatData.members.find((member: any) => member !== userId);
        socket.emit('sendMessage', {
            senderId: userId,
            receiverId: receiver,
            text: values.text,
        });
        await newMessage(values, pathname);

        funAdd(values);
        form.reset();
    };

    const clearImage = () => {
        form.setValue('img_mess', '');
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="px-4 my-3">
                <div className="w-full relative">
                    <div className="flex items-center space-x-2">
                        {/* Image Upload Input */}
                        <FormField
                            control={form.control}
                            name="img_mess"
                            render={({ field }) => (
                                <FormItem>
                                    {/* Image Preview */}
                                    {field.value && (
                                        <div className="mb-2 relative">
                                            <img
                                                src={field.value}
                                                alt="Selected"
                                                className="max-h-32 w-auto rounded-lg"
                                            />
                                            <button
                                                type="button"
                                                onClick={clearImage}
                                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs"
                                            >
                                                X
                                            </button>
                                        </div>
                                    )}

                                    <FormControl>
                                        <div className="flex items-center">
                                            <Input
                                                type="file"
                                                accept="image/*"
                                                placeholder="Upload a photo"
                                                className="hidden"
                                                id="image-upload"
                                                onChange={(e) => {
                                                    handleImage(e, field.onChange);
                                                }}
                                            />
                                            <label
                                                htmlFor="image-upload"
                                                className="cursor-pointer text-2xl text-gray-400 hover:text-white transition"
                                            >
                                                <AiOutlineCloudUpload />
                                            </label>
                                        </div>
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        {/* Text Input */}
                        <FormField
                            control={form.control}
                            name="text"
                            render={({ field }) => (
                                <FormItem className="flex-grow">
                                    <FormControl>
                                        <input
                                            className="border text-sm rounded-lg block w-full p-2.5 !pl-8 bg-gray-700 border-gray-600 text-white"
                                            placeholder="Send a message"
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <button
                            type="button"
                            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                            className="text-2xl text-gray-400 hover:text-white transition"
                        >
                            😊
                        </button>
                        {showEmojiPicker && (
                            <div className="absolute right-0 top-[-300px] z-50">
                                <EmojiPicker width={310} height={290} onEmojiClick={handleEmojiSelect} />
                            </div>
                        )}
                        {/* Send Button */}
                        <Button type="submit" className="flex items-center">
                            <BsSend />
                        </Button>
                    </div>
                </div>
            </form>
        </Form>
    );
};

export default MessageInput;
