"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

// Mock user credentials
const MOCK_USERS = {
  admin: { email: "admin@gpc.gov.gh", password: "admin123", role: "admin", route: "/admin/dashboard" },
  operator: { email: "operator@gpc.gov.gh", password: "operator123", role: "operator", route: "/company/dashboard" },
  contractor: { email: "contractor@company.com", password: "contractor123", role: "contractor", route: "/company/dashboard" },
  service: { email: "service@company.com", password: "service123", role: "service", route: "/company/dashboard" },
};

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleQuickLogin = (userType: keyof typeof MOCK_USERS) => {
    const user = MOCK_USERS[userType];
    setEmail(user.email);
    setPassword(user.password);

    // Simulate login
    setTimeout(() => {
      localStorage.setItem("userRole", user.role);
      localStorage.setItem("userEmail", user.email);
      router.push(user.route);
    }, 300);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Find matching user
    const user = Object.values(MOCK_USERS).find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      localStorage.setItem("userRole", user.role);
      localStorage.setItem("userEmail", user.email);
      router.push(user.route);
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen w-full relative flex items-center justify-center p-4">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/bann.jpg"
          alt="Petroleum facility background"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        {/* Gradient Overlay for better contrast */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-blue-800/35 to-slate-900/40" />
      </div>

      {/* Login Card */}
      <Card className="w-full max-w-md relative z-10 backdrop-blur-sm bg-white/95 shadow-2xl border-0">
        <CardHeader className="space-y-4 text-center pb-8">
          {/* Logo */}
          <div className="flex justify-center mb-2">
            <div className="relative w-40 h-20">
              <Image
                src="/images/logo-transparent-main.png"
                alt="Ghana Petroleum Commission"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          <div className="space-y-1">
            <CardTitle className="text-3xl font-bold text-slate-900">
              E-Portal
            </CardTitle>
            <CardDescription className="text-base text-slate-600">
              Ghana Petroleum Commission
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Quick Login Badges */}
          <div className="flex justify-center gap-2">
            <Badge
              onClick={() => handleQuickLogin("admin")}
              variant="secondary"
              className="cursor-pointer hover:bg-secondary/80"
            >
              Admin
            </Badge>
            <Badge
              onClick={() => handleQuickLogin("service")}
              variant="secondary"
              className="cursor-pointer hover:bg-secondary/80"
            >
              Service Company
            </Badge>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-700 font-semibold">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                className="h-11 bg-slate-50 border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-slate-700 font-semibold">
                  Password
                </Label>
                <Link
                  href="/forgot-password"
                  className="text-sm text-blue-600 hover:text-blue-700 hover:underline font-medium"
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="h-11 bg-slate-50 border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-200"
            >
              Sign In
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col space-y-4 pt-6 border-t">
          <div className="text-center text-sm text-slate-600">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="text-blue-600 hover:text-blue-700 font-semibold hover:underline"
            >
              Register here
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
