import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { User } from 'lucide-react';

interface SimpleAuthProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const SimpleAuth = ({ open, onOpenChange }: SimpleAuthProps) => {
  const { login } = useAuth();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const success = await login(email, password);
    if (success) {
      toast({ title: 'Login realizado com sucesso!' });
      onOpenChange(false);
      setEmail('');
      setPassword('');
    } else {
      toast({ 
        title: 'Erro no login',
        description: 'Use: joao@example.com / 123456',
        variant: 'destructive' 
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Entre em sua conta</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <Button type="submit" className="w-full">
            Entrar
          </Button>

          <div className="text-xs text-muted-foreground p-2 bg-muted rounded">
            <strong>Demo:</strong> joao@example.com / 123456
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};