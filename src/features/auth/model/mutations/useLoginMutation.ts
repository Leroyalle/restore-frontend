import { useMutation } from '@tanstack/react-query';

import { login } from '@/features/auth/api';
import { tokenStore } from '@/shared/lib/auth/token-store';
import toast from 'react-hot-toast';

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: login,
    onSuccess: data => {
      tokenStore.set(data.accessToken.token);
      toast.success(data.message);
    },

    onError(error) {
      console.error(error);
      if (error instanceof Error) {
        toast.error(error.message);
        return;
      }
      toast.error('Что-то пошло не так');
    },
  });
};
