import { apiClient, ApiError } from './api';

const TOKEN_KEY = 'dps_auth_token';
const USER_KEY = 'dps_auth_user';

const USE_MOCK_FALLBACK = import.meta.env.VITE_USE_MOCK_FALLBACK !== 'false';

export const authService = {
  /**
   * Log in user
   */
  async login(email, password, remember = false) {
    try {
      const data = await apiClient('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });

      if (data?.token && data?.user) {
        localStorage.setItem(TOKEN_KEY, data.token);
        localStorage.setItem(USER_KEY, JSON.stringify(data.user));
        return { user: data.user, token: data.token, isMock: false };
      }
      throw new Error('Invalid response structure from backend.');
    } catch (err) {
      // If backend is unavailable and mock fallback is enabled
      if (USE_MOCK_FALLBACK && (err.status === 0 || err.status === 404)) {
        console.warn('[DPS Dev Mode] Backend unreachable. Using mock authentication session.');
        const mockUser = {
          id: 'usr_mock_123',
          name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
          email: email,
          role: 'Clinician / Patient Analyst',
          isMock: true,
        };
        const mockToken = 'mock_jwt_token_dps_sample';
        localStorage.setItem(TOKEN_KEY, mockToken);
        localStorage.setItem(USER_KEY, JSON.stringify(mockUser));
        return { user: mockUser, token: mockToken, isMock: true };
      }
      throw err;
    }
  },

  /**
   * Register a new user
   */
  async register(name, email, password) {
    try {
      const data = await apiClient('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
      });

      if (data?.token && data?.user) {
        localStorage.setItem(TOKEN_KEY, data.token);
        localStorage.setItem(USER_KEY, JSON.stringify(data.user));
        return { user: data.user, token: data.token, isMock: false };
      }
      return data;
    } catch (err) {
      if (USE_MOCK_FALLBACK && (err.status === 0 || err.status === 404)) {
        console.warn('[DPS Dev Mode] Backend unreachable. Creating mock user session.');
        const mockUser = {
          id: 'usr_mock_' + Date.now(),
          name,
          email,
          role: 'Patient Analyst',
          isMock: true,
        };
        const mockToken = 'mock_jwt_token_dps_sample';
        localStorage.setItem(TOKEN_KEY, mockToken);
        localStorage.setItem(USER_KEY, JSON.stringify(mockUser));
        return { user: mockUser, token: mockToken, isMock: true };
      }
      throw err;
    }
  },

  /**
   * Get current authenticated user profile
   */
  async getCurrentUser() {
    const localUser = this.getStoredUser();
    const token = this.getToken();

    if (!token) return null;

    if (localUser?.isMock) {
      return localUser;
    }

    try {
      const data = await apiClient('/auth/me', { method: 'GET' });
      const user = data.user || data;
      localStorage.setItem(USER_KEY, JSON.stringify(user));
      return user;
    } catch (err) {
      // If local session exists, fall back or expire
      if (localUser) return localUser;
      this.logout();
      return null;
    }
  },

  /**
   * Log out user
   */
  logout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },

  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  },

  getStoredUser() {
    try {
      const raw = localStorage.getItem(USER_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },
};

