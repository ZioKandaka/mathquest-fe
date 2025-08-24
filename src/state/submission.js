import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';

export const useSubmissionStore = create(devtools(persist((set, get) => ({
    answersByLesson: {}, // { [lesson_id]: { [problem_id]: { problem_id, selected_option_id?, input_value? } } }

    setAnswer(lesson_id, ans) {
        const map = { ...(get().answersByLesson[lesson_id] || {}) };
        map[ans.problem_id] = ans;
        set({ answersByLesson: { ...get().answersByLesson, [lesson_id]: map } });
    },

    getAnswersArray(lesson_id, problemIds) {
        const map = get().answersByLesson[lesson_id] || {};
        return problemIds.map((pid) => map[pid]);
    },

    clearLesson(lesson_id) {
        const all = { ...get().answersByLesson };
        delete all[lesson_id];
        set({ answersByLesson: all });
    },
}), { name: 'mq-submission' })));
