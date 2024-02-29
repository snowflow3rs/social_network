'use server';

import { revalidatePath } from 'next/cache';

import { connectDB } from '../mongoose';
import { FilterQuery, SortOrder } from 'mongoose';
import User from '../models/user.model';
import Community from '../models/community.model';
import Thread from '../models/thread.model';

interface Props {
    userID: string;
    username: string;
    name: string;
    bio: string;
    image: string;
    path: string;
}
export const updateUser = async ({ userID, username, name, bio, image, path }: Props): Promise<void> => {
    connectDB();
    try {
        await User.findOneAndUpdate(
            { id: userID },

            {
                username: username.toLowerCase(),
                name,
                bio,
                image,
                onboarded: true,
            },
            {
                upsert: true,
            },
        );

        if (path === '/profile/edit') {
            revalidatePath(path);
        }
    } catch (error: any) {
        throw new Error(`Fail to create/update user, ${error.message}`);
    }
};

export const fetchUser = async (userId: string) => {
    try {
        connectDB();
        return await User.findOne({ id: userId }).populate({
            path: 'communities',
            model: Community,
        });
    } catch (error: any) {
        throw new Error(`Fail fetch User, ${error.message}`);
    }
};

export async function fetchUserPosts(userId: string) {
    try {
        connectDB();
        // Find all threads authored by the user with the given userId
        const threads = await User.findOne({ id: userId }).populate({
            path: 'threads',
            model: Thread,
            populate: [
                {
                    path: 'community',
                    model: Community,
                    select: 'name id image _id', // Select the "name" and "_id" fields from the "Community" model
                },
                {
                    path: 'children',
                    model: Thread,
                    populate: {
                        path: 'author',
                        model: User,
                        select: 'name image id', // Select the "name" and "_id" fields from the "User" model
                    },
                },
            ],
        });
        return threads;
    } catch (error) {
        console.error('Error fetching user threads:', error);
        throw error;
    }
}

export const getActivity = async (userId: string) => {
    try {
        connectDB();

        // Find all threads created by the user
        const userThreads = await Thread.find({ author: userId });

        // Collect all the child thread ids (replies) from the 'children' field of each user thread
        const childThreadIds = userThreads.reduce((acc, userThread) => {
            return acc.concat(userThread.children);
        }, []);

        // Find and return the child threads (replies) excluding the ones created by the same user
        const replies = await Thread.find({
            _id: { $in: childThreadIds },
            author: { $ne: userId }, // Exclude threads authored by the same user
        }).populate({
            path: 'author',
            model: User,
            select: 'name image _id',
        });

        return replies;
    } catch (error) {
        console.error('Error fetching user activity:', error);
        throw error;
    }
};

/// fetch user on right side bar
export async function fetchUsersRightBar({
    userId,
    searchString = '',
    pageNumber = 1,
    pageSize = 20,
    sortBy = 'desc',
}: {
    userId: string;
    searchString?: string;
    pageNumber?: number;
    pageSize?: number;
    sortBy?: SortOrder;
}) {
    try {
        connectDB();

        // Calculate the number of users to skip based on the page number and page size.
        const skipAmount = (pageNumber - 1) * pageSize;

        // Create a case-insensitive regular expression for the provided search string.
        const regex = new RegExp(searchString, 'i');

        // Create an initial query object to filter users.
        const query: FilterQuery<typeof User> = {
            id: { $ne: userId }, // Exclude the current user from the results.
        };

        // If the search string is not empty, add the $or operator to match either username or name fields.
        if (searchString.trim() !== '') {
            query.$or = [{ username: { $regex: regex } }, { name: { $regex: regex } }];
        }

        // Define the sort options for the fetched users based on createdAt field and provided sort order.
        const sortOptions = { createdAt: sortBy };

        const usersQuery = User.find(query).sort(sortOptions).skip(skipAmount).limit(pageSize);

        // Count the total number of users that match the search criteria (without pagination).
        const totalUsersCount = await User.countDocuments(query);

        const users = await usersQuery.exec();

        // Check if there are more users beyond the current page.
        const isNext = totalUsersCount > skipAmount + users.length;

        return { users, isNext };
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
}

export const fetchSearchUser = async ({
    userId,
    searchString = '',
    pageNumber = 1,
    pageSize = 20,
    sortBy = 'desc',
}: {
    userId?: string;
    searchString?: string;
    pageNumber?: number;
    pageSize?: number;
    sortBy?: SortOrder;
}) => {
    try {
        connectDB();

        const skipPage = (pageNumber - 1) * pageSize;

        const regex = new RegExp(searchString, 'i');
        const query: FilterQuery<typeof User> = {
            id: { $ne: userId },
        };
        // If the search string is not empty, add the $or operator to match either username or name fields.
        if (searchString.trim() !== '') {
            query.$or = [{ username: { $regex: regex } }, { name: { $regex: regex } }];
        }

        const sortOp = { createAt: sortBy };
        const userQuery = User.find(query).sort(sortOp).skip(skipPage).limit(pageSize);

        const totalUserCount = await User.countDocuments(query);
        const users = await userQuery.exec();
        // Check if there are more users beyond the current page.
        const isNext = totalUserCount > skipPage + users.length;
        return { isNext, users };
    } catch (error) {
        console.error('Error fetching user search:', error);
        throw error;
    }
};
