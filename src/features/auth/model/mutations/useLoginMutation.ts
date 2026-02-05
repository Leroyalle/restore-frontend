import { useMutation } from '@tanstack/react-query'

import { login } from '@/features/auth/api'

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: login,
  })
}
