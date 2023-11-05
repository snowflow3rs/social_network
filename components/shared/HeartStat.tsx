"use client";

import React, { useState } from "react";
import { checkIsLiked } from "@/lib/utils";
import { likePosts } from "@/lib/actions/thread.actions";

interface Props {
  postId: string;
  likes: string[];

  userId: string;
}
const HeartStat = ({ postId, likes, userId }: Props) => {
  const [liked, setLiked] = useState<string[]>(likes);

  const handleLikePost = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    e.stopPropagation();

    let newLiked = [...liked];

    if (newLiked.includes(JSON.parse(userId))) {
      newLiked = newLiked.filter((Id) => Id !== JSON.parse(userId));
    } else {
      newLiked.push(JSON.parse(userId));
    }

    setLiked(newLiked);
    likePosts(JSON.parse(postId), newLiked);
  };

  return (
    <div className="flex group transition-colors">
      <div className=" rounded-lg group-hover:bg-red-400">
        <img
          src={`${
            checkIsLiked(liked, JSON.parse(userId))
              ? "/assets/liked.svg"
              : "/assets/heart-gray.svg"
          }`}
          alt="heart"
          width={24}
          height={24}
          onClick={handleLikePost}
          className="cursor-pointer object-contain"
        />
      </div>
      <p className="small-medium lg:base-medium cursor-pointer text-gray-1 ml-[2px] group-hover:text-red-400">
        {liked?.length}
      </p>
    </div>
  );
};

export default HeartStat;
