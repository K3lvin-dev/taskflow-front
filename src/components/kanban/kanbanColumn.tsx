import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { TaskCard } from "./TaskCard";
import { Column, Task } from "@/types/kanban";
import { cn } from "@/lib/utils";

interface KanbanColumnProps {
  column: Column;
  onAddTask: (columnId: string) => void;
  onEditTask: (task: Task) => void;
  onSwipeToColumn: (taskId: string, targetColumn: string) => void;
}

const columnStyles = {
  todo: "border-kanban-todo/30 bg-kanban-todo/5",
  doing: "border-primary/30 bg-primary/5",
  done: "border-kanban-done/30 bg-kanban-done/5",
};

const headerStyles = {
  todo: "text-kanban-todo",
  doing: "text-primary", 
  done: "text-kanban-done",
};

export function KanbanColumn({ 
  column, 
  onAddTask, 
  onEditTask, 
  onSwipeToColumn 
}: KanbanColumnProps) {

  return (
    <Card className={cn(
      "glass-effect",
      "w-full flex-shrink-0",
      "h-full flex flex-col",
      columnStyles[column.color]
    )}>
      <CardHeader className="pb-2 px-3 flex-shrink-0">
        <div className="flex items-center justify-between">
          <CardTitle className={cn("text-sm font-semibold flex items-center gap-2", headerStyles[column.color])}>
            <div className={cn("w-2.5 h-2.5 rounded-full flex-shrink-0", column.color === 'todo' ? 'bg-kanban-todo' : column.color === 'doing' ? 'bg-primary' : 'bg-kanban-done')} />
            <span className="truncate">{column.title}</span>
            <span className="text-xs text-muted-foreground font-normal flex-shrink-0 bg-muted/30 px-1.5 py-0.5 rounded-full min-w-[1.5rem] text-center">
              {column.tasks.length}
            </span>
          </CardTitle>
        </div>
      </CardHeader>
      
      <CardContent className="px-3 pb-3 flex-1 flex flex-col min-h-0">
        <div className="flex-1 min-h-0 overflow-y-auto scrollbar-hide space-y-2">
          <div className="space-y-2 py-1">
            {column.tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                currentColumn={column.id}
                onEdit={onEditTask}
                onSwipeToColumn={onSwipeToColumn}
              />
            ))}
          </div>
          
          {/* Empty state */}
          {column.tasks.length === 0 && (
            <div className="flex-1 flex items-center justify-center min-h-[120px]">
              <div className="text-center text-muted-foreground/50">
                <div className={cn("w-6 h-6 rounded-full mx-auto mb-2 opacity-30", 
                  column.color === 'todo' ? 'bg-kanban-todo' : 
                  column.color === 'doing' ? 'bg-primary' : 
                  'bg-kanban-done')} />
                <p className="text-xs">Nenhuma tarefa</p>
              </div>
            </div>
          )}
        </div>
        
        <div className="flex-shrink-0 pt-2 mt-2 border-t border-border/20">
          <Button
            variant="ghost"
            className="w-full border-2 border-dashed border-primary/30 h-8 text-xs font-normal text-primary"
            onClick={() => onAddTask(column.id)}
          >
            <Plus className="h-3.5 w-3.5 mr-1.5" />
            <span className="hidden sm:inline">Adicionar tarefa</span>
            <span className="sm:hidden">Adicionar</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}