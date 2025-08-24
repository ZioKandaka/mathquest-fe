import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useUserStore = create(persist((set) => ({
    user_id: 1,
    user_name: 'Student',
    user_email: 'student@mathquest.com',
    setUserId: (id) => set({ user_id: id }),

    setUser: (u) => set({
        user_id: Number(u.user_id),
        user_name: u.display_name,
        user_email: u.email,
    }),
}), { name: 'mq-user' }));
