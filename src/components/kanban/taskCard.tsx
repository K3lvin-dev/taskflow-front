import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreVertical, Clock, User, ChevronLeft, ChevronRight } from "lucide-react";
import { Task, ColumnType } from "@/types/kanban";
import { cn } from "@/lib/utils";

interface TaskCardProps {
  task: Task;
  currentColumn: ColumnType;
  onEdit: (task: Task) => void;
  onSwipeToColumn: (taskId: string, targetColumn: ColumnType) => void;
}

const priorityColors = {
  low: "bg-kanban-done/10 text-kanban-done border-kanban-done/30",
  medium: "bg-primary/10 text-primary border-primary/30",
  high: "bg-destructive/10 text-destructive border-destructive/30",
};

export function TaskCard({ task, currentColumn, onEdit, onSwipeToColumn }: TaskCardProps) {

  const canMoveToPrevious = () => {
    const columns: ColumnType[] = ['todo', 'doing', 'done'];
    const currentIndex = columns.indexOf(currentColumn);
    return currentIndex > 0 ? columns[currentIndex - 1] : null;
  };

  const canMoveToNext = () => {
    const columns: ColumnType[] = ['todo', 'doing', 'done'];
    const currentIndex = columns.indexOf(currentColumn);
    return currentIndex < columns.length - 1 ? columns[currentIndex + 1] : null;
  };

  const getColumnName = (column: ColumnType) => {
    const names = { todo: 'A fazer', doing: 'Fazendo', done: 'Feito' };
    return names[column];
  };

  const getColumnButtonClasses = (column: ColumnType) => {
    const classes = {
      todo: "border-kanban-todo/50 text-kanban-todo",
      doing: "border-primary/50 text-primary",
      done: "border-kanban-done/50 text-kanban-done"
    };
    return classes[column];
  };

  return (
    <div className="relative group">
      <Card
        className={cn(
          "bg-card/60 backdrop-blur-sm border border-border/50"
        )}
      >
      <CardHeader className="pb-2 px-3 pt-3">
        <div className="flex items-start justify-between">
          <h4 className="font-semibold text-sm leading-tight text-foreground flex-1 pr-2">{task.title}</h4>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-5 w-5 opacity-40 flex-shrink-0"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(task);
            }}
          >
            <MoreVertical className="h-3 w-3" />
          </Button>
        </div>
        {task.description && (
          <p className="text-xs text-muted-foreground mt-1 line-clamp-2 leading-relaxed">
            {task.description}
          </p>
        )}
      </CardHeader>
      
      <CardContent className="pt-0 px-3 pb-2">
        <div className="space-y-2">
          {task.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {task.tags.map((tag) => (
                <Badge 
                  key={tag} 
                  variant="secondary" 
                  className="text-xs px-1.5 py-0.5 bg-secondary/60 border border-border/30 h-5"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}
          
          <div className="flex items-center justify-between">
            <Badge 
              variant="outline" 
              className={cn("text-xs h-5 px-1.5", priorityColors[task.priority])}
            >
              {task.priority}
            </Badge>
            
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              {task.assignee && (
                <div className="flex items-center gap-1">
                  <span className="max-w-[60px] truncate">{task.assignee}</span>
                </div>
              )}
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{new Date(task.updatedAt).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Navigation buttons */}
        <div className="flex gap-1.5 mt-2 pt-2 border-t border-border/30">
          {canMoveToPrevious() && (
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onSwipeToColumn(task.id, canMoveToPrevious()!);
              }}
              className={cn("flex-1 h-7 text-xs px-2", getColumnButtonClasses(canMoveToPrevious()!))}
            >
              <ChevronLeft className="h-3 w-3 mr-1" />
              <span className="truncate">{getColumnName(canMoveToPrevious()!)}</span>
            </Button>
          )}
          {canMoveToNext() && (
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onSwipeToColumn(task.id, canMoveToNext()!);
              }}
              className={cn("flex-1 h-7 text-xs px-2", getColumnButtonClasses(canMoveToNext()!))}
            >
              <span className="truncate">{getColumnName(canMoveToNext()!)}</span>
              <ChevronRight className="h-3 w-3 ml-1" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
    </div>
  );
}