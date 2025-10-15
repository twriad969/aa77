import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Plus, Trash2, Bell } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: string;
  is_active: boolean;
  created_at: string;
}

export const NotificationManagement = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [newNotification, setNewNotification] = useState({
    title: "",
    message: "",
    type: "info",
  });

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    const { data } = await supabase
      .from('notifications')
      .select('*')
      .order('created_at', { ascending: false });
    if (data) setNotifications(data);
  };

  const handleAddNotification = async () => {
    if (!newNotification.title.trim() || !newNotification.message.trim()) {
      toast.error("Title and message are required");
      return;
    }

    const { error } = await supabase
      .from('notifications')
      .insert({
        title: newNotification.title,
        message: newNotification.message,
        type: newNotification.type,
        is_active: true,
      });

    if (error) {
      toast.error("Failed to add notification");
    } else {
      toast.success("Notification added successfully");
      setNewNotification({ title: "", message: "", type: "info" });
      loadNotifications();
    }
  };

  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    const { error } = await supabase
      .from('notifications')
      .update({ is_active: !currentStatus })
      .eq('id', id);

    if (error) {
      toast.error("Failed to update notification");
    } else {
      toast.success("Notification updated");
      loadNotifications();
    }
  };

  const handleDeleteNotification = async (id: string) => {
    const { error } = await supabase
      .from('notifications')
      .delete()
      .eq('id', id);

    if (error) {
      toast.error("Failed to delete notification");
    } else {
      toast.success("Notification deleted successfully");
      loadNotifications();
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6 surface-overlay">
        <h3 className="text-xl font-bold mb-4">Add New Notification</h3>
        <div className="space-y-4">
          <div>
            <Label>Notification Title</Label>
            <Input
              value={newNotification.title}
              onChange={(e) => setNewNotification({ ...newNotification, title: e.target.value })}
              placeholder="Enter notification title"
            />
          </div>
          <div>
            <Label>Message</Label>
            <Textarea
              value={newNotification.message}
              onChange={(e) => setNewNotification({ ...newNotification, message: e.target.value })}
              placeholder="Enter notification message"
              rows={4}
            />
          </div>
          <div>
            <Label>Type</Label>
            <select
              className="w-full p-2 rounded-md border border-input bg-background"
              value={newNotification.type}
              onChange={(e) => setNewNotification({ ...newNotification, type: e.target.value })}
            >
              <option value="info">Info</option>
              <option value="success">Success</option>
              <option value="warning">Warning</option>
              <option value="error">Error</option>
            </select>
          </div>
          <Button onClick={handleAddNotification}>
            <Plus className="mr-2 h-4 w-4" />
            Add Notification
          </Button>
        </div>
      </Card>

      <Card className="p-6 surface-overlay">
        <h3 className="text-xl font-bold mb-4">All Notifications</h3>
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 rounded-lg border ${
                notification.is_active ? 'bg-muted/50' : 'bg-muted/20 opacity-60'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Bell className="h-4 w-4" />
                    <h4 className="font-semibold">{notification.title}</h4>
                    <span className={`text-xs px-2 py-1 rounded ${
                      notification.type === 'success' ? 'bg-green-500/20 text-green-500' :
                      notification.type === 'warning' ? 'bg-yellow-500/20 text-yellow-500' :
                      notification.type === 'error' ? 'bg-red-500/20 text-red-500' :
                      'bg-blue-500/20 text-blue-500'
                    }`}>
                      {notification.type}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{notification.message}</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    {new Date(notification.created_at).toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2">
                    <Label className="text-sm">Active</Label>
                    <Switch
                      checked={notification.is_active}
                      onCheckedChange={() => handleToggleActive(notification.id, notification.is_active)}
                    />
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteNotification(notification.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
