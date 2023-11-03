import ThreadCard from "@/components/cards/ThreadCard";
import React from "react";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { fetchUser } from "@/lib/actions/user.actions";
import { fetchThreadById } from "@/lib/actions/thread.actions";
import Comments from "@/components/forms/Comments";

const page = async ({ params }: { params: { id: string } }) => {
  if (!params.id) return null;
  const user = await currentUser();

  if (!user) return null;
  const userInfor = await fetchUser(user.id);
  if (!userInfor?.onboarded) redirect("/onboarding");

  const thread = await fetchThreadById(params.id);

  return (
    <section className="relative">
      <div>
        <ThreadCard
          key={thread._id}
          id={thread._id}
          imgThread={thread.image}
          currentUserId={user?.id}
          parentId={thread.parentId}
          content={thread.text}
          author={thread.author}
          community={thread.community}
          createdAt={thread.createdAt}
          comments={thread.children}
          likes={thread.likes}
        />
      </div>
      <div className="mt-7 ">
        <Comments
          threadId={thread.id}
          currentUserImg={userInfor?.image}
          currentUserId={JSON.stringify(userInfor._id)}
        />
      </div>
      <div className="m-10">
        {thread.children.map((childItem: any) => (
          <ThreadCard
            key={childItem._id}
            id={childItem._id}
            imgThread={childItem.image}
            currentUserId={childItem?.id}
            parentId={childItem.parentId}
            content={childItem.text}
            author={childItem.author}
            community={childItem.community}
            createdAt={childItem.createdAt}
            comments={childItem.children}
            likes={childItem.likes}
            isComment
          />
        ))}
      </div>
    </section>
  );
};

export default page;
