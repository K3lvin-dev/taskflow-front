import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Calendar, Copy } from "lucide-react";
import { Board } from "@/types/board";
import { useToast } from "@/hooks/useToast";
import { useAuth } from "@/hooks/useAuth";

interface BoardCardProps {
  board: Board;
  onEnterBoard: (boardId: string) => void;
  onDeleteBoard?: (boardId: string) => void;
}

export function BoardCard({
  board,
  onEnterBoard,
  onDeleteBoard,
}: BoardCardProps) {
  const { toast } = useToast();
  const { auth } = useAuth();

  const copyCode = () => {
    navigator.clipboard.writeText(board.code);
    toast({
      title: "Código copiado!",
      description:
        "O código do quadro foi copiado para a área de transferência.",
    });
  };

  const isOwner = auth.user?.id === board.ownerId;

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg">{board.title}</CardTitle>
          <Badge variant={isOwner ? "default" : "secondary"}>
            {isOwner ? "Proprietário" : "Membro"}
          </Badge>
        </div>
        {board.description && (
          <p className="text-sm text-muted-foreground">{board.description}</p>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>{board.memberCount} membros</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{board.createdAt.toLocaleDateString()}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 p-2 bg-muted rounded-md">
          <code className="text-sm font-mono flex-1">{board.code}</code>
          <Button size="sm" variant="ghost" onClick={copyCode}>
            <Copy className="h-4 w-4" />
          </Button>
        </div>

        <Button className="w-full" onClick={() => onEnterBoard(board.id)}>
          Entrar no Quadro
        </Button>

        {isOwner && (
          <Button
            className="w-full mt-2"
            variant="destructive"
            onClick={() => {
              if (
                window.confirm("Tem certeza que deseja apagar este quadro?")
              ) {
                if (typeof onDeleteBoard === "function")
                  onDeleteBoard(board.id);
              }
            }}
          >
            Apagar Quadro
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
