import { loginSchema, type LoginFormValues } from './schema'
import { useAuthForm } from './useAuthForm'
import { useLoginMutation } from './mutations/useLoginMutation'

const initialValues: LoginFormValues = {
  email: '',
  password: '',
}

export const useLoginForm = () => {
  const mutation = useLoginMutation()
  const form = useAuthForm(loginSchema, initialValues, mutation.mutateAsync)

  return {
    ...form,
    isPending: mutation.isPending,
    error: mutation.error,
  }
}
