import { registerSchema, type RegisterFormValues } from './schema'
import { useAuthForm } from './useAuthForm'
import { useRegisterMutation } from './mutations/useRegisterMutation'

const initialValues: RegisterFormValues = {
  name: '',
  email: '',
  password: '',
}

export const useRegisterForm = () => {
  const mutation = useRegisterMutation()
  const form = useAuthForm(registerSchema, initialValues, mutation.mutateAsync)

  return {
    ...form,
    isPending: mutation.isPending,
    error: mutation.error,
  }
}
