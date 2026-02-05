import { apiPost } from '@/shared/api'
import type { RegisterFormValues } from '../model/schema'

export type RegisterResponse = Record<string, unknown>

export const register = (body: RegisterFormValues) => {
  return apiPost<RegisterResponse, RegisterFormValues>('/auth/register', body)
}
