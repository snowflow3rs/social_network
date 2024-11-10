import React from 'react';

import { currentUser } from '@clerk/nextjs';

import { redirect } from 'next/navigation';
import Image from 'next/image';

import UserCard from '@/components/cards/UserCard';
import Pagination from '@/components/shared/Pagination';
import { fetchSearchUser, fetchUser, getAllUser } from '@/lib/actions/user.actions';
import SearchBarExplore from '@/components/shared/SearchBarExplore';
const page = async ({ searchParams }: { searchParams: { [key: string]: string | undefined } }) => {
    const user = await currentUser();

    if (!user) return null;
    const userInfor = await fetchUser(user.id);
    if (!userInfor?.onboarded) redirect('/onboarding');
    const test = await getAllUser();
    console.log(test);
    const result = await fetchSearchUser({
        userId: user.id,
        searchString: searchParams.q,
        pageNumber: searchParams?.page ? +searchParams.page : 1,
        pageSize: 25,
    });

    return (
        <section>
            <h1 className=" head-text mb-10">Search</h1>
            <SearchBarExplore routeType="search" />
            <div className="mt-14 flex flex-col  gap-9">
                {result.users.length === 0 ? (
                    <p className="no-result">No Users</p>
                ) : (
                    <>
                        {result.users.map((user) => (
                            <UserCard
                                key={user.id}
                                id={user.id}
                                username={user.username}
                                name={user.name}
                                imgUrl={user.image}
                                userType="User"
                            />
                        ))}
                    </>
                )}
            </div>
            <Pagination path="search" pageNumber={searchParams?.page ? +searchParams.page : 1} isNext={result.isNext} />
        </section>
    );
};

export default page;
