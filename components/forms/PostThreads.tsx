"use client";
import React, { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Textarea } from "../ui/textarea";
import { isBase64Image } from "@/lib/utils";

import { usePathname, useRouter } from "next/navigation";
import { threadValidation } from "@/lib/validations/thread";
import { useUploadThing } from "@/lib/uploadThing";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { createThread } from "@/lib/actions/thread.actions";

const PostThreads = ({ userId }: { userId: string }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [files, setFiles] = useState<File[]>([]);
  const { startUpload } = useUploadThing("media");
  const form = useForm({
    resolver: zodResolver(threadValidation),
    defaultValues: {
      thread: "",
      image_thread: "",
      accountId: userId,
    },
  });
  const handleImage = (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (values: string) => void
  ) => {
    e.preventDefault();

    const fileReader = new FileReader();
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      setFiles(Array.from(e.target.files));
      if (!file.type.includes("image")) return;

      fileReader.onload = async (event) => {
        const imgDataURL = event.target?.result?.toString() || "";

        fieldChange(imgDataURL);
      };
      fileReader.readAsDataURL(file);
    }
  };

  const onSubmit = async (values: z.infer<typeof threadValidation>) => {
    if (!values.image_thread) {
      values.image_thread = ""; // Set it to an empty string or handle as needed
    } else {
      const blod = values.image_thread;
      const hasImageChange = isBase64Image(blod);
      if (hasImageChange) {
        const imgRes = await startUpload(files);
        if (imgRes && imgRes[0].fileUrl) {
          values.image_thread = imgRes[0].fileUrl;
        }
      }
    }

    await createThread({
      text: values.thread,
      image: values.image_thread,
      author: userId,
      communityId: null,
      path: pathname,
    });

    router.push("/");
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-10 flex flex-col justify-start gap-10"
      >
        <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem className="flex flex-col  gap-3  w-full">
              <FormLabel className=" text-base-semibold text-gray-200">
                Content
              </FormLabel>
              <FormControl className=" no-focus border border-dark-4  bg-dark-3 text-light-1">
                <Textarea
                  rows={8}
                  placeholder="Enter your content... "
                  className=" account-form_input "
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image_thread"
          render={({ field }) => (
            <FormItem className="flex flex-col pb-[50px]  items-center gap-4">
              <FormLabel className=" flex justify-center items-center  w-full   border-dashed border-2 border-zinc-600   ">
                {field.value ? (
                  <Image
                    src={field.value}
                    alt=""
                    width={300}
                    height={500}
                    priority
                    className=" rounded-md object-contain"
                  />
                ) : (
                  <div className=" flex flex-col justify-center items-center cursor-pointer">
                    <AiOutlineCloudUpload className="  text-red-50  w-[100px] h-[100px]" />
                    <FormDescription className="pb-[20px]">
                      Select image and Upload your post
                    </FormDescription>
                  </div>
                )}
              </FormLabel>

              <FormControl className="flex-1 text-base-semibold text-gray-200 ">
                <Input
                  type="file"
                  accept="image/*"
                  placeholder="Upload a photo"
                  className="w-[100%]   "
                  onChange={(e) => {
                    handleImage(e, field.onChange);
                  }}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="bg-primary-500">
          Post
        </Button>
      </form>
    </Form>
  );
};

export default PostThreads;
