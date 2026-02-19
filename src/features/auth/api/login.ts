import type { LoginFormValues } from '../model/schema';
import type { paths } from '@/shared/types/openapi';
import { baseFetch } from '../../../shared/api/base';

export type LoginResponse =
  paths['/api/auth/login']['post']['responses']['201']['content']['application/json'];

export const login = (body: LoginFormValues) => {
  return baseFetch<LoginResponse>('/auth/login', { method: 'POST', body: JSON.stringify(body) });
  // return apiPost<LoginResponse, LoginFormValues>('/auth/login', body);
};
