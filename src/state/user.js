import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';

export const useUserStore = create(devtools(persist((set) => ({
    user_id: 1,                       // demo user; swap when you add auth
    setUserId: (id) => set({ user_id: id }),
}), { name: 'mq-user' })));
