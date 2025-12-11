"use client";

import { UsersHeader } from "@/components/layout/users-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  FileText,
  FileCheck,
  Shield,
  Clock,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Calendar,
  Upload,
  Eye,
  Plus,
} from "lucide-react";
import { motion } from "framer-motion";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: any;
  color: string;
  trend?: { value: string; isPositive: boolean };
  delay?: number;
}

function StatCard({ title, value, subtitle, icon: Icon, color, trend, delay = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
    >
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-lg ${color}`}>
              <Icon className="h-6 w-6 text-white" />
            </div>
            {trend && (
              <div className={`flex items-center gap-1 text-sm ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                <TrendingUp className={`h-4 w-4 ${!trend.isPositive && 'rotate-180'}`} />
                {trend.value}
              </div>
            )}
          </div>
          <div>
            <p className="text-2xl font-bold mb-1">{value}</p>
            <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

interface ActivityItem {
  id: number;
  type: "contract" | "report" | "permit";
  title: string;
  date: string;
  status: "pending" | "approved" | "declined";
}

const recentActivities: ActivityItem[] = [
  { id: 1, type: "contract", title: "Supply Contract - Q4 2024", date: "2 days ago", status: "approved" },
  { id: 2, type: "report", title: "Monthly Production Report", date: "5 days ago", status: "pending" },
  { id: 3, type: "permit", title: "Drilling Permit Renewal", date: "1 week ago", status: "approved" },
  { id: 4, type: "report", title: "Environmental Compliance Report", date: "2 weeks ago", status: "approved" },
];

export default function UsersDashboard() {
  const stats = [
    {
      title: "Active Contracts",
      value: "8",
      subtitle: "2 pending approval",
      icon: FileText,
      color: "bg-blue-500",
      trend: { value: "+2 this month", isPositive: true },
    },
    {
      title: "Reports Submitted",
      value: "24",
      subtitle: "Last: 2 days ago",
      icon: FileCheck,
      color: "bg-green-500",
      trend: { value: "On schedule", isPositive: true },
    },
    {
      title: "Active Permits",
      value: "5",
      subtitle: "1 expiring soon",
      icon: Shield,
      color: "bg-purple-500",
    },
    {
      title: "Pending Items",
      value: "3",
      subtitle: "Requires attention",
      icon: Clock,
      color: "bg-orange-500",
    },
  ];

  const quickActions = [
    { icon: FileText, label: "New Contract", href: "/users/contracts/new", color: "bg-blue-500" },
    { icon: FileCheck, label: "Submit Report", href: "/users/reports/new", color: "bg-green-500" },
    { icon: Shield, label: "Apply for Permit", href: "/users/permits/new", color: "bg-purple-500" },
    { icon: Eye, label: "View All Contracts", href: "/users/contracts", color: "bg-gray-500" },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle2 className="h-4 w-4 text-green-600" />;
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case "declined":
        return <AlertCircle className="h-4 w-4 text-red-600" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "contract":
        return "bg-blue-100 text-blue-800";
      case "report":
        return "bg-green-100 text-green-800";
      case "permit":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div>
      <UsersHeader title="Dashboard" />

      <div className="p-6 space-y-6">
        {/* Breadcrumb */}
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>Dashboard</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white">
            <h2 className="text-2xl font-bold mb-2">Welcome back!</h2>
            <p className="text-blue-100">Here's an overview of your account activity</p>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatCard key={stat.title} {...stat} delay={0.1 + index * 0.1} />
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common tasks and shortcuts</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                {quickActions.map((action, index) => (
                  <Link key={action.label} href={action.href}>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      className="cursor-pointer"
                    >
                      <Card className="hover:shadow-md transition-all border-2 hover:border-primary">
                        <CardContent className="p-4 flex flex-col items-center text-center gap-3">
                          <div className={`p-3 rounded-lg ${action.color}`}>
                            <action.icon className="h-6 w-6 text-white" />
                          </div>
                          <p className="text-sm font-medium">{action.label}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </Link>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.6 }}
            className="lg:col-span-2"
          >
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest submissions and updates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentActivities.map((activity, index) => (
                    <motion.div
                      key={activity.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors border"
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <Badge variant="secondary" className={getTypeColor(activity.type)}>
                          {activity.type}
                        </Badge>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{activity.title}</p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                            <Calendar className="h-3 w-3" />
                            {activity.date}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(activity.status)}
                        <Badge variant={activity.status === "approved" ? "success" : activity.status === "pending" ? "warning" : "destructive"}>
                          {activity.status}
                        </Badge>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4" asChild>
                  <Link href="/users/activity">View All Activity</Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Upcoming Deadlines */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.7 }}
        >
          <Card>
            <CardHeader className="bg-orange-50 dark:bg-orange-950/20">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-orange-600" />
                <CardTitle>Upcoming Deadlines</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-start gap-3 p-3 border rounded-lg">
                  <FileCheck className="h-5 w-5 text-orange-600 mt-1" />
                  <div>
                    <p className="font-medium text-sm">Quarterly Report Due</p>
                    <p className="text-xs text-muted-foreground mt-1">Due in 5 days</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 border rounded-lg">
                  <Shield className="h-5 w-5 text-orange-600 mt-1" />
                  <div>
                    <p className="font-medium text-sm">Permit Renewal</p>
                    <p className="text-xs text-muted-foreground mt-1">Due in 15 days</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 border rounded-lg">
                  <FileText className="h-5 w-5 text-orange-600 mt-1" />
                  <div>
                    <p className="font-medium text-sm">Contract Review</p>
                    <p className="text-xs text-muted-foreground mt-1">Due in 20 days</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
