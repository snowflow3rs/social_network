import { create } from 'zustand';

interface UserState {
    user1: any;
    setUser1: (user: any) => void;

    messages1: any[];
    setMessages1: (message: any) => void;
}

export const useUserStore = create<UserState>((set) => ({
    user1: null,

    messages1: [],
    setUser1: (user1) => set({ user1 }),
    setMessages1: (newMessage: any) => set((state: any) => ({ messages1: [...state.messages1, newMessage] })),
}));
