"use client";

import {
  ArrowLeft, Users, TrendingUp, Briefcase, GraduationCap,
  Building2, Shield, DollarSign, Scale, FileCheck, Wrench,
  Globe, Target, Award
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, LineChart, Line, RadarChart,
  PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Area, AreaChart
} from "recharts";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface LocalContentPlanViewProps {
  reportTitle: string;
  onBack: () => void;
}

export function LocalContentPlanView({ reportTitle, onBack }: LocalContentPlanViewProps) {
  // Comprehensive Employment Data
  const employmentData = [
    { name: "Ghanaians", value: 245, percentage: 70 },
    { name: "Expatriates", value: 105, percentage: 30 },
  ];

  // Stacked bar chart data for gender distribution
  const employmentCategoryStackedData = [
    { category: "Management", ghMale: 35, ghFemale: 28 },
    { category: "Technical", ghMale: 58, ghFemale: 42 },
    { category: "Administrative", ghMale: 32, ghFemale: 28 },
    { category: "Operations", ghMale: 22, ghFemale: 18 },
  ];

  const functionalDistData = [
    { dept: "Engineering", ghanaians: 78, expatriates: 32 },
    { dept: "Finance & Accounting", ghanaians: 45, expatriates: 12 },
    { dept: "QHSE", ghanaians: 38, expatriates: 15 },
    { dept: "Human Resources", ghanaians: 28, expatriates: 8 },
    { dept: "Operations", ghanaians: 35, expatriates: 22 },
    { dept: "Legal & Compliance", ghanaians: 21, expatriates: 16 },
  ];

  // Training Data
  const trainingData = [
    { year: "2023", ghanaians: 145, expatriates: 65 },
    { year: "2024", ghanaians: 198, expatriates: 78 },
    { year: "2025", ghanaians: 245, expatriates: 85 },
  ];

  const trainingByCategory = [
    { category: "Technical Skills", hours: 4500, participants: 180, cost: 285000 },
    { category: "Management", hours: 2800, participants: 95, cost: 195000 },
    { category: "Safety & Compliance", hours: 3200, participants: 220, cost: 165000 },
    { category: "Leadership", hours: 1800, participants: 65, cost: 145000 },
    { category: "IT & Digital", hours: 2200, participants: 125, cost: 125000 },
  ];

  // Succession Planning Data
  const successionPairs = [
    {
      expatriate: "John Miller",
      expatPosition: "Chief Operations Officer",
      successor: "Kwame Mensah",
      successorPosition: "Senior Operations Manager",
      readiness: 85,
      targetDate: "Q4 2025"
    },
    {
      expatriate: "Sarah Johnson",
      expatPosition: "Head of Engineering",
      successor: "Ama Osei",
      successorPosition: "Lead Engineer",
      readiness: 78,
      targetDate: "Q2 2026"
    },
    {
      expatriate: "Michael Chen",
      expatPosition: "Finance Director",
      successor: "Yaw Boateng",
      successorPosition: "Senior Finance Manager",
      readiness: 92,
      targetDate: "Q1 2026"
    },
    {
      expatriate: "Lisa Anderson",
      expatPosition: "QHSE Manager",
      successor: "Efua Agyeman",
      successorPosition: "QHSE Supervisor",
      readiness: 88,
      targetDate: "Q3 2025"
    },
  ];

  // Goods & Services Data
  const localContentSpending = [
    { category: "Local Services", amount: 12500000, percentage: 65, target: 70 },
    { category: "Imported Services", amount: 6750000, percentage: 35, target: 30 },
  ];

  const servicesBreakdown = [
    { service: "Engineering", local: 3200000, foreign: 1800000 },
    { service: "Catering", local: 2800000, foreign: 500000 },
    { service: "Transport", local: 2100000, foreign: 1200000 },
    { service: "IT Services", local: 1800000, foreign: 1500000 },
    { service: "Consulting", local: 1200000, foreign: 1100000 },
    { service: "Maintenance", local: 1400000, foreign: 650000 },
  ];

  // Technology Transfer Data
  const technologyTransferData = [
    { area: "Operational", transferred: 85, target: 90 },
    { area: "Technical", transferred: 78, target: 85 },
    { area: "Management", transferred: 92, target: 95 },
    { area: "Safety", transferred: 88, target: 90 },
    { area: "Quality", transferred: 82, target: 85 },
  ];

  // Financial Services Data
  const financialServicesData = [
    { service: "Banking Services", ghanaian: 95, foreign: 5 },
    { service: "Insurance", ghanaian: 85, foreign: 15 },
    { service: "Legal Services", ghanaian: 78, foreign: 22 },
    { service: "Audit Services", ghanaian: 82, foreign: 18 },
    { service: "Consulting", ghanaian: 65, foreign: 35 },
  ];

  // Research & Development
  const rdInvestmentData = [
    { year: "2023", investment: 850000, projects: 8 },
    { year: "2024", investment: 1200000, projects: 12 },
    { year: "2025", investment: 1580000, projects: 15 },
  ];

  const COLORS = {
    primary: "#2563eb",
    success: "#10b981",
    warning: "#f59e0b",
    danger: "#ef4444",
    info: "#06b6d4",
    purple: "#8b5cf6",
    ghMale: "#3b82f6",
    ghFemale: "#10b981",
  };

  const staffList = [
    { name: "Kwame Adusei", position: "HR Director", nationality: "Ghanaian", gender: "Male", dept: "Human Resources" },
    { name: "Ama Osei", position: "Lead Engineer", nationality: "Ghanaian", gender: "Female", dept: "Engineering" },
    { name: "John Miller", position: "Chief Operations Officer", nationality: "American", gender: "Male", dept: "Operations" },
    { name: "Yaw Boateng", position: "Senior Finance Manager", nationality: "Ghanaian", gender: "Male", dept: "Finance" },
    { name: "Efua Agyeman", position: "QHSE Supervisor", nationality: "Ghanaian", gender: "Female", dept: "QHSE" },
    { name: "Kofi Mensah", position: "IT Manager", nationality: "Ghanaian", gender: "Male", dept: "IT" },
    { name: "Sarah Johnson", position: "Head of Engineering", nationality: "British", gender: "Female", dept: "Engineering" },
    { name: "Abena Owusu", position: "Legal Counsel", nationality: "Ghanaian", gender: "Female", dept: "Legal" },
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border rounded-lg shadow-lg p-3">
          <p className="font-semibold text-sm mb-1">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-xs" style={{ color: entry.color }}>
              {entry.name}: {typeof entry.value === 'number' ? entry.value.toLocaleString() : entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // Chart Section Wrapper - only renders charts when in view
  const ChartSection = ({ children }: { children: React.ReactNode }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    return (
      <div ref={ref}>
        {isInView ? children : <div className="h-96" />}
      </div>
    );
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Header with Back Button */}
      <Card className="border shadow-sm">
        <CardHeader className="bg-muted">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={onBack} className="hover:bg-background">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex-1">
              <CardTitle className="text-2xl font-bold">{reportTitle}</CardTitle>
              <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                <span>Submitted: March 15, 2025</span>
                <span>•</span>
                <Badge variant="default" className="bg-green-600 hover:bg-green-700">
                  <FileCheck className="h-3 w-3 mr-1" />
                  Approved
                </Badge>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Executive Summary */}
      <Card className="border shadow-sm">
          <CardHeader className="bg-muted border-b">
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Executive Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-blue-100 mb-1">Total Employees</p>
                      <p className="text-4xl font-bold">350</p>
                      <p className="text-xs text-blue-100 mt-2">↑ 12% from last year</p>
                    </div>
                    <Users className="h-14 w-14 text-white/30" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-emerald-100 mb-1">Workforce</p>
                      <p className="text-4xl font-bold">245</p>
                      <p className="text-xs text-emerald-100 mt-2">Ghanaians: 245 | Expats: 105</p>
                    </div>
                    <TrendingUp className="h-14 w-14 text-white/30" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-amber-500 to-orange-600 text-white border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-amber-100 mb-1">Training Budget</p>
                      <p className="text-4xl font-bold">$720k</p>
                      <p className="text-xs text-amber-100 mt-2">14,500 training hours</p>
                    </div>
                    <GraduationCap className="h-14 w-14 text-white/30" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-500 to-pink-600 text-white border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-purple-100 mb-1">Local Content Spend</p>
                      <p className="text-4xl font-bold">$12.5M</p>
                      <p className="text-xs text-purple-100 mt-2">65% of total procurement</p>
                    </div>
                    <DollarSign className="h-14 w-14 text-white/30" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

      {/* Section A: Employment and Training */}
      <Card className="border shadow-sm">
          <CardHeader className="bg-muted border-b">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                A
              </div>
              <div>
                <CardTitle className="text-xl">Employment and Training Sub Plan</CardTitle>
                <CardDescription>Regulation 17 & 19 - Direct & Indirect Employment Strategy</CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6 space-y-8">
            {/* Employment Overview */}
            <div>
              <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Employment Overview
              </h4>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ChartSection>
                  <div className="h-96">
                    <p className="text-center text-sm font-medium mb-4 text-muted-foreground">Employee Distribution</p>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                      <Pie
                        data={employmentData}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        label={(entry: any) => `${entry.name}: ${entry.value} (${entry.percentage}%)`}
                        innerRadius={70}
                        outerRadius={110}
                        fill="#8884d8"
                        dataKey="value"
                        animationBegin={0}
                        animationDuration={1000}
                      >
                        {employmentData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={index === 0 ? COLORS.success : COLORS.danger} />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                </ChartSection>

                <ChartSection>
                  <div className="h-96">
                    <p className="text-center text-sm font-medium mb-4 text-muted-foreground">Employment by Category (Ghanaians)</p>
                    <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={employmentCategoryStackedData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="category" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend wrapperStyle={{ fontSize: '12px' }} />
                      <Bar dataKey="ghMale" name="Male" stackId="ghanaian" fill={COLORS.ghMale} radius={[0, 0, 0, 0]} animationBegin={0} animationDuration={1000} />
                      <Bar dataKey="ghFemale" name="Female" stackId="ghanaian" fill={COLORS.ghFemale} radius={[4, 4, 0, 0]} animationBegin={0} animationDuration={1000} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                </ChartSection>
              </div>
            </div>

            {/* Expenditure Analysis */}
            <div>
              <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-green-600" />
                Employment Expenditure Analysis
              </h4>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="border rounded-lg overflow-hidden shadow-sm">
                  <div className="bg-primary text-white">
                    <div className="grid grid-cols-3 gap-2">
                      <div className="text-left py-3 px-4 text-sm font-semibold">Category</div>
                      <div className="text-right py-3 px-4 text-sm font-semibold">Count</div>
                      <div className="text-right py-3 px-4 text-sm font-semibold">Expenditure</div>
                    </div>
                  </div>
                  <div className="bg-white">
                    <div className="border-b hover:bg-muted/50 transition-colors">
                      <div className="grid grid-cols-3 gap-2 py-3 px-4">
                        <div className="text-sm font-medium">Ghanaians</div>
                        <div className="text-sm text-right">245</div>
                        <div className="text-sm text-right font-semibold text-green-600">$3.85M</div>
                      </div>
                    </div>
                    <div className="border-b hover:bg-muted/50 transition-colors">
                      <div className="grid grid-cols-3 gap-2 py-3 px-4">
                        <div className="text-sm font-medium">Expatriates</div>
                        <div className="text-sm text-right">105</div>
                        <div className="text-sm text-right font-semibold text-orange-600">$5.25M</div>
                      </div>
                    </div>
                    <div className="bg-muted">
                      <div className="grid grid-cols-3 gap-2 py-3 px-4 font-bold">
                        <div className="text-sm">Total</div>
                        <div className="text-sm text-right">350</div>
                        <div className="text-sm text-right text-primary">$9.10M</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-2">
                  <ChartSection>
                    <div className="h-96">
                      <p className="text-center text-sm font-medium mb-4 text-muted-foreground">Functional Distribution</p>
                      <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={functionalDistData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis type="number" tick={{ fontSize: 12 }} />
                      <YAxis dataKey="dept" type="category" width={150} tick={{ fontSize: 12 }} />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend wrapperStyle={{ fontSize: '12px' }} />
                      <Bar dataKey="ghanaians" name="Ghanaians" fill={COLORS.success} radius={[0, 4, 4, 0]} animationBegin={0} animationDuration={1000} />
                      <Bar dataKey="expatriates" name="Expatriates" fill={COLORS.danger} radius={[0, 4, 4, 0]} animationBegin={0} animationDuration={1000} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                  </ChartSection>
                </div>
              </div>
            </div>

            {/* Staff List */}
            <div>
              <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                Key Personnel (Sample)
              </h4>
              <div className="border rounded-lg overflow-hidden shadow-sm">
                <table className="w-full">
                  <thead className="bg-primary text-white">
                    <tr>
                      <th className="text-left py-3 px-4 text-sm font-semibold">#</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold">Name</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold">Position</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold">Department</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold">Nationality</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold">Gender</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {staffList.map((staff, index) => (
                      <tr key={index} className="border-b hover:bg-muted/50 transition-colors">
                        <td className="py-3 px-4 text-sm text-muted-foreground">{index + 1}</td>
                        <td className="py-3 px-4 text-sm font-medium">{staff.name}</td>
                        <td className="py-3 px-4 text-sm">{staff.position}</td>
                        <td className="py-3 px-4 text-sm">{staff.dept}</td>
                        <td className="py-3 px-4 text-sm">
                          <Badge variant={staff.nationality === "Ghanaian" ? "default" : "secondary"} className="text-xs">
                            {staff.nationality}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-sm">{staff.gender}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Training Program */}
            <div>
              <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-primary" />
                Training & Development Program
              </h4>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
                <ChartSection>
                  <div className="h-96">
                    <p className="text-center text-sm font-medium mb-4 text-muted-foreground">Training Progression (2023-2025)</p>
                    <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={trainingData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorGH" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={COLORS.success} stopOpacity={0.8}/>
                          <stop offset="95%" stopColor={COLORS.success} stopOpacity={0.1}/>
                        </linearGradient>
                        <linearGradient id="colorExp" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={COLORS.warning} stopOpacity={0.8}/>
                          <stop offset="95%" stopColor={COLORS.warning} stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="year" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend wrapperStyle={{ fontSize: '12px' }} />
                      <Area
                        type="monotone"
                        dataKey="ghanaians"
                        name="Ghanaians Trained"
                        stroke={COLORS.success}
                        fillOpacity={1}
                        fill="url(#colorGH)"
                        animationBegin={0}
                        animationDuration={1000}
                      />
                      <Area
                        type="monotone"
                        dataKey="expatriates"
                        name="Expatriates Trained"
                        stroke={COLORS.warning}
                        fillOpacity={1}
                        fill="url(#colorExp)"
                        animationBegin={0}
                        animationDuration={1000}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                </ChartSection>

                <ChartSection>
                  <div className="h-96">
                    <p className="text-center text-sm font-medium mb-4 text-muted-foreground">Training Investment by Category</p>
                    <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={trainingByCategory} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis type="number" tick={{ fontSize: 12 }} />
                      <YAxis dataKey="category" type="category" width={140} tick={{ fontSize: 11 }} />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend wrapperStyle={{ fontSize: '12px' }} />
                      <Bar dataKey="cost" name="Cost (USD)" fill={COLORS.info} radius={[0, 4, 4, 0]} animationBegin={0} animationDuration={1000} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                </ChartSection>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {trainingByCategory.map((training, index) => (
                  <Card key={index} className="border shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <h5 className="font-semibold text-sm mb-2">{training.category}</h5>
                      <div className="space-y-1 text-xs text-muted-foreground">
                        <p>Hours: <span className="font-semibold text-foreground">{training.hours.toLocaleString()}</span></p>
                        <p>Participants: <span className="font-semibold text-foreground">{training.participants}</span></p>
                        <p>Cost: <span className="font-semibold text-green-600">${(training.cost / 1000).toFixed(0)}k</span></p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

      {/* Section B: Succession Planning */}
      <Card className="border shadow-sm">
          <CardHeader className="bg-muted border-b">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                B
              </div>
              <div>
                <CardTitle className="text-xl">Succession Planning</CardTitle>
                <CardDescription>Regulation 18 - Localization Strategy & Knowledge Transfer</CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6 space-y-6">
            <p className="text-sm text-muted-foreground">
              The Succession Planning Sub-Plan outlines the systematic replacement of expatriate personnel with qualified Ghanaian professionals through structured knowledge transfer programs.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {successionPairs.map((pair, index) => (
                <Card key={index} className="border-2 hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="pb-3 border-b">
                        <p className="text-xs text-muted-foreground mb-1">Current Expatriate</p>
                        <p className="font-semibold text-sm">{pair.expatriate}</p>
                        <p className="text-xs text-muted-foreground">{pair.expatPosition}</p>
                      </div>

                      <div className="pb-3 border-b">
                        <p className="text-xs text-muted-foreground mb-1">Ghanaian Successor</p>
                        <p className="font-semibold text-sm text-green-600">{pair.successor}</p>
                        <p className="text-xs text-muted-foreground">{pair.successorPosition}</p>
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <p className="text-xs text-muted-foreground">Readiness</p>
                          <Badge variant={pair.readiness >= 85 ? "default" : "secondary"} className="text-xs">
                            {pair.readiness}%
                          </Badge>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all duration-500 ${pair.readiness >= 85 ? 'bg-green-500' : 'bg-yellow-500'}`}
                            style={{ width: `${pair.readiness}%` }}
                          />
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">Target: {pair.targetDate}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>


      {/* Section C: Goods & Services */}

        <Card className="border shadow-sm">
          <CardHeader className="bg-muted border-b">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                C
              </div>
              <div>
                <CardTitle className="text-xl">Goods and Services</CardTitle>
                <CardDescription>Regulation 20 - Local Content in Procurement</CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ChartSection>
                <div className="h-96">
                  <p className="text-center text-sm font-medium mb-4 text-muted-foreground">Local vs Foreign Services Spend</p>
                  <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={localContentSpending}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      label={(entry: any) => `${entry.category}: $${(entry.amount / 1000000).toFixed(1)}M (${entry.percentage}%)`}
                      innerRadius={70}
                      outerRadius={110}
                      fill="#8884d8"
                      dataKey="amount"
                      animationBegin={0}
                      animationDuration={1000}
                    >
                      <Cell fill={COLORS.success} />
                      <Cell fill={COLORS.danger} />
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              </ChartSection>

              <ChartSection>
                <div className="h-96">
                  <p className="text-center text-sm font-medium mb-4 text-muted-foreground">Services Breakdown</p>
                  <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={servicesBreakdown} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="service" angle={-30} textAnchor="end" height={80} tick={{ fontSize: 11 }} interval={0} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend wrapperStyle={{ fontSize: '12px' }} />
                    <Bar dataKey="local" name="Local Services" fill={COLORS.success} radius={[4, 4, 0, 0]} animationBegin={0} animationDuration={1000} />
                    <Bar dataKey="foreign" name="Foreign Services" fill={COLORS.warning} radius={[4, 4, 0, 0]} animationBegin={0} animationDuration={1000} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              </ChartSection>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {localContentSpending.map((item, index) => (
                <Card key={index} className="border shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-semibold">{item.category}</p>
                        <p className="text-2xl font-bold text-green-600">${(item.amount / 1000000).toFixed(2)}M</p>
                      </div>
                      <Badge variant={item.percentage >= item.target ? "default" : "secondary"}>
                        {item.percentage}%
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Target: {item.target}%</span>
                        <span className={item.percentage >= item.target ? "text-green-600" : "text-orange-600"}>
                          {item.percentage >= item.target ? "✓ On Target" : "Below Target"}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-500 ${item.percentage >= item.target ? 'bg-green-500' : 'bg-orange-500'}`}
                          style={{ width: `${(item.percentage / item.target) * 100}%` }}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>


      {/* Section D: Technology Transfer */}

        <Card className="border shadow-sm">
          <CardHeader className="bg-muted border-b">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                D
              </div>
              <div>
                <CardTitle className="text-xl">Technology and Knowledge Transfer</CardTitle>
                <CardDescription>Regulation 21 - Skills & Technology Localization</CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ChartSection>
                <div className="h-[450px]">
                  <p className="text-center text-sm font-medium mb-4 text-muted-foreground">Technology Transfer Progress</p>
                  <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={technologyTransferData} margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
                    <PolarGrid stroke="#e5e7eb" />
                    <PolarAngleAxis dataKey="area" tick={{ fontSize: 12 }} />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 12 }} />
                    <Radar name="Transferred" dataKey="transferred" stroke={COLORS.success} fill={COLORS.success} fillOpacity={0.6} animationBegin={0} animationDuration={1000} />
                    <Radar name="Target" dataKey="target" stroke={COLORS.primary} fill={COLORS.primary} fillOpacity={0.3} animationBegin={0} animationDuration={1000} />
                    <Legend wrapperStyle={{ fontSize: '12px' }} />
                    <Tooltip content={<CustomTooltip />} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              </ChartSection>

              <div className="space-y-4">
                <h5 className="font-semibold">Knowledge Transfer Metrics</h5>
                {technologyTransferData.map((item, index) => (
                  <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-sm">{item.area}</span>
                      <Badge variant={item.transferred >= item.target ? "default" : "secondary"}>
                        {item.transferred}% / {item.target}%
                      </Badge>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className={`h-2.5 rounded-full transition-all duration-500 ${item.transferred >= item.target ? 'bg-green-500' : 'bg-blue-500'}`}
                        style={{ width: `${item.transferred}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>


      {/* Section E: Research & Development */}

        <Card className="border shadow-sm">
          <CardHeader className="bg-muted border-b">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                E
              </div>
              <div>
                <CardTitle className="text-xl">Research and Development</CardTitle>
                <CardDescription>Regulation 29 - R&D Investment & Innovation</CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6 space-y-6">
            <ChartSection>
              <div className="h-96">
                <p className="text-center text-sm font-medium mb-4 text-muted-foreground">R&D Investment Trend (2023-2025)</p>
                <ResponsiveContainer width="100%" height="100%">
                <LineChart data={rdInvestmentData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="year" tick={{ fontSize: 12 }} />
                  <YAxis yAxisId="left" tick={{ fontSize: 12 }} />
                  <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ fontSize: '12px' }} />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="investment"
                    name="Investment (USD)"
                    stroke={COLORS.warning}
                    strokeWidth={3}
                    dot={{ r: 6, fill: COLORS.warning }}
                    animationBegin={0}
                    animationDuration={1000}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="projects"
                    name="Number of Projects"
                    stroke={COLORS.info}
                    strokeWidth={3}
                    dot={{ r: 6, fill: COLORS.info }}
                    animationBegin={0}
                    animationDuration={1000}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            </ChartSection>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {rdInvestmentData.map((item, index) => (
                <Card key={index} className="border shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <p className="text-sm text-muted-foreground mb-2">{item.year}</p>
                    <p className="text-2xl font-bold text-orange-600">${(item.investment / 1000000).toFixed(2)}M</p>
                    <p className="text-sm text-muted-foreground mt-2">{item.projects} Active Projects</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>


      {/* Section F: Financial Services */}

        <Card className="border shadow-sm">
          <CardHeader className="bg-muted border-b">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                F
              </div>
              <div>
                <CardTitle className="text-xl">Financial Services</CardTitle>
                <CardDescription>Regulation 28 - Banking, Insurance & Financial Compliance</CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6 space-y-6">
            <ChartSection>
              <div className="h-[450px]">
                <p className="text-center text-sm font-medium mb-4 text-muted-foreground">Local vs Foreign Financial Services Utilization</p>
                <ResponsiveContainer width="100%" height="100%">
                <BarChart data={financialServicesData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 12 }} />
                  <YAxis dataKey="service" type="category" width={130} tick={{ fontSize: 12 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ fontSize: '12px' }} />
                  <Bar dataKey="ghanaian" name="Ghanaian Services (%)" fill={COLORS.success} radius={[0, 4, 4, 0]} animationBegin={0} animationDuration={1000} />
                  <Bar dataKey="foreign" name="Foreign Services (%)" fill={COLORS.danger} radius={[0, 4, 4, 0]} animationBegin={0} animationDuration={1000} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            </ChartSection>
          </CardContent>
        </Card>


      {/* Section G: Legal Services */}

        <Card className="border shadow-sm">
          <CardHeader className="bg-muted border-b">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                G
              </div>
              <div>
                <CardTitle className="text-xl">Legal Services</CardTitle>
                <CardDescription>Regulation 27 - Local Legal Counsel & Compliance</CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="border shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                      <Scale className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Primary Legal Counsel</p>
                      <p className="font-semibold">Ghanaian Firm</p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">All local legal matters handled by certified Ghanaian legal practitioners</p>
                </CardContent>
              </Card>

              <Card className="border shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                      <FileCheck className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Compliance Rate</p>
                      <p className="font-semibold text-2xl text-green-600">100%</p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">Full compliance with local content legal requirements</p>
                </CardContent>
              </Card>

              <Card className="border shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                      <Globe className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Local Counsel Usage</p>
                      <p className="font-semibold text-2xl text-purple-600">82%</p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">Percentage of legal spend with Ghanaian firms</p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>


      {/* Footer Summary */}

        <Card className="border shadow-sm bg-muted">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                <FileCheck className="h-6 w-6 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-2">Plan Compliance Summary</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  This Local Content Plan demonstrates our commitment to maximizing Ghanaian participation across all aspects of our petroleum operations.
                  We have achieved significant milestones in employment localization (70%), local procurement (65%), and knowledge transfer,
                  positioning us as a leader in local content compliance within Ghana's petroleum sector.
                </p>
                <div className="flex gap-2 flex-wrap">
                  <Badge variant="default" className="bg-green-600 hover:bg-green-700">Employment: 70% Localized</Badge>
                  <Badge variant="default" className="bg-blue-600 hover:bg-blue-700">Procurement: 65% Local</Badge>
                  <Badge variant="default" className="bg-purple-600 hover:bg-purple-700">Training: $720k Invested</Badge>
                  <Badge variant="default" className="bg-orange-600 hover:bg-orange-700">R&D: $1.58M Committed</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

    </div>
  );
}
