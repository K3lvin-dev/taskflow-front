import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Save, X, Trash2, Plus, User, Tag, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Priority, Task, ColumnType } from "@/types/kanban";

interface TaskEditorProps {}

const TaskEditor = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const columnId = searchParams.get('column') as ColumnType;
  const isEditing = id !== 'new';

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium" as Priority,
    assignee: "",
    tags: [] as string[],
  });

  const [newTag, setNewTag] = useState("");
  const titleRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load task data from sessionStorage if editing
    if (isEditing) {
      const taskData = sessionStorage.getItem(`editTask_${id}`);
      if (taskData) {
        const task = JSON.parse(taskData);
        setFormData({
          title: task.title,
          description: task.description || "",
          priority: task.priority,
          assignee: task.assignee || "",
          tags: task.tags,
        });
      }
    }

    // Auto-focus title field
    setTimeout(() => {
      titleRef.current?.focus();
    }, 100);
  }, [id, isEditing]);

  const handleSave = () => {
    if (!formData.title.trim()) return;

    const result = {
      action: isEditing ? 'save' : 'create',
      taskData: {
        ...formData,
        ...(isEditing ? { id } : {}),
        ...(columnId ? { columnId } : {}),
      }
    };

    sessionStorage.setItem('taskEditorResult', JSON.stringify(result));
    navigate(-1);
  };

  const handleDelete = () => {
    if (!isEditing) return;

    const result = {
      action: 'delete',
      taskId: id
    };

    sessionStorage.setItem('taskEditorResult', JSON.stringify(result));
    navigate(-1);
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleKeyPress = (e: React.KeyboardEvent, action?: () => void) => {
    if (e.key === 'Enter' && action) {
      e.preventDefault();
      action();
    }
  };

  const getPriorityColor = (priority: Priority) => {
    const colors = {
      low: "bg-emerald-100 text-emerald-700 border-emerald-300",
      medium: "bg-amber-100 text-amber-700 border-amber-300", 
      high: "bg-red-100 text-red-700 border-red-300"
    };
    return colors[priority];
  };

  const getPriorityIcon = (priority: Priority) => {
    const icons = {
      low: "🟢",
      medium: "🟡",
      high: "🔴"
    };
    return icons[priority];
  };

  return (
    <div className="flex flex-col w-full h-[100dvh] bg-slate-50">
      {/* Header */}
      <header className="flex items-center justify-between p-4 bg-white border-b border-slate-200 shadow-sm shrink-0">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleCancel}
            className="h-10 w-10 rounded-full"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-lg font-bold text-slate-900">
              {isEditing ? "Editar" : "Nova Tarefa"}
            </h1>
            <p className="text-xs text-slate-500">
              {isEditing ? "Modifique os detalhes" : "Preencha as informações"}
            </p>
          </div>
        </div>
        {isEditing && (
          <Button 
            type="button" 
            variant="ghost" 
            onClick={handleDelete}
            size="icon"
            className="h-10 w-10 rounded-full text-red-600 hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </header>

      {/* Content */}
      <div className="flex-1 flex flex-col min-h-0">
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-4 space-y-4"
        >
        {/* Title Card */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-sm">📝</span>
              </div>
              <span className="font-semibold text-slate-900">Título da Tarefa</span>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <Input
              ref={titleRef}
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Ex: Implementar nova funcionalidade"
              className="h-12 text-base border-slate-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleSave();
                }
              }}
            />
          </CardContent>
        </Card>

        {/* Description Card */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                <span className="text-sm">📄</span>
              </div>
              <span className="font-semibold text-slate-900">Descrição</span>
              <span className="text-xs text-slate-500">(opcional)</span>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Descreva os detalhes da tarefa..."
              className="min-h-[80px] resize-none text-base border-slate-300 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
            />
          </CardContent>
        </Card>

        {/* Priority Card */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                <AlertCircle className="h-4 w-4 text-orange-600" />
              </div>
              <span className="font-semibold text-slate-900">Prioridade</span>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <Select
              value={formData.priority}
              onValueChange={(value: Priority) => 
                setFormData(prev => ({ ...prev, priority: value }))
              }
            >
              <SelectTrigger className="h-12 text-base border-slate-300 focus:border-orange-500 focus:ring-1 focus:ring-orange-500">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">
                  <div className="flex items-center gap-2">
                    <span>🟢</span>
                    <span>Baixa</span>
                  </div>
                </SelectItem>
                <SelectItem value="medium">
                  <div className="flex items-center gap-2">
                    <span>🟡</span>
                    <span>Média</span>
                  </div>
                </SelectItem>
                <SelectItem value="high">
                  <div className="flex items-center gap-2">
                    <span>🔴</span>
                    <span>Alta</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Assignee Card */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                <User className="h-4 w-4 text-green-600" />
              </div>
              <span className="font-semibold text-slate-900">Responsável</span>
              <span className="text-xs text-slate-500">(opcional)</span>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <Input
              value={formData.assignee}
              onChange={(e) => setFormData(prev => ({ ...prev, assignee: e.target.value }))}
              placeholder="Ex: João Silva"
              className="h-12 text-base border-slate-300 focus:border-green-500 focus:ring-1 focus:ring-green-500"
            />
          </CardContent>
        </Card>

        {/* Tags Card */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center">
                <Tag className="h-4 w-4 text-pink-600" />
              </div>
              <span className="font-semibold text-slate-900">Tags</span>
            </div>
          </CardHeader>
          <CardContent className="pt-0 space-y-3">
            <div className="flex gap-2">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Adicionar tag"
                className="flex-1 h-12 text-base border-slate-300 focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
                onKeyDown={(e) => handleKeyPress(e, addTag)}
              />
              <Button
                type="button"
                onClick={addTag}
                variant="outline"
                size="icon"
                disabled={!newTag.trim()}
                className="h-12 w-12 border-slate-300 hover:bg-pink-50 hover:border-pink-300"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="flex items-center gap-1 px-3 py-1.5 bg-pink-100 text-pink-700 border border-pink-200 hover:bg-pink-200"
                  >
                    <span className="text-sm">{tag}</span>
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="hover:text-pink-900"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
        </div>

        {/* Save Button */}
        <div className="p-3 bg-white border-t border-slate-200 shadow-sm shrink-0">
          <Button
            onClick={handleSave}
            disabled={!formData.title.trim()}
            className="w-full h-12 text-base font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300"
          >
            <Save className="h-4 w-4 mr-2" />
            {isEditing ? "Salvar Alterações" : "Criar Tarefa"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TaskEditor;