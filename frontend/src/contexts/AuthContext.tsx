import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { apiRequest } from '@/lib/api';

type User = { id: number; name: string; email: string };

interface AuthContextValue {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const TOKEN_KEY = 'krishimitra_token';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(TOKEN_KEY));
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const bootstrap = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const data = await apiRequest<{ user: User }>('/api/auth/me', { token });
        setUser(data.user);
      } catch {
        localStorage.removeItem(TOKEN_KEY);
        setToken(null);
      } finally {
        setLoading(false);
      }
    };

    bootstrap();
  }, [token]);

  const handleAuthSuccess = (newToken: string, nextUser: User) => {
    setToken(newToken);
    setUser(nextUser);
    localStorage.setItem(TOKEN_KEY, newToken);
  };

  const login = async (email: string, password: string) => {
    const data = await apiRequest<{ token: string; user: User }>('/api/auth/login', {
      method: 'POST',
      body: { email, password },
    });
    handleAuthSuccess(data.token, data.user);
  };

  const signup = async (name: string, email: string, password: string) => {
    const data = await apiRequest<{ token: string; user: User }>('/api/auth/signup', {
      method: 'POST',
      body: { name, email, password },
    });
    handleAuthSuccess(data.token, data.user);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem(TOKEN_KEY);
  };

  const value = useMemo(
    () => ({ user, token, loading, login, signup, logout }),
    [user, token, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
