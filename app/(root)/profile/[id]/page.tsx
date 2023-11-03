import React from "react";

import { currentUser } from "@clerk/nextjs";

import { redirect } from "next/navigation";
import Image from "next/image";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { profileTabs } from "@/constants";

import { fetchUser } from "@/lib/actions/user.actions";
import ThreadsTab from "@/components/shared/ThreadsTab";
import ProfileHead from "@/components/shared/ProfileHead";
const page = async ({ params }: { params: { id: string } }) => {
  const user = await currentUser();

  if (!user) return null;
  const userInfor = await fetchUser(params.id);
  if (!userInfor?.onboarded) redirect("/onboarding");

  return (
    <section>
      <ProfileHead
        accountId={userInfor.id}
        authUser={user.id}
        name={userInfor.name}
        username={userInfor.username}
        imgUrl={userInfor.image}
        bio={userInfor.bio}
      />
      <div className="mt-9">
        <Tabs defaultValue="threads" className="w-full">
          <TabsList className="tab">
            {profileTabs.map((tab) => (
              <TabsTrigger className="tab" key={tab.label} value={tab.value}>
                <Image
                  src={tab.icon}
                  alt={tab.label}
                  width={24}
                  height={24}
                  className=" object-contain"
                />
                <p className="max-sm:hidden">{tab.label}</p>

                {tab.label === "Threads" && (
                  <p className="ml-1 rounded-sm bg-light-4 px-2 py-1 !text-tiny-medium text-light-2">
                    {userInfor?.threads?.length}
                  </p>
                )}
              </TabsTrigger>
            ))}
          </TabsList>

          {profileTabs.map((tab) => (
            <TabsContent
              className="w-full text-light-1"
              key={`content-${tab.label}`}
              value={tab.value}
            >
              <ThreadsTab
                currentUserId={user.id}
                accountId={userInfor.id}
                accountType="User"
              />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default page;
