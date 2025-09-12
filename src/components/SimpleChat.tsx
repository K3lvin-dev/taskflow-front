import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const SimpleChat = () => {
  const navigate = useNavigate();

  return (
    <Button
      onClick={() => navigate('/chat')}
      className="fixed bottom-4 right-4 rounded-full h-12 w-12 p-0 shadow-lg"
    >
      <MessageCircle className="h-5 w-5" />
    </Button>
  );
};