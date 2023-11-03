// import { fetchUser, fetchUsersRightBar } from "@/lib/actions/user.action";
// import React from "react";
// import { currentUser } from "@clerk/nextjs";
// import { fetchCommunities } from "@/lib/actions/community.action";
// import UserCard from "../cards/UserCard";
const RightSideBar: React.FC = async () => {
  // const user = await currentUser();
  // if (!user) return null;

  // const similarMinds = await fetchUsersRightBar({
  //   userId: user.id,
  //   pageSize: 4,
  // });

  // const suggestedCOmmunities = await fetchCommunities({ pageSize: 4 });
  return (
    <section className="custom-scrollbar rightsidebar">
      <div className=" flex flex-1 flex-col justify-start">
        <h3 className="text-light-1 text-heading4-medium">
          Suggested Community
        </h3>
      </div>

      <div className=" flex flex-1 flex-col justify-start">
        <h3 className="text-light-1 text-heading4-medium">Suggested Users</h3>
        <div className="mt-7 flex w-[350px] flex-col gap-10">
          {/* {similarMinds.users.length > 0 ? (
            <>
              {similarMinds.users.map((person: any) => (
                <UserCard
                  key={person.id}
                  id={person.id}
                  name={person.name}
                  username={person.username}
                  imgUrl={person.image}
                  userType="User"
                />
              ))}
            </>
          ) : (
            <p className="!text-base-regular text-light-3">No users yet</p>
          )} */}
        </div>
      </div>
    </section>
  );
};

export default RightSideBar;
