import { useState } from 'react';
import { KanbanBoard } from "@/components/kanban/kanbanBoard";
import { SimpleChat } from "@/components/SimpleChat";
import { SimpleAuth } from "@/components/SimpleAuth";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { LogOut, User, Settings, Plus, UserPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Board, CreateBoardData } from "@/types/board";
import { BoardCard } from "@/components/board/BoardCard";
import { CreateBoardDialog } from "@/components/board/CreateBoardDialog";
import { JoinBoardDialog } from "@/components/board/JoinBoardDialog";
import { useToast } from "@/hooks/use-toast";
// Mock data for boards
const mockBoards: Board[] = [
  {
    id: "1",
    title: "Projeto Website",
    description: "Desenvolvimento do novo website da empresa",
    code: "WEB123",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-20"),
    ownerId: "1",
    ownerName: "João Silva",
    memberCount: 3,
    members: [
      { id: "1", name: "João Silva", email: "joao@example.com", role: "owner", joinedAt: new Date("2024-01-15") },
      { id: "2", name: "Maria Santos", email: "maria@example.com", role: "member", joinedAt: new Date("2024-01-16") },
      { id: "3", name: "Carlos Oliveira", email: "carlos@example.com", role: "member", joinedAt: new Date("2024-01-18") }
    ]
  },
  {
    id: "2", 
    title: "App Mobile",
    description: "Aplicativo mobile para gestão de tarefas",
    code: "MOB456",
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-22"),
    ownerId: "2",
    ownerName: "Maria Santos",
    memberCount: 2,
    members: [
      { id: "2", name: "Maria Santos", email: "maria@example.com", role: "owner", joinedAt: new Date("2024-01-10") },
      { id: "1", name: "João Silva", email: "joao@example.com", role: "member", joinedAt: new Date("2024-01-12") }
    ]
  }
];

const AppContent = () => {
  const {
    auth,
    logout
  } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showAuth, setShowAuth] = useState(false);
  const [boards, setBoards] = useState<Board[]>(mockBoards);
  const [selectedBoardId, setSelectedBoardId] = useState<string | null>(null);
  const [showCreateBoard, setShowCreateBoard] = useState(false);
  const [showJoinBoard, setShowJoinBoard] = useState(false);

  const generateBoardCode = (): string => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const handleCreateBoard = (data: CreateBoardData) => {
    const newBoard: Board = {
      id: crypto.randomUUID(),
      title: data.title,
      description: data.description,
      code: generateBoardCode(),
      createdAt: new Date(),
      updatedAt: new Date(),
      ownerId: auth.user?.id || "1",
      ownerName: auth.user?.name || "Usuário",
      memberCount: 1,
      members: [
        {
          id: auth.user?.id || "1",
          name: auth.user?.name || "Usuário",
          email: auth.user?.email || "user@example.com",
          role: "owner",
          joinedAt: new Date()
        }
      ]
    };

    setBoards([...boards, newBoard]);
    toast({
      title: "Quadro criado!",
      description: `Quadro "${data.title}" criado com código ${newBoard.code}`,
    });
  };

  const handleJoinBoard = (code: string) => {
    // Simular busca por código
    const existingBoard = boards.find(b => b.code === code);
    
    if (existingBoard) {
      toast({
        title: "Já está no quadro!",
        description: `Você já faz parte do quadro "${existingBoard.title}"`,
      });
      return;
    }

    // Simular entrada em novo quadro
    const mockNewBoard: Board = {
      id: crypto.randomUUID(),
      title: `Quadro ${code}`,
      description: "Quadro compartilhado",
      code: code,
      createdAt: new Date(),
      updatedAt: new Date(),
      ownerId: "other",
      ownerName: "Outro Usuário",
      memberCount: 2,
      members: [
        {
          id: "other",
          name: "Outro Usuário",
          email: "outro@example.com",
          role: "owner",
          joinedAt: new Date()
        },
        {
          id: auth.user?.id || "1",
          name: auth.user?.name || "Usuário",
          email: auth.user?.email || "user@example.com",
          role: "member",
          joinedAt: new Date()
        }
      ]
    };

    setBoards([...boards, mockNewBoard]);
    toast({
      title: "Entrou no quadro!",
      description: `Você foi adicionado ao quadro "${mockNewBoard.title}"`,
    });
  };
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
        {auth.isAuthenticated ? (
          selectedBoardId ? (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Button 
                  variant="outline" 
                  onClick={() => setSelectedBoardId(null)}
                >
                  ← Voltar aos Quadros
                </Button>
                <h2 className="text-xl font-semibold">
                  {boards.find(b => b.id === selectedBoardId)?.title}
                </h2>
              </div>
              <KanbanBoard />
              <SimpleChat />
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-semibold">Seus Quadros</h2>
                  <p className="text-muted-foreground">
                    Gerencie seus projetos e colabore com sua equipe
                  </p>
                </div>
                <div className="flex gap-3">
                  <Button onClick={() => setShowJoinBoard(true)} variant="outline">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Entrar em Quadro
                  </Button>
                  <Button onClick={() => setShowCreateBoard(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Criar Quadro
                  </Button>
                </div>
              </div>

              {boards.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {boards.map((board) => (
                    <BoardCard
                      key={board.id}
                      board={board}
                      onEnterBoard={(boardId) => {
                        // Store current board data for the kanban board
                        const selectedBoard = boards.find(b => b.id === boardId);
                        if (selectedBoard) {
                          sessionStorage.setItem('currentBoard', JSON.stringify({
                            id: selectedBoard.id,
                            members: selectedBoard.members
                          }));
                        }
                        setSelectedBoardId(boardId);
                      }}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📋</span>
                  </div>
                  <h3 className="text-lg font-medium mb-2">Nenhum quadro encontrado</h3>
                  <p className="text-muted-foreground mb-6">
                    Crie seu primeiro quadro ou entre em um existente usando um código
                  </p>
                  <div className="flex gap-3 justify-center">
                    <Button onClick={() => setShowJoinBoard(true)} variant="outline">
                      <UserPlus className="h-4 w-4 mr-2" />
                      Entrar em Quadro
                    </Button>
                    <Button onClick={() => setShowCreateBoard(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Criar Quadro
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[70vh] space-y-12">
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
          </div>
        )}
      </main>

      <SimpleAuth open={showAuth} onOpenChange={setShowAuth} />
      
      <CreateBoardDialog
        open={showCreateBoard}
        onOpenChange={setShowCreateBoard}
        onCreateBoard={handleCreateBoard}
      />
      
      <JoinBoardDialog
        open={showJoinBoard}
        onOpenChange={setShowJoinBoard}
        onJoinBoard={handleJoinBoard}
      />
    </div>;
};
const Index = () => {
  return <div>
      <AppContent />
    </div>;
};
export default Index;