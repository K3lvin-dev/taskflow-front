import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface JoinBoardDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onJoinBoard: (code: string) => void;
}

export function JoinBoardDialog({ open, onOpenChange, onJoinBoard }: JoinBoardDialogProps) {
  const [code, setCode] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;

    onJoinBoard(code.trim().toUpperCase());
    setCode("");
    onOpenChange(false);
  };

  const formatCode = (value: string) => {
    // Remove caracteres não alfanuméricos e converte para maiúsculo
    const cleaned = value.replace(/[^A-Z0-9]/g, '').toUpperCase();
    // Limita a 6 caracteres
    return cleaned.slice(0, 6);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Entrar em Quadro Existente</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="code">Código do Quadro</Label>
            <Input
              id="code"
              value={code}
              onChange={(e) => setCode(formatCode(e.target.value))}
              placeholder="Digite o código (ex: ABC123)"
              className="font-mono text-center text-lg tracking-wider"
              maxLength={6}
              required
            />
            <p className="text-sm text-muted-foreground">
              Digite o código de 6 caracteres fornecido pelo criador do quadro
            </p>
          </div>
          <div className="flex gap-3">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Cancelar
            </Button>
            <Button type="submit" className="flex-1">
              Entrar no Quadro
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}