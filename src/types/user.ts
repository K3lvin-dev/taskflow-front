export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  status: 'online' | 'offline' | 'away';
  role: 'admin' | 'member' | 'viewer';
  createdAt: Date;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

export interface ChatMessage {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  timestamp: Date;
  type: 'text' | 'system';
}

export interface ChatRoom {
  id: string;
  name: string;
  participants: User[];
  messages: ChatMessage[];
  createdAt: Date;
}