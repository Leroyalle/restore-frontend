import { baseFetch } from '@/shared/api/base';
import type { paths } from '@/shared/types/openapi';

type CreateOrderResult =
  paths['/api/order']['post']['responses']['201']['content']['application/json'];

export const createOrder = (data: { phone: string }) => {
  return baseFetch<CreateOrderResult>('/order', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};
