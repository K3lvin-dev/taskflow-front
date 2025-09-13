import { useState } from 'react';
import { KanbanBoard } from "@/components/kanban/KanbanBoard";
import { SimpleChat } from "@/components/SimpleChat";
import { SimpleAuth } from "@/components/SimpleAuth";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { LogOut, User, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
const AppContent = () => {
  const {
    auth,
    logout
  } = useAuth();
  const navigate = useNavigate();
  const [showAuth, setShowAuth] = useState(false);
  return <div className="min-h-screen bg-background">
      <header className="border-b bg-background/95 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            
            <h1 className="text-xl font-semibold text-foreground">TaskFlow</h1>
          </div>
          
          <div className="flex items-center gap-3">
            {auth.isAuthenticated ? <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 sm:gap-3 text-sm bg-card border rounded-full px-2 sm:px-4 py-1.5 sm:py-2">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-primary rounded-full flex items-center justify-center">
                    <User className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-white" />
                  </div>
                  <span className="font-medium text-xs sm:text-sm hidden xs:block max-w-[80px] sm:max-w-none truncate">{auth.user?.name}</span>
                </div>
                <Button variant="ghost" size="sm" className="h-8 w-8 sm:h-9 sm:w-9" onClick={() => navigate('/settings')}>
                  <Settings className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 sm:h-9 sm:w-9" onClick={logout}>
                  <LogOut className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </Button>
              </div> : <Button onClick={() => setShowAuth(true)}>
                Entrar
              </Button>}
          </div>
        </div>
      </header>
      
      <main className="container mx-auto p-4">
        {auth.isAuthenticated ? <>
            <KanbanBoard />
            <SimpleChat />
          </> : <div className="flex flex-col items-center justify-center min-h-[70vh] space-y-12">
            <div className="text-center space-y-6 max-w-2xl">
              <h2 className="text-4xl font-light text-foreground">
                Bem-vindo ao TaskFlow
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Organize suas tarefas, colabore com sua equipe e mantenha-se produtivo.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
              <div className="text-center space-y-4 p-6">
                <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl">📋</span>
                </div>
                <h3 className="font-medium text-foreground">Quadros Kanban</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Organize tarefas com quadros intuitivos
                </p>
              </div>
              
              <div className="text-center space-y-4 p-6">
                <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl">💬</span>
                </div>
                <h3 className="font-medium text-foreground">Chat em Tempo Real</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Comunique-se com sua equipe
                </p>
              </div>
              
              <div className="text-center space-y-4 p-6">
                <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl">👥</span>
                </div>
                <h3 className="font-medium text-foreground">Colaboração</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Trabalhe junto com sua equipe
                </p>
              </div>
            </div>
          </div>}
      </main>

      <SimpleAuth open={showAuth} onOpenChange={setShowAuth} />
    </div>;
};
const Index = () => {
  return <div>
      <AppContent />
    </div>;
};
export default Index;