import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createOrder } from '../api/order.api';
import toast from 'react-hot-toast';

export function useCreateOrderMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ phone }: { phone: string }) => createOrder({ phone }),
    onSuccess: data => {
      toast.success(data.message);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
}
