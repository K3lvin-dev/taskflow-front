import { useState } from 'react';
import { KanbanBoard } from "@/components/kanban/KanbanBoard";
import { SimpleChat } from "@/components/SimpleChat";
import { SimpleAuth } from "@/components/SimpleAuth";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { LogOut, User, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AppContent = () => {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();
  const [showAuth, setShowAuth] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-background/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="text-xl font-bold text-primary">KanbanPro</h1>
          
          <div className="flex items-center gap-3">
            {auth.isAuthenticated ? (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 text-sm">
                  <User className="h-4 w-4" />
                  {auth.user?.name}
                </div>
                <Button variant="ghost" size="sm" onClick={() => navigate('/settings')}>
                  <Settings className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={logout}>
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Button onClick={() => setShowAuth(true)}>
                Entrar
              </Button>
            )}
          </div>
        </div>
      </header>
      
      <main className="container mx-auto p-4">
        {auth.isAuthenticated ? (
          <>
            <KanbanBoard />
            <SimpleChat />
          </>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold">Bem-vindo ao KanbanPro</h2>
              <p className="text-muted-foreground max-w-md">
                Organize suas tarefas, colabore com sua equipe e mantenha-se produtivo
                com nossa plataforma completa de gerenciamento de projetos.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
              <div className="text-center space-y-2 p-6 border rounded-lg">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                  <span className="text-2xl">📋</span>
                </div>
                <h3 className="font-semibold">Quadros Kanban</h3>
                <p className="text-sm text-muted-foreground">
                  Organize tarefas com quadros intuitivos e drag & drop
                </p>
              </div>
              
              <div className="text-center space-y-2 p-6 border rounded-lg">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                  <span className="text-2xl">💬</span>
                </div>
                <h3 className="font-semibold">Chat em Tempo Real</h3>
                <p className="text-sm text-muted-foreground">
                  Comunique-se instantaneamente com sua equipe
                </p>
              </div>
              
              <div className="text-center space-y-2 p-6 border rounded-lg">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                  <span className="text-2xl">👥</span>
                </div>
                <h3 className="font-semibold">Colaboração</h3>
                <p className="text-sm text-muted-foreground">
                  Trabalhe junto com atribuições e permissões
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      <SimpleAuth open={showAuth} onOpenChange={setShowAuth} />
    </div>
  );
};

const Index = () => {
  return (
    <div className="animate-fade-in">
      <AppContent />
    </div>
  );
};

export default Index;
