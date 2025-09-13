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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex flex-col">
      {/* Header com design moderno */}
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-sm">
        <div className="flex items-center gap-4 p-4 max-w-4xl mx-auto">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/')}
            className="p-2 h-10 w-10 rounded-full hover:bg-primary/10 hover:text-primary transition-all duration-200"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center shadow-lg">
              <MessageCircle className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">Chat da Equipe</h1>
              <p className="text-xs text-muted-foreground">Colabore em tempo real</p>
            </div>
          </div>
        </div>
      </header>

      {/* Messages com design moderno */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 max-w-4xl mx-auto w-full">
        {messages.map((message) => {
          const isOwnMessage = message.userName === auth.user?.name;
          return (
            <div key={message.id} className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} animate-fade-in`}>
              <div className={`max-w-[85%] sm:max-w-md space-y-2 ${isOwnMessage ? 'items-end' : 'items-start'} flex flex-col`}>
                {/* Nome e timestamp */}
                <div className={`flex items-center gap-2 text-xs text-muted-foreground ${isOwnMessage ? 'flex-row-reverse' : ''}`}>
                  <span className="font-medium">{message.userName}</span>
                  <span>•</span>
                  <span>{formatTime(message.timestamp)}</span>
                </div>
                
                {/* Bolha da mensagem */}
                <div className={`
                  rounded-2xl px-4 py-3 shadow-sm backdrop-blur-sm border transition-all duration-200 hover:shadow-md
                  ${isOwnMessage 
                    ? 'bg-gradient-primary text-white border-primary/20 rounded-br-md' 
                    : 'bg-card/80 text-foreground border-border/50 rounded-bl-md'
                  }
                `}>
                  <p className="text-sm leading-relaxed">{message.content}</p>
                </div>
              </div>
            </div>
          );
        })}
        
        {/* Espaçador para scroll suave */}
        <div className="h-4"></div>
      </div>

      {/* Input Area com design moderno */}
      <div className="sticky bottom-0 bg-background/80 backdrop-blur-xl border-t border-border/50 p-4 sm:p-6 shadow-lg">
        <div className="flex gap-3 max-w-4xl mx-auto">
          <div className="flex-1 relative">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Digite sua mensagem..."
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              className="h-12 pl-4 pr-4 text-base border-2 border-border/50 bg-background/80 backdrop-blur-sm focus:border-primary/50 focus:bg-background rounded-xl transition-all duration-200"
            />
          </div>
          <Button 
            onClick={sendMessage} 
            size="sm"
            disabled={!newMessage.trim()}
            className="h-12 w-12 bg-gradient-primary hover:shadow-lg text-white rounded-xl transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Chat;