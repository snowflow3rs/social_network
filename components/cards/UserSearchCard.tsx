"use client";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Props {
  id: string;
  username: string;
  name: string;
  imgUrl: string;
  userType: string;
}
const UserSearchCard = ({ id, username, name, imgUrl, userType }: Props) => {
  const route = useRouter();
  const isCommunity = userType === "Community";
  return (
    <article className="user-search-card py-[10px] px-[12px] rounded-[4px] bg-dark-3 hover:bg-zinc-900 ">
      <Link
        href={`/profile/${id}`}
        className="user-card_avatar cursor-pointer  "
      >
        <Image
          src={imgUrl}
          alt=" logo"
          width={36}
          height={36}
          className="rounded-full"
        />

        <div className="flex-1 text-ellipsis ml-[4px]">
          <h4 className="text-base-semibold text-light-1">{name}</h4>
          <p className="text-small-medium text-gray-1">{username}</p>
        </div>
      </Link>
    </article>
  );
};

export default UserSearchCard;
