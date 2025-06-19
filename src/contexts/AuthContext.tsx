
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  username: string;
  streakCount: number;
  totalSubmissions: number;
  bestScore: number;
  badges: string[];
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored token on mount
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (username: string, password: string) => {
    try {
      // Simulate API call
      const mockResponse = {
        token: 'mock_jwt_token_' + Date.now(),
        user: {
          id: '1',
          username,
          streakCount: 7,
          totalSubmissions: 25,
          bestScore: 148,
          badges: ['Triple Drop', 'Weekly Master']
        }
      };

      localStorage.setItem('token', mockResponse.token);
      localStorage.setItem('user', JSON.stringify(mockResponse.user));
      setToken(mockResponse.token);
      setUser(mockResponse.user);
    } catch (error) {
      throw new Error('Login failed');
    }
  };

  const register = async (username: string, password: string) => {
    try {
      // Simulate API call
      const mockResponse = {
        token: 'mock_jwt_token_' + Date.now(),
        user: {
          id: '1',
          username,
          streakCount: 0,
          totalSubmissions: 0,
          bestScore: 0,
          badges: []
        }
      };

      localStorage.setItem('token', mockResponse.token);
      localStorage.setItem('user', JSON.stringify(mockResponse.user));
      setToken(mockResponse.token);
      setUser(mockResponse.user);
    } catch (error) {
      throw new Error('Registration failed');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
