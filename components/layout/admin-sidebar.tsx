"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import {
  LayoutDashboard,
  Building2,
  FileCheck,
  Shield,
  MessageSquare,
  Settings,
  LogOut,
  ChevronDown,
  Users,
  FileText,
  Target,
  Send,
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Company Management", href: "/admin/companies", icon: Building2 },
  { name: "Contracts", href: "/admin/contracts", icon: FileText },
  { name: "Local Content Plan", href: "/admin/local-content", icon: Target },
  {
    name: "Submissions",
    icon: Send,
    submenu: [
      { name: "Local Content Plan", href: "/admin/submissions/local-content-plan" },
      { name: "HR Localisation Performance", href: "/admin/submissions/hr-localisation" },
      { name: "LC Reporting (Service)", href: "/admin/submissions/lc-service" },
      { name: "LC Reporting (Operators)", href: "/admin/submissions/lc-operators" },
    ],
  },
  { name: "Reports", href: "/admin/reports", icon: FileCheck },
  { name: "Permit Management", href: "/admin/permits", icon: Shield },
  { name: "Messaging", href: "/admin/messaging", icon: MessageSquare, badge: 4 },
  {
    name: "Settings",
    icon: Settings,
    submenu: [
      { name: "User Management", href: "/admin/settings/users" },
      { name: "General Settings", href: "/admin/settings" },
    ],
  },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const toggleMenu = (name: string) => {
    setOpenMenus((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <div className="flex h-screen w-64 flex-col border-r bg-muted/40">
      {/* Logo */}
      <div className="flex h-16 items-center gap-3 border-b px-6">
        <div className="relative h-10 w-24 flex-shrink-0">
          <Image
            src="/images/logo-transparent-main.png"
            alt="Ghana Petroleum Commission"
            fill
            className="object-contain"
          />
        </div>
        <span className="text-lg font-bold">E-Portal</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigation.map((item) => {
          if ("submenu" in item && item.submenu) {
            const isOpen = openMenus[item.name] || item.submenu.some((sub) => pathname === sub.href || pathname?.startsWith(sub.href + "/"));
            const isActive = item.submenu.some((sub) => pathname === sub.href || pathname?.startsWith(sub.href + "/"));

            return (
              <div key={item.name}>
                <button
                  onClick={() => toggleMenu(item.name)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="flex-1 text-left">{item.name}</span>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform",
                      isOpen && "rotate-180"
                    )}
                  />
                </button>
                {isOpen && (
                  <div className="ml-8 mt-1 space-y-1">
                    {item.submenu.map((subItem) => {
                      const isSubActive = pathname === subItem.href || pathname?.startsWith(subItem.href + "/");
                      return (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className={cn(
                            "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
                            isSubActive
                              ? "bg-muted text-foreground font-medium"
                              : "text-muted-foreground hover:bg-muted hover:text-foreground"
                          )}
                        >
                          {subItem.name}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          }

          if (!("href" in item)) return null;

          const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              <span className="flex-1">{item.name}</span>
              {"badge" in item && item.badge && item.badge > 0 && (
                <span className="inline-flex items-center justify-center rounded-full bg-blue-600 px-2 py-0.5 text-xs font-semibold text-white tabular-nums">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* User & Logout */}
      <div className="border-t p-4">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </button>
      </div>
    </div>
  );
}
