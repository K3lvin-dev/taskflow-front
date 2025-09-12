import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { KanbanColumn } from "./KanbanColumn";
import { MobileColumnTabs } from "./MobileColumnTabs";
import { Column, Task, ColumnType } from "@/types/kanban";
import { useSwipeGesture } from "@/hooks/useSwipeGesture";
import { cn } from "@/lib/utils";

const initialColumns: Column[] = [
  {
    id: "todo",
    title: "A Fazer",
    color: "todo",
    tasks: [
      {
        id: "1",
        title: "Design da landing page",
        description: "Criar um design moderno e responsivo para a página inicial",
        priority: "high",
        assignee: "João Silva",
        tags: ["design", "ui/ux"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "2", 
        title: "Configurar banco de dados",
        description: "Configurar banco PostgreSQL com schemas apropriados",
        priority: "medium",
        assignee: "Maria Santos",
        tags: ["backend", "database"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  },
  {
    id: "doing",
    title: "Fazendo",
    color: "doing",
    tasks: [
      {
        id: "3",
        title: "Implementar autenticação",
        description: "Adicionar funcionalidade de login e registro de usuários",
        priority: "high",
        assignee: "Carlos Oliveira",
        tags: ["frontend", "security"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  },
  {
    id: "done",
    title: "Feito",
    color: "done",
    tasks: [
      {
        id: "4",
        title: "Configuração inicial do projeto",
        description: "Inicializar projeto com dependências necessárias",
        priority: "low",
        assignee: "Ana Costa",
        tags: ["setup", "inicial"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  },
];

export function KanbanBoard() {
  const navigate = useNavigate();
  const [columns, setColumns] = useState<Column[]>(initialColumns);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeMobileColumn, setActiveMobileColumn] = useState<ColumnType>(initialColumns[0]?.id || "todo");

  // Listen for task editor results
  useEffect(() => {
    const handleStorageChange = () => {
      const result = sessionStorage.getItem('taskEditorResult');
      if (result) {
        const data = JSON.parse(result);
        sessionStorage.removeItem('taskEditorResult');

        if (data.action === 'create') {
          const newTask: Task = {
            id: crypto.randomUUID(),
            title: data.taskData.title,
            description: data.taskData.description,
            priority: data.taskData.priority,
            assignee: data.taskData.assignee,
            tags: data.taskData.tags,
            createdAt: new Date(),
            updatedAt: new Date(),
          };

          setColumns((columns) =>
            columns.map((column) =>
              column.id === data.taskData.columnId
                ? { ...column, tasks: [...column.tasks, newTask] }
                : column
            )
          );
        } else if (data.action === 'save') {
          setColumns((columns) =>
            columns.map((column) => ({
              ...column,
              tasks: column.tasks.map((task) =>
                task.id === data.taskData.id 
                  ? { ...task, ...data.taskData, updatedAt: new Date() } 
                  : task
              ),
            }))
          );
        } else if (data.action === 'delete') {
          setColumns((columns) =>
            columns.map((column) => ({
              ...column,
              tasks: column.tasks.filter((task) => task.id !== data.taskId),
            }))
          );
        }
      }
    };

    // Check immediately in case we just returned from the editor
    handleStorageChange();

    // Listen for future changes
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Mobile column navigation
  const navigateToColumn = (direction: 'prev' | 'next') => {
    const currentIndex = filteredColumns.findIndex(col => col.id === activeMobileColumn);
    let newIndex;
    
    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : filteredColumns.length - 1;
    } else {
      newIndex = currentIndex < filteredColumns.length - 1 ? currentIndex + 1 : 0;
    }
    
    setActiveMobileColumn(filteredColumns[newIndex].id);
  };

  // Swipe gesture setup
  const swipeRef = useSwipeGesture({
    onSwipeLeft: () => navigateToColumn('next'),
    onSwipeRight: () => navigateToColumn('prev'),
    threshold: 50,
  });

  const findTaskById = (id: string): Task | null => {
    for (const column of columns) {
      const task = column.tasks.find((task) => task.id === id);
      if (task) return task;
    }
    return null;
  };

  const findColumnByTaskId = (taskId: string): Column | null => {
    return columns.find((column) =>
      column.tasks.some((task) => task.id === taskId)
    ) || null;
  };

  const findColumnById = (id: string): Column | null => {
    return columns.find((column) => column.id === id) || null;
  };

  const handleAddTask = (columnId: ColumnType) => {
    navigate(`/task/new?column=${columnId}`);
  };

  const handleEditTask = (task: Task) => {
    // Store task data in sessionStorage for the editor
    sessionStorage.setItem(`editTask_${task.id}`, JSON.stringify(task));
    navigate(`/task/edit/${task.id}`);
  };

  const handleSwipeToColumn = (taskId: string, targetColumn: ColumnType) => {
    const task = findTaskById(taskId);
    if (!task) return;

    setColumns((columns) =>
      columns.map((column) => {
        if (column.tasks.some((t) => t.id === taskId)) {
          // Remove task from current column
          return {
            ...column,
            tasks: column.tasks.filter((t) => t.id !== taskId),
          };
        } else if (column.id === targetColumn) {
          // Add task to target column
          return {
            ...column,
            tasks: [...column.tasks, task],
          };
        }
        return column;
      })
    );
  };


  const filteredColumns = columns.map((column) => ({
    ...column,
    tasks: column.tasks.filter((task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    ),
  }));

  return (
    <div className="min-h-screen bg-background">
      <div className="h-screen flex flex-col">
        {/* Header - Only on desktop */}
        <div className="hidden md:block p-4 md:p-6 flex-shrink-0">
          <div className="flex items-center justify-between mb-4">
            <div className="text-center md:text-left">
              <h1 className="text-2xl md:text-3xl font-bold">
                Quadro Kanban
              </h1>
              <p className="text-muted-foreground mt-1 text-sm md:text-base">
                Organize e acompanhe suas tarefas de projeto
              </p>
            </div>
          </div>
          
          {/* Search - responsive */}
          <div className="w-full max-w-2xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Buscar tarefas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 text-base"
              />
            </div>
          </div>
        </div>

        {/* Mobile search bar */}
        <div className="md:hidden p-3 flex-shrink-0">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Buscar tarefas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 text-base"
            />
          </div>
        </div>

        {/* Mobile Column Tabs */}
        <div className="p-1 flex-shrink-0">
          <MobileColumnTabs
            columns={filteredColumns}
            activeColumnId={activeMobileColumn}
            onColumnSelect={setActiveMobileColumn}
          />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 min-h-0 bg-background">
          <div className="h-full flex flex-col">
            {/* Desktop View */}
            <div className="hidden md:block flex-1 min-h-0 p-2">
            <div className="flex gap-4 h-full overflow-x-auto scrollbar-hide">
                {filteredColumns.map((column, index) => (
                  <div 
                    key={column.id} 
                    className="flex-shrink-0 h-full min-w-80 w-80"
                  >
                        <KanbanColumn
                          column={column}
                          onAddTask={handleAddTask}
                          onEditTask={handleEditTask}
                          onSwipeToColumn={handleSwipeToColumn}
                        />
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile View */}
            <div className="md:hidden flex-1 min-h-0 p-1" ref={swipeRef}>
              <div className="h-full flex flex-col">
                {/* Active column - full width */}
                <div className="flex-1 min-h-0">
                  {filteredColumns
                    .filter(column => column.id === activeMobileColumn)
                    .map((column) => (
                      <div key={column.id} className="w-full h-full">
                        <KanbanColumn
                          column={column}
                          onAddTask={handleAddTask}
                          onEditTask={handleEditTask}
                          onSwipeToColumn={handleSwipeToColumn}
                        />
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        
      </div>
    </div>
  );
}