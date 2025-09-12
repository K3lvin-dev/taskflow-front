export type Priority = "low" | "medium" | "high";
export type ColumnType = "todo" | "doing" | "done";

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: Priority;
  assignee?: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Column {
  id: ColumnType;
  title: string;
  color: ColumnType;
  tasks: Task[];
}

export interface KanbanBoard {
  id: string;
  title: string;
  columns: Column[];
}