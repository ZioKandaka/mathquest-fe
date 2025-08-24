import { useQuery, useMutation } from '@tanstack/react-query';
import { api } from './client';

export function useLessons(user_id) {
  return useQuery({
    queryKey: ['lessons', user_id],
    enabled: user_id != null,
    queryFn: async () => {
      const { data } = await api.get('/lessons', { params: { user_id } });
      return data;
    },
  });
}

export function useLesson(lesson_id) {
  return useQuery({
    queryKey: ['lesson', lesson_id],
    queryFn: async () => (await api.get(`/lessons/${lesson_id}`)).data,
  });
}
export function useSubmit(lesson_id) {
  return useMutation({
    mutationFn: async (payload) => (await api.post(`/lessons/${lesson_id}/submit`, payload)).data,
  });
}
export function useProfile(user_id) {
  return useQuery({
    queryKey: ['profile', user_id],
    queryFn: async () => (await api.get('/profile', { params: { user_id } })).data,
  });
}

export function useUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => (await api.get('/users')).data,
    staleTime: Infinity, // user list rarely changes
  });
}