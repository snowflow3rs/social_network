'use client';
import { STATES } from 'mongoose';
import { create } from 'zustand';

interface UserState {
    username: any;
    setUserName: any;
}

export const useUserStore = create<UserState>((set) => ({
    username: null,
    setUserName: () => set((state) => ({ username: state })),
}));
