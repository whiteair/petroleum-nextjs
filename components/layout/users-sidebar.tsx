"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  FileText,
  FileCheck,
  Shield,
  ChevronDown,
  LogOut,
} from "lucide-react";
import { useState } from "react";

interface NavigationItem {
  name: string;
  href?: string;
  icon: any;
  submenu?: { name: string; href: string }[];
}

const navigation: NavigationItem[] = [
  { name: "Dashboard", href: "/users/dashboard", icon: LayoutDashboard },
  {
    name: "Contracts",
    icon: FileText,
    submenu: [
      { name: "All Contracts", href: "/users/contracts" },
      { name: "Submit New", href: "/users/contracts/new" },
    ],
  },
  {
    name: "Reports",
    icon: FileCheck,
    submenu: [
      { name: "All Reports", href: "/users/reports" },
      { name: "New Report", href: "/users/reports/new" },
    ],
  },
  { name: "Permits", href: "/users/permits", icon: Shield },
];

export function UsersSidebar() {
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState<string[]>([]);

  const toggleMenu = (menuName: string) => {
    setOpenMenus((prev) =>
      prev.includes(menuName)
        ? prev.filter((name) => name !== menuName)
        : [...prev, menuName]
    );
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const isMenuOpen = (menuName: string) => {
    return openMenus.includes(menuName) ||
           navigation.find(item => item.name === menuName)?.submenu?.some(sub => pathname === sub.href);
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
          if (item.submenu) {
            const isOpen = isMenuOpen(item.name);
            const hasActiveSubmenu = item.submenu.some(
              (sub) => pathname === sub.href
            );

            return (
              <div key={item.name}>
                <button
                  onClick={() => toggleMenu(item.name)}
                  className={cn(
                    "flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    hasActiveSubmenu
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="h-5 w-5" />
                    {item.name}
                  </div>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform",
                      isOpen && "rotate-180"
                    )}
                  />
                </button>
                {isOpen && (
                  <div className="ml-4 mt-1 space-y-1">
                    {item.submenu.map((subItem) => {
                      const isActive = pathname === subItem.href;
                      return (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          className={cn(
                            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                            isActive
                              ? "bg-primary text-primary-foreground"
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

          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href!}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
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
