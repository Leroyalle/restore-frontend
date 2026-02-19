import { apiPost } from '@/shared/api';
import type { RegisterFormValues } from '../model/schema';
import type { paths } from '@/shared/types/openapi';

export type RegisterResponse =
  paths['/api/auth/register']['post']['responses']['201']['content']['application/json'];

export const register = (body: RegisterFormValues) => {
  return apiPost<RegisterResponse, RegisterFormValues>('/auth/register', body);
};
