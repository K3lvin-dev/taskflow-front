import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Column, ColumnType } from "@/types/kanban";
import { cn } from "@/lib/utils";

interface MobileColumnTabsProps {
  columns: Column[];
  activeColumnId: ColumnType;
  onColumnSelect: (columnId: ColumnType) => void;
}

const tabStyles = {
  todo: "data-[active=true]:bg-kanban-todo/20 data-[active=true]:text-kanban-todo data-[active=true]:border-kanban-todo/50",
  doing: "data-[active=true]:bg-kanban-in-progress/20 data-[active=true]:text-kanban-in-progress data-[active=true]:border-kanban-in-progress/50",
  done: "data-[active=true]:bg-kanban-done/20 data-[active=true]:text-kanban-done data-[active=true]:border-kanban-done/50",
};

export function MobileColumnTabs({ columns, activeColumnId, onColumnSelect }: MobileColumnTabsProps) {
  return (
    <div className="md:hidden mb-3 glass-effect rounded-lg p-2">
      <div className="grid grid-cols-3 gap-2">
        {columns.map((column) => (
          <Button
            key={column.id}
            variant="ghost"
            size="default"
            data-active={activeColumnId === column.id}
            onClick={() => onColumnSelect(column.id)}
            className={cn(
              "flex flex-col items-center justify-center gap-1 h-16 px-2 border text-center",
              "data-[active=false]:border-transparent data-[active=false]:text-muted-foreground",
              "data-[active=true]:shadow-sm",
              tabStyles[column.color]
            )}
          >
            <div className="flex items-center gap-1.5">
              <div className={cn(
                "w-2 h-2 rounded-full flex-shrink-0",
                column.color === 'todo' ? 'bg-kanban-todo' : 
                column.color === 'doing' ? 'bg-kanban-in-progress' : 
                'bg-kanban-done'
              )} />
              <span className="text-sm font-medium leading-none whitespace-nowrap">{column.title}</span>
            </div>
            <span className="text-xs opacity-70 bg-muted/50 px-1.5 py-0.5 rounded-full min-w-[16px] text-center leading-none">
              {column.tasks.length}
            </span>
          </Button>
        ))}
      </div>
    </div>
  );
}