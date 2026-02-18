import type { paths } from '@/shared/types/openapi';

export type TGetAllProducts =
  paths['/api/product']['get']['responses'][200]['content']['application/json'];

export type TProduct =
  paths['/api/product/:id']['get']['responses']['200']['content']['application/json'];
