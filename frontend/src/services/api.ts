import { config } from '../config/env';
import { AuthResponse, ApiError } from '../types/auth';

class ApiService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = config.apiBaseUrl;
  }

  async verifyGoogleToken(idToken: string): Promise<AuthResponse> {
    const response = await fetch(`${this.baseUrl}/auths/google-verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id_token: idToken }),
    });

    if (!response.ok) {
      const errorData: ApiError = await response.json();
      throw new Error(errorData.detail || 'Authentication failed');
    }

    return await response.json();
  }
}

export const apiService = new ApiService();
