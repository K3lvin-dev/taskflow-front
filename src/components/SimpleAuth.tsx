import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft } from 'lucide-react';
interface SimpleAuthProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
export const SimpleAuth = ({
  open,
  onOpenChange
}: SimpleAuthProps) => {
  const {
    login
  } = useAuth();
  const {
    toast
  } = useToast();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      const success = await login(email, password);
      if (success) {
        toast({
          title: 'Login realizado com sucesso!'
        });
        onOpenChange(false);
        resetForm();
      } else {
        toast({
          title: 'Erro no login',
          description: 'Use: joao@example.com / 123456',
          variant: 'destructive'
        });
      }
    } else {
      // Validação para cadastro
      if (password !== confirmPassword) {
        toast({
          title: 'Erro no cadastro',
          description: 'As senhas não coincidem',
          variant: 'destructive'
        });
        return;
      }
      if (password.length < 6) {
        toast({
          title: 'Erro no cadastro',
          description: 'A senha deve ter pelo menos 6 caracteres',
          variant: 'destructive'
        });
        return;
      }

      // Simular cadastro
      toast({
        title: 'Cadastro simulado',
        description: 'Conecte ao Supabase para funcionalidade real',
        variant: 'default'
      });
    }
  };
  const resetForm = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setName('');
  };
  const toggleMode = () => {
    setIsLogin(!isLogin);
    resetForm();
  };
  if (!open) return null;
  return <div className="fixed top-0 left-0 right-0 bottom-0 z-50 bg-gradient-to-br from-primary/20 via-background to-primary/10" style={{
    width: '100vw',
    height: '100vh',
    margin: 0,
    padding: 0
  }}>
      {/* Decorative circles - hidden on small screens */}
      <div className="hidden sm:block absolute top-10 left-10 w-32 h-32 bg-primary/20 rounded-full blur-xl"></div>
      <div className="hidden sm:block absolute bottom-20 right-20 w-48 h-48 bg-primary/15 rounded-full blur-2xl"></div>
      <div className="hidden sm:block absolute top-1/3 right-1/4 w-24 h-24 bg-primary/25 rounded-full blur-lg"></div>


      {/* Full screen container */}
      <div className="w-full h-full overflow-y-auto overscroll-contain" style={{
      width: '100%',
      height: '100%'
    }}>
        {/* Content wrapper - totalmente responsivo */}
        <div className="w-full h-full flex items-center justify-center p-0 sm:p-6 md:p-8">
          {/* Login card - fluido em mobile, fixo em desktop */}
          <div className="w-full h-full sm:w-[480px] sm:h-[600px] md:w-[520px] md:h-[650px] lg:w-[600px] lg:h-[700px] xl:w-[650px] xl:h-[750px] bg-transparent sm:bg-card/80 backdrop-blur-xl sm:border sm:border-border/50 sm:rounded-3xl sm:shadow-2xl p-6 sm:p-6 md:p-8 lg:p-10 flex flex-col justify-center relative px-[12px]">
            {/* Botão Voltar */}
            <Button variant="ghost" size="sm" onClick={() => onOpenChange(false)} className="absolute top-4 left-4 z-10 w-10 h-10 rounded-full hover:bg-background/10 text-foreground/60 hover:text-foreground/80 transition-all duration-200 touch-manipulation flex items-center justify-center mx-0 px-0 text-base my-0">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            {/* Header - totalmente flexível em mobile */}
            <div className="text-center flex-shrink-0 mb-6 sm:mb-6 md:mb-8">
              <div className="space-y-2 sm:space-y-3">
                <h1 className="text-3xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent leading-tight py-[10px]">
                  {isLogin ? 'Acessar conta' : 'Criar conta'}
                </h1>
                
              </div>
            </div>

            {/* Form - ocupando toda largura horizontal */}
            <div className="flex-1 flex flex-col justify-center min-h-0 px-0 sm:px-0 w-full">
              <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-4 md:space-y-5 flex flex-col justify-center h-full w-full">
                {/* Campos - ocupando máximo espaço horizontal e vertical */}
                <div className="space-y-6 sm:space-y-4 md:space-y-5 flex-1 flex flex-col justify-center w-full">
                  {!isLogin && <div className="space-y-3 w-full">
                      <Label htmlFor="name" className="text-lg sm:text-sm md:text-base font-medium text-foreground/80">Nome completo</Label>
                      <Input id="name" type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Seu nome completo" className="w-full h-16 sm:h-12 md:h-14 lg:h-16 text-xl sm:text-base md:text-base lg:text-lg border-2 border-border/50 bg-background/80 backdrop-blur-sm focus:border-primary/50 focus:bg-background rounded-xl touch-manipulation px-6 sm:px-4" autoComplete="name" required />
                    </div>}
                  
                  <div className="space-y-3 w-full">
                    <Label htmlFor="email" className="text-lg sm:text-sm md:text-base font-medium text-foreground/80">Email</Label>
                    <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="seu@email.com" className="w-full h-16 sm:h-12 md:h-14 lg:h-16 text-xl sm:text-base md:text-base lg:text-lg border-2 border-border/50 bg-background/80 backdrop-blur-sm focus:border-primary/50 focus:bg-background rounded-xl touch-manipulation px-6 sm:px-4" autoComplete="email" inputMode="email" required />
                  </div>

                  <div className="space-y-3 w-full">
                    <Label htmlFor="password" className="text-lg sm:text-sm md:text-base font-medium text-foreground/80">Senha</Label>
                    <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" className="w-full h-16 sm:h-12 md:h-14 lg:h-16 text-xl sm:text-base md:text-base lg:text-lg border-2 border-border/50 bg-background/80 backdrop-blur-sm focus:border-primary/50 focus:bg-background rounded-xl touch-manipulation px-6 sm:px-4" autoComplete={isLogin ? "current-password" : "new-password"} required />
                  </div>

                  {!isLogin && <div className="space-y-3 w-full">
                      <Label htmlFor="confirmPassword" className="text-lg sm:text-sm md:text-base font-medium text-foreground/80">Confirmar senha</Label>
                      <Input id="confirmPassword" type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="••••••••" className="w-full h-16 sm:h-12 md:h-14 lg:h-16 text-xl sm:text-base md:text-base lg:text-lg border-2 border-border/50 bg-background/80 backdrop-blur-sm focus:border-primary/50 focus:bg-background rounded-xl touch-manipulation px-6 sm:px-4" autoComplete="new-password" required />
                    </div>}

                  {/* Espaçador apenas para desktop */}
                  {isLogin && <div className="hidden sm:block h-0 sm:h-[72px] md:h-[86px] lg:h-[98px]"></div>}
                </div>

                {/* Botões - ocupando toda largura */}
                <div className="space-y-4 sm:space-y-4 md:space-y-5 flex-shrink-0 w-full">
                  <Button type="submit" className="w-full h-14 sm:h-12 md:h-14 lg:h-16 text-lg sm:text-base md:text-base lg:text-lg bg-gradient-primary hover:shadow-xl text-white font-semibold rounded-xl touch-manipulation">
                    {isLogin ? 'Entrar' : 'Criar conta'}
                  </Button>

                  <div className="text-center w-full">
                    <button type="button" onClick={toggleMode} className="text-base sm:text-sm md:text-base text-muted-foreground hover:text-primary touch-manipulation py-3 sm:py-2 w-full">
                      {isLogin ? 'Não tem conta? Cadastre-se' : 'Já tem conta? Faça login'}
                    </button>
                  </div>

                  {/* Demo info - ocupando toda largura */}
                  {isLogin ? <div className="w-full text-base sm:text-sm md:text-base text-muted-foreground p-4 sm:p-3 md:p-4 bg-gradient-to-r from-muted/40 to-muted/20 rounded-xl border border-border/30 backdrop-blur-sm">
                      <div className="flex items-center gap-3 sm:gap-2">
                        <div className="w-3 h-3 sm:w-2 sm:h-2 md:w-3 md:h-3 bg-primary rounded-full flex-shrink-0"></div>
                        <span className="break-all"><strong>Demo:</strong> joao@example.com / 123456</span>
                      </div>
                    </div> : <div className="hidden sm:block h-0 sm:h-[50px] md:h-[58px]"></div>}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>;
};