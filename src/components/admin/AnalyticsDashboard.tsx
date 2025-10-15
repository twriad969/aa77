import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Users, DollarSign, BookOpen, Bell } from "lucide-react";

export const AnalyticsDashboard = () => {
  const [stats, setStats] = useState({
    totalCustomers: 0,
    completedPayments: 0,
    totalRevenue: 0,
    totalModules: 0,
    totalLessons: 0,
    activeNotifications: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      // Get customers
      const { data: customers } = await supabase
        .from('customers')
        .select('*');

      // Get modules
      const { data: modules } = await supabase
        .from('course_modules')
        .select('*');

      // Get lessons
      const { data: lessons } = await supabase
        .from('course_lessons')
        .select('*');

      // Get notifications
      const { data: notifications } = await supabase
        .from('notifications')
        .select('*')
        .eq('is_active', true);

      const completedPayments = customers?.filter(c => c.payment_status === 'completed') || [];
      const revenue = completedPayments.reduce((sum, c) => sum + parseFloat(c.amount), 0);

      setStats({
        totalCustomers: customers?.length || 0,
        completedPayments: completedPayments.length,
        totalRevenue: revenue,
        totalModules: modules?.length || 0,
        totalLessons: lessons?.length || 0,
        activeNotifications: notifications?.length || 0,
      });
    } catch (error) {
      console.error("Error loading stats:", error);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card className="p-6 surface-overlay">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary/10 rounded-lg">
            <Users className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Customers</p>
            <p className="text-2xl font-bold">{stats.totalCustomers}</p>
          </div>
        </div>
      </Card>

      <Card className="p-6 surface-overlay">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-green-500/10 rounded-lg">
            <DollarSign className="h-6 w-6 text-green-500" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Completed Payments</p>
            <p className="text-2xl font-bold">{stats.completedPayments}</p>
          </div>
        </div>
      </Card>

      <Card className="p-6 surface-overlay">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-500/10 rounded-lg">
            <DollarSign className="h-6 w-6 text-blue-500" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Revenue</p>
            <p className="text-2xl font-bold">৳{stats.totalRevenue}</p>
          </div>
        </div>
      </Card>

      <Card className="p-6 surface-overlay">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-purple-500/10 rounded-lg">
            <BookOpen className="h-6 w-6 text-purple-500" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Course Modules</p>
            <p className="text-2xl font-bold">{stats.totalModules}</p>
          </div>
        </div>
      </Card>

      <Card className="p-6 surface-overlay">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-orange-500/10 rounded-lg">
            <BookOpen className="h-6 w-6 text-orange-500" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Lessons</p>
            <p className="text-2xl font-bold">{stats.totalLessons}</p>
          </div>
        </div>
      </Card>

      <Card className="p-6 surface-overlay">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-yellow-500/10 rounded-lg">
            <Bell className="h-6 w-6 text-yellow-500" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Active Notifications</p>
            <p className="text-2xl font-bold">{stats.activeNotifications}</p>
          </div>
        </div>
      </Card>
    </div>
  );
};
