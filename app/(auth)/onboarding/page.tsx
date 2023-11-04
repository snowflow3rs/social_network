
import AccountProfile from "@/components/forms/AccountProfile";
import { fetchUser } from "@/lib/actions/user.actions";

import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
const onBoarding: React.FC = async () => {
  const user = await currentUser();
  if (!user) return null;
  const userInfor = await fetchUser(user.id);
  // if (!userInfor?.onboarded) redirect("/");

  const userData = {
    id: user.id,
    objectId: userInfor?._id,
    username: userInfor ? userInfor?.username : user.username,
    name: userInfor ? userInfor?.name : user.firstName ?? "",
    bio: userInfor ? userInfor?.bio : "",
    image: userInfor ? userInfor?.image : user.imageUrl,
  };
  return (
    <main className="mx-auto flex max-w-3xl flex-col justify-start px-10  h-screen   ">
      <h1 className="head-text mt-[20px]">OnBoarding</h1>
      <p className="mt-3 text-base-regular text-light-2">
        Complete your profile now to use Threads
      </p>
      <section className="mt-9 bg-dark-2 p-10">
        <AccountProfile user={userData} btnTitle="Continue" />
      </section>
    </main>
  );
};

export default onBoarding;
