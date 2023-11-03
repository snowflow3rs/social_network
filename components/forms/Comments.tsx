"use client";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";

import { usePathname } from "next/navigation";


import { commentValidation } from "@/lib/validations/thread";
import { AddCommentToThread } from "@/lib/actions/thread.actions";
interface Props {
  threadId: string;
  currentUserImg: string;
  currentUserId: string;
}
const Comments = ({ threadId, currentUserImg, currentUserId }: Props) => {
  const pathname = usePathname();
  const form = useForm({
    resolver: zodResolver(commentValidation),
    defaultValues: {
      thread: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof commentValidation>) => {
    await AddCommentToThread(
      threadId,
      values.thread,
      JSON.parse(currentUserId),
      pathname
    );
    form.reset();
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="comment-form">
        <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem className="flex items-center gap-3  w-full">
              <FormLabel>
                <Image
                  src={currentUserImg}
                  alt="avatar user"
                  width={48}
                  height={48}
                  className="rounded-full object-cover"
                />
              </FormLabel>
              <FormControl className=" no-focus border border-dark-4  bg-dark-3 text-light-1">
                <Input
                  type="text"
                  placeholder="Comments..."
                  className=" no-focus text-light-1 outline-none "
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="comment-form_btn ">
          Reply
        </Button>
      </form>
    </Form>
  );
};

export default Comments;
