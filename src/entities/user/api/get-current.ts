import { baseFetch } from '@/shared/api/base';
import type { paths } from '@/shared/types/openapi';

type User = paths['/api/user/me']['get']['responses']['200']['content']['application/json'];

export function getCurrentUser() {
  return baseFetch<User>('/user/me', { method: 'GET' });
}
