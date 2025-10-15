import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LogOut, Bell, Play } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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

interface Notification {
  id: string;
  title: string;
  message: string;
  type: string;
}

export const CourseContent = ({ customerData, onLogout }: any) => {
  const [modules, setModules] = useState<Module[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

  useEffect(() => {
    loadCourseData();
    loadNotifications();
  }, []);

  const loadCourseData = async () => {
    const { data: modulesData } = await supabase
      .from('course_modules')
      .select('*')
      .order('order_index', { ascending: true });

    const { data: lessonsData } = await supabase
      .from('course_lessons')
      .select('*')
      .order('order_index', { ascending: true });

    if (modulesData) setModules(modulesData);
    if (lessonsData) {
      setLessons(lessonsData);
      if (lessonsData.length > 0) {
        setSelectedLesson(lessonsData[0]);
      }
    }
  };

  const loadNotifications = async () => {
    const { data } = await supabase
      .from('notifications')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false })
      .limit(5);

    if (data) setNotifications(data);
  };

  const getLessonsByModule = (moduleId: string) => {
    return lessons.filter(l => l.module_id === moduleId);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--brand-bg)' }}>
      <div className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Halal Income Mastery</h1>
            <p className="text-sm text-muted-foreground">Welcome, {customerData.full_name}</p>
          </div>
          <Button onClick={onLogout} variant="outline">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 md:p-6">
        {/* Notifications */}
        {notifications.length > 0 && (
          <div className="mb-6 space-y-3">
            {notifications.map((notif) => (
              <Card
                key={notif.id}
                className={`p-4 surface-overlay border-l-4 ${
                  notif.type === 'success' ? 'border-l-green-500' :
                  notif.type === 'warning' ? 'border-l-yellow-500' :
                  notif.type === 'error' ? 'border-l-red-500' :
                  'border-l-blue-500'
                }`}
              >
                <div className="flex items-start gap-3">
                  <Bell className="h-5 w-5 mt-0.5" />
                  <div>
                    <h4 className="font-semibold">{notif.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{notif.message}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Course Modules Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-6 surface-overlay">
              <h3 className="text-xl font-bold mb-4 bangla">কোর্স মডিউল</h3>
              <Accordion type="single" collapsible className="space-y-2">
                {modules.map((module) => {
                  const moduleLessons = getLessonsByModule(module.id);
                  return (
                    <AccordionItem key={module.id} value={module.id}>
                      <AccordionTrigger className="text-left">
                        <div>
                          <p className="font-semibold">{module.title}</p>
                          {module.description && (
                            <p className="text-xs text-muted-foreground">{module.description}</p>
                          )}
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2 pl-4">
                          {moduleLessons.map((lesson) => (
                            <button
                              key={lesson.id}
                              onClick={() => setSelectedLesson(lesson)}
                              className={`w-full text-left p-2 rounded-lg text-sm flex items-center gap-2 transition-colors ${
                                selectedLesson?.id === lesson.id
                                  ? 'bg-primary text-primary-foreground'
                                  : 'hover:bg-muted'
                              }`}
                            >
                              <Play className="h-3 w-3" />
                              {lesson.title}
                            </button>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            </Card>
          </div>

          {/* Video Player */}
          <div className="lg:col-span-2">
            <Card className="p-6 surface-overlay">
              {selectedLesson ? (
                <div>
                  <h2 className="text-2xl font-bold mb-4">{selectedLesson.title}</h2>
                  <div className="aspect-video bg-black rounded-lg overflow-hidden">
                    <iframe
                      src={selectedLesson.embed_url}
                      className="w-full h-full"
                      allowFullScreen
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    />
                  </div>
                </div>
              ) : (
                <div className="aspect-video flex items-center justify-center bg-muted rounded-lg">
                  <p className="text-muted-foreground bangla">একটি লেসন নির্বাচন করুন</p>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
