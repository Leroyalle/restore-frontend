import { useMutation } from '@tanstack/react-query'

import { register } from '@/features/auth/api'

export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: register,
  })
}
