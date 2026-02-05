import { apiPost } from '@/shared/api'
import type { LoginFormValues } from '../model/schema'

export type LoginResponse = Record<string, unknown>

export const login = (body: LoginFormValues) => {
  return apiPost<LoginResponse, LoginFormValues>('/auth/login', body)
}
