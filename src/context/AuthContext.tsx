import { createContext, useContext, useEffect, useState } from 'react';
import { getCurrentUser } from '../api/authApi';

const AuthContext = createContext({
  user: null,
  isLoading: true,
  setUser: () => {},
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await getCurrentUser();
        setUser(data);
      } catch (error) {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = async (credentials) => {
    const { data } = await login(credentials);
    setUser(data.user);
    localStorage.setItem('accessToken', data.tokens.accessToken);
  };

  const logout = async () => {
    await logout();
    setUser(null);
    localStorage.removeItem('accessToken');
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);