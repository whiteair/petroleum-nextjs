import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function RegisterPage() {
  return (
    <div className="min-h-screen w-full relative flex items-center justify-center p-4">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/register.jpg"
          alt="Petroleum facility background"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        {/* Gradient Overlay for better contrast */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-blue-900/85 to-slate-800/90" />
      </div>

      {/* Registration Card */}
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
            <p className="text-sm text-slate-500 pt-2">
              Register your petroleum company
            </p>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <form className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="company" className="text-slate-700 font-semibold">
                Company Name
              </Label>
              <Input
                id="company"
                type="text"
                placeholder="Enter company name"
                className="h-11 bg-slate-50 border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-700 font-semibold">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="company@example.com"
                className="h-11 bg-slate-50 border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-700 font-semibold">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Minimum 8 characters"
                className="h-11 bg-slate-50 border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password_confirmation" className="text-slate-700 font-semibold">
                Confirm Password
              </Label>
              <Input
                id="password_confirmation"
                type="password"
                placeholder="Re-enter your password"
                className="h-11 bg-slate-50 border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div className="pt-2">
              <p className="text-xs text-slate-600 mb-4">
                By registering, you agree to the terms and conditions of the Ghana Petroleum Commission.
              </p>
              <Button
                type="submit"
                className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-200"
              >
                Create Account
              </Button>
            </div>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col space-y-4 pt-6 border-t">
          <div className="text-center text-sm text-slate-600">
            Already have an account?{" "}
            <Link
              href="/"
              className="text-blue-600 hover:text-blue-700 font-semibold hover:underline"
            >
              Sign in here
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
