import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Send, User, MessageCircle } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

interface Message {
  id: string;
  userName: string;
  content: string;
  timestamp: Date;
}

const Chat = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      userName: 'Maria Santos',
      content: 'Oi pessoal! Como estão as tarefas?',
      timestamp: new Date(),
    },
  ]);
  const [newMessage, setNewMessage] = useState('');

  const sendMessage = () => {
    if (!newMessage.trim() || !auth.user) return;

    const message: Message = {
      id: Date.now().toString(),
      userName: auth.user.name,
      content: newMessage,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');
  };

  const formatTime = (timestamp: Date) => {
    return timestamp.toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background border-b border-border">
        <div className="flex items-center gap-3 p-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/')}
            className="p-2 h-8 w-8"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-primary" />
            <h1 className="text-lg font-semibold">Chat da Equipe</h1>
          </div>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className="space-y-1">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <User className="h-3 w-3" />
              <span className="font-medium">{message.userName}</span>
              <span>•</span>
              <span>{formatTime(message.timestamp)}</span>
            </div>
            <div className="bg-muted rounded-lg p-3 ml-5 max-w-[85%] sm:max-w-md">
              <p className="text-sm leading-relaxed">{message.content}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="sticky bottom-0 bg-background border-t border-border p-4">
        <div className="flex gap-3 max-w-4xl mx-auto">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Digite sua mensagem..."
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            className="flex-1"
          />
          <Button 
            onClick={sendMessage} 
            size="sm"
            disabled={!newMessage.trim()}
            className="px-3"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Chat;