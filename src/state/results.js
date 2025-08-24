import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';

export const useResultsStore = create(devtools(persist((set) => ({
    lastByLesson: {}, // { [lesson_id]: SubmitResult }
    setLastResult: (lesson_id, result) =>
        set((s) => ({ lastByLesson: { ...s.lastByLesson, [lesson_id]: { ...result, receivedAt: Date.now() } } })),
    clearLessonResult: (lesson_id) =>
        set((s) => {
            const m = { ...s.lastByLesson }; delete m[lesson_id]; return { lastByLesson: m };
        }),
}), { name: 'mq-results' })));
