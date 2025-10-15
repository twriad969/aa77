import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Plus, GripVertical, Trash2, Edit, Eye } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Module {
  id: string;
  title: string;
  description: string;
  order_index: number;
}

interface Lesson {
  id: string;
  module_id: string;
  title: string;
  embed_url: string;
  order_index: number;
}

const SortableModule = ({ module, onEdit, onDelete }: any) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: module.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className="bg-muted/50 p-4 rounded-lg">
      <div className="flex items-center gap-3">
        <div {...attributes} {...listeners} className="cursor-move">
          <GripVertical className="h-5 w-5 text-muted-foreground" />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold">{module.title}</h4>
          <p className="text-sm text-muted-foreground">{module.description}</p>
        </div>
        <Button variant="ghost" size="sm" onClick={() => onEdit(module)}>
          <Edit className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" onClick={() => onDelete(module.id)}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

const SortableLesson = ({ lesson, onEdit, onDelete, onPreview }: any) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: lesson.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className="bg-muted/50 p-3 rounded-lg">
      <div className="flex items-center gap-3">
        <div {...attributes} {...listeners} className="cursor-move">
          <GripVertical className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="flex-1">
          <p className="font-medium text-sm">{lesson.title}</p>
        </div>
        <Button variant="ghost" size="sm" onClick={() => onPreview(lesson)}>
          <Eye className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" onClick={() => onEdit(lesson)}>
          <Edit className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" onClick={() => onDelete(lesson.id)}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export const CourseManagement = () => {
  const [modules, setModules] = useState<Module[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [newModule, setNewModule] = useState({ title: "", description: "" });
  const [newLesson, setNewLesson] = useState({ module_id: "", title: "", embed_url: "" });
  const [previewLesson, setPreviewLesson] = useState<Lesson | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    loadModules();
    loadLessons();
  }, []);

  const loadModules = async () => {
    const { data } = await supabase
      .from('course_modules')
      .select('*')
      .order('order_index', { ascending: true });
    if (data) setModules(data);
  };

  const loadLessons = async () => {
    const { data } = await supabase
      .from('course_lessons')
      .select('*')
      .order('order_index', { ascending: true });
    if (data) setLessons(data);
  };

  const handleAddModule = async () => {
    if (!newModule.title.trim()) {
      toast.error("Module title is required");
      return;
    }

    const { error } = await supabase
      .from('course_modules')
      .insert({
        title: newModule.title,
        description: newModule.description,
        order_index: modules.length,
      });

    if (error) {
      toast.error("Failed to add module");
    } else {
      toast.success("Module added successfully");
      setNewModule({ title: "", description: "" });
      loadModules();
    }
  };

  const handleAddLesson = async () => {
    if (!newLesson.title.trim() || !newLesson.embed_url.trim() || !newLesson.module_id) {
      toast.error("All fields are required");
      return;
    }

    const moduleLessons = lessons.filter(l => l.module_id === newLesson.module_id);
    
    const { error } = await supabase
      .from('course_lessons')
      .insert({
        module_id: newLesson.module_id,
        title: newLesson.title,
        embed_url: newLesson.embed_url,
        order_index: moduleLessons.length,
      });

    if (error) {
      toast.error("Failed to add lesson");
    } else {
      toast.success("Lesson added successfully");
      setNewLesson({ module_id: "", title: "", embed_url: "" });
      loadLessons();
    }
  };

  const handleDeleteModule = async (id: string) => {
    const { error } = await supabase
      .from('course_modules')
      .delete()
      .eq('id', id);

    if (error) {
      toast.error("Failed to delete module");
    } else {
      toast.success("Module deleted successfully");
      loadModules();
      loadLessons();
    }
  };

  const handleDeleteLesson = async (id: string) => {
    const { error } = await supabase
      .from('course_lessons')
      .delete()
      .eq('id', id);

    if (error) {
      toast.error("Failed to delete lesson");
    } else {
      toast.success("Lesson deleted successfully");
      loadLessons();
    }
  };

  const handleModuleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setModules((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);
        const newItems = arrayMove(items, oldIndex, newIndex);

        // Update order in database
        newItems.forEach(async (item, index) => {
          await supabase
            .from('course_modules')
            .update({ order_index: index })
            .eq('id', item.id);
        });

        return newItems;
      });
    }
  };

  const handleLessonDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setLessons((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);
        const newItems = arrayMove(items, oldIndex, newIndex);

        // Update order in database
        newItems.forEach(async (item, index) => {
          await supabase
            .from('course_lessons')
            .update({ order_index: index })
            .eq('id', item.id);
        });

        return newItems;
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Add Module */}
      <Card className="p-6 surface-overlay">
        <h3 className="text-xl font-bold mb-4">Add New Module</h3>
        <div className="space-y-4">
          <div>
            <Label>Module Title</Label>
            <Input
              value={newModule.title}
              onChange={(e) => setNewModule({ ...newModule, title: e.target.value })}
              placeholder="Enter module title"
            />
          </div>
          <div>
            <Label>Description</Label>
            <Textarea
              value={newModule.description}
              onChange={(e) => setNewModule({ ...newModule, description: e.target.value })}
              placeholder="Enter module description"
            />
          </div>
          <Button onClick={handleAddModule}>
            <Plus className="mr-2 h-4 w-4" />
            Add Module
          </Button>
        </div>
      </Card>

      {/* Modules List */}
      <Card className="p-6 surface-overlay">
        <h3 className="text-xl font-bold mb-4">Course Modules</h3>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleModuleDragEnd}
        >
          <SortableContext
            items={modules.map(m => m.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-3">
              {modules.map((module) => (
                <SortableModule
                  key={module.id}
                  module={module}
                  onEdit={() => {}}
                  onDelete={handleDeleteModule}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </Card>

      {/* Add Lesson */}
      <Card className="p-6 surface-overlay">
        <h3 className="text-xl font-bold mb-4">Add New Lesson</h3>
        <div className="space-y-4">
          <div>
            <Label>Select Module</Label>
            <select
              className="w-full p-2 rounded-md border border-input bg-background"
              value={newLesson.module_id}
              onChange={(e) => setNewLesson({ ...newLesson, module_id: e.target.value })}
            >
              <option value="">Select a module</option>
              {modules.map((module) => (
                <option key={module.id} value={module.id}>
                  {module.title}
                </option>
              ))}
            </select>
          </div>
          <div>
            <Label>Lesson Title</Label>
            <Input
              value={newLesson.title}
              onChange={(e) => setNewLesson({ ...newLesson, title: e.target.value })}
              placeholder="Enter lesson title"
            />
          </div>
          <div>
            <Label>Embed/iframe URL</Label>
            <Input
              value={newLesson.embed_url}
              onChange={(e) => setNewLesson({ ...newLesson, embed_url: e.target.value })}
              placeholder="Enter video embed URL or iframe src"
            />
          </div>
          <Button onClick={handleAddLesson}>
            <Plus className="mr-2 h-4 w-4" />
            Add Lesson
          </Button>
        </div>
      </Card>

      {/* Lessons List */}
      {modules.map((module) => {
        const moduleLessons = lessons.filter(l => l.module_id === module.id);
        if (moduleLessons.length === 0) return null;

        return (
          <Card key={module.id} className="p-6 surface-overlay">
            <h3 className="text-xl font-bold mb-4">{module.title} - Lessons</h3>
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleLessonDragEnd}
            >
              <SortableContext
                items={moduleLessons.map(l => l.id)}
                strategy={verticalListSortingStrategy}
              >
                <div className="space-y-2">
                  {moduleLessons.map((lesson) => (
                    <SortableLesson
                      key={lesson.id}
                      lesson={lesson}
                      onEdit={() => {}}
                      onDelete={handleDeleteLesson}
                      onPreview={setPreviewLesson}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          </Card>
        );
      })}

      {/* Preview Dialog */}
      <Dialog open={!!previewLesson} onOpenChange={() => setPreviewLesson(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{previewLesson?.title}</DialogTitle>
          </DialogHeader>
          <div className="aspect-video">
            <iframe
              src={previewLesson?.embed_url}
              className="w-full h-full rounded-lg"
              allowFullScreen
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
