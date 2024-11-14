import { create } from 'zustand';

const useFollow = create((set) => ({
    otherUser: {
        otherUser: null,
    },
    followUser: {
        currentUser: null,
    },

    getUpdateUser: (payload: any) =>
        set((state: any) => ({
            otherUser: {
                ...state.otherUser,
                otherUser: payload,
            },
        })),

    getFollowUser: (payload: any) =>
        set((state: any) => ({
            otherUser: {
                ...state.otherUser,
                otherUser: payload,
            },
        })),
}));

export default useFollow;
