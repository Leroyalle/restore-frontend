import { refreshManager } from '@/features/auth/api/refresh';
import { tokenStore } from '../lib/auth/token-store';

export const API_BASE_URL = 'http://localhost:3000/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('auth_token');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

export const apiGet = async <T>(path: string): Promise<T> => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: 'GET',
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return (await response.json()) as T;
};

export async function baseFetch<T>(path: string, init: RequestInit, isRetry = false): Promise<T> {
  const headers = new Headers(init.headers);
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      ...getAuthHeaders(),
      ...headers,
      Authorization: `Bearer ${tokenStore.get()}`,
    },
    credentials: 'include',
  });

  if (response.status === 401 && !isRetry && !path.includes('/auth/refresh')) {
    try {
      const newToken = await refreshManager.refresh();

      tokenStore.set(newToken.accessToken.token);

      const retryResponse = await fetch(`${API_BASE_URL}${path}`, {
        ...init,
        headers: {
          ...init.headers,
          Authorization: `Bearer ${tokenStore.get()}`,
        },
        credentials: 'include',
      });

      if (!retryResponse.ok) {
        throw new Error(`Ошибка ${retryResponse.status}`);
      }

      return retryResponse.json();
    } catch (e) {
      // тут logout
      console.log('Base fetch Error', e);
      throw e;
    }
  }

  if (!response.ok) {
    const errorJson = await response.json().catch(() => ({}));
    const message = errorJson.message || `Ошибка ${response.status}`;
    throw new Error(message);
  }

  return response.json();
}

export const apiPost = async <TResponse, TBody>(path: string, body: TBody): Promise<TResponse> => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorJson = await response.json().catch(() => ({}));

    const message = errorJson.message || `Ошибка ${response.status}`;

    console.error('Api error', errorJson);

    throw new Error(message);
  }

  return (await response.json()) as TResponse;
};

export const apiPut = async <TResponse, TBody>(path: string, body: TBody): Promise<TResponse> => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return (await response.json()) as TResponse;
};

export const apiDelete = async <T>(path: string): Promise<T> => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return (await response.json()) as T;
};
