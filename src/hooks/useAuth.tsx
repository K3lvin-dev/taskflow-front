import { useState, createContext, useContext, ReactNode } from 'react';
import { User, AuthState } from '@/types/user';

const MOCK_USERS: User[] = [
  {
    id: '1',
    name: 'João Silva',
    email: 'joao@example.com',
    status: 'online',
    role: 'admin',
    createdAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    name: 'Maria Santos',
    email: 'maria@example.com',
    status: 'online',
    role: 'member',
    createdAt: new Date('2024-01-20'),
  },
];

interface AuthContextType {
  auth: AuthState;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  getAllUsers: () => User[];
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
  });

  const login = async (email: string, password: string): Promise<boolean> => {
    const user = MOCK_USERS.find(u => u.email === email);
    if (user && password === '123456') {
      setAuth({ user, isAuthenticated: true });
      return true;
    }
    return false;
  };

  const logout = () => {
    setAuth({ user: null, isAuthenticated: false });
  };

  const getAllUsers = () => MOCK_USERS;

  return (
    <AuthContext.Provider value={{ auth, login, logout, getAllUsers }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};