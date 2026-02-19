import { API_BASE_URL } from '@/shared/api/base';
import type { paths } from '@/shared/types/openapi';

export type RefreshTokenResponse =
  paths['/api/auth/refresh']['post']['responses']['201']['content']['application/json'];

class RefreshManager {
  private isRefreshing = false;
  private refreshPromise: Promise<RefreshTokenResponse> | null = null;

  async refresh(): Promise<RefreshTokenResponse> {
    if (this.isRefreshing && this.refreshPromise) {
      return this.refreshPromise;
    }

    this.isRefreshing = true;

    this.refreshPromise = fetch(`${API_BASE_URL}/auth/refresh`, {
      method: 'POST',
      credentials: 'include',
    })
      .then(res => res.json() as Promise<RefreshTokenResponse>)
      .then(data => data)
      .finally(() => {
        this.isRefreshing = false;
        this.refreshPromise = null;
      });

    return this.refreshPromise;
  }
}

export const refreshManager = new RefreshManager();
