import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, User, Palette, Bell, Shield, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const { auth } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [language, setLanguage] = useState('pt');
  const [notifications, setNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(false);
  
  // Form states
  const [name, setName] = useState(auth.user?.name || '');
  const [email, setEmail] = useState(auth.user?.email || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSaveProfile = () => {
    // Simulate saving profile
    toast({
      title: 'Perfil atualizado',
      description: 'Suas informações foram salvas com sucesso.',
    });
  };

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      toast({
        title: 'Erro',
        description: 'As senhas não coincidem.',
        variant: 'destructive',
      });
      return;
    }
    
    // Simulate password change
    toast({
      title: 'Senha alterada',
      description: 'Sua senha foi alterada com sucesso.',
    });
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="min-h-screen bg-gradient-subtle animate-fade-in">
      <div className="container mx-auto p-6 max-w-4xl">
        <div className="flex items-center gap-4 mb-6 animate-slide-in-left">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/')}
            className="flex items-center gap-2 hover-lift transition-all duration-300"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Button>
          <h1 className="text-3xl font-bold gradient-text">Configurações</h1>
        </div>

        <div className="grid gap-6 stagger-animation">
          {/* Profile Settings */}
          <Card className="glass-effect hover-lift transition-all duration-500 animate-scale-in" style={{"--stagger": 0} as any}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 animate-pulse" />
                Perfil
              </CardTitle>
              <CardDescription>
                Gerencie suas informações pessoais
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Seu nome completo"
                    className="transition-all duration-300 focus:scale-105"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu@email.com"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Função</Label>
                <Input
                  id="role"
                  value={auth.user?.role || ''}
                  disabled
                  className="bg-muted"
                />
              </div>
              <Button onClick={handleSaveProfile} className="w-full md:w-auto bg-gradient-primary hover:opacity-90 transition-all duration-300 hover-lift">
                Salvar Perfil
              </Button>
            </CardContent>
          </Card>

          {/* Password Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Segurança
              </CardTitle>
              <CardDescription>
                Altere sua senha e configure a segurança da conta
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Senha Atual</Label>
                <Input
                  id="current-password"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="••••••••"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="new-password">Nova Senha</Label>
                  <Input
                    id="new-password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirmar Senha</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                  />
                </div>
              </div>
              <Button onClick={handleChangePassword} className="w-full md:w-auto">
                Alterar Senha
              </Button>
            </CardContent>
          </Card>

          {/* Appearance Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Aparência
              </CardTitle>
              <CardDescription>
                Personalize a aparência do aplicativo
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Tema</Label>
                <div className="text-sm text-muted-foreground">
                  Tema claro ativo
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Language & Region */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Idioma e Região
              </CardTitle>
              <CardDescription>
                Configure seu idioma e preferências regionais
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Idioma</Label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pt">Português (BR)</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Español</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notificações
              </CardTitle>
              <CardDescription>
                Configure como você quer receber notificações
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Notificações Push</Label>
                  <p className="text-sm text-muted-foreground">
                    Receba notificações em tempo real no navegador
                  </p>
                </div>
                <Switch
                  checked={notifications}
                  onCheckedChange={setNotifications}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Notificações por Email</Label>
                  <p className="text-sm text-muted-foreground">
                    Receba resumos e atualizações importantes por email
                  </p>
                </div>
                <Switch
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                />
              </div>
            </CardContent>
          </Card>

          {/* Account Info */}
          <Card>
            <CardHeader>
              <CardTitle>Informações da Conta</CardTitle>
              <CardDescription>
                Detalhes sobre sua conta e uso da plataforma
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <Label className="text-muted-foreground">Membro desde</Label>
                  <p className="font-medium">
                    {auth.user?.createdAt?.toLocaleDateString('pt-BR')}
                  </p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Status da conta</Label>
                  <p className="font-medium text-green-600">Ativa</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Última atividade</Label>
                  <p className="font-medium">Agora</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Tarefas criadas</Label>
                  <p className="font-medium">147</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;